<template>
  <div>
    <el-form-item :label="data.label">
      <el-select v-model="value">
        <el-option v-for="(item, index) in data.selectList" :key="index" :value="item.value" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'emSelect',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

