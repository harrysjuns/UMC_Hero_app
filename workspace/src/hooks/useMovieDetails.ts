import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import type { MovieDetail, MovieCredit, CastMember, CrewMember } from "../types/movie";


function useDetails() {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    const params = useParams();
    const [details, setDetails] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<CastMember[]>([]);
    const [directors, setDirectors] = useState<CrewMember[]>([]);

    
    // 영화 상세 정보 가져오기
    useEffect(() => {
        const fetchDetails = async () : Promise<void> => {
          setIsPending(true);
          setIsError(false);
          try {
              const { data } = await axios.get<MovieDetail>(
                `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`,
                { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
              );
              setDetails(data);
          } catch {
            setIsError(true);
          } finally {
            setIsPending(false);
          }
        };
        fetchDetails();
    }, [params.movieId]);


    // 크레딧 정보 가져오기
    useEffect(() => {
        const fetchCredits = async () : Promise<void> => {
            setIsPending(true);
            setIsError(false);
            try {
                const { data } = await axios.get<MovieCredit>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=ko-KR`,
                    { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
                );
                setCredits(data.cast);
                const directorList = data.crew.filter((member) => member.job === "Director");
                setDirectors(directorList);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchCredits();
    }, [params.movieId]);

    return {isPending, isError, details, credits, directors};
}
 
export default useDetails;
