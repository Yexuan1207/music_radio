import { getUserDetail, getUserPlaylist } from "@/api/user";
import type { Profile, Playlist } from "@/api/user/type";
import { isDef, notify, UID_KEY } from "@/utils";
import storage from "good-storage";
import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import router from "@/router";
export const useUserStore = defineStore('user', () => {
    //用户登录
    const user = ref<Partial<Profile>>({})
    //登录歌单
    const userPlaylist = ref<Playlist[]>([] as Playlist[])


    const isLogin = computed(() => isDef(user.value.userId))

    //方法
    //登录
    const login = async (uid: number) => {
        const error = () => {
            notify('登录失败', 'error')
            return false
        }
        if (!isDef(uid)) {
            return error()
        }
        try {
            const res = await getUserDetail(uid)
            const { profile } = res
            user.value = profile
            storage.set(UID_KEY, profile.userId)
        } catch (e) {
            return error()
        }

        //获取用户歌单
        const { playlist } = await getUserPlaylist(uid)
        userPlaylist.value = playlist

        return true

    }
    //登出
    const logout = () => {
        user.value = {}
        userPlaylist.value = []
        storage.remove(UID_KEY)
        router.push('/discovery')
    }

    //菜单配置
    const userMenus = computed(() => {
        //最终返回菜单
        const retMenu = ref<any[]>([])
        //用户创建菜单
        const userCreateMenu = ref<Playlist[]>([])
        //用户收藏
        const userCollectMenu = ref<Playlist[]>([])
        userPlaylist.value.forEach(e => {
            const { userId } = e
            if (user.value.userId === userId) {
                userCreateMenu.value.push(e)
            } else {
                userCollectMenu.value.push(e)
            }


        });

        const getPlaylistChildren = (playlist: Playlist[]) => {
            return playlist.map(({ id, name }) => {
                return {
                    path: `/playlist/${id}`,
                    meta: {
                        title: name,
                        icon: 'material-symbols:playlist-add-check'
                    }
                }
            })
        }
        if (userCreateMenu.value.length) {

            retMenu.value.push({
                type: 'playlist',
                title: "创建歌单",
                children: getPlaylistChildren(userCreateMenu.value)
            })

        }
        if (userCollectMenu.value.length) {

            retMenu.value.push({
                type: 'playlist',
                title: "收藏歌单",
                children: getPlaylistChildren(userCollectMenu.value)
            })
        }


        return retMenu.value
    })
    return {
        user, userPlaylist, isLogin,
        userMenus,
        login, logout
    }
})