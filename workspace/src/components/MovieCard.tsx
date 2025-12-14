import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
    order?: number;
    onSelect?: (movie: Movie) => void;
}

function MovieCard({ movie, order, onSelect }: MovieCardProps) {
    const navigate = useNavigate();

    const title = movie.title.length > 16 ? `${movie.title.slice(0, 16)}···` : movie.title;
    const adult = (
        movie.adult ? 
            <span className="adultBadge">19</span> 
            : <span className="allBadge">All</span>
    );

    const overview = movie.overview?.trim() || "줄거리 정보가 없습니다.";

    // 모달로 상세를 띄울 때는 상위에서 onSelect 로 처리하고, 아니면 기존 상세 페이지로 이동한다
    const handleClick = () => {
        if (onSelect) {
            onSelect(movie);
            return;
        }
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div>
            
            <div 
                className="group relative h-72 w-48 overflow-hidden rounded-xl transition duration-300"
                onClick={handleClick}
            >

                <img
                    className="w-full h-full object-cover transition"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                />

                <div className="absolute top-0 p-4 text-3xl text-white font-medium italic drop-shadow-lg"> { order } </div>

                <div className="absolute inset-0 items-center flex flex-col bg-black/68 opacity-0 transition duration-700 group-hover:opacity-100 group-hover:backdrop-blur-sm">
                    <p className="p-4 text-white text-sm font-medium line-clamp-5"> {overview} </p>
                    
                    <div className="absolute bottom-0 w-full justify-end text-center p-4 gap-4">
                        <div className="h-[1px] w-full bg-white/10 mb-2" />
                        <span className="text-sm text-gray-300"> 관람평 </span>
                        <span className="text-2xl font-normal text-sky-400"> {(movie.vote_average.toFixed(1))} </span>
                    </div>
                </div>

            </div>

            <div className="group relative flex top-4 w-48 gap-2">
                <span className="font-bold"> {adult} </span>
                <span className="flex-1 text-white font-medium truncate"> {title} </span>
            </div>

            <div className="group relative flex top-6 h-8 w-48 gap-2 text-xs text-white/68">
                <span> 인기도 {movie.popularity.toFixed(0)} </span>
                <div className="h-4 w-px bg-white/15 mb-2" />
                <span> 개봉일 {movie.release_date} </span>
            </div>

        </div>
    );

}

export default MovieCard;
export const MemoMovieCard = memo(MovieCard);
