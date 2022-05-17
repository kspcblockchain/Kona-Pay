import CustomAxios from "../../common/customAxios";

export default class userInfo {
  public static getUser = async (uid: string) => {
    const res = await CustomAxios.get(`/user/select/${uid}`);
    const userInfo = res.data.data;
    return userInfo;
  };
  public static getCoin = async (wallet: string, symbol: string) => {
    const res = await CustomAxios.get(`/${wallet}/getbalance/${symbol}`);
    const coin = res.data.data;
    return coin;
  };

  public static getPoint = async (uid: string) => {
    const res = await CustomAxios.get(`point/balance/${uid}`);
    const totalPoint = res.data.data.totalPoint;
    if (totalPoint === null) {
      return 0;
    }
    return totalPoint;
  };
}
