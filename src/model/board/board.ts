import CustomAxios from "../../common/customAxios";

export default class Board {
  public static getBoard = async (boardIdx: number) => {
    let res = await CustomAxios.get(`/board/select/${boardIdx}`);
    console.log(res);
    return res.data.data[0];
  };
}
