import type { CommonResponse } from "./common";

// 회원가입 API 요청 타입
export type RequestSignupDto = {
    name : string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
  
    /*{
    "name": "매튜",
    "email": "dydals3440@gmail.com",
    "bio": "안녕하세요. 저는 매튜입니다.",
    "avatar": "https://avatars.githubusercontent.com/u/55682610?v=4",
    "password": "Smu123!!"
    } */ 
}

export type ResponseSignupDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;  
    createdAt: Date;
    updatedAt: Date;
}>

 
// 로그인 API 요청/응답 타입
export type RequestSigninDto = {
    email: string;
    password: string;
}

export type ResponseSigninDto = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>



// MyInfo API 응답 타입
export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar: string;  
    createdAt: Date;
    updatedAt: Date;
}>
