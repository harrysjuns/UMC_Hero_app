import { useEffect, useState } from "react";
import axios from "axios";

import type { MovieDetail } from "../types/movie";
import { LoadingSpinner } from "./LoadingSpinner";

type MovieModalProps = {
    movieId: number;
    language: string;
    onClose: () => void;
};

function MovieModal({ movieId, language, onClose }: MovieModalProps) {
    const [details, setDetails] = useState<MovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // 모달이 열릴 때마다 해당 영화 상세를 불러온다 (언어가 바뀐 경우에도 재조회)
    useEffect(() => {
        let isCancelled = false;

        const fetchDetails = async (): Promise<void> => {
            setIsLoading(true);
            setIsError(false);
            try {
                const { data } = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=${language}`,
                    { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
                );
                if (!isCancelled) {
                    setDetails(data);
                }
            } catch {
                if (!isCancelled) {
                    setIsError(true);
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchDetails();

        return () => {
            isCancelled = true;
        };
    }, [movieId, language]);

    const imdbSearchUrl = details?.title
        ? `https://www.imdb.com/find?q=${encodeURIComponent(details.title)}`
        : "https://www.imdb.com";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-black text-white shadow-2xl shadow-black/40 ring-1 ring-white/10"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                    type="button"
                    onClick={onClose}
                >
                    닫기
                </button>

                <div className="relative h-72 w-full overflow-hidden">
                    {details?.poster_path ? (
                        <img
                            className="h-full w-full object-cover"
                            src={`https://image.tmdb.org/t/p/w780${details.poster_path}`}
                            alt={`${details.title} 포스터`}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-800 text-white/60">
                            포스터 이미지를 불러올 수 없습니다
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" />

                    <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">{details?.title ?? "제목 없음"}</h3>
                            <p className="text-sm text-white/70">{details?.original_title}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="rounded-full bg-white/10 px-3 py-1">⭐ {details?.vote_average?.toFixed(1) ?? "-"}</span>
                            <span className="rounded-full bg-white/10 px-3 py-1">개봉일 {details?.release_date ?? "-"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-6">
                    {isLoading && (
                        <div className="flex justify-center">
                            <LoadingSpinner />
                        </div>
                    )}

                    {isError && !isLoading ? (
                        <p className="text-center text-red-400">상세 정보를 불러오지 못했습니다.</p>
                    ) : null}

                    {!isLoading && !isError && (
                        <>
                            <p className="text-white/80 leading-relaxed">
                                {details?.overview || "줄거리 정보가 없습니다."}
                            </p>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex gap-3 text-sm text-white/70">
                                    <span>인기도 {details?.popularity?.toFixed(0) ?? "-"}</span>
                                    <span className="h-5 w-px bg-white/15" />
                                    <span>평점 참여 {details?.vote_count ?? 0}명</span>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                                        type="button"
                                        onClick={() => window.open(imdbSearchUrl, "_blank", "noopener")}
                                    >
                                        IMDb에서 검색하기
                                    </button>
                                    <button
                                        className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
