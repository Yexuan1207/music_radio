import { request } from "@/utils";
import type { AlbumResponse } from "./type";

export const getAlbum = (albumId: number): Promise<AlbumResponse> => request.get(`/album?id=${albumId}`)
