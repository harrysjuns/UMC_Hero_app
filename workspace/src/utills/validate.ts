import { z } from "zod";

export type UserSigninInformations = {
    email: string;
    password: string;
};
export type UserSignupInformations = UserSigninInformations & { 
    name: string; 
    passwordConfirm: string 
};

function validateUser(values: UserSigninInformations) {
    const errors = {
        email: "",
        password: "",
    };

    // 이메일 유효성 검사
    if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test (
        values.email
    )) {
        errors.email = "올바른 이메일 형식이 아닙니다. explain@example.com";
    } 

    // 비밀번호 유효성 검사
    if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "비밀번호는 최소 8 에서 20자 사이어야 합니다.";
    }

    return errors;
}
export default validateUser;


// 로그인 폼 유효성 검사
function validateSignin(values: UserSigninInformations) {
    return validateUser(values);
}
export { validateSignin };


// 회원가입 폼 유효성 검사
function validateSignup(values: UserSignupInformations) {
    const errors = {
        email: "",
        password: "",
        name: "",
        passwordConfirm: "",
    };
    // 이메일 유효성 검사
    if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test (
        values.email
    )) {
        errors.email = "올바른 이메일 형식이 아닙니다. explain@example.com";
    } 

    // 비밀번호 유효성 검사
    if (values.password.trim() === "") {
        errors.password = "비밀번호를 입력해주세요.";
    }
    else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "비밀번호는 최소 8 에서 20자 사이어야 합니다.";
    }
    // 비밀번호 확인 유효성 검사
    if (values.passwordConfirm !== values.password) {
        errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    // 이름 유효성 검사
    if (!values.name.trim()) {
        errors.name = "이름을 입력해주세요.";
    }
    
      return errors;
}
export { validateSignup };

// react-hook-form과 연동할 회원가입 스키마
export const joinSchema = z
    .object({
        email: z.string().email("올바른 이메일 형식이 아닙니다."),
        password: z
            .string()
            .min(8, "비밀번호는 8자 이상이어야 합니다.")
            .max(20, "비밀번호는 20자 이하이어야 합니다."),
        passwordConfirm: z.string(),
        name: z.string().min(1, "닉네임을 입력해주세요."),
    })
    .refine((values) => values.password === values.passwordConfirm, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
    });

export type JoinFormValues = z.infer<typeof joinSchema>;
