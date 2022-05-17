import CustomAxios from "../../common/customAxios";

export default class Signin {
  public static signin = async (uid: string, password: string) => {
    let payload = { uid: uid, password: password };
    let res = await CustomAxios.post(`/user/login`, payload);
    return res.data.data;
  };
}
