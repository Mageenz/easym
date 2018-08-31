<template>
  <div>
    <el-table border>
      <el-table-column label="1" v-for="(item, index) in data.columnList" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'emTable',
  props: ['data']
}
</script>

