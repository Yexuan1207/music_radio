<template>
  <transition name="slide">
    <div
      class="player"
      v-if="hasCurrentSong"
      :class="getPlayerShowCls()"
    >
      <div class="content">
        <div class="song">
          <div class="left">
            <img
              src="@/assets/image/play-bar-support.png"
              class="play-bar-support"
            />
            <img
              src="@/assets/image/play-bar.png"
              class="play-bar"
              :class="{ playing: musicStore.isPlaying }"
            />
            <div class="img-outer-border">
              <div
                class="img-outer"
                :class="{ paused: !musicStore.isPlaying }"
              >
                <div class="img-wrap">
                  <el-image
                    lazy
                    :src="$utils.getImgUrl(musicStore.currentSong?.img, 400)"
                  ></el-image>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="name-wrap">
              <p class="name">{{ musicStore.currentSong?.name }}</p>
              <span
                class="mv-tag"
                @click="onGoMv"
                v-if="musicStore.currentSong?.mvId"
                >MV</span
              >
            </div>
            <div class="desc">
              <div class="desc-item">
                <div class="label">歌手：</div>
                <div class="value">
                  {{ musicStore.currentSong?.artistsText }}
                </div>
              </div>
            </div>
            <!-- 歌词 -->
            <el-empty
              description="还没有歌词哦~"
              v-if="nolyric"
            ></el-empty>
            <Scroller
              :data="lyric"
              :options="{ disableTouch: true }"
              @init="onInitScroller"
              class="lyric-wrap"
              ref="scrollerRef"
              v-else
            >
              <div>
                <div
                  :class="getActiveCls(index)"
                  v-for="(l, index) in lyricWithTans"
                  key="index"
                  class="lyric-item"
                  ref="lyricRef"
                >
                  <p
                    class="lyric-text"
                    v-for="(content, contentIndex) in l.contents"
                    :key="contentIndex"
                  >
                    {{ content }}
                  </p>
                </div>
              </div></Scroller
            >
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <Comments
              v-if="musicStore.currentSong?.id"
              :id="musicStore.currentSong.id"
            />
          </div>
          <div
            class="right"
            v-if="simiPlaylists.length || simiSongs.length"
          >
            <Loading
              :loading="simiLoading"
              v-if="simiLoading"
            />
            <div v-else>
              <div
                class="simi-playlists"
                v-if="simiPlaylists.length"
              >
                <p class="title">包含这首歌的歌单</p>
                <div
                  class="simi-item"
                  v-for="simi in simiPlaylists"
                  :key="simi.id"
                >
                  <Card
                    :img="simi.coverImgUrl"
                    :name="simi.name"
                    @click="onGoPlaylist(simi.id)"
                  >
                    <template #desc>
                      <div class="desc">
                        <Icon
                          :size="12"
                          color="shallow"
                          type="hugeicons:play"
                        />
                        <p class="count">
                          {{ $utils.formatData(simi.playCount) }}
                        </p>
                      </div>
                    </template>
                  </Card>
                </div>
              </div>
              <div
                class="simi-songs"
                v-if="simiSongs.length"
              >
                <p class="title">相似歌曲</p>
                <div
                  class="simi-item"
                  v-for="simi in simiSongs"
                  :key="simi.id"
                >
                  <Card
                    :desc="simi.artistsText"
                    :img="simi.img"
                    :name="simi.name"
                    @click="onGoSong(simi)"
                  >
                    <template #img-mask>
                      <PlayIcon class="play-icon" />
                    </template>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import useMusicStore from "@/store/music";
import { computed, inject, nextTick, ref, watch } from "vue";
import Comments from "../comments/index.vue";
import { ElEmpty } from "element-plus";
import { ElImage } from "element-plus";
import { createSong, debounce, goMvWidthCheck, isDef } from "@/utils";
import { getLyric, getSimiSongs } from "@/api";
import lyricParser from "@/utils/lrcparse";
import type BScroll from "@better-scroll/core";
import router from "@/router";
import { onUnmounted } from "vue";
import { getSimiPlaylist } from "@/api/playlist";
import type { CreatedSongType } from "@/components/player/type";
import type { playlist } from "@/api/playlist/type";
import { useRoute, useRouter } from "vue-router";

