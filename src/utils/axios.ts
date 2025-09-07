import axios from "axios";
import { ElLoading } from 'element-plus'
const BASE_URL = 'http://localhost:3000/'
import { confirm } from "@/base/confirm";
import { useGlobalStore } from "@/store/global";
const createBaseInstance = () => {
    const instance = axios.create({
        baseURL: BASE_URL,
    })
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}
const handleResponse = (response: any) => {
    return response.data
}
const handleError = (error: any) => {
    confirm(error.message, '出错了', () => {
        console.log(111);

    })
    return Promise.reject(error)
}
const requstWithoutLoading = createBaseInstance()
const request = createBaseInstance()


let loading: any
let loadingCount = 0
const mixinLoading = (interceptors: any) => {

    const loadingRequestInterceptor = (config: any) => {
        if (!loading) {
            loading = ElLoading.service({
                target: 'body',
                background: 'transparent',
                text: '载入中',
            })
        }
        loadingCount++
        return config
    }
    const handleResponseLoading = () => {
        const globalStore = useGlobalStore()

        loadingCount--
        if (loadingCount === 0) {
            loading.close()
            loading = null
            globalStore.setAxiosLoading(false)
        }
    }
    const loadingResponseInterceptor = (response: any) => {
        handleResponseLoading()
        return response
    }
    const loadingResponseErrorInterceptor = (error: any) => {

        handleResponseLoading()
        return Promise.reject(error)
    }
    interceptors.request.use(loadingRequestInterceptor)
    interceptors.response.use(loadingResponseInterceptor,
        loadingResponseErrorInterceptor)



}
mixinLoading(request.interceptors)
export {
    request,
    requstWithoutLoading
}

