import { useDispatch, useSelector } from "react-redux";
import { light, dark } from "../store/themeSlice";
import { useEffect } from "react";

export default function ToggleButton() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.themeMode);

  const btnHandler = () => {
    if (themeMode === "dark") {
      dispatch(light());
    } else {
      dispatch(dark());
    }
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <div className="flex items-center gap-2">
      {/* Toggle Track */}
      <button
        role="switch"
        aria-checked={themeMode === "dark"}
        onClick={btnHandler}
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none
          ${themeMode === "dark" ? "bg-indigo-600" : "bg-gray-300"}`}
      >
        {/* Toggle Thumb */}
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
            ${themeMode === "dark" ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
