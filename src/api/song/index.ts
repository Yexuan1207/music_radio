import { request } from "@/utils";
import type { SongDetail } from "./type";
import type { TopSongsResponse } from "./getTopSongsType";

export const getSongDetail = (ids: number[]): Promise<SongDetail> => request.get(`/song/detail?ids=${ids}`)

export const getTopSongsApi = (type: number): Promise<TopSongsResponse> => request.get(`/top/song?type=${type}`)