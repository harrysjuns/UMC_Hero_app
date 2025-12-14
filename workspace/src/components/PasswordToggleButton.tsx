type PasswordToggleButtonProps = {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
};

function PasswordToggleButton({ isVisible, onToggle, className }: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
      className={`absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition ${className ?? ""}`}
    >
      {isVisible ? 
      <img src="/public/visibility_Filled.svg" alt="visibility" className="w-6 h-6" style={{ filter: "invert(80%)" }} /> 
      : <img src="/public/visibility_off_Filled.svg" alt="visibility_off" className="w-6 h-6" style={{ filter: "invert(80%)" }} />}
    </button>
  );
}

export default PasswordToggleButton;
