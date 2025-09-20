import { request, requstWithoutLoading } from "@/utils";
import type { PlaylistsData, SimiPlaylistType } from "./type";


export const getPlaylistsApi = (params: any): Promise<PlaylistsData> => request.get('/top/playlist', { params })

export const getTopPlaylistsApi = (params: any): Promise<PlaylistsData> => request.get('/top/playlist/highquality', { params })

export const getSimiPlaylist = (id: number, option?: any): Promise<SimiPlaylistType> => requstWithoutLoading.get(`/simi/playlist?id=${id}`, option)