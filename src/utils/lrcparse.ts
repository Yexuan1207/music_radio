import type { lyricType } from "@/api/song/type";

export default function lyricParser(lrc: lyricType) {
    return {
        'lyric': parseLyric(lrc.lrc.lyric || ''),
        'tlyric': parseLyric(lrc.tlyric.lyric || ""), //翻译歌词
        'lyricuser': lrc.lyricUser,
        "transuser": lrc.transUser
    }

}

export function parseLyric(lrc: string) {
    const lyrics = lrc.split("\n");
    const lrcObj = []

    for (let i = 0; i < lyrics.length; i++) {
        const lyric = decodeURIComponent(lyrics[i])
        const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        const timeRegArr = lyric.match(timeReg)

        if (!timeRegArr) continue
        const content = lyric.replace(timeReg, '')
        for (let k = 0; k < timeRegArr.length; k++) {
            const t = timeRegArr[k]
            // const min = Number(String(t.match(/\[\d*/i)).slice(1))
            const min = Number(String(t.match(/\[\d*/i)).slice(1))
            const sec = Number(String(t.match(/:\d*/i)).slice(1))

            const time = min * 60 + sec
            if (content != "") {
                lrcObj.push({ time, content })
            }
        }
    }
    return lrcObj

}