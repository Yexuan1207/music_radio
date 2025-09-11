<template>
  <div
    v-if="$utils.isDef(mvDetail.id)"
    class="mv"
  >
    <div class="mv-content">
      <div class="left">
        <p class="title">mv详情</p>
        <div class="player">
          <VideoPlayer
            :url="mvPlayInfo.url"
            :poster="mvDetail.cover"
            ref="videoRef"
          />
        </div>
        <div class="author-wrap">
          <div class="avatar">
            <el-image
              lazy
              :src="$utils.getImgUrl(artist.picUrl, 120)"
            ></el-image>
          </div>
          <p class="author">{{ artist.name }}</p>
        </div>
        <p class="name">{{ mvDetail.name }}</p>
        <div class="desc">
          <span class="date"
            >发布{{ moment(mvDetail.publishTime).format("YYYY-MM-DD") }}</span
          >
          <span class="count">播放：{{ mvDetail.playCount }}</span>
        </div>
        <div class="comments">
          <Comments
            :id="id"
            type="mv"
          ></Comments>
        </div>
      </div>
      <div class="right">
        <p class="title">相关推荐</p>
        <div class="simi-mvs">
          <Card
            :desc="`by ${simiMv.artistName}`"
            :key="simiMv.id"
            :name="simiMv.name"
            class="simi-mv-card"
            v-for="simiMv in simiMvs"
            @click="$utils.goMv(simiMv.id)"
          >
            <template #img-wrap>
              <mvCard
                :duration="simiMv.duration"
                :playCount="simiMv.playCount"
                :img="simiMv.cover"
              ></mvCard>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref, watch } from "vue";
import Comments from "@/components/comments/index.vue";
import mvCard from "@/components/mvCard/index.vue";
import { getMvDetail, getMvUrl, getSimiMv, getArtists } from "@/api";
import type { Data, Mv, playInfoData } from "@/api/Mv/type";
import { ElImage } from "element-plus";
import type { Artist } from "@/api/artist/type";
import moment from "moment";
// import { useRoute } from "vue-router";
const $utils: any = inject("utils");
//在路由props传递参数
const props = defineProps<{
  id: number;
}>();
// const route = useRoute();
// const id = ref(Number(route.params.id));
//因为需要用到mvDetail.id作为判断渲染，所以不能为空
//partial 可选属性
const mvDetail = ref<Partial<Data>>({});
const mvPlayInfo = ref<playInfoData>({} as playInfoData);
const artist = ref<Artist>({} as Artist);
const simiMvs = ref<Mv[]>([]);

const init = async () => {
  const [
    { data: mvDetailData },
    { data: mvPlayInfoData },
    { mvs: simiMvsData },
  ] = await Promise.all([
    getMvDetail(props.id),
    getMvUrl(props.id),
    getSimiMv(props.id),
  ]);

  //获取歌手信息
  const { artist: artistData } = await getArtists(mvDetailData.artistId);

  mvDetail.value = mvDetailData;
  mvPlayInfo.value = mvPlayInfoData;
  simiMvs.value = simiMvsData;
  artist.value = artistData;
};

onMounted(() => {
  init();
});
watch(
  () => props.id,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      init();
    }
  }
);
</script>
<style lang="scss" scoped>
.mv {
  padding: $page-padding;

  .title {
    margin-bottom: 16px;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }

  .mv-content {
    display: flex;
    max-width: 950px;
    margin: auto;
    .left {
      flex: 1;

      .player {
        margin-bottom: 16px;
        overflow: hidden;
        border-radius: 4px;
        width: 100%;
        max-width: 100%;
      }

      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        .avatar {
          @include img-wrap(60px);
          margin-right: 8px;
          .el-image {
            @include round(60px);
          }
        }

        .author {
          font-size: $font-size-lg;
        }
      }

      .name {
        margin-bottom: 16px;
        font-size: $font-size-title-lg;
        font-weight: $font-weight-bold;
      }

      .desc {
        display: flex;
        color: var(--font-color-grey-shallow);
        font-size: $font-size-sm;

        .date {
          display: inline-block;
          margin-right: 24px;
        }
      }

      .comments {
        margin-top: 48px;
      }
    }

    .right {
      width: 36%;
      padding-left: 32px;
      box-sizing: border-box;

      .simi-mvs {
        padding: -8px 0;

        .simi-mv-card {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
