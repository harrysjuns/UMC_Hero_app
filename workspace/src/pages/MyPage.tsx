import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/Auth";

const MyPage = () => {
    const navigate = useNavigate();
    const { signout } = useAuth();
    const [ data, setData ] = useState<ResponseMyInfoDto>();

    const handleSignout = async () => {
        await signout();
        navigate("/");
    }
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);
            setData(response);
        };
        getData();
    }, []);
    
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-slate-900 text-white">
            {!data ? (
                <div className="rounded-3xl bg-black/40 px-12 py-10 text-lg">
                    내 정보를 불러오는 중입니다...
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6 rounded-3xl bg-black/40 px-12 py-10 text-center shadow-xl">
                    {data.data.avatar && (
                        <img
                            className="h-32 w-32 rounded-full border border-white/20 object-cover"
                            src={data.data.avatar}
                            alt={`${data.data.name}의 프로필 이미지`}
                        />
                    )}
                    <div>
                        <h1 className="text-3xl font-semibold">{data.data.name}</h1>
                        <p className="mt-2 text-white/70">{data.data.email}</p>
                    </div>
                    {data.data.bio && (
                        <p className="max-w-xs text-white/80">{data.data.bio}</p>
                    )}
                </div>
            )}
            <button
                onClick={handleSignout}
                className="
                    mt-10 px-6 py-2 rounded-lg bg-red-600 text-white font-medium
                    hover:bg-red-500 transition duration-300"
            >
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;
