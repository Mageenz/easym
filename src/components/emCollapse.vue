<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="基本信息">
        <draggable v-model="components" :options="options" class="dragwrap">
          <div v-for="(item, index) in components" :key="item.id" class="dropped-component">
            <component :is="item.componentName" :data="item"></component>
          </div>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import mixin from '../utils/mixin.js';
import utils from '../utils/utils.js';

export default {
  name: 'emCollapse',
  data() {
    return {
      activeNames: ['1'],
      components: [],
      options: {
        group: {
          name: 'components',
          pull: false,
          put: true
        },
      },
    }
  },
  mixins: [mixin]
}
</script>

<style scoped>
.dragwrap {
  min-height: 100px;
}
</style>
