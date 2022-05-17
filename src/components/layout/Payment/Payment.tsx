import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonItem, IonIcon, useIonAlert, IonButton } from "@ionic/react";

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
import { chevronBack } from "ionicons/icons";
import Signup from "../../../model/user/signup";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const Payment: React.FC = () => {
  const [content, setContent] = useState({
    product: "",
    price: "",
    id: "",
    valid: false,
  });

  const onChange = (e: any) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const prevHistoryFunction = () => {
    history.push({ pathname: "/payment2", state: content });
  };

  const [paste] = useIonAlert();

  const checkIsValid = async () => {
    let res;
    try {
      res = await Signup.uid(content.id);
    } catch (err) {
      res = true;
    }
    if (res) {
      paste(`유효하지 않은 아이디입니다.`);
    } else {
      paste(`유효한 아이디입니다.`);
      setContent({ ...content, valid: true });
    }
  };

  return (
    <IonApp>
      <IonPage className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={""} color="dark" />
            </IonButtons>
            <IonTitle>판매</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ padding: "0px 2%" }}>
            <div style={{ margin: "7% 0px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>KONA PAY</div>
              <div style={{ fontWeight: "bold", color: "lightgray" }}>○ ● ● </div>
            </div>
            <div style={{ border: "2px solid lightgray", padding: "15px 20px", borderRadius: "10px", margin: "1.5% 0px" }}>
              <div style={{ margin: "0px 0px 10px 0px" }}>상품명</div>
              <input style={{ width: "100%", height: "30px" }} type="text" name="product" value={content.product} onChange={onChange}></input>
            </div>
            <div style={{ border: "2px solid lightgray", padding: "15px 20px", borderRadius: "10px", margin: "1.5% 0px" }}>
              <div style={{ margin: "0px 0px 10px 0px" }}>가격</div>
              <div style={{ display: "flex", width: "100%", height: "30px", border: "2px solid " }}>
                <input style={{ border: "none", width: "75%" }} type="number" name="price" value={content.price} onChange={onChange}></input>
                <div style={{ margin: "1% 5%" }}>KSPC</div>
              </div>
            </div>
            <div style={{ border: "2px solid lightgray", padding: "15px 20px", borderRadius: "10px", margin: "1.5% 0px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ margin: "0px 0px 10px 0px" }}>구매자 아이디</div>
                <a onClick={checkIsValid}>[아이디 확인]</a>
              </div>
              <input style={{ width: "100%", height: "30px" }} type="text" name="id" value={content.id} onChange={onChange} disabled={content.valid}></input>
            </div>
            <div style={{ fontSize: "80%", margin: "10% 0px" }}>
              [유의사항]
              <br />
              <br />
              개인정보 입력에 유의해 주세요.
              <br />
              KSPC 이외의 주소로는 전송되지 않아요.
              <br />
              KSPC를 전송할 경우에는 이더리움 가스비가 필요합니다.
              <br />
              미리 이더리움을 충전해 놓으시기 바랍니다.
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IonButton
                style={{ height: "70px", width: "75%", fontSize: "18px", padding: "10px", borderRadius: "10px" }}
                disabled={content.product === "" || content.price === "" || content.id === "" || !content.valid}
                onClick={prevHistoryFunction}
              >
                승인 요청
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Payment;
