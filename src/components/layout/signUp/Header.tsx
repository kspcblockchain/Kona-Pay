import { IonIcon } from "@ionic/react";
import { chevronBackCircle, chevronBackOutline } from "ionicons/icons";
import React from "react";
import Vector from "../../../assets/icon/Vector.png";

interface HeaderInterface {
  name: string;
}

const Header: React.FC<HeaderInterface> = ({ name }) => {
  const backLocation = () => {
    window.history.back();
  };
  return (
    <div
      style={{
        // backgroundColor: "green",
        margin: "5%",
        height: "50%",
        width: "100%",
      }}
    >
      <div className="box-init" style={{ height: "100%", color: "black", justifyContent: "flex-start", fontSize: "20px" }}>
        <IonIcon icon={chevronBackOutline} size="large" onClick={backLocation}  color='dark'></IonIcon>
        {name}
      </div>
    </div>
  );
};
export default Header;
