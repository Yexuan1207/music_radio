/**
 * 业务工具方法
 */
import type { Artist2 } from "@/api/search/type";
import { isDef } from "./common";
import { getAlbum } from "@/api";
//获取歌手名字
interface song {
    id: number;
    name: string;
    artists: Artist2[];
    duration: number;
    mvid: number;
    albumId: number;
    albumName: string;
    mvId: number;
}
interface CreatedSong {
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
export const createSong = (song: any): CreatedSong => {
    const { id, name, artists, duration, albumId, albumName, mvId, ...rest } = song;
    return {
        id,
        name,
        artists,
        duration,

        albumName,
        url: genSongPlayUrl(song.id),
        artist: genArtistisText(artists),
        durationSecond: duration / 1000,
        albumId,
        mvId,
        ...rest
    }
}
export const genArtistisText = (artists: Artist2[]) => {
    //[]可能没有name
    return artists.map(({ name }) => name || []).join('/')
}
export const getSongImg = async (id: number, albumId: number) => {
    if (!isDef(albumId)) {
        throw new Error('need albumId')
    }
    const { songs } = await getAlbum(albumId)
    const { al } = songs.find((item) => item.id === id) || {}
    return al?.pic_str

}

const genSongPlayUrl = (id: number) => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`

}