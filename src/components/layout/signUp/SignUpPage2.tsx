import "./SignUpPageLayout.css";
import React, { useState } from "react";
import Header from "./Header";
import SignUpHeaderGrid1 from "./SignUpHeaderGrid1";
import SignUpHeaderGrid2 from "./SignUpHeaderGrid2";
import SignUpTextArea from "./SignUpTextArea";
import SignUpCheckBox3 from "./SignUpCheckBox3";
import { IonApp, IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const SignUpPage2: React.FC = () => {
  const history = useHistory();

  const prevHistoryFunction = () => {
    history.push({ pathname: "/signuppage3", state: userType });
  };

  const [userType, setUserType] = useState("");

  const onChange = (e: any) => {
    setUserType(e.target.value);
  };

  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <div className="grid-init grid">
            <IonHeader>
              <IonItem>
                <IonItem button onClick={() => history.goBack()}>
                  <IonIcon icon={chevronBack}  color='dark'></IonIcon>
                </IonItem>
                <IonTitle>회원가입</IonTitle>
              </IonItem>
            </IonHeader>
            <div className="box-init box" style={{ height: "7.5%" }}>
              <SignUpHeaderGrid1></SignUpHeaderGrid1>
              <SignUpHeaderGrid2 tag={"● ○ ●"}></SignUpHeaderGrid2>
            </div>
            <div className="box-init" style={{ height: "30%" }}>
              <SignUpTextArea></SignUpTextArea>
            </div>
            <div className="box-init box" style={{ height: "55%", flexDirection: "column" }}>
              <div
                className="box-init"
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  height: "70%",
                  paddingTop: "2.5%",
                }}
              >
                {/* <SignUpCheckBox3 value={1} description="일반유저"></SignUpCheckBox3>
                <SignUpCheckBox3 value={2} description="판매자"></SignUpCheckBox3> */}

                <IonRadioGroup style={{ width: "90%", margin: "10% 0 0 0" }}>
                  <IonItem className="box-init" style={{ marginBottom: "5%", height: "35%", border: "1px solid black" }}>
                    <IonLabel>일반유저</IonLabel>
                    <IonRadio slot="start" value="U" onClick={onChange} />
                  </IonItem>

                  <IonItem className="box-init" style={{ marginBottom: "5%", height: "35%", border: "1px solid black" }}>
                    <IonLabel>판매자</IonLabel>
                    <IonRadio slot="start" value="S" onClick={onChange} />
                  </IonItem>
                </IonRadioGroup>
              </div>
              <div className="box-init" style={{ height: "40%", width: "100%", flexDirection: "column", justifyContent: "flex-start" }}>
                <button className="box-init" style={{ height: "25%", width: "65%", color: "gray", border: "none" }} onClick={prevHistoryFunction} disabled={userType === ""}>
                  다음
                </button>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default SignUpPage2;
