import { useSelector } from "react-redux";
export default function Logo() {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const darkUrl =
    "https://res.cloudinary.com/datjhn3ph/image/upload/w_150,h_70,c_fit/v1777721153/dark-Icon_umfiov.png";
  const lightUrl =
    "https://res.cloudinary.com/datjhn3ph/image/upload/w_150,h_70,c_fit/v1777545924/icon-lightTheme_t0hbwp.png";
  const currIcon = themeMode === "dark" ? darkUrl : lightUrl;
  return (
    <div className="h-10 w-auto mb-1">
      <img src={currIcon} alt="Logo" />
    </div>
  );
}
