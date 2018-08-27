<template>
  <div class="container" @click="cancelEdit">
    <div class="topwrap">
      <el-row>
        <el-col :span="8" :offset="8">
          <el-button type="default" size="small" v-for='item in categories' :key='item.label' @click='changeCategory(item)'>{{item.label}}</el-button>
          <!-- <el-button type="default" size="small">页面相关</el-button> -->
        </el-col>
        <el-col :span="8">
          <el-button type="primary" size="small" @click="savePage">保存</el-button>
          <el-button type="success" size="small">预览</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="mainwrap">
      
      <!-- 左侧组件列表 -->
      <div class="leftwrap">
        <draggable v-model="components" :options="options1" :clone="clone">
          <div class="component" v-for="item in components" :key="item.name">{{item.name}}</div>
        </draggable>
      </div>

      <div class="rightwrap">
        <div class="page">
            <el-form label-position="right" label-width="80px">
              <draggable v-model="droppedComponents" :options="options2" class="dragwrap">
                <div v-for="item in droppedComponents" :key="item.id" class="dropped-component" @click.stop="selectCompoent(item, $event)">
                  <component :is="item.componentName" :data="item"></component>
                </div>
                <div v-if="!droppedComponents.length" class="tip">从左边拖拽控件到这里吧</div>
              </draggable>
            </el-form>
        </div>
      </div>

      <div class="fakewrap"></div>

      <transition name="slide">
        <div v-show="isComponentEditbarShow" class="component-editbar" @click.stop>
          <div class="component-editcontainer">
            <component :is="editComponent.editComponentName" :data="editComponent"></component>
          </div>
        </div>
      </transition>
    </div>

    
  </div>  
</template>

<script>
import draggable from 'vuedraggable';
import emInput from '../components/emInput.vue';
import emSelect from '../components/emSelect.vue';
import emRadio from '../components/emRadio.vue';
import emButton from '../components/emButton.vue';
import emBreadcrumb from '../components/emBreadcrumb.vue';

import emEditInput from '../components/emEditInput.vue';
import emEditSelect from '../components/emEditSelect.vue';
import emEditRadio from '../components/emEditRadio.vue';

import utils from '../utils/utils.js';

export default {
  data() {
    return {
      editComponent: {},
      isComponentEditbarShow: false,

      clone(e) {
        console.log(e);
        let copy = JSON.parse(JSON.stringify(e));
        copy.id = new Date().getTime()
        return copy;
      },
      options1: {
        group: {
          name: 'components',
          pull: 'clone',
          put: false
        },
        sort: false
      },
      options2: {
        group: {
          name: 'components',
          pull: false,
          put: true
        },
      },
      categories: [{
        label: '表单控件',
        name: 'form'
      }, {
        label: '页面',
        name: 'page'
      }],
      components: [],
      page: [{
        name: '面包屑导航',
        componentName: 'emBreadcrumb'
      }],
      form: [{
        name: 'input',
        labelWidth: '80',
        disabled: false,
        size: 'medium',
        editComponentName: 'emEditInput',
        componentName: 'emInput',
        placeholder: '请输入信息',
        label: '标题：',
      }, {
        name: 'select',
        editComponentName: 'emEditSelect',
        componentName: 'emSelect',
        label: '标题：',
        selectList: [{value: 0, label: '请选择'}]
      }, {
        name: 'radio',
        editComponentName: 'emEditRadio',
        componentName: 'emRadio',
        label: '标题：',
        radioList: [{label: 0, text: '选项1'}]
      }, {
        name: 'button',
        componentName: 'emButton'
      }],
      droppedComponents: []
    }
  },
  components: {
    draggable,
    emInput,
    emSelect,
    emRadio,
    emButton,
    emBreadcrumb,

    emEditInput,
    emEditSelect,
    emEditRadio
  },
  methods: {
    savePage() {
      this.$http.post('/api/page', {
        name: ''
      })
    },
    changeCategory(item) {
      this.components = this[item.name]
    },
    selectCompoent(data, e) {
      let el = e.currentTarget;
      utils.addClass(el, 'selected');
      utils.removeClass(utils.siblings(el), 'selected');

      this.isComponentEditbarShow = true;
      this.editComponent = data;
    },
    cancelEdit() {
      if(this.isComponentEditbarShow) {
        this.isComponentEditbarShow = false
        this.editComponent = {}
        utils.removeClass(utils.selector('.dropped-component'), 'selected');
      }
    }
  },
  created() {
    this.components = this.form
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.topwrap {
  height: 50px;
  padding-top: 9px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.06);
  background-color: #373737;
  box-sizing: border-box;
  flex-shrink: 0;
}
.mainwrap {
  flex: 1;
  width: 100%;
  display: flex;
  position: relative;
}
.leftwrap {
  width: 200px;
  height: 100%;
  overflow: auto;
  background-color: #484848;
}
.rightwrap {
  flex: 1;
  height: 100%;
  background-color: #222;
  overflow: auto;
}
.fakewrap {
  width: 300px;
  background-color: #222;
}
.page {
  width: 60%;
  /* min-height: 800px; */
  border-radius: 3px;
  background-color: #fff;
  margin: 30px auto;
  padding: 15px;
}

.component {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  padding: 0 10px;
  color: #222;
  background-color: #fff;
  margin: 15px;
  border-radius: 3px;
  border: 1px #ccc solid;
  font-size: 14px;
}
.tip {
  color: #ccc;
  text-align: center;
  font-size: 20px;
  padding-top: 100px;
}
.dropped-component {
  border: 2px dashed #fff;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
}
.dropped-component >>> .el-form-item {
  margin-bottom: 0;
}
.dropped-component.selected{
  border: 2px #ccc dashed;
}
.dropped-component * {
  cursor: pointer;
}
.dropped-component:last-child {
  margin-bottom: 0;
}
.dropped-component:hover {
  border: 2px dashed #ccc;
}
.dragwrap {
  min-height: 400px;
}

.slide-enter{
  transform: translateX(100%);
}
.slide-enter-active{
  transition: .3s;
}
.slide-leave-active {
  transform: translateX(100%);
  transition: .18s;
}
.component-editbar {
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  width: 300px;
  background-color: #484848;
  overflow: auto;
}
.component-editbar .el-form-item__label, .component-editbar .el-radio {
  color: #a0a0a0;
}
.component-editcontainer {
  padding: 10px 15px;
}
</style>


