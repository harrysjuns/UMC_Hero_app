import { useCallback, useState, type FormEvent } from "react";

import { MemoMovieCard } from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { Movie } from "../types/movie";

import useMovies from "../hooks/useMovies";

function MoviePage() {
  const [titleInput, setTitleInput] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");
  // 카드를 눌렀을 때 모달로 보여줄 영화 정보를 따로 기억해둔다
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    includeAdult: false,
    language: "ko-KR",
  });

  // 검색 옵션은 useMovies 훅 안에서 페이징을 초기화해야 해서 별도 상태로 넘긴다
  const { movies, isPending, setIsPending, isError, setPage } = useMovies({
    query: searchOptions.query,
    includeAdult: searchOptions.includeAdult,
    language: searchOptions.language,
  });

  // 모달을 열 때 사용하는 핸들러를 메모이제이션해서 카드 리스트 리렌더를 줄인다
  const handleSelectMovie = useCallback((clickedMovie: Movie) => {
    setSelectedMovie(clickedMovie);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = titleInput.trim();
    setSearchOptions({
      query: trimmed,
      includeAdult,
      language,
    });
  };

  if (isError) {
    return (
      <div className="flex justify-center">
        <span className="text-red-400 text-2xl font-medium"> 오류가 발생했습니다. </span>
      </div>
    );
  }

  return (
    <main className="flex flex-col p-8 items-center gap-10">
      <section className="w-full max-w-5xl rounded-2xl bg-white/5 p-6 shadow-lg shadow-purple-900/20 border border-white/10">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end"
          onSubmit={handleSubmit}
        >
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-white/80">
              영화 제목
            </label>
            <input
              className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="text"
              value={titleInput}
              onChange={(event) => setTitleInput(event.target.value)}
              placeholder="영화 제목을 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white/90">
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input
                className="size-4 accent-purple-500"
                type="checkbox"
                checked={includeAdult}
                onChange={(event) => setIncludeAdult(event.target.checked)}
              />
              성인 콘텐츠 포함
            </label>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-white/70">언어</span>
              <select
                className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                <option value="ko-KR">한국어 (ko-KR)</option>
                <option value="en-US">영어 (en-US)</option>
                <option value="ja-JP">일본어 (ja-JP)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 px-6 py-3 text-white font-semibold shadow-md shadow-purple-900/40 transition hover:bg-purple-500 sm:col-span-3 sm:w-auto sm:justify-self-end"
          >
            검색
          </button>
        </form>
      </section>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-16 sm:grid-cols-4 lg:grid-cols-4">
          {movies.map((movie, index) => (
            <MemoMovieCard
              key={movie.id}
              order={index + 1}
              movie={movie}
              onSelect={handleSelectMovie}
            />
          ))}
        </div>
      </div>
      
      <button 
        className="mt-8 mb-16 px-[114px] py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition disabled:cursor-not-allowed disabled:opacity-60" 
        onClick={() => { setPage((prev) => prev + 1); setIsPending(true); }}
        disabled={isPending}
      > 
        더보기 
      </button>

      <div className="mb-16"> {isPending && <LoadingSpinner />} </div>

      {selectedMovie && (
        <MovieModal
          movieId={selectedMovie.id}
          language={searchOptions.language}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}

export default MoviePage;
