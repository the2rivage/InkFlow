export default function Button({
  children,  // text inside the button
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  classname = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-2xl ${bgColor} ${textColor} ${classname}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}