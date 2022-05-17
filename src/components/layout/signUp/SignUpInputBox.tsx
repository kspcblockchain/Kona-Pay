// import "./Layout.css";
import React from "react";

interface SignUpInputBoxInterface {
  name: string;
  checkValue: boolean;
  placeHolder: string;
  state: any;
  setState: any;
  id:string;
  checkIsDup?: any;
  isDup? : any;
}

const SignUpInputBox: React.FC<SignUpInputBoxInterface> = ({ id, name, checkValue, placeHolder, state, setState, checkIsDup, isDup }) => {
  return (
    <div className="box-init inputLayout" style={{ border: "1px solid black", width: "90%", flexDirection: "column", height: "12.5%", marginTop: "2%" }}>
      <div className="box-init" style={{ height: "50%", width: "100%" }}>
        <div className="box-init" style={{ width: "50%", height: "90%", fontSize: "16px", fontWeight: "bold" }}>
          <p style={{ color: "black", textAlign: "start", width: "80%" }}>{name}</p>
        </div>
        <div className="box-init" style={{ width: "50%", height: "90%", fontSize: "14px" }}>
          {checkValue ? <a onClick={()=>checkIsDup(id)}>[중복확인]</a> : null}
        </div>
      </div>
      <div className="box-init" style={{ width: "100%", height: "50%", marginBottom: "1.25%" }}>
        <input 
          id={id} 
          type={name.includes("비밀번호") ? "password" : "text"} 
          maxLength={id!=='email' ?15 : 100}
          placeholder={placeHolder} 
          style={{ width: "90%", height: "90%", border: "none", fontSize: "18px" }} 
          value={state[id]} 
          onChange={(e)=>{setState({...state,[e.target.id]:e.target.value})}} 
          disabled={isDup?  isDup[id]: false}
        />
      </div>
    </div>
  );
};
export default SignUpInputBox;
