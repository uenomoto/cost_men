import React, { ReactNode } from "react";
import { RedirectLoginOptions } from "@auth0/auth0-react";

interface ButtonProps {
  children: ReactNode;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
}

const LoginButton = ({ children, loginWithRedirect }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => loginWithRedirect()}
      className="bg-sky-500 hover:bg-blue-500 text-white text-xl lg:text-4xl font-medium py-3 px-5 lg:py-5 lg:px-7 rounded inline-flex items-center ease-in transition-all hover:shadow-lg hover:scale-105"
    >
      <svg
        className="fill-current w-5 h-5 lg:w-10 lg:h-10 mr-2"
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
