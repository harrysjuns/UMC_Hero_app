import { NavLink } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/Key";

const AUTHS_LINKS = [
  {
    to: "/login",
    label: "로그인",
    className: "items-center justify-center text-purple-300 hover:bg-purple-400/10"
  },
  {
    to: "/join",
    label: "회원 가입",
    className: "items-center justify-center bg-purple-800 text-white hover:bg-purple-400"
  },
];

const USER_LINKS = [
  {
    to: "/login",
    label: "로그인",
    className: "text-purple-300 hover:bg-purple-400/10"    
  },
];

const MOVIE_LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중  " },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

function NavBar() {
    const hasAccessToken =
      typeof window !== "undefined" &&
      Boolean(localStorage.getItem(LOCAL_STORAGE_KEY.accessToken));

    return (
      <nav className="flex z-50 top-0 h-16 w-full items-center justify-center bg-black/68 backdrop-blur-sm">

        <span className="absolute left-8 flex items-start gap-4">
          
          {MOVIE_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 hover:underline transition duration-300 ${
                  isActive ? "text-base text-purple-400 font-bold" : "text-sm text-white font-medium"
                }`
              } 
            >
              {label}
            </NavLink>
          ))}

        </span>

        <span className='absolute text-4xl font-bold text-white'> 🎬 HEROBOX </span>

        <span className="absolute right-8 flex items-start gap-4">
          
          {hasAccessToken ? (
            <NavLink
              to="/mypage"
              className={({ isActive }) =>
                [
                  "px-4 py-2 rounded-lg transition duration-300",
                  isActive ? "font-bold" : "font-medium",
                  "bg-purple-800 text-white hover:bg-purple-400",
                ].join(" ")
              }
            >
              마이페이지
            </NavLink>
          ) : (
            AUTHS_LINKS.map(({ to, label, className }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "px-4 py-2 rounded-lg transition duration-300",
                    isActive ? "font-bold" : "font-medium",
                    className,
                  ].join(" ")
                }              
              >
                {label}
              </NavLink>
            ))
          )}

        </span>        

      </nav>
    );
}

export default NavBar;
