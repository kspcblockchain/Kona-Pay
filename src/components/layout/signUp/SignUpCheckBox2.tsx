// import "./Layout.css";
import React, { useEffect, useState } from "react";

interface SignUpCheckBox2Interface {
  forId: string;
  check: "필수" | "선택";
  description: string;
}

const SignUpCheckBox2: React.FC<SignUpCheckBox2Interface> = ({ forId, check, description }) => {
  return (
    <div
      className="box-init"
      style={{
        marginBottom: "5%",
        height: "12.5%",
        width: "90%",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <input type="checkbox" id={forId} style={{ marginLeft: "2.5%", marginRight: "2.5%" }} />
      <label
        htmlFor={forId}
        style={{
          fontSize: "14px",
          textAlign: "left",
          width: "70%",
        }}
      >
        [{check}] {description}
      </label>
      <div>
        <p style={{ fontSize: "14px", textAlign: "end" }}>
          <a href="www.naver.com">[상세보기]</a>
        </p>
      </div>
    </div>
  );
};
export default SignUpCheckBox2;
