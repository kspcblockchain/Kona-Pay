import axios from "axios";
import CustomAxios from "../../common/customAxios";

export default class BuySellList {
  public static sellList = async (sellerUid: string, status: string, _limit: number, _offset: number) => {
    let res = await CustomAxios.get(`/sell/list?sellerUid=${sellerUid}&status=${status}&limit=${_limit}&offset=${_offset}`);
    console.log("seller list : ", res);

    return res.data.data.rows;
  };

  public static buyList = async (buyerUid: string, status: string, _limit: number, _offset: number) => {
    let res = await CustomAxios.get(`/buy/list?buyerUid=${buyerUid}&status=${status}&limit=${_limit}&offset=${_offset}`);
    console.log("buyer list : ", res);

    return res.data.data.rows;
  };

  public static productItem = async (sellIdx: number) => {
    let res = await CustomAxios.get(`/buy/select/${sellIdx}`);
    console.log("productItem res : ", res);
    let product = res.data.data;
    return product;
  };

  public static buyUpdate = async (sellIdx: number) => {
    const payload = { sellIdx };
    let res = await CustomAxios.patch(`/buy/${sellIdx}/reject`, payload);

    return res;
  };
  public static sellUpdate = async (payload: any) => {
    const { sellIdx } = payload;
    console.log("sellUpdate sellIdx : ", sellIdx);
    console.log("sellUpdate payload : ", payload);
    let res = await CustomAxios.patch(`/sell/${sellIdx}/update`, payload);

    return res;
  };

  static buyProduct = async (sellIdx: number, sellerUid: string, buyerUid: string, symbol: string, quantity: number) => {
    const payload = { sellerUid, buyerUid, symbol, quantity };
    console.log("selleIdx : ", sellIdx);
    console.log("paylaod : ", payload);
    let res = await CustomAxios.post(`/buy/pay/${sellIdx}`, payload);
    console.log("buyProduct res : ", res);

    return res;
  };

  public static totalBuy = async (buyerUid: string) => {
    let res = await CustomAxios.get(`/buy/total/${buyerUid}`)
    return res.data.data
}

}
