import "./Board.css";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router";
import axios from "axios";

const BoardWirte: React.FC = () => {
  const history = useHistory();
  const quillRef = useRef<ReactQuill>();
  const [present] = useIonAlert();
  const [category, setCategory] = useState<string>("C");
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>("");
  const [thumnail, setThumnail] = useState<string>("");
  const [imgCheck, setImgCheck] = useState<boolean>(false);

  // Axios boardUpload
  const boardUploadHandler = async () => {
    if (!category || !title || !content) {
      present({
        cssClass: "my-css",
        header: "글 등록 실패",
        message: "빈칸이 남았습니다.",
        buttons: ["확인"],
      });
      return;
    }
    try {
      const uid = sessionStorage.getItem("uid");
      const APIURL = `${process.env.REACT_APP_SERVER}/board/post`;
      const payload = {
        uid: uid,
        postType: category,
        postTitle: title,
        postContent: content,
        postThumnail: thumnail,
      };
      const axiosOption = { withCredentials: true };
      console.log(payload);
      const result = await axios.post(APIURL, payload);
      console.log("boardUpload Sucess : ", result);
      history.push({ pathname: "/board" });
    } catch (error) {
      console.error(error);
    }
  };
  // reactQuill Image HTML Text Formatting Handler
  const imageHandler = () => {
    const input: any = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("img", file);
      console.log("input.files : ", input.files[0]);
      console.log("file : ", file);

      try {
        const apiUrl = `${process.env.REACT_APP_SERVER}/board/img`;
        const result = await axios.post(apiUrl, formData, { headers: { "Content-Type": `multipart/form-data` } });
        console.log("result : ", result);
        console.log("result.data.IMG_URL : ", result.data.IMG_URL);
        const tmp = `${process.env.REACT_APP_SERVER}`;
        const serverUrl = tmp.substring(0, tmp.length - 3);
        console.log("serverUrl : ", serverUrl?.substring(0, serverUrl.length - 3));
        const IMG_URL = `${serverUrl}${result.data.IMG_URL}`;
        console.log("IMG_URL : ", IMG_URL);
        console.log("quillRef : ", quillRef.current);
        console.log("quillRef.editor : ", quillRef.current?.getEditor());
        console.log("quillRef.editor.getSelection : ", quillRef.current?.getEditor().getSelection());

        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();
        editor?.insertEmbed(range?.index as any, "image", IMG_URL);
        if (!imgCheck) {
          console.log("thumImg check : ", imgCheck);
          setThumnail(IMG_URL);
          setImgCheck(true);
        }
      } catch {
        console.error("reactQuill IMG URL FORMATTING ERROR");
        console.trace();
      }
    });
  };

  // reactQuill Config
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [["image"], [{ header: [1, 2, 3, false] }], ["bold", "italic", "underline", "strike", "blockquote"]],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);
  const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "image"];
  //Max VAlue checker
  const checkCharacterCount = (event: any) => {
    if (content.length > 2048 && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text={""} color="dark" />
          </IonButtons>
          <IonTitle>게시글 작성</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonSelect
              value={category}
              placeholder="Category Select!"
              onIonChange={(e) => {
                console.log("Category : ", e.detail.value);
                setCategory(e.detail.value!);
              }}
            >
              {/* <IonSelectOption value="A">공지사항</IonSelectOption>
              <IonSelectOption value="E">이벤트</IonSelectOption> */}
              <IonSelectOption value="C">자유 게시판</IonSelectOption>
            </IonSelect>
          </IonCardContent>
          <IonCardContent>
            <IonInput
              placeholder="Title here!"
              value={title}
              onIonChange={(e) => {
                console.log("Title : ", e.detail.value);
                setTitle(e.detail.value!);
              }}
            ></IonInput>
          </IonCardContent>
          <IonCardContent>
            <ReactQuill
              ref={(element) => {
                if (element !== null) quillRef.current = element;
              }}
              onKeyDown={checkCharacterCount}
              modules={modules}
              formats={formats}
              value={content}
              onChange={(value) => {
                setContent(value);
                console.log("Content : ", value);
                console.log("Content : ", content);
              }}
            />
          </IonCardContent>
          <IonCardContent>
            <IonButtons>
              <IonButton
                onClick={() => {
                  history.goBack();
                }}
              >
                취소
              </IonButton>
              <IonButton onClick={boardUploadHandler}>등록</IonButton>
            </IonButtons>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default BoardWirte;
