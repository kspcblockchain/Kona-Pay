import "./ProductDetail.css";
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
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BuySellList from "../../../model/buySell/seller";
import CustomAxios from "../../../common/customAxios";

const ProductDetail: React.FC = () => {
  const history = useHistory();
  const param = useParams();
  const [present] = useIonAlert();
  const [rowItem, setRowItem] = useState<any[][]>();
  const [payload, setPayload] = useState();

  // @ts-ignore
  const { productIdx } = param;
  const purchaseConfirmation = async () => {
    const APIURL = `${process.env.REACT_APP_SERVER}/sell/${productIdx}/update`;
    // @ts-ignore
    const item = Object.assign(payload);
    // @ts-ignore
    item.sellStatus = "F";
    console.log("payload : ", payload);
    console.log("item : ", item);
    const result = await axios.patch(APIURL, payload);
    console.log("result : ", result);
    history.push({ pathname: "/" });
  };

  const buyProduct = () => {
    const header = "상품 구매";
    const message = "구매를 진행 하시겠습니까?";
    present({
      header,
      message,
      buttons: [
        "취소",
        {
          text: "구매",
          handler: () => {
            buyProductHandler();
          },
        },
      ],
    });
  };

  const buyProductHandler = async () => {
    console.log("확인");
    const product = await BuySellList.productItem(productIdx);
    console.log(product);

    const { sellIdx, buyerUid, sellerUid, symbol, productPrice } = product;

    const result = await BuySellList.buyProduct(sellIdx, sellerUid, buyerUid, symbol, productPrice);
    console.log(result);
    if (result.status === 200) {
      present("구매 완료 되었습니다.");
      window.location.replace("/list/buy");
    }
  };
  useEffect(() => {
    const axiosFunction = async () => {
      try {
        const APIURL = `${process.env.REACT_APP_SERVER}/sell/select/${productIdx}`;
        const productInformation = await axios.get(APIURL);
        // console.log("productInformation : ", productInformation);
        // console.log("productInformation.status : ", productInformation.status);

        if (productInformation.status === 200) {
          const item = productInformation.data.data;
          const itemArr = Object.entries(item);
          // console.log("item : ", item);
          // console.log("itemArr : ", itemArr);
          const htmlMapProductInformation = [
            ["상품번호", item.sellIdx],
            ["상품명", item.productName],
            ["판매가", item.productPrice],
            ["판매자", item.buyerUid],
            ["구매자", item.sellerUid],
            ["판매상태", item.sellStatus],
            ["판매글 올린 날짜", item.sellDate],
          ];

          setPayload(item);
          setRowItem(htmlMapProductInformation);
        }
      } catch (error) {
        console.log(error);
      }
    };

    axiosFunction();
  }, [param]);
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={""} color="dark" />
            </IonButtons>
            <IonTitle>디테일</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
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
            <IonCardContent>
              <IonGrid>
                {rowItem?.map((item) => {
                  // console.log("html item : ", item);
                  return (
                    <IonRow key={item[0]}>
                      <IonCol size="4">{item[0]}</IonCol>
                      <IonCol>{item[1]}</IonCol>
                    </IonRow>
                  );
                })}
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonButton
          size="large"
          expand="block"
          onClick={() => {
            buyProduct();
          }}
        >
          구매하기
        </IonButton>
      </IonPage>
    </IonApp>
  );
};

export default ProductDetail;
