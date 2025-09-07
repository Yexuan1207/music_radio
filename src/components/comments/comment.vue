<template>
  <div
    v-if="comment"
    class="comment"
  >
    <div class="avatar">
      <img
        :src="$utils.getImgUrl(comment.user.avatarUrl, 80)"
        lazy
      />
    </div>
    <div
      :class="{ border }"
      class="content"
    >
      <p class="comment-text">
        <span class="username">{{ comment.user.nickname }}</span>
        <span class="text">{{ comment.content }}</span>
      </p>
      <!-- 子评论 -->
      <div
        class="replied"
        v-if="comment.beReplied.length"
      >
        <p class="comment-text">
          <span class="username">{{ comment.beReplied[0].user.nickname }}</span>
          <span class="text">{{ comment.beReplied[0].content }}</span>
        </p>
      </div>
      <div class="bottom">
        <span class="date">{{
          moment(comment.time).format("YYYY-MM-DD HH:mm:ss")
        }}</span>
        <div class="actions">
          <Icon
            :size="12"
            type="icon-park-outline:good-one"
          />
          {{ comment.likedCount }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import type { Comment } from "@/api/comment/type";
import { size } from "lodash-es";
import moment from "moment";

const $utils: any = inject("utils");
const props = defineProps<{
  comment: Comment;
  border: boolean;
}>();
</script>
<style lang="scss" scoped>
.comment {
  display: flex;
  padding-top: 20px;
  .avatar {
    @include img-wrap(40px);
    margin-right: 12px;
    img {
      border-radius: 50%;
    }
  }
  .content {
    padding-bottom: 20px;
    width: 100%;
    font-size: $font-size-sm;
    &.border {
      border-bottom: 1px solid var(--border);
    }
    .replied {
      padding: 8px;
      margin-top: 8px;
      background: var(--song-shallow-gray-bg);
      border-radius: 4px;
    }
    .comment-text {
      .username {
        display: inline-block;
        margin-right: 4px;
        color: $blue;
      }
      .text {
        line-height: 1.5;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .date {
        color: var(--font-color-grey-shallow);
      }
      .actions {
        color: var(--font-color-grey-shallow);
      }
    }
  }
}
</style>
