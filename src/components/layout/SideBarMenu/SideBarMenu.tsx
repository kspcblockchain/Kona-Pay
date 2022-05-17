import React from "react";
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterLink, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import {
  cardOutline,
  cashOutline,
  chatbubblesOutline,
  diamondOutline,
  logoUsd,
  logOutOutline,
  megaphoneOutline,
  newspaperOutline,
  qrCodeOutline,
  receiptOutline,
  removeOutline,
  searchCircleOutline,
  sendOutline,
  statsChart,
} from "ionicons/icons";

const SideBarMenu: React.FC = () => {
  const [present] = useIonAlert();
  const logout = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace("/");
  };
  const logoutAlert = () => {
    present({ header: "로그아웃", message: "정말로 로그아웃 하시겠습니까?", buttons: ["취소", { text: "확인", handler: logout }] });
  };

  const gettingReadyAlert = () => {
    present({ header: "준비중", message: "준비중 입니다.", buttons: ["확인"] });
  };
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
            <IonIcon src={removeOutline} color="dark"></IonIcon>
          </IonListHeader>
          <IonMenuToggle auto-hide="false">
            <IonRouterLink href="/mywallet">
              <IonItem button>
                <IonIcon src={cardOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>내지갑</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/payment">
              <IonItem button>
                <IonIcon src={newspaperOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>판매</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/list/sell">
              <IonItem button>
                <IonIcon src={receiptOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>판매내역</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/purchasehistorysell">
              <IonItem button>
                <IonIcon src={statsChart} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>판매집계</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/scan">
              <IonItem button>
                <IonIcon src={qrCodeOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>구매</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/list/buy">
              <IonItem button>
                <IonIcon src={receiptOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>구매내역</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/purchasehistorybuy">
              <IonItem button>
                <IonIcon src={statsChart} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>구매집계</IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonMenuToggle>
        </IonList>

        <IonList>
          <IonListHeader>
            <a style={{ fontWeight: "bold", color: "black" }}>금융</a>
            <IonIcon src={removeOutline} color="dark"></IonIcon>
          </IonListHeader>
          <IonMenuToggle auto-hide="false">
            {/* <IonRouterLink href="/balanceinquiry">
              <IonItem button>
                <IonIcon src={searchCircleOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>매출조회</IonLabel>
              </IonItem>
            </IonRouterLink> */}
            {/* <IonItem button onClick={gettingReadyAlert}>
              <IonIcon src={searchCircleOutline} slot="start" name="home" color="dark"></IonIcon>
              <IonLabel>매출조회</IonLabel>
            </IonItem> */}

            <IonRouterLink href="/swap">
              <IonItem button>
                <IonIcon src={logoUsd} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>환전</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/inout">
              <IonItem button>
                <IonIcon src={sendOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>송금</IonLabel>
              </IonItem>
            </IonRouterLink>

            {/* <IonItem button onClick={gettingReadyAlert}>
              <IonIcon src={sendOutline} slot="start" name="home" color="dark"></IonIcon>
              <IonLabel>송금</IonLabel>
            </IonItem> */}

            <IonRouterLink href="/totalpoint">
              <IonItem button onClick={gettingReadyAlert}>
                <IonIcon src={cashOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>적립</IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonMenuToggle>
        </IonList>

        <IonList>
          <IonListHeader>
            <a style={{ fontWeight: "bold", color: "black" }}>생활</a>
            <IonIcon src={removeOutline} color="dark"></IonIcon>
          </IonListHeader>
          <IonMenuToggle auto-hide="false">
            <IonRouterLink href="/notice">
              <IonItem button>
                <IonIcon src={megaphoneOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>공지사항</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/event">
              <IonItem button>
                <IonIcon src={diamondOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>이벤트</IonLabel>
              </IonItem>
            </IonRouterLink>
            <IonRouterLink href="/board">
              <IonItem button>
                <IonIcon src={chatbubblesOutline} slot="start" name="home" color="dark"></IonIcon>
                <IonLabel>자유 게시판</IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonMenuToggle>
        </IonList>

        <IonList>
          <IonListHeader>
            <a style={{ fontWeight: "bold", color: "black" }}></a>
            <IonIcon src={removeOutline} color="dark"></IonIcon>
          </IonListHeader>

          <IonMenuToggle auto-hide="false">
            <IonItem button onClick={logoutAlert}>
              <IonIcon src={logOutOutline} slot="start" name="home" color="dark"></IonIcon>
              <IonLabel>로그아웃</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideBarMenu;
