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
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { heart } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Board from "../../../model/board/board";

const BoardRead: React.FC = () => {
  const history = useHistory();
  const params = useParams();

  const date = "2022-04-20T10:47:20Z";
  const count = 2;
  const [likeCount, setLikeCount] = useState(0);
  const [postCategory, setPostCategory] = useState<string>("");
  const [postUid, setPostUid] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [postUpdatedAt, setPostUpdatedAt] = useState<string>("");
  const [postCreatedAt, setPostCreatedAt] = useState<string>("");
  const [postView, setPostView] = useState<number>(0);
  const setBoardData = async () => {
    // @ts-ignore
    const boardIdx: number = params["boardIdx"] as number;
    console.log("boardIdx : ", boardIdx);
    try {
      const boardData = await Board.getBoard(boardIdx);
      boardData[`postCreatedAt`] = `${boardData[`postCreatedAt`].split("T")[0]} ${boardData[`postCreatedAt`].split("T")[1].split(".")[0]}`;
      boardData[`postUpdatedAt`] = `${boardData[`postUpdatedAt`].split("T")[0]} ${boardData[`postUpdatedAt`].split("T")[1].split(".")[0]}`;
      let category = "";
      switch (boardData?.postType) {
        case "C":
          category = "자유 게시판";
          break;
        case "E":
          category = "이벤트";
          break;
        case "A":
          category = "공지사항";
          break;
      }
      console.log(boardData);
      setPostCategory(category);
      setPostUid(boardData?.uid);
      setPostUpdatedAt(boardData?.postUpdatedAt);
      setPostCreatedAt(boardData?.postCreatedAt);
      setPostTitle(boardData?.postTitle);
      setPostContent(boardData?.postContent);
      setPostView(boardData?.view);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    setBoardData();
  }, []);
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/board" text={""} color="dark" />
            </IonButtons>
            <IonTitle>게시판</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonRow>
              <IonCol>{postCategory}</IonCol>
              {/* <IonCol>asd</IonCol> */}
            </IonRow>
          </IonItem>
          <IonCard>
            <IonCardHeader>
              <IonGrid>
                {/* 프로필 사진 */}
                {/* <div style={{ width: "60px", height: "60px", backgroundColor: "black", borderRadius: "50%" }} /> */}
                <IonRow>
                  <IonCol>
                    <IonRow>작성자 : {postUid}</IonRow>
                    <IonRow>작성일 : {postCreatedAt}</IonRow>
                    {/* <IonRow>수정일 : {postUpdatedAt}</IonRow> */}
                    <IonRow>조회수 : {postView}</IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>{postTitle}</div>
              </IonItem>
              <IonItem>
                <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
              </IonItem>
            </IonCardContent>
            <IonFooter>
              {/* 좋아요 버튼 */}
              {/* <IonItem>
                <IonIcon icon={heart} color="danger" onClick={() => setLikeCount(likeCount + 1)}></IonIcon>
                <IonText>{likeCount}</IonText>
              </IonItem> */}
            </IonFooter>
          </IonCard>
          {/* 댓글 */}
          {/* <IonCard>
            <IonCardHeader>답변 {count}</IonCardHeader>

            <IonCard class="뎃글 카드 시작점">
              <IonItem>
                <IonGrid>
                  <IonRow>
                    <div style={{ width: "60px", height: "60px", backgroundColor: "black", borderRadius: "50%" }} />
                    <IonCol>
                      <IonRow>작성자</IonRow>
                      <IonRow>{date}</IonRow>
                    </IonCol>
                  </IonRow>
                  <IonItem>
                    <IonCol>
                      <IonText>value={postContent}</IonText>
                    </IonCol>
                  </IonItem>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonIcon icon={heart} color="danger" onClick={() => setLikeCount(likeCount + 1)}></IonIcon>
                <IonText>{likeCount}</IonText>
              </IonItem>
            </IonCard>
          </IonCard> */}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default BoardRead;
