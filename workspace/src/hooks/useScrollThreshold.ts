import { useEffect, useState } from "react";

export function useScrollThreshold() {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(window.scrollY > 200);
        };
        
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 초기값 설정
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return isScrolling;
}
