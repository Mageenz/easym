<template>
  <div>
    <el-form label-width="80px" label-position="top" size="mini">
      <el-form-item label="列：">
        <el-row :gutter="10" v-for="(item, index) in data.columnList" :key="index" class="row">
          <el-col :span="8">
            <el-input v-model="item.label" placeholder="请输入表头名称"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="item.prop" placeholder="请输入表头名称"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addItem" v-if="index === (data.columnList.length - 1)"></el-button>
            <el-button type="danger" icon="el-icon-minus" circle size="mini" v-if="data.columnList.length > 1"></el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'emEditTable',
  props: ['data'],
  methods: {
    addItem() {
      this.data.columnList.push({
        label: '表头名称',
        prop: 'prop'
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