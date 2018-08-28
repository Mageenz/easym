<template>
  <div>
    <el-form label-width="80px" label-position="top" size="mini">
      <el-form-item label="路径：">
        <el-row :gutter="10" v-for="(item, index) in data.breadList" :key="index" class="row">
          <el-col :span="8"><el-input placeholder="请输入页面名称" v-model="item.name"></el-input></el-col>
          <el-col :span="8"><el-input placeholder="请输入页面链接" v-model="item.url"></el-input></el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addItem" v-if="index === (data.breadList.length - 1)"></el-button>
            <el-button type="danger" icon="el-icon-minus" circle size="mini" v-if="data.breadList.length > 1"></el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    addItem() {
      this.data.breadList.push({
        name: '路径名称',
        url: ''
      })
    }
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 5px;
}
.row:last-child {
  margin-bottom: 0;
}
</style>