/// <reference types="vite/client" />
// 이건 VITE_TMDB_KEY 라는 환경 변수가 존재함을 TypeScript에 알려줍니다. 
// 만약 다른 환경 변수를 추가로 사용하고 싶다면 여기에 추가해 주세요.
// 존재하면 어떤 효과가 있냐면 import.meta.env.VITE_TMDB_KEY 를 사용할 때
// TypeScript가 "이 변수는 문자열이야!" 라고 알게 됩니다.
// 만약 이 선언이 없으면 import.meta.env.VITE_TMDB_KEY 를 사용할 때
// TypeScript가 "이 변수는 존재할 수도 있고, 존재하지 않을 수도 있어!" 라고 생각합니다. 

interface ImportMetaEnv {
    readonly VITE_TMDB_KEY: string;
    readonly VITE_SERVER_API_URL: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv
} 