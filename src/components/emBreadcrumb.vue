<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in data.breadList" :key="index">
        <a :href="item.url" v-if="item.url">{{item.name}}</a>
        <span v-else>{{item.name}}</span>
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

