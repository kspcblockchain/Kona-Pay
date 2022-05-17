import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonItem, IonIcon, IonRow, IonCol, IonLabel, IonInput, IonButton, useIonModal, useIonAlert } from "@ionic/react";

import React, { useState } from "react";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { useHistory } from "react-router";
import { chevronBack, personCircle } from "ionicons/icons";
import Signin from "../../../model/user/signin";
import konaPayLogo from "../../../assets/icon/konaPay_Logo.png"

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const Login: React.FC = () => {

    const [paste] = useIonAlert()

  const [content, setContent] = useState({
    uid: "",
    password: ""
  });

  const onChange = (e: any) => {
    setContent({ ...content, [e.target.id]: e.target.value });
  };

  const history = useHistory();

  const prevHistoryFunction = () => {
    history.push("/signuppage1");
  };

  const login = async () => {
    try{
      const {uid, password} = content
      let res = await Signin.signin(uid, password)
      sessionStorage.setItem("accessToken",res.accessToken)
      sessionStorage.setItem("checkSum",res.checkSum)
      sessionStorage.setItem("uid",res.uid)
      
      const link = document.createElement('a');
      link.href = "/"
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    catch{
        paste('아이디 혹은 패스워드가 잘못되었습니다.')
    }
    
}


  return (
    <IonApp>
      <IonPage className="ion-page" id="main-content">
        <IonContent className="ion-padding">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Login</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonRow>
              <IonCol>
                <div style={{display:'flex', justifyContent:'center', marginTop:'15%'}}>
                  <img src={konaPayLogo} alt="" style={{ width:"70px" }}/>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> id</IonLabel>
                  <IonInput type='text' id="uid" value={content.uid} onIonChange={onChange} >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> password</IonLabel>
                  <IonInput type="password" id="password" value={content.password} onIonChange={onChange} >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block"  onClick={login}>
               
                  Login
                </IonButton>
                <p style={{ fontSize: "medium" }}>
                  Don't have an account? <a onClick={prevHistoryFunction}>Sign up!</a>
                </p>
              </IonCol>
            </IonRow>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Login;
