export interface CreatedSong {
    id: number
    name: string
    img?: string
    artists: Array<{ name: string }>
    duration: number
    albumName?: string
    url: string
    artistsText: string
    durationSecond: number
    albumId?: number
    mvId?: number
    [key: string]: any
}