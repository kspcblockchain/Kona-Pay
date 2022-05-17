import CustomAxios from "../../common/customAxios";

export default class Sell {
  public static sell = async (sellerUid: string, productName: string, productPrice: number, description: string, buyerUid: string, getPoint: number) => {
    let payload = { sellerUid, productName, productPrice, description, buyerUid, getPoint };
    let res = await CustomAxios.post(`/sell/post`, payload);
    return res.data.data.insertId;
  };

  public static checkSell = async (sellIdx: number) => {
    let res = await CustomAxios.get(`/sell/select/${sellIdx}`);
    return res.data.data.sellStatus;
  };

  public static totalSell = async (sellerUid: string) => {
    let res = await CustomAxios.get(`/sell/total/${sellerUid}`);
    return res.data.data;
  };
}
