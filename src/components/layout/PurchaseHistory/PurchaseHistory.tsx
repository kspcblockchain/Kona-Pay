import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonPage, IonButtons, IonBackButton, IonGrid, IonRow, IonCol } from "@ionic/react";

import React, { useEffect, useState } from "react";

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
import "../Payment/payment.css";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router";
import BuySellList from "../../../model/buySell/seller";
import Sell from "../../../model/sell/sell";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

interface PurchaseHistoryProps {
  type: string;
}

const PurchaseHistory = (props: PurchaseHistoryProps) => {
  const [data, setData]: any = useState();

  const [totalSum, setTotalSum] = useState(0);
  const [monthSum, setMonthSum] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);

  const getTotal = async () => {
    let uid = sessionStorage.uid;

    if (props.type === "buy") {
      let res = await BuySellList.totalBuy(uid);
      setData(res);
    } else {
      let res = await Sell.totalSell(uid);
      setData(res);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTotalSum(data[2][0].sum || 0);
      setMonthSum(data[0][0].sum || 0);
      setTotalCount(data[3][0].totalCount || 0);
      setMonthCount(data[1][0].totalCount || 0);
    }
  }, [data]);

  const history = useHistory();
  return (
    <IonApp>
      <IonPage className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={""} color="dark" />
            </IonButtons>
            <IonTitle>집계</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ padding: "0px 2%" }}>
            <div style={{ margin: "7% 0px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>KONA PAY</div>
            </div>

            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ border: "1px solid gray", padding: "7px", borderRadius: "10px" }}>2022.08-01</span>
            </div> */}

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
                  <IonCol>{monthCount}</IonCol>
                  <IonCol>{totalCount}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>발생금액</IonCol>
                  <IonCol>{monthSum}</IonCol>
                  <IonCol>{totalSum}</IonCol>
                </IonRow>
              </IonGrid>
            </div>

            {/* <div style={{ margin: "10% 0" }}>
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
            </div> */}
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default PurchaseHistory;
