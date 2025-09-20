<template>
  <div
    class="mini-player"
    id="mini-player"
  >
    <!-- 歌曲内容 -->
    <div class="song">
      <template v-if="hasCurrentSong">
        <div
          class="img-wrap"
          @click="togglePlayerShow"
        >
          <div class="mask"></div>
          <el-image
            :src="$utils.getImgUrl(musicStore.currentSong?.img, 80)"
            lazy
            class="blur"
          ></el-image>
          <div class="player-control">
            <Icon
              color="white"
              :size="24"
              :type="playControlIcon"
            />
          </div>
        </div>
        <div class="content">
          <div class="top">
            <p class="name">{{ musicStore.currentSong?.name }}</p>
            <p class="split">-</p>
            <p class="artists">{{ musicStore.currentSong?.artistsText }}</p>
          </div>
          <div class="time">
            <span class="played-time">{{
              $utils.formatTime(musicStore.currentTime)
            }}</span>
            <span class="split">/</span>
            <span class="total-time">{{
              $utils.formatTime(
                musicStore.currentSong && musicStore.currentSong.duration / 1000
              )
            }}</span>
          </div>
        </div>
      </template>
    </div>

    <!-- 控制台 -->
    <div class="control">
      <Icon
        @click="pre"
        type="lucide:skip-back"
        class="icon"
        :size="24"
      />
      <el-popover
        :visible="isPlayErrorPromptShow"
        placement="top"
        content="请点击开始播放"
        :width="160"
      >
        <template #reference>
          <div
            @click="togglePlaying"
            class="play-icon"
          >
            <Icon
              :size="24"
              :type="playIcon"
              color="white"
            />
          </div>
        </template>
      </el-popover>
      <Icon
        @click="next"
        type="lucide:skip-forward"
        class="icon"
        :size="24"
      />
    </div>
    <!-- 按钮 -->
    <div class="mode">
      <!-- 分享 -->
      <share
        :share-url="shareUrl"
        v-show="hasCurrentSong"
        class="mode-item"
      />
      <!-- 模式 -->
      <el-popover
        placement="top"
        trigger="hover"
        width="160"
        :title="playModeText"
      >
        <template #reference>
          <div class="mode-item">
            <Icon
              :size="20"
              :type="modeIcon"
              @click="onChangePlayMode"
            />
          </div>
        </template>
      </el-popover>
      <!-- 播放列表 -->
      <el-popover
        :visible="musicStore.isPlaylistPromptShow"
        placement="top"
        width="160"
        title="已更新歌单"
      >
        <template #reference>
          <div
            class="mode-item"
            @click="togglePlaylistShow"
          >
            <Icon
              :size="20"
              type="lucide:list-checks"
            />
          </div>
        </template>
      </el-popover>
      <!-- 音量 -->
      <div class="vilume-item">
        <Volume
          :volume="volume"
          @volume-change="onVolumeChange"
        />
      </div>
    </div>
    <!-- 进度条 -->
    <div class="progress-bar-wrap">
      <ProgressBar
        :disabled="!hasCurrentSong"
        :percent="playedPercent"
        @percentChange="onProgressChange"
      />
    </div>
    <!-- 音频元素 -->
    <audio
      :src="musicStore.currentSong?.url"
      @canplay="ready"
      @ended="end"
      @timeupdate="updateTime"
      ref="audioRef"
    ></audio>
  </div>
