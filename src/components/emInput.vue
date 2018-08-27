<template>
  <div>
    <el-form-item :label="data.label" :label-width="`${data.labelWidth}px`">
      <el-input :placeholder="data.placeholder" :size="data.size" :disabled="data.disabled"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'emInput',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

