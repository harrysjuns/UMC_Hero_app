import { Outlet, useLocation} from "react-router-dom";
import NavBar from "../components/NavBar";

import LandingPage from "../pages/HomePage";

function HomePage() {
    const { pathname } = useLocation();
    const isRoot = pathname === "/";

    return (
        <main>
            <nav className="sticky top-0 z-50">
                <NavBar />
            </nav>
            <section>
                {isRoot ? <LandingPage /> : null}
                <Outlet />
            </section>
        </main>
    );
}

export default HomePage;