import { ElMessage } from 'element-plus'


export { debounce, throttle } from 'lodash-es'

export const isDef = (v: any) => {
    return v !== undefined && v !== null
}

export const shallowEqual = (a: any, b: any, compareKey: string) => {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
        let compareA = a[i]
        let compareB = b[i]
        if (compareKey) {
            compareA = compareA[compareKey]
            compareB = compareB[compareKey]
        }
        if (!Object.is(compareA, compareB)) {
            return false
        }
    }
    return true
}
// 图片url处理
export const getImgUrl = (url: string, w: number, h?: number) => {
    if (!h) h = w
    url += `?param=${w}y${h}`
    return url
}


export const pad = (num: any, n = 2) => {
    let len = num.toString().length
    if (len < n) {
        num = '0' + num
    }
    return num
}

//格式化时间
export const formatTime = (time: number) => {
    time = time | 0
    const minute = pad(time / 60 | 0)
    const second = pad(time % 60)
    return `${minute}:${second}`
}

export const getPageOffset = (page: number, limit: number) => {
    return (page - 1) * limit
}

export const isLast = (index: number, list: any[]) => {
    return index === list.length - 1
}

//提示
type type = 'success' | 'error' | 'info' | 'warning'
export const notify = (message: string, type: type) => {
    const params = {
        message,
        duration: 1500
    }
    return type ? ElMessage[type](params) : ElMessage(params)
}


//格式化数据
export const formatData = (num: number) => {
    //转换失败为0
    num = Number(num) || 0
    //四舍五入
    return num > 10000 ? `${Math.round(num / 10000)}万` : num
}
//格式化事件
// export const formatDate = (date: any, fmt = 'yyyy-MM-dd hhh:mm:ss') => {
//     const dateObj = date instanceof Date ? date : new Date(date)
//     //获取年份
//     if (/(y+)/.test(fmt)) {
//         fmt=fmt.replace(RegExp.$1,(dateObj.getFullYear()+'').substr(4-RegExp.$1.length))
//     }
// }