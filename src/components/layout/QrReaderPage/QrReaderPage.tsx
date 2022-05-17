import "./QrReaderPage.css";
import { IonApp, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import { chevronBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useHistory } from "react-router";
const QrReaderPage: React.FC = () => {
  const history = useHistory();
  const [isValidData, setIsValidData] = useState(false);
  const [productIdx, setProductIdx] = useState<string>("-1");
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [seller, setSeller] = useState<string>("");
  const [buyer, setByuer] = useState<string>("");

  useEffect(() => {
    const axiosFunction = async () => {
      try {
        const APIURL = `${process.env.REACT_APP_SERVER}/sell/select/${productIdx}`;
        const productInformation = await axios.get(APIURL);
        console.log("productInformation : ", productInformation);
        console.log("productInformation.status : ", productInformation.status);

        if (productInformation.status === 200) {
          const item = productInformation.data.data;
          setIsValidData(true);
          setProductName(item.productName);
          setPrice(item.productPrice);
          setSeller(item.sellerUid);
          setByuer(item.buyerUid);
        }
      } catch {}
    };
    if (productIdx !== "-1") {
      axiosFunction();
    }
  }, [productIdx]);

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text={""} color="dark" />
          </IonButtons>
          <IonTitle>구매</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonTitle color="medium">KONAPAY</IonTitle> */}
        <IonCard>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setProductIdx(result?.getText());
              }

              if (!!error) {
                // console.log(error);
              }
            }}
            constraints={{
              facingMode: "environment",
            }}
          ></QrReader>
        </IonCard>
        {productIdx == "-1" ? (
          <IonCard>
            <IonCardHeader>판매 상품</IonCardHeader>
            <IonCardContent>QR 코드를 인식해주세요.</IonCardContent>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardHeader>판매 상품</IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">상품이름</IonCol>
                  <IonCol>{productName}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="4">상품번호</IonCol>
                  <IonCol>{productIdx}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="4">판매가격</IonCol>
                  <IonCol>{price}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="4">판매자</IonCol>
                  <IonCol>{seller}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="4">구매자</IonCol>
                  <IonCol>{buyer}</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      {isValidData ? (
        <IonButton
          onClick={() => {
            history.push({ pathname: `/detail/${productIdx}`, state: {} });
          }}
        >
          구매하기
        </IonButton>
      ) : (
        <IonButton disabled>QR코드를 인식해주세요.</IonButton>
      )}
    </IonApp>
  );
};

export default QrReaderPage;
