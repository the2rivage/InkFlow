import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 rounded-full text-md font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
    >
      Logout
    </button>
  );
}