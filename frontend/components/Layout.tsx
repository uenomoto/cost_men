import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex flex-col items-center text-center h-screen-100 min-h-screen-100 sm:w-full mx-auto">
      {children}
    </main>
  );
};
