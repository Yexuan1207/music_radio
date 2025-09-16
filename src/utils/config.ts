//播放历史
export const PLAY_HISTORY_KEY = '__play_history__'

// 用户id
export const UID_KEY = '__uid__'

//播放模式
export const playModeMap = {
    sequence: {
        code: 'sequence',
        icon: 'lucide:arrow-left-right',
        name: '顺序播放'
    },
    loop: {
        code: 'loop',
        icon: 'lucide:rotate-cw',
        name: '循环播放'
    },
    random: {
        code: 'random',
        icon: 'lets-icons:sort-random',
        name: '随机播放'
    }
}
// 音量
export const VOLUME_KEY = '__volume__'