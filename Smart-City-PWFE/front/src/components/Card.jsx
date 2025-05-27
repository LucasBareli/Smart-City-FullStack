import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      {children}
    </div>
  );
};
