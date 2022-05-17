import "./Layout.css";
import React, { useEffect, useState } from "react";
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonLoading, IonRow, IonTitle, IonToolbar, useIonLoading, useIonToast } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import Point from "../../../model/user/point";


const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const PotinTotal: React.FC = () => {
  const [point, setPoint]: any = useState(0);
//   const [amount, setAmount]: any = useState()
  const [present, dismiss] = useIonToast();
//   const [showLoading, setShowLoading] = useState(false);
  const [list , setList ] = useState([])

  const getPoint = async () => {
    let res = await Point.view(sessionStorage.uid);
    if (res === null) {
      setPoint(0);
    } else {
      setPoint(res);
    }
  };

  const total = async () => {
    try{
      let uid = sessionStorage.uid
      let res: any = await Point.total(uid )
      setList(res)
    }
    catch(err){
      present(err as "", 1500)
    }
  }

  useEffect(() => {
    getPoint()
    total();
  }, []);

  return (
    <div className="grid-init grid">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text={''} color='dark' />
          </IonButtons>
          <IonTitle>포인트 적립 내역</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <div style={{ padding: "0px 2%" }}>
            <div style={{ margin: "4% 0px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>KONA PAY</div>
            </div>

            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ border: "1px solid gray", padding: "7px", borderRadius: "10px" }}>2022.08-01</span>
            </div> */}

            <div style={{ margin: "5% 0 15% 0" }}>
              <IonGrid className="payment_table_text">
                <IonRow className="table_th">
                  <IonCol>포인트</IonCol>
                  <IonCol>사용/적립 포인트</IonCol>
                </IonRow>

                {list.map((data: any)=>{
                    return (
                        <IonRow className="table_row" style={ data.pointType !== "C" ? {backgroundColor:"#e6faff", padding:"1.2% 0"} : {backgroundColor:"#ffebeb", padding:"1.2% 0"}}>
                            <IonCol>{data.pointType === "C" ? "사용" : "적립"}</IonCol>
                            <IonCol>{data.point}P</IonCol>
                        </IonRow>
                    )
                })}
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
    </div>
  );
};

export default PotinTotal;
