import { useDispatch, useSelector } from "react-redux";
import { light, dark } from "../../store/themeSlice";
import { useEffect } from "react";
import "./ToggleButton.css";
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
      <label className="theme-switch">
        <input
          type="checkbox"
          className="theme-switch__checkbox"
          onChange={btnHandler}
          checked={themeMode === "dark"} // 🔥 sync with Redux
        />

        <div className="theme-switch__container">
          <div className="theme-switch__clouds"></div>

          <div className="theme-switch__stars-container">
            {/* your SVG stays same */}
          </div>

          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
