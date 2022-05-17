import "./SignUpPageLayout.css";
import React, { useState } from "react";

import SignUpHeaderGrid1 from "./SignUpHeaderGrid1";
import SignUpHeaderGrid2 from "./SignUpHeaderGrid2";
import SignUpInputBox from "./SignUpInputBox";
import { IonBackButton, IonButtons, IonHeader, IonIcon, IonItem, IonRouterLink, IonTitle, IonToolbar, useIonAlert, IonCheckbox, IonLabel, IonApp, IonPage, IonContent, useIonToast, IonButton, IonModal } from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { chevronBack } from "ionicons/icons";
import Signup from "../../../model/user/signup";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const SignUpPage2: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [paste] = useIonAlert();
  const [present, dismiss] = useIonToast();

  

  const [registInfo, setRegistInfo] = useState({
    uid: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    emailAlarm: 0,
    messageAlarm: 0,
  });

  const [isDup, setIsDup] = useState({
    uid: false,
    email: false,
  });

  const locationFunction = () => {
    history.push({ pathname: "/login", state: {} });
  };

  const locationHome = () => {
    history.push({ pathname: "/", state: {} });
  };

  const regist = async () => {
    try {
      let { uid, password, name, email, emailAlarm, messageAlarm } = registInfo;
      let userType = "B";
      let res = await Signup.signup(uid, password, name, email, userType);
      return res;
    } catch (err) {
      // paste(err as any);
      return err;
    }
  };

  // let onlyEn = /^[A-Za-z][A-Za-z0-9]*$/;
  let regId = /^(?=.*[a-zA-z])(?=.*[0-9]).{3,15}$/;
  let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  let korean = /^[가-힣]+$/;

  const registButton = async () => {
    try {
      // if(!regId.test(registInfo.uid) || !onlyEn.test(registInfo.uid)){
      if (registInfo.uid === "") {
        throw "아이디는 글자수 3~15의 영문 숫자 조합이어야 합니다.";
      } else if (!isDup.uid) {
        throw "중복검사를 해주세요.";
      }
      // else if(!regId.test(registInfo.password) || !onlyEn.test(registInfo.password)){
      else if (registInfo.password === "") {
        throw "비밀번호는 글자수 3~15의 영문 숫자 조합이어야 합니다.";
      } else if (registInfo.password !== registInfo.passwordCheck) {
        throw "비밀번호가 다릅니다.";
      } else if (registInfo.name === "") {
        throw "이름을 입력해주세요";
      } else if (!regEmail.test(registInfo.email)) {
        throw "이메일을 입력해주세요";
      } else if (!isDup.email) {
        throw "중복검사를 해주세요.";
      } else {
        let res = await regist();
        if (!!res) {
          present('회원가입이 완료되었습니다.',1500)
          setTimeout(()=>{
            const link = document.createElement("a");
            link.href = "/";
            document.body.appendChild(link);
            link.click();
            link.remove();
          },1500)
        }
      }
    } catch (err) {
      paste(err as "");
    }
  };

  const checkIsDup = async (part: string) => {
    if (part === "email" && !regEmail.test(registInfo.email)) {
      paste("이메일을 입력해주세요");
      return;
      // } else if ((part === "uid" && !regId.test(registInfo.uid)) || !onlyEn.test(registInfo.uid)) {
    } else if (part === "uid" && false) {
      paste("아이디는 글자수 3~15의 영문 숫자 조합이어야 합니다.");
      return;
    }
    let res;
    try {
      res = await Signup[part as "uid"](registInfo[part as "uid"]);
    } catch (err) {
      res = undefined;
    }

    let text;
    if (part === "uid") {
      text = "아이디";
    } else {
      text = "이메일";
    }
    if (res) {
      setIsDup({ ...isDup, [part]: true });
      paste(`사용가능한 ${text}입니다.`);
    } else {
      setIsDup({ ...isDup, [part]: false });
      paste(`사용이 불가능한 ${text}입니다.`);
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/"  text={''} color='dark' />
            </IonButtons>
            <IonTitle>회원가입</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="grid-init grid">
            <div className="box-init box" style={{ margin: "-3% 0" }}>
              <SignUpHeaderGrid1></SignUpHeaderGrid1>
              <SignUpHeaderGrid2 tag={"● ○"}></SignUpHeaderGrid2>
            </div>
            <div className="box-init box" style={{ flexDirection: "column", justifyContent: "start" }}>
              <SignUpInputBox
                id="uid"
                name="아이디"
                checkValue={true}
                placeHolder="3-15 영문/숫자조합으로 입력"
                state={registInfo}
                setState={setRegistInfo}
                checkIsDup={checkIsDup}
                isDup={isDup}
              ></SignUpInputBox>
              <SignUpInputBox id="password" name="비밀번호" checkValue={false} placeHolder="3-15 영문/숫자조합으로 입력" state={registInfo} setState={setRegistInfo}></SignUpInputBox>
              <SignUpInputBox id="passwordCheck" name="비밀번호 확인" checkValue={false} placeHolder="" state={registInfo} setState={setRegistInfo}></SignUpInputBox>
              <SignUpInputBox id="name" name="이름" checkValue={false} placeHolder="한글15자, 영어 30자 까지 가능" state={registInfo} setState={setRegistInfo}></SignUpInputBox>
              <SignUpInputBox id="email" name="이메일" checkValue={true} placeHolder="" state={registInfo} setState={setRegistInfo} checkIsDup={checkIsDup} isDup={isDup}></SignUpInputBox>

              {/* <div className="box-init" style={{ display: "flex", height: "5%", width: "100%", marginTop: "5%", justifyContent: "flex-start" }}>
                <IonItem className="signup_item" style={{ display: "flex", width: "100%" }}>
                  <IonCheckbox
                    name="personal"
                    checked={!!registInfo.emailAlarm}
                    onClick={() => {
                      setRegistInfo({ ...registInfo, emailAlarm: (registInfo.emailAlarm + 1) % 2 });
                    }}
                  />
                  <IonLabel style={{ marginLeft: "1%", fontSize: "65%" }}>쿠폰/이벤트/혜택 발생 시 이메일로 알림받기(선택)</IonLabel>
                </IonItem>
                
              </div> */}

              {/* <div className="box-init" style={{ display: "flex", height: "5%", width: "100%", marginTop: "2%", justifyContent: "flex-start" }}>
                <IonItem className="signup_item" style={{ display: "flex", width: "100%" }}>
                  <IonCheckbox
                    name="personal"
                    checked={!!registInfo.messageAlarm}
                    onClick={() => {
                      setRegistInfo({ ...registInfo, messageAlarm: (registInfo.messageAlarm + 1) % 2 });
                    }}
                  />
                  <IonLabel style={{ marginLeft: "1%", fontSize: "65%" }}>쿠폰/이벤트/혜택 발생 시 카카오톡/문자로 알림받기(선택)</IonLabel>
                </IonItem>
              </div> */}

              <div className="box-init" style={{ display: "flex", height: "70px", width: "100%", marginTop: "5%", flexDirection: "column", justifyContent: "flex-start" }}>
              
                <IonButton className="box-init" style={{ height: "50%", width: "65%", fontSize: "20px" }} onClick={registButton}>
                  회원가입
                </IonButton>

              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default SignUpPage2;
