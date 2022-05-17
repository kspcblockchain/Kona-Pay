import React, { useEffect } from "react";
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonPage,
  IonButtons,
  IonButton,
  IonItem,
  IonRouterOutlet,
  useIonAlert,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
// import { Redirect, Route } from "react-router-dom";
// import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./components/assets/css/main.css";

/* layout */
import Main from "./components/layout/Main/Main";
import PayToCamera from "./components/layout/PurchaseHistory/PurchaseHistory";
import Payment from "./components/layout/Payment/Payment";
import Payment2 from "./components/layout/Payment/Payment2";
import Payment3 from "./components/layout/Payment/Payment3";
import Payment4 from "./components/layout/Payment/Payment4";
import PurchaseHistory from "./components/layout/PurchaseHistory/PurchaseHistory";
import Inout from "./components/layout/inout/Layout";
import SendKSPC from "./components/layout/SendKSPC/SendKSPC";
import MyWallet from "./components/layout/MyWallet/MyWallet";
import Board from "./components/layout/Board/Board";
import Notice from "./components/layout/Board/Notice";
import Event from "./components/layout/Board/Event";
import BoardWrite from "./components/layout/Board/BoardWrite";
import BoardRead from "./components/layout/Board/BoardRead";
import SignUpPage1 from "./components/layout/signUp/SignUpPage1";
import SignUpPage2 from "./components/layout/signUp/SignUpPage2";
import SignUpPage3 from "./components/layout/signUp/SignUpPage3";
import QrReaderPage from "./components/layout/QrReaderPage/QrReaderPage";
import SwapPage from "./components/layout/swap/Layout";
import ProductDetail from "./components/layout/ProductDetail/ProductDetail";
import Login from "./components/layout/Login/Login";
import SellerList from "./components/layout/List/SellerList";
import BuyerList from "./components/layout/List/BuyerList";
import PotinTotal from "./components/layout/PointTotal/PotinTotal";

const App: React.FC = () => {
  const [paste] = useIonAlert();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/login">
            <Login></Login>
          </Route>

          <Route exact path="/signuppage1">
            <SignUpPage1 />
          </Route>
          {/* <Route exact path="/signuppage2">
          <SignUpPage2 />
        </Route> */}
          <Route exact path="/signuppage3">
            <SignUpPage3 />
          </Route>

          <Route exact path="/scan">
            <QrReaderPage />
          </Route>
          <Route exact path="/detail/:productIdx">
            <ProductDetail />
          </Route>
          <Route exact path="/swap">
            <SwapPage />
          </Route>
          <Route exact path="/totalpoint">
            <PotinTotal />
          </Route>
          {/* <Route exact path="/"> < /> </Route> */}

          <Route exact path="/purchasehistorybuy">
            <PurchaseHistory type="buy" />
          </Route>

          <Route exact path="/purchasehistorysell">
            <PurchaseHistory type="sell" />
          </Route>

          <Route exact path="/inout">
            <Inout />
          </Route>
          <Route exact path="/sendkspc">
            <SendKSPC />
          </Route>

          <Route exact path="/mywallet">
            <MyWallet />
          </Route>

          <Route exact path="/board">
            <Board />
          </Route>
          <Route exact path="/notice">
            <Notice />
          </Route>
          <Route exact path="/event">
            <Event />
          </Route>
          <Route exact path="/board/write">
            <BoardWrite />
          </Route>
          <Route exact path="/board/page/:boardIdx">
            <BoardRead />
          </Route>

          <Route exact path="/payment">
            <Payment />
          </Route>
          <Route exact path="/payment2">
            <Payment2 />
          </Route>
          <Route exact path="/payment3">
            <Payment3 />
          </Route>
          <Route exact path="/payment4">
            <Payment4 />
          </Route>

          <Route exact path="/list/sell">
            {" "}
            <SellerList />{" "}
          </Route>
          <Route exact path="/list/buy">
            {" "}
            <BuyerList />{" "}
          </Route>

          <Route exact path="/list/sell">
            {" "}
            <SellerList />{" "}
          </Route>
          <Route exact path="/list/buy">
            {" "}
            <BuyerList />{" "}
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