const musicStore = useMusicStore();
const $utils: any = inject("utils");
/**类型* */
type lyrcType = {
  time: number;
  content: string;
};
type lyricWithT = {
  time: number;
  content: string;
  contents: string[];
};
/********          定义数据        ********** */
const nolyric = ref(false); //是否有歌词
const lyric = ref<lyrcType[]>([]);
const tlyric = ref<lyrcType[]>([]); //翻译歌词
const scrollerRef = ref<BScroll | null>(null);
const lyricRef = ref(null);
const simiLoading = ref(false);
const simiPlaylists = ref<playlist[]>([]); //相似歌单
const simiSongs = ref<CreatedSongType[]>([]); //相似歌曲
const route = useRoute();

const WHEEL_TYPE = "wheel";
const SCROLL_TYPE = "scroll";
const lyricScrolling = {
  [WHEEL_TYPE]: false,
  [SCROLL_TYPE]: false,
};
const lyrcTime = {
  [WHEEL_TYPE]: 0,
  [SCROLL_TYPE]: 0,
};
// 恢复自动滚动的定时器时间
const AUTO_SCROLL_RECOVER_TIME = 1000;

//从store获取状态
const hasCurrentSong = computed(() => musicStore.hasCurrentSong);

//样式
const getPlayerShowCls = () => {
  return musicStore.isPlayerShow ? "show" : "hide";
};

