import { LoadingSpinner } from "../components/LoadingSpinner";

import useDetails from "../hooks/useMovieDetails";
import ProfileListSection from "../components/ProfileListSection";

function MovieDetailPage() {

    const { isPending, isError, details, credits, directors } = useDetails();

    if (isError) {
        return (
            <div className="flex justify-center">
                <span className="text-red-400 text-2xl font-medium"> 오류가 발생했습니다. </span>
            </div>
        )
    }

    return (
        <>
            <section className="mt-[2px] bg-black">
                <div className="relative mx-auto w-full max-w-[1280px] max-h-[512px] overflow-hidden">
            
                    <img
                        className="w-full object-cover"
                        src={`https://image.tmdb.org/t/p/w1280${details?.backdrop_path}`}
                        alt={`${details?.title} backdrop`}
                    />
                    
                    <div className="absolute inset-0 bg-black/68 backdrop-blur-sm" />

                    <div className="absolute inset-y-16 left-0 flex flex-col items-start"> 
                        <h1 className="text-5xl text-white font-medium "> {details?.title ?? "제목 없음"} </h1>
                        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-lg font-medium text-white/80"> 
                            🤍 {details?.vote_count} 
                        </div>
                    </div>

                    <div className="absolute bottom-[96px] left-0 flex items-end gap-[48px]">
                        <div className="flex flex-col items-center justify-center text-center gap-[16px]"> 
                            <p className="text-lg text-gray-300"> 관람평 </p>
                            <div className="flex items-center gap-[8px] text-4xl font-normal text-sky-400">
                                <span className="text-4xl opacity-60">🤔</span>
                        <span>{details?.vote_average != null ? details.vote_average.toFixed(1) : "-"}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-[16px]"> 
                            <p className="text-lg text-gray-300"> 인기도 </p>
                            <div className="flex items-center gap-[8px] text-4xl font-normal text-white/80">
                                <span className="text-4xl opacity-60">📈</span>
                                <span>{details?.popularity != null ? details.popularity.toFixed(0) : "-"}</span>
                            </div>
                        </div>                        
                    </div>
                                        
                    <div className="absolute inset-y-12 right-12 flex flex-col items-start">
                        <img
                            className="w-[260px] h-[374px] overflow-hidden rounded-xl transition duration-300"
                            src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
                            alt={`${details?.title} backdrop`}
                        />
                    </div>

                </div>
            </section>

            <section className="mt-[48px] mx-auto w-full max-w-[1280px] flex flex-col">
                <h2 className="mb-[16px] text-xl text-white/68 font-medium"> {details?.original_title ?? "제목 없음"} </h2>
                <div className="mb-[48px] max-w-[720px] text-white text-sm font-medium"> {details?.overview ?? "줄거리 정보가 없습니다."} </div>

                <div className="flex flex-col relative mb-[48px] gap-[8px] text-white text-sm font-medium">
                    <div> 
                        <span className="text-white/68 font-bold"> 장르: </span>
                        {details?.genres?.map((genre) => genre.name)?.join(", ") ?? "정보 없음"}
                    </div>
                    <div> 
                        <span className="text-white/68 font-bold"> 제작 국가: </span>
                        {details?.production_countries?.map((country) => country.name)?.join(", ") ?? "정보 없음"}
                    </div>
                    <div> 
                        <span className="text-white/68 font-bold"> 개봉일: </span>
                        {details?.release_date ?? "정보 없음"}
                    </div>
                    <div> 
                        <span className="text-white/68 font-bold"> 상영 시간: </span>
                        {details?.runtime != null ? `${details.runtime}분` : "정보 없음"}
                    </div>
                    <div> 
                        <span className="text-white/68 font-bold"> 제작사: </span>
                        {details?.production_companies?.map((company) => company.name)?.join(", ") ?? "정보 없음"}
                    </div>
                </div>
            </section>
            <ProfileListSection title="감독" items={directors} />

            <ProfileListSection
                title="출연"
                items={credits}
                layout="grid"
                className="mb-[96px]"
            />

            <div className="flex w-full justify-center"> {isPending && <LoadingSpinner />} </div>
            
        </>
    );
}
 
export default MovieDetailPage;
