import { useState } from "react";
import { Container, Logo, LogoutBtn, ToggleButton, Button } from "../index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Posts", slug: "/all-posts", active: authStatus },
    { name: "Create Post", slug: "/add-post", active: authStatus },
  ];

  const activeNavItems = navItems.filter((item) => item.active);

  const handleNavClick = (slug) => {
    navigate(slug);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-md border-b border-gray-200 dark:border-gray-700 py-4 sticky top-0 z-50 transition-colors duration-300">
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <div className="mr-auto">
            <Link to="/">
              <Logo className="h-9 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-2">
            {activeNavItems.map((item) => (
              <li key={item.name}>
                <Button
                  onClick={() => navigate(item.slug)}
                  bgColor={location.pathname === item.slug ? "bg-indigo-600" : "bg-transparent"}
                  textColor={location.pathname === item.slug ? "text-white" : "text-gray-600 dark:text-gray-300"}
                  classname={`text-md font-medium rounded-full transition-all duration-200 ${
                    location.pathname !== item.slug
                      ? "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "shadow-md"
                  }`}
                >
                  {item.name}
                </Button>
              </li>
            ))}

            {authStatus && (
              <li className="ml-2 border-l border-gray-200 dark:border-gray-700 pl-2">
                <LogoutBtn className="px-4 py-2 rounded-full text-md font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200" />
              </li>
            )}
          </ul>

          {/* Right side: Login (always visible) + Toggle + Hamburger */}
          <div className="flex items-center gap-2 ml-4">
            {/* Login — always visible when logged out */}
            {!authStatus && (
              <Button
                onClick={() => navigate("/login")}
                children="Login"
                bgColor={location.pathname === "/login" ? "bg-indigo-600" : "bg-transparent"}
                textColor={location.pathname === "/login" ? "text-white" : "text-gray-600 dark:text-gray-300"}
                classname={`text-sm font-medium rounded-full transition-all duration-200 ${
                  location.pathname !== "/login"
                    ? "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "shadow-md"
                }`}
              >
              </Button>
            )}

            {/* ToggleButton always visible */}
            <ToggleButton />

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-2 border-t border-gray-200 dark:border-gray-700">
            <ul className="flex flex-col gap-1 pt-3">
              {activeNavItems.map((item) => (
                <li key={item.name}>
                  <Button
                    onClick={() => handleNavClick(item.slug)}
                    bgColor={location.pathname === item.slug ? "bg-indigo-600" : "bg-transparent"}
                    textColor={location.pathname === item.slug ? "text-white" : "text-gray-600 dark:text-gray-300"}
                    classname={`w-full text-left text-sm font-medium rounded-lg transition-all duration-200 ${
                      location.pathname !== item.slug
                        ? "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        : "shadow-md"
                    }`}
                  >
                    {item.name}
                  </Button>
                </li>
              ))}

              {authStatus && (
                <li className="mt-1 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <LogoutBtn className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200" />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}