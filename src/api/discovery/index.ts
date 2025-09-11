import { request } from "@/utils";
import type { BannerData, MvsData, NewSongsData, SongData } from "./type";

export const getBanner = (): Promise<BannerData> => request.get('/banner?type=0')

export const getNewSongs = (): Promise<SongData> => request.get('/personalized/newsong')

export const getPersonalized = (params: any): Promise<NewSongsData> => request.get('/personalized', { params })

export const getPersonalizedMv = (): Promise<MvsData> => request.get('/personalized/mv')