<template>
  <el-menu
    class="el-menu-vertical-demo"
    @select="menuSelect"
    :default-active="route.path.match(/\//g).length > 1 ? '/' + route.path.split('/')[1] : route.path"
  >
    <span v-for="(item, key) in menuList" :key="key">
      <el-menu-item v-if="!item.children" :index="item.code">
        <template #title>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="item.code">
        <template #title>
          <span>{{ item.name }}</span>
        </template>
        <span v-for="(i, k) in item.children" :key="k">
          <el-sub-menu
            v-if="i.children?.length > 0"
            :index="i.code"
          >
            <template #title>{{ i.name }}</template>
            <span v-if="i.children?.length > 0">
              <span v-for="(v, n) in i.children" :key="n">
                <el-menu-item :index="v.code">
                  {{ v.name }}
                </el-menu-item>
              </span>
            </span>
          </el-sub-menu>

          <el-menu-item v-else :index="i.code">{{
            i.name
          }}</el-menu-item>
        </span>
      </el-sub-menu>
    </span>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuSelect = (path: string) => {
  console.log(path);
  router.push({
    path
  })
};

const menuList = reactive([
  {
    name: "文件上传",
    icon: "",
    code: "/fileUpload",
    children: [
      {
        code: "/uploadExcel",
        name: "excel解析",
        icon: "",
      }
    ]
  },
]);
</script>

<style scoped lang="scss">
</style>