</template>
<script setup lang="ts">
import storage from "good-storage";
import { computed, inject, nextTick, onMounted, ref, watch } from "vue";
import { ElPopover, ElImage } from "element-plus";
import Share from "@/components/share/index.vue";
import Volume from "@/components/Volume/index.vue";
import { VOLUME_KEY, playModeMap } from "@/utils";
import useMusicStore from "@/store/music";
const $utils: any = inject("utils");
const musicStore = useMusicStore();
//默认音量
const DEFAULT_VOLUME = 0.75;
const isPlayErrorPromptShow = ref(false); //是否显示播放错误提示
const songReady = ref(false);
const volume = ref(storage.get(VOLUME_KEY, DEFAULT_VOLUME)); //当前音量
const audioRef = ref<HTMLAudioElement>(); //音频元素引用
const timer = ref();
//****************控制台
const pre = () => {
  if (songReady) musicStore.startSong(musicStore.preSong);
};
const next = () => {
  if (songReady.value) musicStore.startSong(musicStore.nextSong);
};
const togglePlaying = () => {
  if (!musicStore.currentSong) return;

  musicStore.setPlayingState(!musicStore.isPlaying);
};
/**       播放audio            */
const ready = () => {
  songReady.value = true;
};
const playIcon = computed(() => {
  return musicStore.isPlaying
    ? "mingcute:stop-fill"
    : "tabler:player-play-filled";
});
const playControlIcon = computed(() => {
  return musicStore.isPlayerShow
    ? "hugeicons:arrow-down-double"
    : "hugeicons:arrow-up-double";
});
//分享
const shareUrl = computed(() => {
  return `${window.location.origin}?shareMusicId=${musicStore.currentSong?.id}`;
});
//模式
const currentMode = computed(
  () => playModeMap[musicStore.playMode as keyof typeof playModeMap]
);
const playModeText = computed(() => currentMode.value.name);
const modeIcon = computed(() => currentMode.value.icon);
//修改模式方法
const onChangePlayMode = () => {
  const modeKey = Object.keys(playModeMap);
  const currentModeIndex = modeKey.findIndex(
    (key) =>
      playModeMap[key as keyof typeof playModeMap].code === musicStore.playMode
  );
  const nextIndex = (currentModeIndex + 1) % modeKey.length;
  const nextModeKey = modeKey[nextIndex];
  const nectMode = playModeMap[nextModeKey as keyof typeof playModeMap];
  musicStore.setPlayMode(nectMode.code);
};

//播放列表展示
const togglePlaylistShow = () => {
  musicStore.setPlaylistShow();
};
//******音量变化********** */
const onVolumeChange = (percent: number) => {
  volume.value = percent;
  storage.set(VOLUME_KEY, percent);
};

//播放进度条
const hasCurrentSong = computed(() => {
  return $utils.isDef(musicStore.currentSong);
});
const playedPercent = computed(() => {
  if (!musicStore.currentSong) return;
  const durationSecond = musicStore.currentSong.durationSecond;
  return Math.min(musicStore.currentTime / durationSecond, 1);
});
///////////////////////////////////
const onProgressChange = (percent: number) => {
  if (!musicStore.currentSong || !audioRef.value) return;
  audioRef.value.currentTime = musicStore.currentSong?.durationSecond * percent;
  musicStore.setPlayingState(true);
};

const togglePlayerShow = () => {
  musicStore.setPlayershow(!musicStore.isPlayerShow);
};
watch(
  () => musicStore.currentSong,
  (newSong, oldSong) => {
    if (!newSong?.id && audioRef.value) {
      audioRef.value.pause();
      audioRef.value.currentTime = 0;
      return;
    }
    //同一首歌 重置当前时间
    if (oldSong?.id === newSong?.id) {
      if (!audioRef.value) return;
      musicStore.setCurrentTime(0);
      audioRef.value.currentTime = 0;
      play();
      return;
    }
    songReady.value = false;

    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
      // 避免点击暂停后又自动播放的问题
      if (musicStore.isPlaying) {
        play();
      }
    }, 1000);
  }
);
watch(
  () => musicStore.isPlaying,
  (newVal) => {
    nextTick(() => {
      newVal ? play() : pause();
    });
  }
);
const end = () => {
  next();
};
const updateTime = (e: any) => {
  const time = e.target.currentTime;
  musicStore.setCurrentTime(time);
};
const play = async () => {
  if (!songReady.value) return;
  try {
    await audioRef.value?.play();

    if (isPlayErrorPromptShow.value) isPlayErrorPromptShow.value = false;
  } catch (err) {
    isPlayErrorPromptShow.value = true;
    musicStore.setPlayingState(false);
  }
};
const pause = () => {
  audioRef.value?.pause();
};

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value;
  }
});
</script>
<style lang="scss" scoped>
.mini-player {
  position: relative;
  position: fixed;
  z-index: $mini-player-z-index;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  padding: 8px 16px;
  padding-right: 24px;
  background: var(--body-bgcolor);

  .song {
    display: flex;
    flex: 4;
    overflow: hidden;

    .img-wrap {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      @include img-wrap(40px);

      .el-image {
        &.blur {
          filter: blur(2px);
        }
      }

      .player-control {
        @include abs-center;
      }

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: var(--font-color-white);
          @include text-ellipsis;
        }

        .split {
          font-size: $font-size-xs;
          margin: 0 4px;
        }

        .artists {
          font-size: $font-size-xs;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: $font-size-xs;
        color: var(--font-color-grey);

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;

      i {
        color: #fff;
      }
      .icon-play {
        transform: translateX(1px);
      }
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }

    .volume-item {
      margin-right: 22px;
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}

.icon {
  color: var(--font-color);
  cursor: pointer;
}
</style>
