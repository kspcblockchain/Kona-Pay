import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonContent,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonPage,
  IonButtons,
  IonButton,
  IonCard,
  IonRouterLink,
  IonCardContent,
  IonText,
  IonAlert,
  useIonAlert,
  IonSlides,
  IonSlide,
  useIonToast,
} from "@ionic/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
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

import "./main.css";

import { homeOutline, giftOutline, cardOutline, menuSharp } from "ionicons/icons";

import userInfo from "../../../model/user/userinfo";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import axios from "axios";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const Main: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [viewAddress, setViewAddress] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("");
  const [kspcAmount, setKspcAmount] = useState<string>("");
  const [pointAmount, setPointAmount] = useState<string>("");
  const [copySucess, setCopySucess] = useState<boolean>(false);

  const [present, dismiss] = useIonToast();
  const [paste] = useIonAlert();

  const amountHandler = async () => {
    if (!!walletAddress) {
      const uid = sessionStorage?.uid;
      const eth = await userInfo.getCoin(walletAddress, "ETH");
      const kspc = await userInfo.getCoin(walletAddress, "KSPC");
      const point = await userInfo.getPoint(uid);

      console.log("amountHandler : ", eth);
      console.log("amountHandler : ", kspc);
      console.log("amountHandler : ", point);

      setEthAmount(eth);
      setKspcAmount(kspc);
      setPointAmount(point);
    }
  };

  const getWalletAddressHandler = async () => {
    const uid = sessionStorage?.uid;
    const result = await userInfo.getUser(uid);
    const user: any = result;
    console.log("getWalletAddressHandler user : ", user);
    const walletAddress: string = user.address;
    console.log("getWalletAddressHandler walletAddress : ", walletAddress);
    let first = walletAddress.substring(0, 8);
    let last = walletAddress.substring(walletAddress.length - 8, walletAddress.length);
    const setAddress = `${first}...${last}`;
    setWalletAddress(user.address);
    setViewAddress(setAddress);
    console.log(viewAddress);
  };

  const addressCopy = async (e: any) => {
    console.log(walletAddress);
    let clipboardText;
    // @ts-ignore
    const writePermission = await navigator.permissions.query({ name: "clipboard-write" });
    console.log("writePermission : ", writePermission);
    if (writePermission.state == "granted") {
      clipboardText = await navigator.clipboard.writeText(walletAddress);
      setCopySucess(true);
    } else {
      // 권한 거절 'denied'
      // 권한 요청 중 'prompt'
      console.log("지갑주소 복사 실패");
    }
  };

  useEffect(() => {
    if (!sessionStorage.uid) {
      const link = document.createElement("a");
      link.href = "/login";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }, []);

  useEffect(() => {
    console.log(sessionStorage.uid);
    if (!!sessionStorage.uid) {
      getWalletAddressHandler();
    }
  }, []);

  useEffect(() => {
    if (!!sessionStorage.uid) {
      console.log("walletAddress2 : ", walletAddress);
      amountHandler();
    }
  }, [walletAddress]);

  const getReady = () => {
    paste("서비스 준비 중 입니다.");
  };

  const copyAddress = () => {
    document.execCommand("copy");
    present({message: "지갑주소가 복사되었습니다.", duration: 1000 , cssClass:"main_toast"});
  };

  return (
    <IonApp>
      <IonAlert
        isOpen={copySucess}
        subHeader={"지갑주소 복사"}
        message={walletAddress}
        buttons={[
          {
            text: "확인",
            handler: () => {
              setCopySucess(false);
            },
          },
        ]}
      ></IonAlert>

      <SideBarMenu></SideBarMenu>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" id="main-content">
              <IonMenuToggle>
                <IonButton>
                  <IonIcon src={menuSharp} slot="start" color="dark"></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>

            <IonButtons slot="end" id="myinfo">
              <IonRouterLink href="/mywallet">
                <IonButton>
                  <IonIcon src={cardOutline} color="dark"></IonIcon>
                </IonButton>
              </IonRouterLink>
              <IonButton onClick={getReady}>
                <IonIcon src={giftOutline} color="dark"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="background"></IonContent>
        <IonLabel className="bannerText">KONA PAY</IonLabel>
        <IonLabel className="bannerText2">언제 어디서든 간편 한 결제</IonLabel>
        <div>
          <IonCard className="walletCard">
            <IonSlides>
              <IonSlide>
                  <CopyToClipboard text={walletAddress}>
                <IonCardContent className="background" onClick={copyAddress}>
                    <IonText className="card-text1 selectable">
                      {viewAddress}
                    </IonText>
                    {/* <button className='share-button text-xxs leading-7 text-alarmBoxTitle absolute right-9 bg-lightGray px-2 py-2' onClick={copyAddress}>URL복사</button> */}
                  <br />
                  <IonLabel className="card-text2">KSPC : {kspcAmount}</IonLabel>
                </IonCardContent>
                  </CopyToClipboard>
              </IonSlide>
              <IonSlide>
                  <CopyToClipboard text={walletAddress}>
                <IonCardContent className="background" onClick={copyAddress}>
                    <IonText className="card-text1 selectable">
                      {viewAddress}
                    </IonText>
                  <br />
                  <IonLabel className="card-text2">ETH : {ethAmount}</IonLabel>
                </IonCardContent>
                  </CopyToClipboard>
              </IonSlide>
              {/* <IonSlide>
                  <CopyToClipboard text={walletAddress}>
                <IonCardContent className="background" onClick={copyAddress}>
                    <IonText className="card-text1 selectable">
                      {viewAddress}
                    </IonText>
                  <br />
                  <IonLabel className="card-text2">POINT : {pointAmount}</IonLabel>
                </IonCardContent>
                  </CopyToClipboard>
              </IonSlide> */}
            </IonSlides>
          </IonCard>
        </div>

        <IonRouterLink href="/scan">
          <IonButton className="pwdBtn">
            <IonLabel>스캔</IonLabel>
          </IonButton>
        </IonRouterLink>

        {/* <IonToolbar className="mainFooter" style={{ backgroundColor: "rgb(230, 230, 230)", height: "15%", paddingTop: "3%" }}>
          <IonButtons slot="start" id="home" style={{ marginLeft: "10%" }}>
            <IonButton>
              <a>
                <IonIcon src={homeOutline}></IonIcon>
                <div>
                  <IonLabel>홈</IonLabel>
                </div>
              </a>
            </IonButton>
          </IonButtons>

          <IonButtons slot="start" style={{ marginLeft: "20%" }}>
            <IonButton>
              <IonRouterLink href="/payment">
                <IonIcon src={logoUsd}></IonIcon>
                <div style={{ height: "100%" }}>
                  <IonLabel>결제요청</IonLabel>
                </div>
              </IonRouterLink>
            </IonButton>
          </IonButtons>

          <IonButtons slot="start" style={{ marginLeft: "20%" }}>
            <IonButton onClick={getReady}>
              <a>
                <IonIcon src={giftOutline}></IonIcon>
                <div>
                  <IonLabel>혜택</IonLabel>
                </div>
              </a>
            </IonButton>
          </IonButtons>
        </IonToolbar> */}
      </IonPage>
    </IonApp>
  );
};

export default Main;
