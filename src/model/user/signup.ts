import CustomAxios from "../../common/customAxios"

export default class Signup {
    public static signup = async (uid: string, password: string, name: string, email: string, userType: string) => {
        let payload = {uid :uid, password :password, name: name, email: email, userType: userType}
        let res =  await CustomAxios.post(`/user/regist`, payload)
    }

    public static uid = async (uid: string) => {
        let payload = {uid :uid}
        let res =  await CustomAxios.post(`/user/regist/uidcheck`, payload)
        return res.data.data[0].state
    }

    public static email = async (email: string) => {
        let payload = {email: email}
        let res =  await CustomAxios.post(`/user/regist/emailcheck`, payload)
        return res.data.data[0].state
    }
}