import { request } from "@/utils"
import type { SearchHot, RootObject } from "./type"
export const getSearchHot = (): Promise<SearchHot> => request.get('/search/hot')
export const getSearchSuggest = (keywords: string): Promise<RootObject> => request.get('/search/suggest', { params: { keywords } })