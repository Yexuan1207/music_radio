import { defineStore } from "pinia";
import type { createSong, song } from "./type";
import { getSongImg, shallowEqual } from "@/utils";
import storage from "good-storage";
import { PLAY_HISTORY_KEY } from "@/utils";
import { computed, ref } from "vue";
import { playModeMap } from "@/utils";
const useMusicStore = defineStore('music', () => {
    const currentSong = ref<createSong | null>(null)
    const playing = ref(false)
    const playHistory = ref(storage.get(PLAY_HISTORY_KEY, []))
    const playlist = ref<createSong[]>([])
    //播放列表显示
    const isPlaylistShow = ref(false)
    // 播放提示显示
    const isPlaylistPromptShow = ref(false)
    // 歌曲详情页显示
    const isPlayerShow = ref(false)
    //播放状态
    const isPlaying = ref(false)
    //播放模式
    const playMode = ref(playModeMap.sequence.code)
    //播放时长
    const currentTime = ref(0)
    const startSong = async (rawSong: any) => {
        const song = Object.assign({}, rawSong)
        if (!song.img && song.albumId) {
            song.img = await getSongImg(song.id, song.albumId)
        }
        currentSong.value = song
        isPlaying.value = true

        // 历史记录
        const playHistoryCopy = [...playHistory.value]
        const findedIndex = playHistoryCopy.find(item => item.id === song.id)
        if (findedIndex !== -1) {
            playHistoryCopy.slice(findedIndex, 1)
        }
        playHistoryCopy.unshift(song)
        playHistory.value = playHistoryCopy
        storage.set(PLAY_HISTORY_KEY, playHistoryCopy)
    }
    //切换模式
    const setPlayMode = (newMode: string) => {
        playMode.value = newMode;
    }
    //切换播放列表展示
    const setPlaylistShow = () => {
        isPlaylistShow.value = !isPlaylistShow.value
    }
    //播放列表
    const addToPlaylist = (song: any) => {
        const copy = [...playlist.value]
        if (!copy.find(item => item.id === song.id)) {
            copy.unshift(song)
            const oldPlaylist = [...playlist.value]
            playlist.value = copy
            if (!isPlaylistShow.value && !shallowEqual(oldPlaylist, copy, 'id')) {
                isPlaylistPromptShow.value = true
                setTimeout(() => {
                    isPlaylistPromptShow.value = false
                }, 2000);
            }
        }
    }

    const setPlaylist = (newPlaylist: any) => {
        const oldPlaylist = [...playlist.value]
        playlist.value = newPlaylist
        if (!isPlaylistPromptShow.value && !shallowEqual(oldPlaylist, newPlaylist, 'id')) {
            isPlaylistPromptShow.value = true
            setTimeout(() => {
                isPlaylistPromptShow.value = false
            }, 2000);
        }
    }

    //下一首&下一首
    const currentIndex = computed(() => {
        return playlist.value.findIndex(item => item.id === currentSong.value?.id)
    })
    const getRadomIndex = () => {
        if (playlist.value.length === 1) return currentIndex.value
        let index = Math.round(Math.random() * (playlist.value.length - 1))
        if (index == currentIndex.value) {
            index = getRadomIndex()
        }
        return index
    }
    const preSong = computed(() => {
        const getSequencePreIndex = () => {
            let preIndex = currentIndex.value - 1
            if (preIndex < 0) {
                preIndex = playlist.value.length - 1
            }
            return preIndex
        }
        const getLoopPreIndex = () => {
            return currentIndex.value
        }
        const getRandomPreIndex = () => {
            return getRadomIndex()
        }
        const preStartMap = {
            [playModeMap.sequence.code]: getSequencePreIndex,
            [playModeMap.loop.code]: getLoopPreIndex,
            [playModeMap.random.code]: getRandomPreIndex,
        }
        const getPreStart = preStartMap[playMode.value]
        const index = getPreStart()
        return playlist.value[index]


    })
    const nextSong = computed(() => {
        const getSequenceNextIndex = () => {
            let nextIndex = currentIndex.value + 1
            if (nextIndex >= playlist.value.length) {
                nextIndex = 0
            }
            return nextIndex
        }
        const getLoopNextIndex = () => {
            return currentIndex.value
        }
        const getRandomNextIndex = () => {
            return getRadomIndex()
        }
        const nextStartMap = {
            [playModeMap.sequence.code]: getSequenceNextIndex,
            [playModeMap.loop.code]: getLoopNextIndex,
            [playModeMap.random.code]: getRandomNextIndex,
        }
        const getNextStart = nextStartMap[playMode.value]
        const index = getNextStart()
        return playlist.value[index]
    })
    return {
        currentSong, playing, playHistory, playlist, isPlaylistShow,
        isPlaylistPromptShow, isPlayerShow, isPlaying, playMode, currentTime,
        startSong, addToPlaylist, setPlaylist, preSong, nextSong,
        setPlayMode, setPlaylistShow

    }
})
export default useMusicStore
