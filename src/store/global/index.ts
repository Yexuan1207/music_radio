import { defineStore } from 'pinia'
export const useGlobalStore = defineStore('global', {
    state: () => ({
        axiosLoading: false,
    }),
    actions: {
        setAxiosLoading(loading: boolean) {
            this.axiosLoading = loading
        }
    }
})
