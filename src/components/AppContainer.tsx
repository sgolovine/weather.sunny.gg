import type { ReactNode } from "react";

const AppContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl text-center">Weather</h1>
      {children}
    </div>
  );
};

export default AppContainer;
