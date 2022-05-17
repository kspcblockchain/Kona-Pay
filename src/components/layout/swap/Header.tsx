import React from "react";
import Vecotr from "../../assets/icon/Vector.png";

interface HeaderInterface {
  name: string;
}

const Header: React.FC<HeaderInterface> = ({ name }) => {
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
          <span>{name}</span>
        </p>
      </div>
    </div>
  );
};
export default Header;
