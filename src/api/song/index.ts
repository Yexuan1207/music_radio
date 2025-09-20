import { request, requstWithoutLoading } from "@/utils";
import type { lyricType, SongDetail } from "./type";
import type { TopSongsResponse, Song } from "./getTopSongsType";

export const getSongDetail = (ids: number[]): Promise<SongDetail> => request.get(`/song/detail?ids=${ids}`)

export const getTopSongsApi = (type: number): Promise<TopSongsResponse> => request.get(`/top/song?type=${type}`)

//歌词
export const getLyric = (id: number | string): Promise<lyricType> => request.get(`/lyric?id=${id}`)

//相似音乐
export const getSimiSongs = (id: number, option?: any): Promise<simiSongs> => requstWithoutLoading.get(`/simi/song?id=${id}`, option)
interface simiSongs {
    songs: Song[];
}