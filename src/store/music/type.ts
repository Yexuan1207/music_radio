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

export type createSong = {

    id: number;
    name: string;
    artists: Artist2[];
    duration: number;
    albumName: string;
    url: string;
    artistsText: string;
    durationSecond: number;
    albumId: number;
    mvId: number;
    img?: string

}