/*********               方法             ******** */
//mv
const onGoMv = () => {
  musicStore.setPlayingState(false);
  if (!musicStore.currentSong?.mvId) return;
  goMvWidthCheck(musicStore.currentSong?.mvId);
};
//获取歌词
const updateLyric = async () => {
  if (!musicStore.currentSong?.id) return;
  const res = await getLyric(musicStore.currentSong?.id);
  nolyric.value = !isDef(res.lrc) || !res.lrc.lyric;
  if (!nolyric.value) {
    const { lyric: parsedLyric, tlyric: parsedTlyric } = lyricParser(res);
    lyric.value = parsedLyric;
    tlyric.value = parsedTlyric;
  }
};
//初始化歌词
const updateSong = () => {
  updateLyric();
  updateSimi();
};
//初始化滚屏
const onInitScroller = (scroller: BScroll) => {
  const onScrollerStart = (type: typeof WHEEL_TYPE | typeof SCROLL_TYPE) => {
    clearTimer(type);
    lyricScrolling[type] = true;
  };
  const onScrollEnd = (type: typeof WHEEL_TYPE | typeof SCROLL_TYPE) => {
    clearTimer(type);
    lyrcTime[type] = setTimeout(() => {
      lyricScrolling[type] = false;
    }, AUTO_SCROLL_RECOVER_TIME);
  };

  scroller.on("scrollStart", () => onScrollerStart(SCROLL_TYPE));
  scroller.on("mousewheelStart", () => onScrollerStart(WHEEL_TYPE));

  scroller.on("scrollEnd", () => onScrollEnd(SCROLL_TYPE));
  scroller.on("mousewheelEnd", () => onScrollEnd(WHEEL_TYPE));
};
const clearTimer = (type: typeof WHEEL_TYPE | typeof SCROLL_TYPE) => {
  lyrcTime[type] && clearTimeout(lyrcTime[type]);
};
//获取当前激活歌词
const getActiveCls = (index: number) => {
  return activeLyricIndex.value === index ? "active" : "";
};
//滚动到当前歌词
const scrollToActiveLyric = () => {
  if (activeLyricIndex.value !== -1) {
    if (lyricRef.value && lyric.value[activeLyricIndex.value]) {
      scrollerRef.value
        ?.getScroller()
        .scrollToElement(lyricRef.value[activeLyricIndex.value], 200, 0, true);
    }
  }
};
//获取相似歌单和歌曲
const updateSimi = async () => {
  simiLoading.value = true;
  if (!musicStore.currentSong?.id) return;
  const [simiPlaylistsData, simiSongsData] = await Promise.all([
    getSimiPlaylist(musicStore.currentSong?.id),
    getSimiSongs(musicStore.currentSong?.id),
  ]).finally(() => {
    simiLoading.value = false;
  });
  simiPlaylists.value = simiPlaylistsData.playlists;
  simiSongs.value = simiSongsData.songs.map((song) => {
    const {
      id,
      name,
      artists,
      mvid,
      album: { picUrl },
      duration,
    } = song;
    return createSong({
      id,
      name,
      artists,
      duration,
      img: picUrl,
      mvId: mvid,
    });
  });
};
//点击歌单
const onGoPlaylist = (id: number) => {
  if (id === Number(route.params.id)) {
    musicStore.setPlayershow(false);
  } else {
    router.push(`/playlist/${id}`);
  }
};
//点击歌曲
const onGoSong = (song: CreatedSongType) => {
  musicStore.startSong(song);
  musicStore.addToPlaylist(song);
};
/*****************computed************************ */
//初始化翻译
const lyricWithTans = computed(() => {
  let ret: lyricWithT[] = [];
  //清理数据
  const lyricFiltered = lyric.value.filter((item) => Boolean(item.content));
  if (lyricFiltered.length > 0) {
    lyricFiltered.forEach((item) => {
      const { time, content } = item;
      const lyricItem = { time, content, contents: [content] };
      const sameTimeTlyric = tlyric.value.find((item) => item.time === time);
      if (sameTimeTlyric) {
        const { content: tlyricContent } = sameTimeTlyric;
        if (content) {
          lyricItem.contents.push(tlyricContent);
        }
      }
      ret.push(lyricItem);
    });
  } else {
    ret = lyricFiltered.map(({ time, content }) => ({
      time,
      content,
      contents: [content],
    }));
  }

  return ret;
});
//当前激活歌词装填
const activeLyricIndex = computed(() => {
  return lyricWithTans.value
    ? lyricWithTans.value.findIndex((l, index) => {
        const nextLyric = lyricWithTans.value[index + 1];
        return (
          musicStore.currentTime >= l.time &&
          //最后一句歌词
          (nextLyric ? musicStore.currentTime < nextLyric.time : true)
        );
      })
    : -1;
});

/***************            钩子                  ************* */
//watch
watch(
  () => musicStore.currentSong,
  (newSong, oldSong) => {
    if (!musicStore.currentSong?.id) {
      musicStore.setPlayershow(false);
      return;
    }
    if (newSong?.id !== oldSong?.id) {
      if (musicStore.isPlayerShow) {
        updateSong();
      } else {
        updateLyric();
      }
    }
  }
);
//activeLyricIndex
watch(activeLyricIndex, (newIndex, oldIndex) => {
  if (
    newIndex !== oldIndex &&
    !lyricScrolling[SCROLL_TYPE] &&
    !lyricScrolling[WHEEL_TYPE]
  ) {
    scrollToActiveLyric();
  }
});
//路由发生变化关闭player
watch(
  () => router.currentRoute.value,
  () => {
    musicStore.setPlayershow(false);
  }
);
//isPlayerShow
watch(
  () => musicStore.isPlayerShow,
  (show) => {
    if (show) {
      updateSimi();
      addResizeListener();
      nextTick(() => {
        scrollToActiveLyric();
      });
    } else {
      removeResizeListener();
    }
  }
);

