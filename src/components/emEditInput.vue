<template>
  <div>
    <el-form label-width="80px" label-position="top" size="mini">
      <el-form-item label="标题：">
        <el-input v-model="data.label" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="标题宽度：">
        <el-input v-model="data.labelWidth" placeholder="请输入宽度">
          <template slot="append">px</template>
        </el-input>
      </el-form-item>
      <el-form-item label="占位符：">
        <el-input v-model="data.placeholder" placeholder="请输入占位符"></el-input>
      </el-form-item>
      <el-form-item label="size：">
        <el-select v-model="data.size">
          <el-option value="large">large</el-option>
          <el-option value="medium">medium</el-option>
          <el-option value="small">small</el-option>
          <el-option value="mini">mini</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用：">
        <el-radio-group v-model="data.disabled">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'emEditInput',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style>

</style>


