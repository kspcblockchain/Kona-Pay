import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonRouterLink, IonItem, IonIcon, IonButton } from "@ionic/react";

import React from "react";
import { useHistory, useLocation } from "react-router";

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

const Payment3: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const prevHistoryFunction = () => {
    history.push({ pathname: "/", state: {} });
  };

  return (
    <IonApp>
      <IonPage className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>판매</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ padding: "0px 2%" }}>
            <div style={{ margin: "7% 0px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>KONA PAY</div>
              <div style={{ fontWeight: "bold", color: "lightgray" }}>● ● ○ </div>
            </div>
            <div>지불 승인이 완료 되었습니다.</div>

            <IonGrid className="total_text">
              <IonRow className="table_total">
                <IonCol>판매 물품</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>{location.state && (location.state as any).product}</IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid className="total_text">
              <IonRow className="table_total">
                <IonCol>판매 금액</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>{location.state && (location.state as any).price}</IonCol>
              </IonRow>
            </IonGrid>
            {/* <IonRouterLink href="/payment4"> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
            <IonButton style={{ width: "75%", fontSize: "18px", padding: "10px", borderRadius: "10px" }} onClick={prevHistoryFunction}>
                홈으로
              </IonButton>
            </div>
            {/* </IonRouterLink> */}
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Payment3;
