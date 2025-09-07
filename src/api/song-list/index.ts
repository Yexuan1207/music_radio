import { request } from "@/utils";
import type { playlistData } from "./type";

export const getListDetail = (params: any): Promise<playlistData> => {
    return request.get('/playlist/detail', { params })
}