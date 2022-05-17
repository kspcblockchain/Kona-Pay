import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { chevronBack, closeCircle, closeOutline, closeSharp, flag, qrCodeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import QRCode from "react-qr-code";

import BuySellList from "../../../model/buySell/seller";

const SellerList: React.FC = () => {
  const history = useHistory();
  const [sellData, setSellData] = useState<any>([]);
  //   const [date, setDate] = useState(new Date().toDateString());
  const [productIdx, setProductIdx] = useState<number>(0);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [qrIsValid, setQrIsValid] = useState<boolean>(false);
  const [detailIsValid, setDetailIsValid] = useState<boolean>(false);
  const [present] = useIonAlert();

  const setSellDataHandler = async () => {
    const limit = sellData.length + 20;
    const offset = limit == 0 ? 0 : limit - 20;
    let _limit = limit;
    let _offset = offset;
    const sellerUid = window.sessionStorage.uid;
    let status = "";
    const sellList = await BuySellList.sellList(sellerUid, status, _limit, _offset);
    console.log(typeof sellList);
    setSellStatusFormatingHandler(sellList);
    setSellData([...sellData, ...sellList]);
  };

  const setSellStatusFormatingHandler = (sellList: any) => {
    for (let sellItem of sellList) {
      switch (sellItem[`sellStatus`]) {
        case "S":
          sellItem[`sellStatus`] = "구매요청";
          break;
        case "F":
          sellItem[`sellStatus`] = "판매완료";
          break;
        case "C":
          sellItem[`sellStatus`] = "판매취소";
          break;
        case "R":
          sellItem[`sellStatus`] = "구매자취소";
          break;
      }
    }
  };

  const cancelAlert = (payload: object) => {
    const header = "판매 취소";
    const message = "상품 판매를 취소하시겠습니까?";
    present({
      header,
      message,
      buttons: [
        "아니오",
        {
          text: "네",
          handler: () => {
            cancelPurchaseHandler(payload);
          },
        },
      ],
    });
  };

  const cancelPurchaseHandler = async (payload: any) => {
    payload[`sellStatus`] = "C";
    console.log("payload : ", payload);
    const result = await BuySellList.sellUpdate(payload);
    console.log("sellUpdate : ", result);
    if (result) {
      window.location.replace("/list/sell");
    }
  };

  const openQRModal = (idx: any) => {
    setQrIsValid(true);
    setProductIdx(idx);
  };

  const openDetailModal = (idx: any) => {
    setDetailIsValid(true);
    setProductIdx(idx);
  };
  const loadData = (ev: any) => {
    setTimeout(() => {
      setSellDataHandler();
      console.log("Loaded data");
      ev.target.complete();
    }, 500);
  };
  useIonViewWillEnter(() => {
    setSellDataHandler();
  });
  return (
    <>
      <IonModal isOpen={detailIsValid}>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButtons
                slot="start"
                onClick={() => {
                  setDetailIsValid(false);
                }}
              >
                <IonBackButton disabled defaultHref="/" text={""} color="dark" />
              </IonButtons>
              <IonTitle></IonTitle>
            </IonToolbar>
          </IonHeader>

          {/* <IonCard>
            <IonCardHeader>상품 사진</IonCardHeader>
            <IonCardContent>
              <IonImg src="https://placeimg.com/320/100/any/grayscale"></IonImg>
            </IonCardContent>
          </IonCard> */}
          <IonCard>
            <IonCardHeader>
              <IonTitle>상품 확인서</IonTitle>
            </IonCardHeader>

            {sellData
              .filter((item: any) => {
                return item[`sellIdx`] === productIdx;
              })
              .map((item: any) => {
                console.log("detail Item : ", item);
                return (
                  <IonCardContent key={item[`sellIdx`]}>
                    <IonGrid key={item[`sellIdx`]}>
                      <IonRow>
                        <IonCol>상품번호</IonCol>
                        <IonCol>{item[`sellIdx`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>판매상태</IonCol>
                        <IonCol>{item[`sellStatus`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>상품명</IonCol>
                        <IonCol>{item[`productName`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>구매자</IonCol>
                        <IonCol>{item[`buyerUid`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>판매가격</IonCol>
                        <IonCol>{item[`productPrice`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>구매일</IonCol>
                        <IonCol>{item[`buyDate`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>txHash</IonCol>
                        <IonCol>{item[`txHash`]}</IonCol>
                      </IonRow>
                    </IonGrid>
                    {item[`sellStatus`] === "구매요청" ? (
                      <IonButton
                        onClick={() => {
                          cancelAlert(item);
                        }}
                      >
                        판매취소
                      </IonButton>
                    ) : (
                      <IonButton disabled>판매취소</IonButton>
                    )}
                  </IonCardContent>
                );
              })}
          </IonCard>
        </IonContent>
      </IonModal>
      <IonModal isOpen={qrIsValid} swipeToClose={true} presentingElement={undefined}>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonButton
                onClick={() => {
                  setQrIsValid(false);
                }}
              >
                <IonIcon icon={closeSharp} color="dark"></IonIcon>
              </IonButton>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <QRCode value={productIdx.toString()}></QRCode>
              </IonItem>
              <IonText>{productIdx.toString()}</IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
      <IonApp>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/" text={""} color="dark" />
              </IonButtons>
              <IonTitle>판매내역</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            {/* <IonButton onClick={() => setInfiniteDisabled(!isInfiniteDisabled)} expand="block">
            Toggle Infinite Scroll
          </IonButton> */}
            <IonList>
              <IonItem className="fontWeight-bold fontSize-small textAlign-center">
                <IonGrid>
                  <IonRow>
                    <IonCol>판매상품</IonCol>
                    <IonCol>판매상태</IonCol>
                    <IonCol>판매가격</IonCol>
                    <IonCol>QR</IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonList>
            <IonList>
              {
                // @ts-expect-error
                sellData.map((item) => {
                  item[`sellDate`] = item[`sellDate`].split("T")[0].split("-").join("/");
                  return (
                    <IonItem className="fontSize-small textAlign-center" key={item[`sellIdx`]}>
                      <IonGrid>
                        <IonRow>
                          <IonCol
                            className="fontWeight-bold"
                            onClick={() => {
                              openDetailModal(item[`sellIdx`]);
                            }}
                          >
                            {item[`productName`]}
                          </IonCol>
                          <IonCol>{item[`sellStatus`]}</IonCol>
                          <IonCol>{item[`productPrice`]}</IonCol>
                          <IonCol>
                            {item[`sellStatus`] !== "F" ? (
                              <IonButton
                                onClick={() => {
                                  openQRModal(item[`sellIdx`]);
                                }}
                              >
                                <IonIcon icon={qrCodeOutline} color="dark"></IonIcon>
                              </IonButton>
                            ) : (
                              <></>
                            )}
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                  );
                })
              }
            </IonList>

            <IonInfiniteScroll onIonInfinite={loadData} threshold="100px" disabled={isInfiniteDisabled}>
              <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..."></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </IonContent>
        </IonPage>
      </IonApp>
    </>
  );
};

export default SellerList;
