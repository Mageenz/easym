<template>
  <div>
    <el-form-item :label="data.label">
      <el-radio-group v-model="data.value">
        <el-radio v-for="(item, index) in data.radioList" :key="index" :label="item.label">{{item.text}}</el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'emRadio',
  props: ['data']
}
</script>

