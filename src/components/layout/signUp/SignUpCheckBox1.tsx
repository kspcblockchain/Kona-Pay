// import "./Layout.css";
import React from "react";

const SignUpCheckBox2: React.FC = () => {
  return (
    <div
      className="box-init"
      style={{
        marginBottom: "5%",
        width: "90%",
        height: "15%",

        justifyContent: "flex-start",
      }}
    >
      <div style={{ height: "100%", lineHeight: "100%", marginLeft: "2.5%", marginRight: "2.5%" }}>
        <input type="checkbox" id="모두" />
      </div>
      <div>
        <label htmlFor="모두" style={{ fontSize: "20px", color: "black" }}>
          모두 동의하기
        </label>
      </div>
    </div>
  );
};
export default SignUpCheckBox2;
