export interface Song {
    id: number;
    mvid: number;
    name: string;
    artists: Artist[];
    picUrl: string;
    duration: number;
    [key: string]: any;
}
interface Artist {
    img1v1Id: number;
    topicPerson: number;
    musicSize: number;
    albumSize: number;
    briefDesc: string;
    picId: number;
    picUrl: string;
    img1v1Url: string;
    followed: boolean;
    trans: string;
    alias: any[];
    name: string;
    id: number;
    img1v1Id_str: string;
}

import type { Artist2 } from "@/api/search/type";

export type song = {
    mvid: number;
    id: number;
    name: string;
    artists: Artist2;
    duration: number;
    albumName: string;
    url: string;
    artist: string;
    durationSecond: number;
    albumId: number;
    mvId: number;
}



export interface CreatedSongType {
    id: number
    name: string
    img: string
    artists: Array<{ name: string }>
    duration: number
    albumName?: string
    url: string
    artistsText: string
    durationSecond: number
    albumId: number
    mvId: number
    [key: string]: any
}

export type playlistsType = {
    palylists: any[]
}