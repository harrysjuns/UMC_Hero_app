import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { useAuth } from "../contexts/AuthContext";

import type { UserSigninInformations } from "../utills/validate";
import { validateSignin } from "../utills/validate";

import { SigninToGoogleButton, LabelWithButton } from "../components/Buttons";
import { DividerWithText } from "../components/Divider";
import { AuthHeader } from "../components/Header";
import PasswordToggleButton from "../components/PasswordToggleButton";

function LoginPage() {
    const { signin, accessToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { getInputProps, values, errors, touched } = useForm<UserSigninInformations>({
        initialValues: {
            email: "", 
            password: "",
        },
        validate: validateSignin,
    });

    useEffect(() => { 
        if (accessToken) {
            window.location.href = "/mypage"; 
        }
    }, [accessToken]);

    const handleSubmit = async() => {
        await signin(values);
    };

    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) => value === "") ;
 

    return (
        <div className="flex min-h-screen justify-center items-start pt-[200px]">
            <section className="flex flex-col max-w-[440px] w-full px-[48px] py-[48px] items-center gap-[48px] bg-black/50 rounded-3xl drop-shadow-lg">

                <AuthHeader text="로그인" />
                <SigninToGoogleButton/>
                <DividerWithText text="또는" />                

                <div className="flex flex-col w-full gap-[16px]">
                    <div className="flex flex-col gap-[4px]">
                        <input
                            {...getInputProps("email")}
                            
                            className="
                                flex w-full px-[24px] py-[8px] rounded-3xl border border-white/20
                                bg-transparent text-white text-lg font-medium
                                focus:border-purple-300 focus:outline-none
                                placeholder:text-white/20
                                transition duration-300"
                            type="email"
                            placeholder={"이메일"}
                        />
                        { errors?.email && touched?.email && <div className="text-sm text-red-400 h-5 ml-4"> { errors.email} </div> }
                    </div>

                <div className="relative flex items-center">
                    <input
                        {...getInputProps("password")}
                        className="
                            flex w-full px-[24px] py-[8px] rounded-3xl border border-white/20
                            bg-transparent text-white text-lg font-medium
                            focus:border-purple-300 focus:outline-none
                            placeholder:text-white/20
                            transition duration-300
                            pr-12"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                    />
                    <PasswordToggleButton
                        isVisible={showPassword}
                        onToggle={() => setShowPassword((prev) => !prev)}
                    />
                </div>
                {errors?.password && touched?.password && <div className="text-sm text-red-400 h-5 ml-4">{errors.password}</div>}

                    <LabelWithButton
                        label="아직 HEROBOX 의 회원이 아니신가요?"
                        buttonText="계정만들기"
                        onClick={() => window.location.href = "/join"}
                    />
                </div>

                
                <button 
                    disabled={isDisabled}
                    onClick={handleSubmit}
                    className="
                        flex w-full items-center justify-center px-[24px] py-[8px] rounded-3xl 
                        bg-purple-800 text-white text-lg font-medium
                        opacity-70
                        hover:opacity-100
                        transition duration-300
                        desabled:cursor-not-allowed disabled:opacity-20"
                > 
                    계속
                </button>
                
            </section>
        </div>
      );
}

export default LoginPage;
