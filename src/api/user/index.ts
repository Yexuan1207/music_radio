import { requstWithoutLoading } from "@/utils"
import type { UserDetail, userPlaylist } from "./type"

export const getUserDetail = (uid: number): Promise<UserDetail> => requstWithoutLoading.get("/user/detail", { params: { uid } })

//获取用户歌单
const PLAYLIST_LIMIT = 100
export const getUserPlaylist = (uid: number): Promise<userPlaylist> => requstWithoutLoading.get("/user/playlist", { params: { uid, limit: PLAYLIST_LIMIT } })
