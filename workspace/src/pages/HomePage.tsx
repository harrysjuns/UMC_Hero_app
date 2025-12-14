function LandingPage() {
    return (
        <section className="mt-[2px] bg-black">
            <div className="relative mx-auto w-full max-w-[1280px] max-h-[800px] overflow-hidden">
                <video
                    className="w-full h-full object-cover"
                    src="/videos/dororong.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                {/*<div className="absolute inset-0 bg-black/68 backdrop-blur-sm" />*/}
            </div>
        </section>
    );
}

export default LandingPage;
