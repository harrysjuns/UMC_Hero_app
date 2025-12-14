import { MoveToHomeButton } from "./Buttons";

export function AuthHeader({ text }: { text: string }) {
    return (
        <header className="w-full flex justify-center items-center">
            <MoveToHomeButton />
            <h1 className="text-white text-4xl font-light"> {text} </h1>
        </header>   
    ) 
}
