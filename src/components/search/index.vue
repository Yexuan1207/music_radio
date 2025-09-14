<template>
  <div class="search">
    <el-popover
      trigger="click"
      :show-arrow="false"
      popper-class="search-panel"
      v-model:visible="searchPanelShow"
      @click="clickInput"
    >
      <template #reference>
        <el-input
          placeholder="搜索"
          v-model.trim="searchKeyword"
          :prefix-icon="Search"
          @input="onInput"
          @keydown.native.enter="onEnterPress"
        >
        </el-input>
      </template>
      <template #default>
        <div class="search-panel">
          <!-- 搜索推荐 -->
          <div
            class="search-suggest"
            v-if="suggestShow"
          >
            <div
              class="suggest-item"
              :key="index"
              v-for="(normalizedSuggest, index) in normalizedSuggests"
            >
              <div class="title">
                <Icon
                  :type="normalizedSuggest.icon"
                  style="margin-right: 3px"
                />
                {{ normalizedSuggest.title }}
              </div>
              <ul class="list">
                <li
                  class="item"
                  :key="item.id"
                  v-for="item in normalizedSuggest.data"
                  @click="normalizedSuggest.onClick(item)"
                >
                  <HighlightText
                    :highlightText="searchKeyword"
                    :text="
                      normalizedSuggest.renderName
                        ? normalizedSuggest.renderName(item)
                        : item.name
                    "
                  />
                </li>
              </ul>
            </div>
          </div>
          <!-- 初始时推荐 -->
          <div
            class="search-hots"
            v-else
          >
            <div class="block">
              <p class="title">热门搜索</p>
              <div class="tags">
                <Nbutton
                  class="button"
                  @click="onClickHot(hot)"
                  v-for="(hot, index) in searchHots"
                  :key="index"
                  >{{ hot.first }}</Nbutton
                >
              </div>
            </div>
            <div class="block">
              <p class="title">搜索历史</p>
              <div
                class="tags"
                v-if="searchHistory.length"
              >
                <Nbutton
                  v-for="(history, index) in searchHistory"
                  :key="index"
                  class="button"
                  @click="onClickHot(history)"
                  >{{ history.first }}</Nbutton
                >
              </div>
              <div
                class="empty"
                v-else
              >
                暂无搜索历史
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
// import Toggle from "@/components/Toggle/index.vue";
import { Search } from "@element-plus/icons-vue";
import { ElInput, ElPopover } from "element-plus";
import storage from "good-storage";
import { getSearchHot, getSearchSuggest } from "@/api/search";
import { useRouter } from "vue-router";
import { createSong, debounce, genArtistisText } from "@/utils";
const router = useRouter();
import useMusicStore from "@/store/music";
const musicStore = useMusicStore();
//type
import type { hotType, Result, Song, Playlist, Mv } from "@/api/search/type";
const SEARCH_HISTORY_KEY = "__search_history__";

//点击输入框
const searchPanelShow = ref(false);
const searchKeyword = ref(""); // 搜索关键词
const searchHots = ref<hotType[]>([]); //搜索热词
const searchHistory = ref(storage.get(SEARCH_HISTORY_KEY, []));
const suggest = ref<Result>(); //搜索建议
const reserveDom = ref<HTMLDivElement>();

//点击输入框
const clickInput = () => {
  searchPanelShow.value = true;
};
//热门搜索、搜索历史
const onClickHot = (hot: hotType) => {
  const { first } = hot;
  goSearch(first);
};
const goSearch = (keyword: string) => {
  searchHistory.value = searchHistory.value.filter(
    (item: { first: string }) => item.first !== keyword
  );
  searchHistory.value.push({ first: keyword });
  storage.set(SEARCH_HISTORY_KEY, searchHistory.value);

  router.push({
    path: `/search/${keyword}`,
  });
  searchPanelShow.value = false;
};
const onEnterPress = () => {
  if (searchKeyword.value.trim()) {
    goSearch(searchKeyword.value.trim());
  }
};

//获取热搜
onMounted(async () => {
  try {
    const res = await getSearchHot();
    const { hots } = res.result;
    searchHots.value = hots;
  } catch (err) {
    console.error("搜索失败", err);
  }
});

//搜索时推荐
const onInput = debounce((value) => {
  searchPanelShow.value = true;
  if (!value.trim()) {
    return;
  }
  getSearchSuggest(value).then(({ result }) => {
    suggest.value = result;
  });
}, 500);
//搜索推荐是否展示 boolean
const suggestShow = computed(() => {
  if (!searchKeyword.value.length) return false;
  return (["playlists", "songs"] as const).find((key) => {
    const item = suggest.value?.[key];
    return item && item.length > 0;
  });
});
// 搜索建议
const normalizedSuggests = computed(() => {
  return [
    {
      title: "单曲",
      icon: "material-symbols:library-music-outline-sharp",
      data: suggest.value?.songs,
      renderName: (song: any) =>
        `${song.name} - ${genArtistisText(song.artists)}`,
      onClick: onClickSong,
    },
    {
      title: "歌单",
      icon: "mage:playlist-alternate",
      data: suggest.value?.playlists,
      onClick: onClickPlaylist,
    },
    {
      title: "mv",
      icon: "ri:mv-fill",
      data: suggest.value?.mv,
      renderName: (mv: any) => `${mv.name} - ${genArtistisText(mv.artists)}`,
      onClick: onClickMV,
    },
  ].filter((item) => item.data?.length); //保留有数据的项目
});
const onClickSong = async (item: Song) => {
  const {
    id,
    name,
    artists,
    duration,
    mvid,
    //结构出album的id、name并解析命名为albumId和albumName
    album: { id: albumId, name: albumName },
  } = item;
  const song = createSong({
    id,
    name,
    artists,
    duration,
    mvid,
    albumId,
    albumName,
    mvId: mvid,
  });
  musicStore.startSong(song);
  musicStore.addToPlaylist(song);
  // 播放列表
};
const onClickPlaylist = (item: Playlist) => {
  const { id } = item;
  router.push(`/playlist/${id}`);
  searchPanelShow.value = false;
};
const onClickMV = (item: any) => {
  console.log(item);
};
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  width: 150px;
}
</style>
<style lang="scss">
.search-panel {
  position: fixed;
  top: $header-height;
  bottom: $mini-player-height;
  right: 0;
  width: 350px;
  background: var(--search-bgcolor);
  z-index: $search-panel-z-index;
  font-size: $font-size-sm;
  overflow-y: auto;
  @include box-shadow;
  .block {
    padding: 16px 24px;

    .title {
      color: var(--font-color-grey);
      margin-bottom: 16px;
      line-height: normal;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;

      .button {
        margin-bottom: 12px;
        margin-right: 6px;
        font-size: $font-size-sm;
      }
    }

    .empty {
      @include flex-center();
      color: var(--font-color-grey);
      font-size: $font-size;
      height: 100px;
    }
  }

  .suggest-item {
    margin-bottom: 16px;

    .title {
      margin: 16px 8px 8px;
      color: var(--font-color-grey-shallow);
      display: flex;
      align-items: center;
    }

    .list {
      .item {
        padding: 12px 24px;
        cursor: pointer;
        @include text-ellipsis();

        &:hover {
          background: var(--light-bgcolor);
        }
      }
    }
  }
}
</style>
