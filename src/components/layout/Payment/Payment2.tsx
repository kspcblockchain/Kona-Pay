import {
  IonApp,
  IonHeader,
  IonTitle,
  IonContent,
  IonLabel,
  IonPage,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonCheckbox,
  IonModal,
  useIonAlert,
  IonButton,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import QRCode from "react-qr-code";
import dayjs from "dayjs";

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
import { chevronBack, refresh, home } from "ionicons/icons";
import Sell from "../../../model/sell/sell";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const Payment2: React.FC = () => {
  const history = useHistory();
  const location: any = useLocation();
  const [sellIdx, setSellIdx]: any = useState("");
  const [paste] = useIonAlert();

  const prevHistoryFunction = () => {
    setIsOpen(false);
    history.push({ pathname: "/", state: {} });
  };

  const successPayment = () => {
    setIsOpen(false);
    history.push({ pathname: "/payment3", state: { product: location.state.product, price: location.state.price } });
  };

  const registPay = async () => {
    const { product, price, id } = location.state;
    const uid = sessionStorage.uid;
    let resSellIdx = await Sell.sell(uid, product, price, "설명", id, 100);
    setSellIdx(resSellIdx);
  };

  const [check, setCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const requirePay = async () => {
    try {
      await registPay();
      setEndTime(new Date().getTime() + 32 * 1000);
      setIsOpen(true);
    } catch (err) {
      paste(err as any);
    }
  };

  const completePayment = async () => {
    try {
      let res = await Sell.checkSell(sellIdx);
      if (res === "F") {
        paste("거래가 완료되었습니다.");
        successPayment();
      } else if (res === "R") {
        paste("상대방이 거래를 취소하였습니다.");
        prevHistoryFunction();
      } else {
        throw "아직 거래되지 않았습니다.";
      }
    } catch (err) {
      paste(err as any);
    }
  };

  const [endTime, setEndTime] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      prevHistoryFunction();
    }
  }, [timeLeft]);

  const calculateTimeLeft = () => {
    const currTime = new Date().getTime();
    return endTime - currTime;
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
              <div style={{ fontWeight: "bold", color: "lightgray" }}>● ○ ● </div>
            </div>

            <IonGrid className="table_text">
              <IonRow className="table_th">
                <IonCol>상품명</IonCol>
                <IonCol>금액</IonCol>
                <IonCol size="4">구매자 아이디</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>{location.state && location.state.product}</IonCol>
                <IonCol>{location.state && location.state.price}</IonCol>
                <IonCol size="4">{location.state && location.state.id}</IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid className="total_text">
              <IonRow className="table_total">
                <IonCol>합 계 금 액</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>{location.state && location.state.price}</IonCol>
              </IonRow>
            </IonGrid>

            <IonItem lines="none" className="payment_check">
              <IonCheckbox slot="start" color="dark" checked={check} onClick={(e) => setCheck(!check)} />
              {/* <IonLabel>결제 정보를 구매자에게 발송</IonLabel> */}
              <IonLabel>판매 상품 확인 완료</IonLabel>
            </IonItem>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* <IonButton className='payment_button' color="light" size='large'>결제 요청</IonButton> */}
              <IonButton style={{ height:'70px', width: "75%", fontSize: "18px", padding: "10px", borderRadius: "10px" }} onClick={requirePay} disabled={!check}>
                결제 요청
              </IonButton>

              <IonModal isOpen={isOpen}>
                {/* <IonModal isOpen={true}> */}
                {/* <IonIcon icon={home} style={{ width:'10%', height:'10%',  margin:'10%' }} /> */}
                <div style={{ width: "90%", height: "10%", margin: "10%", display: "flex", alignItems: "left", justifyContent: "flex-end" }} onClick={prevHistoryFunction}>
                  <IonIcon icon={home} style={{ width: "30%", height: "50%", margin: "3%" }} color="dark" />
                  {/* <IonLabel style={{ fontSize: "150%" }}>홈으로</IonLabel> */}
                </div>
                <IonContent>
                  <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", height: "60vh", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ height: "30px", margin: "4%", fontSize: "20px" }}>{dayjs(timeLeft).format("mm:ss")}</div>
                      <IonIcon
                        style={{ width: "30px", height: "30px" }}
                        icon={refresh}
                        onClick={() => {
                          setEndTime(new Date().getTime() + 32 * 1000);
                        }}
                        color="dark"
                      />
                    </div>
                    <QRCode style={{ margin: "10%" }} value={sellIdx.toString()}></QRCode>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "8%" }}>
                      {/* <IonButton style={{ width: "40%", height: "100%", fontSize: "130%" }} color="warning" onClick={prevHistoryFunction}>
                        결제 대기
                      </IonButton> */}
                      <IonButton style={{ width: "80%", height: "100%", fontSize: "130%" }} onClick={completePayment}>
                        결제 완료
                      </IonButton>
                    </div>

                    {/* )
                    })}
                     */}
                  </div>
                </IonContent>
              </IonModal>
              <div></div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Payment2;
