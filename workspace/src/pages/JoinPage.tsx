import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { joinSchema, type JoinFormValues } from "../utills/validate";
import { SigninToGoogleButton, LabelWithButton } from "../components/Buttons";
import { DividerWithText } from "../components/Divider";
import { AuthHeader } from "../components/Header";
import PasswordToggleButton from "../components/PasswordToggleButton";
import { postSignup } from "../apis/auth";
import type { RequestSignupDto } from "../types/Auth";

function JoinPage() {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const randomNickname = `히로박스사용자${Math.floor(Math.random() * 1000)}`;

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors, touchedFields },
    } = useForm<JoinFormValues>({
        resolver: zodResolver(joinSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            name: randomNickname,
        },
    });

    const values = watch();

    const isEmailStepValid = values.email.trim() !== "" && !errors.email;
    const isPasswordStepValid =
        values.password.trim() !== "" &&
        values.passwordConfirm.trim() !== "" &&
        !errors.password &&
        !errors.passwordConfirm;
    const isNameStepValid = values.name.trim() !== "" && !errors.name;

    const fieldSets: (keyof JoinFormValues)[][] = [
        ["email"],
        ["password", "passwordConfirm"],
        ["name"],
    ];

    const stepValidity = [isEmailStepValid, isPasswordStepValid, isNameStepValid];
    const canProceed = stepValidity[currentStep] ?? false;
    const lastStepIndex = fieldSets.length - 1;

    const handleNext = async () => {
        const targets = fieldSets[currentStep] ?? [];
        const ok = await trigger(targets);
        if (ok) {
            setCurrentStep((prev) => Math.min(prev + 1, lastStepIndex));
        }
    };

    const onSubmit: SubmitHandler<JoinFormValues> = async ({ passwordConfirm, ...rest }) => {
        const payload: RequestSignupDto = {
            ...rest,
            avatar: "https://placehold.co/200x200?text=HERO",
        };

        try {
            const response = await postSignup(payload);
            if (response.status) {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            }
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handleActionClick = async () => {
        if (currentStep < lastStepIndex) {
            await handleNext();
            return;
        }

        await handleSubmit(onSubmit)();
    };

    const steps = [
        (
            <div key="email">
                <div className="flex flex-col gap-[4px]">
                    <input
                        {...register("email")}
                        className="
                            flex w-full px-[24px] py-[8px] rounded-3xl border border-white/20
                            bg-transparent text-white text-lg font-medium
                            focus:border-purple-300 focus:outline-none
                            placeholder:text-white/20
                            transition duration-300"
                        type="email"
                        placeholder="이메일"
                    />
                    {(touchedFields.email || values.email) && errors.email && (
                        <div className="text-sm text-red-400 h-5 ml-4">{errors.email.message}</div>
                    )}
                </div>
            </div>
        ),
        (
            <div key="password" className="flex flex-col gap-[12px]">
                <div className="relative flex items-center">
                    <input
                        {...register("password")}
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
                {(touchedFields.password || values.password) && errors.password && (
                    <div className="text-sm text-red-400 h-5 ml-4">{errors.password.message}</div>
                )}

                <div className="relative flex items-center">
                    <input
                        {...register("passwordConfirm")}
                        className="
                            flex w-full px-[24px] py-[8px] rounded-3xl border border-white/20
                            bg-transparent text-white text-lg font-medium
                            focus:border-purple-300 focus:outline-none
                            placeholder:text-white/20
                            transition duration-300
                            pr-12"
                        type={showPasswordConfirm ? "text" : "password"}
                        placeholder="비밀번호 확인"
                    />
                    <PasswordToggleButton
                        isVisible={showPasswordConfirm}
                        onToggle={() => setShowPasswordConfirm((prev) => !prev)}
                    />
                </div>
                {(touchedFields.passwordConfirm || values.passwordConfirm) && errors.passwordConfirm && (
                    <div className="text-sm text-red-400 h-5 ml-4">{errors.passwordConfirm.message}</div>
                )}
            </div>
        ),
        (
            <div key="name" className="flex flex-col gap-[4px]">
                <input
                    {...register("name")}
                    className="
                        flex w-full px-[24px] py-[8px] rounded-3xl border border-white/20
                        bg-transparent text-white text-lg font-medium
                        focus:border-purple-300 focus:outline-none
                        placeholder:text-white/20
                        transition duration-300"
                    type="text"
                    placeholder="닉네임"
                />
                {(touchedFields.name || values.name) && errors.name && (
                    <div className="text-sm text-red-400 h-5 ml-4">{errors.name.message}</div>
                )}
            </div>
        ),
    ];

    return (
        <div className="flex min-h-screen justify-center items-start pt-[200px]">
            <form onSubmit={(e) => { e.preventDefault(); handleActionClick(); }} className="flex flex-col max-w-[440px] w-full px-[48px] py-[48px] items-center gap-[48px] bg-black/50 rounded-3xl drop-shadow-lg">
                {currentStep !== 2 ? (
                    <>
                        <AuthHeader text="계정 만들기" />
                        <SigninToGoogleButton />
                        <DividerWithText text="또는" />
                    </>
                ) : (
                    <AuthHeader text="거의 다 왔습니다!" />
                )}

                <div className="flex flex-col w-full gap-[16px] transition duration-300">
                    {currentStep === 2 ? steps.slice(2, 3) : steps.slice(0, currentStep + 1)}
                    <LabelWithButton
                        label="이미 히로박스의 회원이신가요?"
                        buttonText="로그인"
                        onClick={() => (window.location.href = "/login")}
                    />
                </div>

                <button
                    type="button"
                    disabled={!canProceed}
                    onClick={handleActionClick}
                    className="
                        flex w-full items-center justify-center px-[24px] py-[8px] rounded-3xl 
                        bg-purple-600 text-white text-lg font-medium
                        opacity-80
                        hover:opacity-100
                        transition duration-300
                        disabled:cursor-not-allowed disabled:opacity-20"
                >
                    계속
                </button>
            </form>
        </div>
      );
}

export default JoinPage;
