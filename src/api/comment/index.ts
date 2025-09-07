import { requstWithoutLoading } from "@/utils";
import type { commentType, hotCommentType } from "./type";

//歌曲评论
export const getSongComment = (params: any): Promise<commentType> =>
    requstWithoutLoading.get('/comment/music', { params })

//歌单评论
export const getPlaylistComment = (params: any): Promise<commentType> =>
    requstWithoutLoading.get('/comment/playlist', { params })

//MV评论
export const getMVComment = (params: any): Promise<commentType> =>
    requstWithoutLoading.get('/comment/mv', { params })

//热门评论
export const getHotComment = (params: any): Promise<hotCommentType> =>
    requstWithoutLoading.get('/comment/hot', { params })
