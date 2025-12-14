export default function ScrollToTopButton() {

    return (
        <button 
          className="px-4 py-4 text-white bg-white/10 hover:bg-white/20 rounded-lg transition ml-4"
          onClick={() => { scrollTo({ top: 0, behavior: 'smooth' }); }} 
        > 
          TOP 
        </button>  
    )
}


export function MoveToHomeButton() {
  return (
    <button 
      className="
        absolute left-6 text-white text-lg font-medium flex items-center gap-2 
        transition duration-300 hover:bg-purple-300/10 hover:text-white px-2 py-1 rounded-3xl"

      onClick={() => window.location.href = "/"}
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>

    </button>
  )
}

export function MoveToBackButton() {
  return (
    <button 
      className="
        absolute left-6 text-white text-lg font-medium flex items-center gap-2 
        transition duration-300 hover:bg-purple-300/10 hover:text-white px-2 py-1 rounded-3xl"

      onClick={() => window.location.href = "/"}
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>

    </button>
  )
}


export function SigninToGoogleButton() {
  const handleGoogleSignin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  }
  return (
    <button
        onClick={handleGoogleSignin}
        className="
            flex w-full items-center justify-center px-[24px] py-[8px] rounded-3xl 
            border border-white/20
            text-white text-medium font-medium
            hover:bg-gray-800
            transition duration-300 gap-2"
    > 
        <img 
            src="/public/Google_Symbol.svg"
            alt="Google Icon" 
            className="w-6 h-6"
        />
        Google 계정으로 로그인
    </button>
  )
}

export function LabelWithButton ({ label, buttonText, onClick }: { label: string, buttonText: string, onClick: () => void }) {
  return (
    <div className="flex justify-start w-full px-[16px] gap-[4px]">
      <span className="text-sm text-white/50"> {label} </span>
      <button 
          className="text-sm text-purple-400/80 hover:text-white self-end transition duration-300"
          onClick={(onClick)}
      > 
          {buttonText} 
      </button>
    </div>
  )
}
