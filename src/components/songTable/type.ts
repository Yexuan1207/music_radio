export interface Song {
    albumId?: number,
    albumName: string,
    artist: string,
    artists: Arrtist[],
    duration: number,
    durationSecond: number,
    id: number,
    img: string,
    mvId: number,
    name: string,
    url: string,

}

type Arrtist = {
    alias: [],
    id: number,
    name: string,
    tns: []
}