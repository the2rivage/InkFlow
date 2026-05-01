import { Container, Logo, LogoutBtn, ToggleButton } from "../index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Posts", slug: "/all-posts", active: authStatus },
    { name: "Create Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-md border-b border-gray-200 dark:border-gray-700 py-4 sticky top-0 z-50 transition-colors duration-300">
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <div className="mr-6">
            <Link to="/">
              <Logo className="h-9 w-auto" />
            </Link>
          </div>

          {/* Nav Links */}
          <ul className="flex ml-auto items-center gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 rounded-full text-md font-medium transition-all duration-200
                      ${
                        location.pathname === item.slug
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}

            {/* Logout */}
            {authStatus && (
              <li className="ml-2 border-l border-gray-200 dark:border-gray-700 pl-2">
                <LogoutBtn className="px-4 py-2 rounded-full text-md font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200" />
              </li>
            )}
            {/* Toggle */}
            <ToggleButton />
          </ul>
        </nav>
      </Container>
    </header>
  );
}
