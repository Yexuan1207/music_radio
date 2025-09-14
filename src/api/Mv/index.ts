import { request } from "@/utils";
import type { simiMv, mvDetail, playInfo, getAllMvsApiType } from "./type";

export const getMvDetail = (id: number): Promise<mvDetail> => request.get(`/mv/detail?mvid=${id}`)

export const getMvUrl = (id: number): Promise<playInfo> => request.get(`/mv/url?id=${id}`)

export const getSimiMv = (id: number): Promise<simiMv> => request.get(`/simi/mv?id=${id}`)

export const getAllMvsApi = (params: any): Promise<getAllMvsApiType> => request.get(`/mv/all`, { params })