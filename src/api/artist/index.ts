import { request } from "@/utils";
import type { Artists } from "./type";

export const getArtists = (id: number): Promise<Artists> => request.get(`/artists?id=${id}`)