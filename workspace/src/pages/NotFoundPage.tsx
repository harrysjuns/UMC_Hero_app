function NotFoundPage() {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <span className="text-red-400 text-2xl font-medium"> 404 Not Found </span>
            <button 
                className="mt-8 px-8 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition" 
                onClick={() => window.location.href = '/'}
            > 
                홈으로 이동
            </button>
        </main>
    );
}

export default NotFoundPage;
