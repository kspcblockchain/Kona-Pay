import React from "react";
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import {
  alertCircleOutline,
  cardOutline,
  cashOutline,
  chatbubblesOutline,
  diamondOutline,
  documentTextOutline,
  logoUsd,
  personCircleOutline,
  removeOutline,
  searchCircleOutline,
  sendOutline,
  settingsOutline,
} from "ionicons/icons";

const menu: React.FC = () => {
  return (
    <IonMenu content-id="main-content">
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle style={{ color: "gray" }}>KONA PAY</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent content-id="main-content">
        <IonList>
          <IonListHeader>
            <a style={{ fontWeight: "bold", color: "black" }}>지갑</a>
            <IonIcon src={removeOutline}></IonIcon>
          </IonListHeader>

          <IonMenuToggle auto-hide="false">
            <IonItem button>
              <IonIcon src={cardOutline} slot="start" name="home"></IonIcon>
              <IonLabel>결제</IonLabel>
            </IonItem>

            <IonRouterLink href="/purchasehistory">
              <IonItem button>
                <IonIcon src={documentTextOutline} slot="start" name="home"></IonIcon>
                <IonLabel>구매내역</IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonMenuToggle>
        </IonList>

        <IonList>
          <IonListHeader>
            <a style={{ fontWeight: "bold", color: "black" }}>금융</a>
            <IonIcon src={removeOutline}></IonIcon>
          </IonListHeader>

          <IonMenuToggle auto-hide="false">
            {/* <IonRouterLink href="/payment4"> */}
            <IonRouterLink href="/balanceinquiry">
              <IonItem button>
                <IonIcon src={searchCircleOutline} slot="start" name="home"></IonIcon>
                <IonLabel>매출조회</IonLabel>
              </IonItem>
            </IonRouterLink>

            <IonRouterLink href="/swap">
              <IonItem button>
                <IonIcon src={logoUsd} slot="start" name="home"></IonIcon>
                <IonLabel>환전</IonLabel>
              </IonItem>
            </IonRouterLink>

            <IonRouterLink href="/inout">
              <IonItem button>
                <IonIcon src={sendOutline} slot="start" name="home"></IonIcon>
                <IonLabel>송금</IonLabel>
              </IonItem>
            </IonRouterLink>

            <IonItem button>
              <IonIcon src={cashOutline} slot="start" name="home"></IonIcon>
              <IonLabel>적림</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        <IonList>
          <IonListHeader>
            <a style={{ fontWeight: "bold", color: "black" }}>생활</a>
            <IonIcon src={removeOutline}></IonIcon>
          </IonListHeader>

          <IonMenuToggle auto-hide="false">
            <IonRouterLink href="/board">
              <IonItem button>
                <IonIcon src={diamondOutline} slot="start" name="home"></IonIcon>
                <IonLabel>이벤트</IonLabel>
              </IonItem>
            </IonRouterLink>

            <IonRouterLink href="/board">
              <IonItem button>
                <IonIcon src={chatbubblesOutline} slot="start" name="home"></IonIcon>
                <IonLabel>게시판</IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonMenuToggle>
        </IonList>

        <IonList>
          <IonListHeader>
            <IonIcon src={removeOutline}></IonIcon>
          </IonListHeader>

          <IonMenuToggle auto-hide="false">
            <IonItem button>
              <IonIcon src={alertCircleOutline} slot="start" name="home"></IonIcon>
              <IonLabel>사용방법</IonLabel>
            </IonItem>

            <IonItem button>
              <IonIcon src={settingsOutline} slot="start" name="home"></IonIcon>
              <IonLabel>설정</IonLabel>
            </IonItem>

            <IonItem button>
              <IonIcon src={personCircleOutline} slot="start" name="home"></IonIcon>
              <IonLabel>사용자</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default menu;
