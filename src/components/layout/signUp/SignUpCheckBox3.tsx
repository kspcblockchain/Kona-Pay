// import "./Layout.css";
import React from "react";

interface SignUpCheckBox3Interface {
  value: 1 | 2;
  description: "일반유저" | "판매자";
}

const SignUpCheckBox2: React.FC<SignUpCheckBox3Interface> = ({ value, description }) => {
  return (
    <div
      className="box-init"
      style={{
        marginBottom: "5%",
        width: "90%",
        height: "15%",
        border: "1px solid black",
        justifyContent: "flex-start",
      }}
    >
      <input type="radio" name="user" id={`user` + value} value={value} style={{ margin: "0 2.5% 0 2.5% " }} />
      <label htmlFor={`user` + value} style={{ fontSize: "20px", marginLeft: "2.5%" }}>
        {description}
      </label>
    </div>
  );
};
export default SignUpCheckBox2;
