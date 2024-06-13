import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-white flex justify-center items-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-600 to-slate-950">
      {children}
    </div>
  );
};

export default AuthLayout;
