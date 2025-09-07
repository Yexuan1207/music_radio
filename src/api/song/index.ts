import { request } from "@/utils";
import type { SongDetail } from "./type";

export const getSongDetail = (ids: number[]): Promise<SongDetail> => request.get(`/song/detail?ids=${ids}`)