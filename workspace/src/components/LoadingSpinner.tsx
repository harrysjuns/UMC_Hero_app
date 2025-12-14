const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="size-12 animate-spin border-8 border-white/10 border-t-white rounded-full"> 
                <span className="sr-only"> Loading... </span>
            </div>
            <p className="text-white text-lg font-medium"> Loading... </p> 
        </div>
    )
}

export { LoadingSpinner };