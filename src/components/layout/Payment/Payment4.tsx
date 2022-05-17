import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonPage, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonDatetime, IonItem, IonIcon } from "@ionic/react";

import React, { useState } from "react";
import { useHistory } from "react-router";

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
import "./payment.css";
import { chevronBack } from "ionicons/icons";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const Payment4: React.FC = () => {
  const history = useHistory();

  const prevHistoryFunction = () => {
    history.push({ pathname: "/", state: {} });
  };

  let today = new Date();

  // let year = today.getFullYear();
  // let month = today.getMonth();
  // let date = today.getDate();
  // let day = today.getDay();

  const [date, setDate] = useState(today.toDateString());

  const [isOpen, setIsOpen] = useState(false);

  return (
    <IonApp>
      <IonPage className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/"  text={''} color='dark'  />
            </IonButtons>
            <IonTitle>판매</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ padding: "0px 2%" }}>
            <div style={{ margin: "7% 0px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>KONA PAY</div>
              <div style={{ fontWeight: "bold", color: "lightgray" }}>● ● ● ○</div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <IonDatetime style={{ border: "1px solid gray", padding: "7px", borderRadius: "10px" }} value={date}></IonDatetime>
            </div>

            <div style={{ margin: "10% 0" }}>
              <IonLabel>발생건수/금액통계</IonLabel>
              <IonGrid className="payment_table_text">
                <IonRow className="table_th">
                  <IonCol>구분</IonCol>
                  <IonCol>월 합계</IonCol>
                  <IonCol>누적 합계</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>발생건수</IonCol>
                  <IonCol>1</IonCol>
                  <IonCol>2</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>발생금액</IonCol>
                  <IonCol>1,6600</IonCol>
                  <IonCol>1,6600</IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <div style={{ margin: "10% 0" }}>
              <IonLabel>상품별 통계</IonLabel>
              <IonGrid className="payment_table_text">
                <IonRow className="table_th">
                  <IonCol>브랜드명</IonCol>
                  <IonCol>상품명</IonCol>
                  <IonCol>건수</IonCol>
                  <IonCol>금액</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>이마트</IonCol>
                  <IonCol>소스</IonCol>
                  <IonCol>1</IonCol>
                  <IonCol>33,000</IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <div style={{ margin: "10% 0" }}>
              <IonLabel>결제수단별 통계</IonLabel>
              <IonGrid className="payment_table_text">
                <IonRow className="table_th">
                  <IonCol>결제수단</IonCol>
                  <IonCol>건수</IonCol>
                  <IonCol>금액</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>코나페이</IonCol>
                  <IonCol>1</IonCol>
                  <IonCol>33,000</IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Payment4;
