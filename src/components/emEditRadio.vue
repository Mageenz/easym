<template lang="pug">
  <div>
    <el-form label-width="80px" label-position="top" size="mini">
      <el-form-item label="标题：">
        <el-input v-model="data.label" placeholder="请输入标题" clearable></el-input>
      </el-form-item>
      <el-form-item label='选项'>
        <el-row :gutter="10" v-for="(item,index) in data.radioList" :key="index" class="row">
          <el-col :span="8">
            <el-input size="mini" placeholder="选项" v-model="item.label"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input size="mini" placeholder="值" v-model="item.value"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addItem" v-if="index === (data.radioList.length - 1)"></el-button>
            <el-button type="danger" icon="el-icon-minus" circle size="mini" v-if="data.radioList.length > 1"></el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'emEditRadio',
  props: ['data'],
  methods: {
    addItem() {
      let length = this.data.radioList.length;

      this.data.radioList.push({
        label: length,
        text: `标题${length}`
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