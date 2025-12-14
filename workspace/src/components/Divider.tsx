export function DividerWithText({ text }: { text: string }) {
    return (
        <div className="flex items-center w-full">
            <div className="flex-1 h-[1px] bg-white/10"></div>
                <span className="px-4 text-sm text-white/50"> {text} </span>
            <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>
    );
}