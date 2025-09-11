<template>
  <div class="user">
    <!-- 未登录 -->
    <div
      @click="onOpenModal"
      class="login-trigger"
      v-if="!userStore.isLogin"
    >
      <icon
        icon="material-symbols:person"
        class="user-icon"
        style="font-size: 42px"
      ></icon>
      <p class="user-name">未登录</p>
    </div>
    <!-- 登录后 -->
    <div
      class="logined-user"
      @click="onLogout"
      v-else
    >
      <el-image
        :src="$utils.getImgUrl(userStore.user.avatarUrl, 80)"
        lazy
        class="avatar"
      ></el-image>
      <p class="user-name">{{ userStore.user.nickname }}</p>
    </div>

    <!-- 登录框 -->
    <el-dialog
      :width="$utils.toRem(320)"
      :model-value="visible"
      :modal="false"
      title="登录"
    >
      <div class="login-body">
        <el-input
          class="input"
          placeholder="请输入账号"
          v-model="uid"
        />
        <div class="login-help">
          <p class="help">
            1、请
            <a
              href="http://music.163.com"
              target="_blank"
              >点我(http://music.163.com)</a
            >打开网易云音乐官网
          </p>
          <p class="help">2、点击页面右上角的“登录”</p>
          <p class="help">3、点击您的头像，进入我的主页</p>
          <p class="help">
            4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）
          </p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            :loading="loading"
            type="primary"
            @click="onLogin(uid)"
            class="login-btn"
            >登录</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { inject, onMounted, ref } from "vue";
import { ElDialog, ElInput, ElButton, ElImage } from "element-plus";
import { Icon } from "@iconify/vue";
import storage from "good-storage";
import { UID_KEY, isDef } from "@/utils";
import { confirm } from "@/base/confirm";
const userStore = useUserStore();
const visible = ref(false);
const loading = ref(false);
const uid = ref(storage.get(UID_KEY));
const $utils: any = inject("utils");

const onOpenModal = () => {
  visible.value = true;
};
const closeModal = () => {
  visible.value = false;
};
const onLogin = async (uid: string) => {
  loading.value = true;
  const sucess = await userStore.login(Number(uid)).finally(() => {
    loading.value = false;
  });
  if (sucess) {
    closeModal();
  }
};

const onLogout = () => {
  confirm("确定登出吗？", () => {
    userStore.logout();
  });
};
onMounted(() => {
  if (isDef(uid.value)) {
    console.log(uid.value);

    onLogin(uid.value);
  }
});
</script>
<style lang="scss" scoped>
.user {
  padding: 16px;
  padding-bottom: 0;
  margin-bottom: 12px;

  .login-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .user-icon {
    font-size: 24px;
  }

  .user-name {
    margin-left: 8px;
  }

  .logout {
    transform: translateY(1px);
    margin-left: 8px;
    color: var(--font-color-shallow-grey);
  }

  .login-body {
    .input {
      margin-bottom: 16px;
    }

    .login-help {
      .help {
        margin-bottom: 4px;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 8px 0;
  }

  .logined-user {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      @include round(40px);
    }
  }
}
</style>
