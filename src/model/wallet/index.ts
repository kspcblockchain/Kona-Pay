import CustomAxios from "../../common/customAxios";

export default class Wallet {
  public static FromTransfer = async (wallet: string, symbol: string, sendPrice: number, toAddress: string) => {
    const payload = { toAddress, quantity: sendPrice };
    let res = await CustomAxios.post(`/${wallet}/fromtransfer/${symbol}`, payload);
    return res.data;
  };
}
