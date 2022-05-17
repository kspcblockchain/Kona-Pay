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
import { chevronBack, closeSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BuySellList from "../../../model/buySell/seller";
import userInfo from "../../../model/user/userinfo";

import "./list.css";

const BuyerList: React.FC = () => {
  const history = useHistory();

  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [buyData, setBuyData] = useState<any>([]);
  const [productIdx, setProductIdx] = useState<number>(0);
  const [detailIsValid, setDetailIsValid] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [present] = useIonAlert();
  const buyerUid = window.sessionStorage.uid;

  const pushBuyDataHandler = async () => {
    const limit = buyData.length + 20;
    const offset = limit == 0 ? 0 : limit - 20;
    const buyList = await BuySellList.buyList(buyerUid, status, limit, offset);
    setSellStatusFormatingHandler(buyList);
    console.log("buyList : ", buyList);
    setBuyData([...buyData, ...buyList]);
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
          sellItem[`sellStatus`] = "구매취소";
          break;
      }
    }
  };

  const cancelAlert = (sellIdx: number) => {
    const header = "구매 취소";
    const message = "상품 구매를 취소하시겠습니까?";
    present({
      header,
      message,
      buttons: [
        "아니오",
        {
          text: "네",
          handler: () => {
            cancelPurchaseHandler(sellIdx);
          },
        },
      ],
    });
  };

  const cancelPurchaseHandler = async (sellIdx: number) => {
    const result = await BuySellList.buyUpdate(sellIdx);
    console.log("buyUpdate : ", result);
    if (result) {
      window.location.replace("/list/buy");
    }
  };

  const buyProduct = (sellItem: any) => {
    const header = "상품 구매";
    const message = "구매를 진행 하시겠습니까?";
    present({
      header,
      message,
      buttons: [
        "아니오",
        {
          text: "네",
          handler: () => {
            buyProductHandler(sellItem);
          },
        },
      ],
    });
  };

  const buyProductHandler = async (sellItem: any) => {
    const { sellIdx, buyerUid, sellerUid, symbol, productPrice } = sellItem;

    const result = await BuySellList.buyProduct(sellIdx, sellerUid, buyerUid, symbol, productPrice);
    if (result.status === 200) {
      present("구매 완료 되었습니다.");
      window.location.replace("/list/buy");
    }
  };

  const qrRedirect = () => {
    const header = "페이지 이동";
    const message = "구매 페이지로 이동하시겠습니까?";
    present({
      header,
      message,
      buttons: ["아니오", { text: "네", handler: QRredirect }],
    });
  };

  const QRredirect = () => {
    window.location.replace("/scan");
  };

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushBuyDataHandler();
      console.log("Loaded data");
      ev.target.complete();
    }, 500);
  };

  useIonViewWillEnter(() => {
    pushBuyDataHandler();
  });

  const openDetailModal = (idx: any) => {
    setDetailIsValid(true);
    setProductIdx(idx);
  };
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
          {/* <IonHeader>
            <IonButton
              onClick={() => {
                setDetailIsValid(false);
              }}
            >
              <IonIcon icon={closeSharp} color="dark"></IonIcon>
            </IonButton>
          </IonHeader> */}

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
            {buyData
              .filter((item: any) => {
                return item[`sellIdx`] === productIdx;
              })
              .map((item: any) => {
                console.log("detail Item : ", item);
                console.log(item[`buyDate`]);
                if (item[`buyDate`]) {
                  item[`buyDate`] = item[`buyDate`].split("T")[0].split("-").join("/");
                }
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
                        <IonCol>판매자</IonCol>
                        <IonCol>{item[`sellerUid`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>판매가격</IonCol>
                        <IonCol>{item[`productPrice`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>판매시작일</IonCol>
                        <IonCol>{item[`sellDate`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>구매일</IonCol>
                        <IonCol>{item[`buyDate`]}</IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>txHash</IonCol>
                        <IonCol>{item[`txHash`]}</IonCol>
                      </IonRow>
                      {item[`sellStatus`] === "구매요청" ? (
                        <IonRow>
                          <IonCol>
                            <IonButton
                              onClick={() => {
                                cancelAlert(item[`sellIdx`]);
                              }}
                            >
                              구매취소
                            </IonButton>
                          </IonCol>
                          <IonCol>
                            <IonButton
                              onClick={() => {
                                buyProduct(item);
                              }}
                            >
                              구매진행
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      ) : (
                        <IonRow>
                          <IonCol>
                            <IonButton disabled>구매취소</IonButton>
                          </IonCol>
                          <IonCol>
                            <IonButton disabled>구매진행</IonButton>
                          </IonCol>
                        </IonRow>
                      )}
                    </IonGrid>
                  </IonCardContent>
                );
              })}
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
              <IonTitle>구매내역</IonTitle>
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
                    <IonCol>구매상품</IonCol>
                    <IonCol>구매일자</IonCol>
                    <IonCol>판매자</IonCol>
                    <IonCol>상태</IonCol>
                    <IonCol>구매가격</IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonList>
            <IonList>
              {
                // @ts-expect-error
                buyData.map((item) => {
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
                          <IonCol>{item[`sellDate`]}</IonCol>
                          <IonCol>{item[`sellerUid`]}</IonCol>
                          <IonCol>{item[`sellStatus`]}</IonCol>
                          <IonCol>{item[`productPrice`]}</IonCol>
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

export default BuyerList;