//窗口发生变化触发
const resizeScroller = debounce(function () {
  scrollerRef.value?.getScroller().refresh();
}, 500);
const addResizeListener = () => {
  window.addEventListener("resize", resizeScroller);
};
const removeResizeListener = () => {
  window.removeEventListener("resize", resizeScroller);
};
onUnmounted(() => {
  removeResizeListener();
});
</script>
<style lang="scss" scoped>
$img-left-padding: 36px;
$img-outer-border-d: 320px;
$img-outer-d: 300px;
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.player {
  position: fixed;
  top: $header-height;
  bottom: $mini-player-height;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: var(--player-bgcolor);
  z-index: $song-detail-z-index;
  overflow: hidden;
  overflow-y: auto;
  transition: transform 0.5s;

  &.hide {
    transform: translateY(105%);
  }
  &.show {
    transform: none;
  }
  .content {
    max-width: 870px;
    margin: auto;
    .song {
      display: flex;
      .left {
        position: relative;
        padding: 80px 70px 0 $img-left-padding;
        display: flex;
        justify-content: center;

        $support-d: 30px;
        $support-d-half: calc($support-d/2);

        .play-bar-support {
          position: absolute;
          left: calc(
            $img-left-padding + $img-outer-border-d / 2 - $support-d / 2
          );
          top: -$support-d-half;
          width: $support-d;
          height: $support-d;
          z-index: 2;
        }
        .play-bar {
          $w: 100px;
          $h: 146px;
          position: absolute;
          top: 0;
          left: calc($img-left-padding + $img-outer-border-d / 2 - 6px);
          width: $w;
          height: $h;
          z-index: 1;
          transform-origin: 0 0;
          transform: rotate(-30deg);
          transition: all 0.3s;

          &.playing {
            transform: rotate(5deg);
          }
        }
        .img-outer-border {
          @include round($img-outer-border-d);
          @include flex-center;
          background: var(--song-shallow-grey-bg);

          .img-outer {
            @include round($img-outer-d);
            @include flex-center;
            background: $black;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            box-sizing: border-box;
            animation: rotate 20s linear infinite;

            &.paused {
              animation-play-state: paused;
            }
            .img-wrap {
              @include img-wrap(200px);
              .el-image {
                border-radius: 50%;
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        padding-top: 45px;
        .name-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .name {
            font-size: $font-size-title-lg;
            color: var(--font-color-white);
          }
          .mv-tag {
            display: inline-block;
            margin-left: 8px;
            padding: 2px;
            border: 1px solid currentColor;
            border-radius: 2px;
            color: $theme-color;
            cursor: pointer;
          }
        }
        .desc {
          display: flex;
          font-size: $font-size-sm;
          margin-bottom: 30px;
          .desc-item {
            display: flex;
            margin-right: 32px;
            .label {
              display: inline-block;
              margin-right: 4px;
            }
          }

          .value {
            color: $blue;
          }
        }

        .lyric-wrap {
          width: 380px;
          height: 350px;
          //渐变遮罩层
          mask-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0.6) 15%,
            #fff 25%,
            #fff 75%,
            hsla(0, 0%, 100%, 0.6) 85%,
            hsla(0, 0%, 100%, 0)
          );

          .lyric-item {
            margin-bottom: 16px;
            font-size: $font-size-sm;

            &.active {
              font-size: $font-size;
              color: var(--font-color-white);
              font-weight: $font-weight-bold;
            }
            .lyric-text {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
    .bottom {
      display: flex;
      margin-top: 48px;
      margin-bottom: 36px;
      .left {
        flex: 1;
      }
      .right {
        padding-left: 36px;
        width: 28%;
        overflow: hidden;
        .simi-playlists {
          margin-bottom: 36px;
        }
        .simi-songs {
          .play-icon {
            @include abs-center;
          }
        }
        .simi-item {
          margin-bottom: 6px;
        }
        .title {
          font-size: $font-size-lg;
          font-weight: $font-weight-bold;
          margin-bottom: 12px;
        }
        .desc {
          display: flex;
          align-items: center;

          .count {
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
