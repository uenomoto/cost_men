import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex flex-col items-center text-center py-3">
      {children}
    </main>
  );
};
