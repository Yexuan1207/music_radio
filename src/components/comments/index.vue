<template>
  <div class="comment">
    <template v-if="loading">
      <PartLoading :loading="loading"></PartLoading>
    </template>
    <template v-else>
      <div
        class="block"
        v-if="shouldHotCommentShow"
      >
        <p class="title">精彩评论</p>
        <CommentList
          v-for="(comment, index) in hotComments"
          :key="index"
          :comment="comment"
          :border="!$utils.isLast(index, hotComments)"
        ></CommentList>
      </div>
      <div
        class="block"
        v-if="shouldCommentShow"
      >
        <p
          class="title"
          ref="commentTitleRef"
        >
          最新评论<span class="count">(111)</span>
        </p>
        <CommentList
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          :border="!$utils.isLast(index, comments)"
        ></CommentList>
      </div>
      <Pagination
        :pageSize="PAGE_SIZE"
        :total="total"
        class="pagination"
        v-model:current-page="currentPage"
        @current-change="onPageChange"
      ></Pagination>
    </template>
    <el-empty
      v-if="!loading && !shouldCommentShow && !shouldHotCommentShow"
      description="还没有评论哦~"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from "vue";
import {
  getHotComment,
  getPlaylistComment,
  getSongComment,
  getMVComment,
} from "@/api";
import CommentList from "./comment.vue";
import { ElEmpty } from "element-plus";
import type { HotComment, hotCommentType, Comment } from "@/api/comment/type";
// import { getPageOffset } from "@/utils/common";
const $utils: any = inject("utils");
//常量
const SONG_TYPE = "song";
const PLAYLIST_TYPE = "playlist";
const MV_TYPE = "mv";
const PAGE_SIZE = 20;
const commentTitleRef = ref<HTMLElement>();
// 定义评论类型的联合类型
type CommentType = typeof SONG_TYPE | typeof PLAYLIST_TYPE | typeof MV_TYPE;

const props = withDefaults(
  defineProps<{
    id: number | string;
    type?: CommentType;
  }>(),
  {
    type: SONG_TYPE,
  }
);

//换页的时候loading
const loading = ref<boolean>(false);
const hotComments = ref<HotComment[]>([]);
const comments = ref<Comment[]>([]);
const total = ref(0);
const currentPage = ref(1);
const emit = defineEmits<{
  (e: "update", normalTotal: number): void;
}>();
//获取评论
const getCommnet = async () => {
  loading.value = true;
  const commentRequestMap = {
    [PLAYLIST_TYPE]: getPlaylistComment,
    [SONG_TYPE]: getSongComment,
    [MV_TYPE]: getMVComment,
  };
  const commentRequest = commentRequestMap[props.type];

  const {
    hotComments: normalHotComments = [],
    comments: normalComments = [],
    total: normalTotal,
  } = await commentRequest({
    id: props.id,
    limit: PAGE_SIZE,
    offset: $utils.getPageOffset(currentPage.value, PAGE_SIZE),
  }).finally(() => {
    loading.value = false;
  });

  //单独获取歌单热评
  if (props.type === PLAYLIST_TYPE && currentPage.value == 1) {
    const { hotComments: exactHotComments = [] } = await getHotComment({
      id: props.id,
      type: 2,
    });
    hotComments.value = exactHotComments;
  } else {
    hotComments.value = normalHotComments;
  }
  comments.value = normalComments;
  total.value = normalTotal;
  emit("update", normalTotal);
};
//展示热评
const shouldHotCommentShow = computed(() => {
  return hotComments.value.length > 0 && currentPage.value == 1;
});
const shouldCommentShow = computed(() => {
  return comments.value.length > 0;
});

//换页
const onPageChange = async () => {
  await getCommnet();
  nextTick(() => {
    $utils.scrollInto(commentTitleRef.value);
  });
};
watch(
  () => props.id,
  (newVal) => {
    if (newVal) {
      currentPage.value = 1;
      getCommnet();
    }
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.block {
  margin-bottom: 48px;

  .title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin-bottom: 4px;

    .count {
      font-size: $font-size;
    }
  }
}

.pagination {
  text-align: right;
}
</style>
