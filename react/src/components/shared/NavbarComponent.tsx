import { MenuIcon, SparklesIcon } from "lucide-react";
import { useAuthStore } from "../../stores/auth";
import { Link } from "react-router";

export default function NavbarComponent() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-stone-900/40 flex justify-center backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Codebox</span>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-6 md:mr-16">
          <nav className="flex items-center gap-6">
            <Link to="#" className="text-sm font-medium hover:text-primary">
              Components
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              Challenges
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              {" "}
              Creators{" "}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            
              <details className="dropdown">
                <summary className="">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 bg-stone-800">
                      <img
                        src={"https://robohash.org/" + user?.email + ".png"}
                      />
                    </div>
                  </div>
                </summary>
                <ul className="menu dropdown-content  rounded-box  w-52 p-2 shadow-sm  bg-base-100  z-1  ">
                  <li>
                    <a href="#">My profile</a>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </details>
             
          ) : (
            <>
              <Link to="/login" className="hidden md:flex btn btn-outline">
                Sign In
              </Link>

              <Link
                to="/register"
                className="hidden btn btn-primary font-bold md:flex"
              >
                Sign Up
              </Link>
            </>
          )}

          <button className="md:hidden btn btn-ghost btn-circle">
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
