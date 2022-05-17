import CustomAxios from "../../common/customAxios"

export default class Point {
    public static view = async (uid : string) => {
        let res = await CustomAxios.get(`/point/balance/${uid}`)
        return res.data.data.totalPoint
    }

    public static swap = async (uid: string, symbol: string ,quantity : string) => {
        let payload = {symbol : symbol, quantity : quantity}
        CustomAxios.post(`/point/tocoin/${uid}`, payload)
    }

    public static total = async (uid : string) => {
        let res = await CustomAxios.get(`/point/total/${uid}`)
        return res.data.data
    }
}