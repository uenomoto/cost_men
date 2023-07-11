import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const LoginButton = ({ children }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full inline-flex items-center ease-in transition-all"
    >
      <svg
        className="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21h-7Zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5l-5 5Z"></path>
      </svg>
      <span>{children}</span>
    </button>
  );
};

export default LoginButton;
