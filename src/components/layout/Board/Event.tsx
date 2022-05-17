import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonPage,
  IonButtons,
  IonButton,
  IonItem,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
  IonThumbnail,
  IonIcon,
} from "@ionic/react";

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
import "./Board.css";
import { chevronBack } from "ionicons/icons";
import { useHistory, useLocation, useParams } from "react-router";
import axios from "axios";

const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName("head")[0].appendChild(meta);

const Event: React.FC = () => {
  const queryString = useLocation();
  const history = useHistory();
  const [data, setData] = useState<string[]>([]);
  const [rowData, setRowData] = useState();
  const [boardData, setBoardData] = useState<any>([]);
  const [param, setParam] = useState<object>();

  useEffect(() => {
    // ?id=react&name=react2 -> id=react&name=react2
    const queryStringStr = queryString.search.replace(/.*?\?/, "");
    let keyValPairs = [];
    let params: object = {};
    if (queryStringStr.length) {
      // ['id=react', 'name=react2']
      keyValPairs = queryStringStr.split("&");
      for (let pairNum in keyValPairs) {
        // id -> name
        const key = keyValPairs[pairNum].split("=")[0];
        if (!key.length) continue;
        // @ts-ignore
        if (typeof params[key] === "undefined") {
          // @ts-ignore
          params[key] = [];
        }
        // @ts-ignore
        params[key].push(keyValPairs[pairNum].split("=")[1]);

        console.log("params : ", Object.keys(params));
      }
      setParam(params);
    }
  }, []);

  const pushSellDataHandler = async () => {
    // const key = param["key"];
    // const value = param["value"];

    const limit = boardData.length + 20;
    const offset = limit == 0 ? 0 : limit - 20;
    // const APIURL = `http://localhost:3200/api/board/list?sellerUid=${"joy"}&status=${"S"}&limit=${limit}&offset=${offset}`;
    // const APIURL = `http://localhost:3200/api/board/list?key=${"C"}&value=${""}&limit=${""}&offset=${""}`;
    const APIURL = `http://3.39.190.151:3200/api/board/list?key=e&limit=${limit}&offset=${offset}`;
    console.log("queryString.search : ", queryString.search);
    console.log("APIURL : ", APIURL);
    const axiosOption = { withCredentials: true };

    const boardInformation = await axios.get(APIURL);
    console.log("boardInformation : ", boardInformation);
    const boardItem = boardInformation.data.data.rows;
    console.log("boardItem : ", boardItem);
    setBoardData([...boardData, ...boardItem]);
  };

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushSellDataHandler();
      console.log("Loaded data");
      ev.target.complete();
    }, 500);
  };

  useIonViewWillEnter(() => {
    pushSellDataHandler();
  });

  const pageMove = async (postIdx: number) => {
    console.log(postIdx);

    history.push({ pathname: `/board/page/${postIdx}` });
  };
  return (
    <IonApp>
      <IonPage className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={""} color="dark" />
            </IonButtons>
            <IonTitle>이벤트</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div>
            <div style={{ margin: "7% 0px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>KONA PAY</div>
              {/* <IonButton onClick={() => history.push({ pathname: "/board/write" })}>글작성</IonButton> */}
            </div>
            <IonList>
              {boardData.map((item: any) => {
                // item[`sellDate`] = item[`sellDate`].split("T")[0];
                console.log(item);

                item[`postUpdatedAt`] = item[`postUpdatedAt`].split("T")[0];
                return (
                  <IonItem
                    key={item.postIdx}
                    onClick={() => {
                      pageMove(item.postIdx);
                    }}
                  >
                    <IonLabel>
                      <h2>{item.postTitle}</h2>
                      <div>
                        <p>{item.postUpdatedAt}</p>
                        <p>{item.view}</p>
                      </div>
                    </IonLabel>
                    {/* <IonThumbnail>
                      {item.postThumnail === "" ? <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" /> : <img src={item.postThumnail}></img>}
                    </IonThumbnail> */}
                    <IonButton slot="end">
                      {item.totalCommentCount}
                      <br />
                      댓글
                    </IonButton>
                  </IonItem>
                );
              })}
              {/* {data.map((item, index) => {
                return (
                  <IonItem
                    key={index}
                    onClick={() => {
                      history.push({ pathname: `/board/page/${item.length}`, state: {} });
                    }}
                  >
                    <IonLabel>
                      <h2>잘 구매한 물건들 입니다.</h2>
                      <div>
                        <p>00:35</p>
                        <p>조회 130회</p>
                      </div>
                    </IonLabel>
                    <IonThumbnail>
                      <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                    </IonThumbnail>
                    <IonButton slot="end">
                      32
                      <br />
                      댓글
                    </IonButton>
                  </IonItem>
                );
              })} */}
            </IonList>

            <IonInfiniteScroll onIonInfinite={loadData} threshold="100px">
              <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..." />
            </IonInfiniteScroll>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Event;
