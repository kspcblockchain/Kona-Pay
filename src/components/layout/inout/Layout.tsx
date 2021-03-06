import {
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonRow,
  IonItem,
  IonApp,
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonLabel,
  IonCol,
  IonButton,
  IonGrid,
  IonSlides,
  IonSlide,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
  IonFab,
  IonFabButton,
  IonModal,
  IonCardHeader,
  IonText,
  IonCardSubtitle,
  IonInput,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { add, arrowUpCircle, qrCodeOutline, toggleSharp } from "ionicons/icons";
import "./Layout.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { QrReader } from "react-qr-reader";
import userInfo from "../../../model/user/userinfo";
import Wallet from "../../../model/wallet";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const Layout: React.FC = () => {
  const history = useHistory();
  const [tmpItem, setTmpItem] = useState<string[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [qrReader, setQrReader] = useState<boolean>(false);
  const [eth, setEth] = useState<number>(0);
  const [kspc, setKspc] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<any>("");
  const [sendPrice, setSendPrice] = useState<number>(0);
  const sessionUid = sessionStorage?.getItem("uid");
  const [present] = useIonAlert();
  const [toast, dismiss] = useIonToast();
  const pushRemittanceDataHandeler = async () => {
    const min = tmpItem.length;
    const max = min + 20;
    const newItem = [];
    for (let i = min; i < max; i++) {
      newItem.push("item" + i);
    }
    console.log(newItem);
    setTmpItem([...tmpItem, ...newItem]);
  };

  const loadData = (event: any) => {
    setTimeout(() => {
      pushRemittanceDataHandeler();

      event.target.complete();
    }, 500);
  };

  const sendPriceAlert = async () => {
    if (isNaN(sendPrice) || sendPrice <= 0) {
      present({
        header: "?????? ??????",
        message: "????????? ???????????? ??????????????????.",
        buttons: ["??????"],
      });
      return;
    }
    // ?????? ?????? ????????? ?????? ????????? API??????
    if (toAddress === "") {
      present({
        header: "?????? ??????",
        message: "?????? ????????? ??????????????????.",
        buttons: ["??????"],
      });
      return;
    }
    present({
      header: "??????",
      message: "????????? ?????? ???????????????????",
      buttons: ["?????????", { text: "???", handler: sendKscpHandler }],
    });
  };

  const sendKscpHandler = () => {
    console.log("send ??????");
    console.log(sendPrice);

    const result = Wallet.FromTransfer(address, "KSPC", sendPrice, toAddress);
    toast("??????????????? ????????? ?????? ??? ????????????.", 3000);
    setAddress("");
    setSendPrice(0);
  };

  // Qr reader Modal op/close
  const qrReaderHandler = () => {
    setQrReader(!qrReader);
  };
  // Qr reader Modal op/close end

  // scrollTop Logic
  const getContent = () => {
    return document.querySelector("ion-content");
  };

  const scrollToTop = () => {
    getContent()?.scrollToTop(500);
  };
  // scrollTop Logic end

  const getUserInfo = async () => {
    const uid: string = sessionUid !== null ? sessionUid : "";
    const user = await userInfo.getUser(uid);
    console.log(user);
    const { address } = user;
    const eth = await userInfo.getCoin(address, "ETH");
    const kspc = await userInfo.getCoin(address, "KSPC");
    setAddress(address);
    setEth(eth);
    setKspc(kspc);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useIonViewWillEnter(() => {
    pushRemittanceDataHandeler();
  });
  return (
    <IonApp>
      <IonModal isOpen={qrReader}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" onClick={qrReaderHandler}>
              <IonBackButton disabled defaultHref="/" text={""} color="dark" />
            </IonButtons>
            <IonTitle>?????? QR</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>????????? ??????????????????</IonCardHeader>
            <IonCardContent>
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    // setProductIdx(result?.getText());
                  }

                  if (!!error) {
                    // console.log(error);
                  }
                }}
                constraints={{
                  facingMode: "environment",
                }}
              ></QrReader>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={""} color="dark" />
            </IonButtons>
            <IonTitle>??????</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonButton slot="end" onClick={qrReaderHandler}>
              <IonLabel>QR??????</IonLabel>
              <IonIcon icon={qrCodeOutline}></IonIcon>
            </IonButton>
          </IonItem>
          <IonSlides>
            <IonSlide>
              <IonCard style={{ width: "100%" }}>
                {/* <p style={{ fontWeight }}></p> */}
                <IonCardContent style={{ lineHeight: "200%" }}>
                  <IonLabel style={{ fontSize: "20px" }}>{sessionUid} </IonLabel>
                  <br />
                  <IonLabel style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>{kspc} KSPC</IonLabel>
                  <IonLabel style={{ fontSize: "20px" }}> ?????????</IonLabel>
                  <br />
                  <IonItem style={{ marginBottom: "5%" }}>
                    <IonCol>
                      <IonInput
                        value={sendPrice}
                        type="number"
                        placeholder="?????? ??????"
                        style={{ textAlign: "right", marginRight: "10%" }}
                        onIonChange={(e) => setSendPrice(parseInt(e.detail.value!, 0))}
                      ></IonInput>
                      <IonInput value={toAddress} placeholder="?????? ?????? ??????" style={{ textAlign: "right", marginRight: "10%" }} onIonChange={(e) => setToAddress(e.detail.value)}></IonInput>
                    </IonCol>
                  </IonItem>
                  <IonButton onClick={sendPriceAlert}>??????</IonButton>
                </IonCardContent>
              </IonCard>
            </IonSlide>
            <IonSlide>
              <IonCard style={{ width: "100%" }}>
                <IonCardContent style={{ lineHeight: "200%" }}>
                  <IonLabel style={{ fontSize: "20px" }}>{sessionUid} </IonLabel>
                  <br />
                  <IonLabel style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>{eth} ETH</IonLabel>
                  <IonLabel style={{ fontSize: "20px" }}> ?????????</IonLabel>
                  <br />
                  <IonItem style={{ marginBottom: "5%" }}>
                    <IonCol>
                      <IonInput
                        onClick={() => {
                          present("????????? ??????????????????.");
                        }}
                        placeholder="?????? ??????"
                        style={{ textAlign: "right", marginRight: "10%" }}
                      ></IonInput>
                      <IonInput
                        onClick={() => {
                          present("????????? ??????????????????.");
                        }}
                        placeholder="?????? ?????? ??????"
                        style={{ textAlign: "right", marginRight: "10%" }}
                      ></IonInput>
                    </IonCol>
                  </IonItem>
                  <IonButton
                    onClick={() => {
                      present("????????? ??????????????????.");
                    }}
                  >
                    ??????
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonSlide>
          </IonSlides>
          <IonCard>
            <IonList>
              <IonGrid>
                <IonRow>
                  <IonCol>?????????</IonCol>
                  <IonCol>?????????</IonCol>
                  <IonCol>??????</IonCol>
                  {/* <IonCol>asdasd</IonCol> */}
                </IonRow>
                {tmpItem.map((item) => {
                  return (
                    <IonRow key={item}>
                      <IonCol>{item}</IonCol>
                      <IonCol>{item}</IonCol>
                      <IonCol>{item}</IonCol>
                      {/* <IonCol>{item}</IonCol> */}
                    </IonRow>
                  );
                })}
              </IonGrid>
            </IonList>
          </IonCard>
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={scrollToTop}>
              <IonIcon icon={arrowUpCircle}></IonIcon>
            </IonFabButton>
          </IonFab>
          <IonInfiniteScroll onIonInfinite={loadData} threshold="100px" disabled={isInfiniteDisabled}>
            <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..."></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Layout;
