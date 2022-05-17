import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonCard, IonItem, IonIcon } from "@ionic/react";

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
import "./MyWallet.css";
import { useHistory } from "react-router";
import { chevronBack } from "ionicons/icons";
import userInfo from "../../../model/user/userinfo";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const MyWallet: React.FC = () => {
  const history = useHistory();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("");
  const [kspcAmount, setKspcAmount] = useState<string>("");
  const [pointAmount, setPointAmount] = useState<string>("");
  const amountHandler = async () => {
    if (!!walletAddress) {
      const eth = await userInfo.getCoin(walletAddress, "ETH");
      const kspc = await userInfo.getCoin(walletAddress, "KSPC");
      const uid = sessionStorage?.uid;
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
  };
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
  return (
    <IonApp>
      <IonPage className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={""} color="dark" />
            </IonButtons>
            <IonTitle>내지갑</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ padding: "0px 2%" }}>
            <IonCard className="balance_card">
              <div className="balance">{kspcAmount}</div>
              <div className="balance_category">KSPC</div>
            </IonCard>

            <IonCard className="balance_card">
              <div className="balance">{ethAmount}</div>
              <div className="balance_category">ETH</div>
            </IonCard>

            <IonCard className="balance_card">
              <div className="balance">{pointAmount}</div>
              <div className="balance_category">POINT</div>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default MyWallet;
