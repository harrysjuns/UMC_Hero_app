import { useState, useContext, createContext } from "react";

import { postSignin, postSignout } from "../apis/auth"; 

import type { RequestSigninDto } from "../types/Auth";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/Key";

interface AuthContextType {
    accessToken: string | null;
    refleshToken: string | null;
    signin: (data: RequestSigninDto) => Promise<void>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refleshToken: null,
    signin: async () => {},
    signout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        getItem : getAccessTokenInStorage,
        setItem : setAccessTokenInStorage,
        removeItem : removeAccessTokenInStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    
    const {
        getItem : getRefreshTokenInStorage,
        setItem : setRefreshTokenInStorage,
        removeItem : removeRefreshTokenInStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null> (
        getAccessTokenInStorage() as string | null,
    );

    const [refreshToken, setRefreshToken] = useState<string | null> (
        getRefreshTokenInStorage() as string | null,
    );

    const login = async(signinData: RequestSigninDto) => {

        try {
            const data = await postSignin(signinData);

            if (data) {
                const newAccessToken = data.data.accessToken;
                const newRefreshToken = data.data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                console.log(data); 
                alert("로그인에 성공했습니다!");
                window.location.href = "/mypage";  
            }

        } catch (error) {
            console.error("로그인 실패:", error);
            alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }
    };

    const logout = async () => {
        try { 
            await postSignout();
            removeAccessTokenInStorage();
            removeRefreshTokenInStorage();
            setAccessToken(null);
            setRefreshToken(null); 
            alert("로그아웃 되었습니다.");
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃에 실패했습니다.");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refleshToken: refreshToken,
                signin: login,
                signout: logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}; 

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }
    return context;
}