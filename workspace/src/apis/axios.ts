import axios, { AxiosHeaders } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/Key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}


// 전역변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다
let refreshPromise: Promise<string> | null = null;

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});
export default axiosInstance;

// 요청 인터셉터: 모든 요청 전에 accessToken 을 Authorization 헤더에 추가한다 
axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // 로컬 스토리지에서 액세스 토큰 가져오기

    // 액세스 토큰이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가
    if (accessToken) {
        const headers =
            config.headers instanceof AxiosHeaders
                ? config.headers
                : new AxiosHeaders(config.headers ?? {});

        headers.set("Authorization", `Bearer ${accessToken}`);
        config.headers = headers;

    }

    // 수정된 요청 설정을 반환한다
    return config;
},
    // 요청 인터셉터가 실패하면 에러를 반환한다
    (error) => Promise.reject(error),
);


// 응답 인터셉터: 401 Unauthorized 응답 처리 -> refresh 토큰을 통한 토큰 갱신 시도
axiosInstance.interceptors.response.use(
    (response) => response, // 정상 응답은 그대로 반환
    async (error) => {
        const originalRequest: CustomAxiosRequestConfig = error.config;
        
        // 401 Unauthorized 응답이면서 아직 재시도하지 않은 요청인 경우
        if (error.response && error.response.status === 401 && !originalRequest._retry) {

            // refresh 엔드포인트 401 에러(Unauthorized) 시 중복 재시도를 방지하기 위해 로그아웃 처리
            if (originalRequest.url === "/v1/auth/refresh") {
                const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                removeAccessToken();
                removeRefreshToken();
                window.location.href = "/login";
                return Promise.reject(error);
            }
        

            // 재시도 플래그 설정
            originalRequest._retry = true; 

            // 이미 진행 중인 refresh 요청이 있으면 해당 Promise를 재사용
            if (!refreshPromise) {

                // refresh 요청 실행 후 프로미스를 전역변수에 할당
                refreshPromise = ( async () => {
                    const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = getRefreshToken(); 

                    const { data } = await axiosInstance.post("/v1/auth/refresh", {
                        refresh: refreshToken,
                    });

                    // 새 토큰 반환
                    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);

                    // 새 accessToken 반환하여 인터셉터에서 사용할 수 있도록 함
                    return data.data.accessToken;
                }) ()
                    .catch(() => {
                        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                        removeAccessToken();
                        removeRefreshToken(); 
                    })
                    .finally(() => {
                        refreshPromise = null;
                    })
            }

            // 진행 중인 refreshPromise 가 해결될 때까지 대기
            return refreshPromise.then((newAccessToken) => {

                // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                
                // 업데이트된 원래 요청 재시도
                return axiosInstance.request(originalRequest); 
            });
        }

        // 다른 에러는 그대로 반환 
        return Promise.reject(error);
    },
);
