import "./SignUpPageLayout.css";
import React from "react";
import Vecotr from "../../assets/icon/Vector.png";

interface HeaderInterface {
  name: string;
}
const SignUpHeader: React.FC<HeaderInterface> = ({ name }) => {
  return (
    <div
      style={{
        // backgroundColor: "green",
        margin: "5%",
        height: "50%",
        width: "100%",
      }}
    >
      <div style={{ height: "100%", lineHeight: "100%" }}>
        <p style={{ display: "block", color: "black", fontSize: "20px", height: "100%", lineHeight: "100%" }}>
          <img src={Vecotr} alt="Vector.png" style={{ marginRight: "5%" }} />
          <span>{name}[세로중앙정렬 필요]</span>
        </p>
      </div>
    </div>
  );
};
export default SignUpHeader;
