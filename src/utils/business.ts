/**
 * 业务工具方法
 */
import type { Artist2 } from "@/api/search/type";
import { isDef, notify } from "./common";
import { getAlbum } from "@/api";
import { getMvDetail } from "@/api";
import router from "@/router";

//！！！！！！！！！这是组合api钩子，只能在Vue的setup中使用，在js和ts会返回undefinded
// import { useRouter } from "vue-router";
// const router = useRouter()
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
export const createSong = (song: any): CreatedSong => {
    const { id, name, img, artists, duration, albumId, albumName, mvId, ...rest } = song;
    return {
        id,
        name,
        img,
        artists,
        duration,
        albumName,
        url: genSongPlayUrl(song.id),
        artistsText: genArtistisText(artists),
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

//获取mv，因为有时候mv不存在，所以需要try catch
export const goMvWidthCheck = async (id: number) => {
    try {
        await getMvDetail(id)
        goMv(id)
    } catch (err) {
        notify('mv不存在', "error")
        console.log(err)
    }
}

export const goMv = (id: number) => {
    router.push(`/mv/${id}`)
}
const genSongPlayUrl = (id: number) => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`

}