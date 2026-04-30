import { forwardRef, useId } from "react";

function Select({ options, label, classname = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-2 pl-1 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-lg text-sm
          bg-gray-50 dark:bg-gray-900
          text-gray-900 dark:text-gray-100
          border border-gray-200 dark:border-gray-700
          focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500
          transition-colors duration-200
          ${classname}`}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);