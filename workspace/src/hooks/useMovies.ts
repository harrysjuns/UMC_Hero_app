import { useEffect, useState } from "react";
import axios from "axios";

import type { MovieResponse } from "../types/movie";

import useCategories from "./useCategories";

type MovieSearchOptions = {
    query: string;
    includeAdult: boolean;
    language: string;
};

function useMovies({ query, includeAdult, language }: MovieSearchOptions) {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const { category, movies, setMovies, page, setPage, fetchedPages } = useCategories();

    // 검색 조건이 바뀌면 페이지/목록을 초기화해서 새 검색 기준으로 가져오게 한다
    useEffect(() => {
        setMovies([]);
        setPage(1);
        fetchedPages.current.clear();
    }, [category, query, includeAdult, language, setMovies, setPage, fetchedPages]);
    
    useEffect(() => {
        const trimmedQuery = query.trim();

        // 카테고리 페이지가 아닌데 검색어도 없으면 호출할 필요 없음
        if (!category && !trimmedQuery) return;

        if (fetchedPages.current.size === 0 && page !== 1) return;

        const fetchMovies = async () : Promise<void> => {
            setIsPending(true);
            setIsError(false);
            try {
                if (fetchedPages.current.has(page)) return;
                fetchedPages.current.add(page);

                const endpoint = trimmedQuery
                    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(trimmedQuery)}&include_adult=${includeAdult}&language=${language}&page=${page}`
                    : `https://api.themoviedb.org/3/movie/${category}?language=${language}&page=${page}`;

                const { data } = await axios.get<MovieResponse>(
                    endpoint,
                    { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
                );
                setMovies((oldList) => {
                    const oldIds = new Set(oldList.map((item) => item.id));
                    const freshList = data.results.filter((item) => !oldIds.has(item.id));
                    return [...oldList, ...freshList];
                });
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchMovies();
    }, [page, category, query, includeAdult, language, fetchedPages, setMovies]);
  
  
    return { movies, isPending, setIsPending, isError, setPage };
  }
  
  export default useMovies;
