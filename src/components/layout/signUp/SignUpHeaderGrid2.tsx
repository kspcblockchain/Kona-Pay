// import "./Layout.css";

import React from "react";

interface SignUpHeaderGirdInterface {
  tag: string | null;
}
const SignUpHeaderGrid: React.FC<SignUpHeaderGirdInterface> = ({ tag }) => {
  return (
    <div
      style={{
        marginRight: "5%",
        height: "100%",
        width: "90%",
        color: "gray",
        textAlign: "right",
      }}
    >
      <p>{tag}</p>
    </div>
  );
};
export default SignUpHeaderGrid;
