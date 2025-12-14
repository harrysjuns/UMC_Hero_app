import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import type { Movie } from "../types/movie";

function useCategories() {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Movie[]>([]);
  
    const fetchedPages = useRef(new Set<number>());
  
    const { category } = useParams<{ category: string }>();
  
    useEffect(() => {
      setMovies([]);
      setPage(1);
      fetchedPages.current.clear();
    }, [category]);

    return { category, movies, setMovies, page, setPage, fetchedPages };
}

export default useCategories;