import { use, useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/Key";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Google OAuth 리다이렉트 처리 로직 구현
// 예: URL에서 인증 코드 추출, 백엔드에 토큰 요청, 사용자 정보 저장 등
const GoogleLoginRedirectPage = () => {
    const {setItem : setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem : setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken && refreshToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            // 토큰 저장 후 리다이렉트
            alert("Google 로그인에 성공했습니다!");
            window.location.href = "/mypage"; 
        } 
    }, [setAccessToken, setRefreshToken]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/90 text-white">
            <h1 className="text-3xl font-bold mb-4">Google 로그인 중...</h1>
            <p>잠시만 기다려주세요.</p>
        </div>
    );
};
export default GoogleLoginRedirectPage;