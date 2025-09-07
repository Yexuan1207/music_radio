import { defineStore } from "pinia";
import type { createSong, song } from "./type";
import { getSongImg, shallowEqual } from "@/utils";
import storage from "good-storage";
import { PLAY_HISTORY_KEY } from "@/utils";


const useMusicStore = defineStore('music', {
    state: () => ({
        currentSong: {} as createSong,
        playing: false,
        playHistory: storage.get(PLAY_HISTORY_KEY, []),
        //播放列表
        playlist: [] as createSong[],
        //播放列表显示
        isPlaylistShow: false,
        // 播放提示显示
        isPlaylistPromptShow: false,
        // 歌曲详情页显示
        isPlayerShow: false,
    }),
    actions: {
        async startSong(rawSong: any) {
            const song = Object.assign({}, rawSong)
            //如果歌曲没有名字&album有图片
            if (!song.img && song.albumId) {
                song.img = await getSongImg(song.id, song.albumId)
            }
            this.currentSong = song
            this.playing = true

            //历史记录
            const playHistoryCopy = [...this.playHistory]
            const findedIndex = playHistoryCopy.find(item => item.id === song.id)
            if (findedIndex !== -1) {
                playHistoryCopy.slice(findedIndex, 1)
            }
            playHistoryCopy.unshift(song)
            this.playHistory = playHistoryCopy
            storage.set(PLAY_HISTORY_KEY, playHistoryCopy)
        },

        //播放列表
        async addToPlaylist(song: any) {
            const copy = [...this.playlist]
            if (!copy.find(item => item.id === song.id)) {
                copy.unshift(song)
                const oldPlaylist = [...this.playlist]
                this.playlist = copy
                if (!this.isPlaylistShow && !shallowEqual(oldPlaylist, copy, 'id')) {
                    this.isPlaylistPromptShow = true
                    setTimeout(() => {
                        this.isPlaylistPromptShow = false
                    }, 2000);
                }

            }
        },

        setPlaylist(playlist: any) {
            const oldPlaylist = [...this.playlist]
            this.playlist = playlist
            if (!this.isPlaylistPromptShow && !shallowEqual(oldPlaylist, playlist, 'id')) {
                this.isPlaylistPromptShow = true
                setTimeout(() => {
                    this.isPlaylistPromptShow = false

                }, 2000);
            }
        }
    }
})
export default useMusicStore
