<template>
  <div class="container" @click="cancelEdit" v-loading='loading'>
    <div class="topwrap">
      <el-row>
        <el-col :span="8" :offset="16">
          <el-button type="primary" size="small" @click="savePage">保存</el-button>
          <el-button type="success" size="small">预览</el-button>
          <el-button size="small" @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="mainwrap">
      <!-- 左侧组件列表 -->
      <div class="leftwrap">
        <el-tabs v-model="activeName">
          <el-tab-pane label="布局" name="layout">
            <draggable v-model="wraps" :options="wrapsOptions" :clone="clone">
              <div class="component" v-for="(item, index) in wraps" :key="index">{{item.columns}} 列</div>
            </draggable>
          </el-tab-pane>
          <el-tab-pane label="组件" name="components">
            <draggable v-model="components" :options="componentsOptions" :clone="clone">
              <div class="component" v-for="item in components" :key="item.name">{{item.name}}</div>
            </draggable>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="rightwrap">
        <div class="page">
            <el-form label-position="right" label-width="80px">
              <draggable v-model="droppedWraps" :options="droppedWrapsOptions" class="dragwrap">
                <el-row class="drap-row" v-for="(wrap, wrapIndex) in droppedWraps" :key="wrapIndex">
                  <span class="drag-handle"></span>
                  <el-popover placement="right" width="160" v-model="wrap.popoverVisible">
                    <p>确定删除该区块吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="wrap.popoverVisible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="deleteWrap(wrapIndex)">确定</el-button>
                    </div>
                    <span class="el-icon-remove remove-btn" slot="reference"></span>
                  </el-popover>
                  <el-col :span="24/wrap.columns" v-for="(components, componentsIndex) in wrap.components" :key="componentsIndex">
                    <draggable v-model="components.components" :options="droppedComponentsOptions" class="dropped-wrap">
                      <div v-for="(item, index) in components.components" class="dropped-component" @click.stop="selectCompoent(item, wrapIndex, componentsIndex,  index, $event)" :key="index">
                        <div class="flex">
                          <div class="flex-1 mr15"><component :is="item.componentName" :data="item"></component></div>
                          <div class="delete-btn-wrap"></div>
                        </div>
                        <div class="mask flex">
                          <div class="flex-1 tr">
                            <el-popover placement="right" width="160" v-model="item.popoverVisible">
                              <p>确定删除该组件吗？</p>
                              <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="item.popoverVisible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="item.popoverVisible = false" @click.stop="deleteComponent(wrapIndex, componentsIndex, index)">确定</el-button>
                              </div>
                              <span class="el-icon-remove" slot="reference" @click.stop></span>
                            </el-popover>
                          </div>
                        </div>
                      </div>
                    </draggable>
                  </el-col>
                </el-row>
              </draggable>
            </el-form>
        </div>
      </div>

      <div class="fakewrap"></div>

      <transition name="slide">
        <div v-show="isComponentEditbarShow" class="component-editbar" @click.stop @keyup.stop>
          <div class="component-editcontainer">
            <component :is="editComponent.editComponentName" :data="editComponent"></component>
          </div>
        </div>
      </transition>
    </div>

    
  </div>  
</template>

<script>
import mixin from '../utils/mixin.js';
import utils from '../utils/utils.js';

import emCollapse from '../components/emCollapse.vue';

export default {
  data() {
    return {
      droppedWrapsOptions: {
        group: {
          name: 'wraps',
          pull: false,
          put: true
        },
        animation: 150,
        handle: '.drag-handle'
      },
      droppedWraps: [],

      activeName: 'layout',
      wraps: [{
        columns: 1,
        components: [{components: []}]
      }, {
        columns: 2,
        components: [{components: []}, {components: []}]
      }, {
        columns: 3,
        components: [{components: []}, {components: []}, {components: []}]
      }],
      wrapsOptions: {
        group: {
          name: 'wraps',
          pull: 'clone',
          put: false
        },
        sort: false
      },

      _id: '',
      loading: false,

      editComponent: {},
      editComponentIndex: '',

      isComponentEditbarShow: false,

      clone(e) {
        let copy = JSON.parse(JSON.stringify(e));
        copy.popoverVisible = false;
        return copy;
      },
      componentsOptions: {
        group: {
          name: 'components',
          pull: 'clone',
          put: false
        },
        sort: false
      },
      droppedComponentsOptions: {
        group: {
          name: 'components',
          pull: true,
          put: true
        },
      },
      components: [{
        name: 'table',
        componentName: 'emTable',
        editComponentName: 'emEditTable',
        columnList: [{
          label: '表头1',
          prop: 'prop1'
        }, {
          label: '表头2',
          prop: 'prop2'
        }]
      }, {
        name: 'breadcrumb',
        componentName: 'emBreadcrumb',
        editComponentName: 'emEditBreadcrumb',
        breadList: [{name: '首页', url: '/index.html'}]
      }, {
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
    emCollapse
  },
  mixins: [mixin],
  methods: {
    goBack() {
      this.$confirm('返回的话将不会保存目前的改动，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      })
    },
    getDetal() {
      this._id = this.$route.query._id;
      this.$http.get(`/api/page/${this._id}`).then(res => {
        this.droppedWraps = JSON.parse(res.data.data)
      })
    },
    savePage() {
      this.loading = true
      this.$http.put(`/api/page/${this._id}`, {
        data: this.droppedWraps
      }).then(res => {
        this.$message({
          type: 'success',
          duration: 1000,
          message: '操作成功',
          onClose: () => {
            this.$router.go(-1)
          }
        })

        this.loading = false
      })
    },
    changeCategory(item) {
      this.components = this[item.name]
    },
    // 删除区块
    deleteWrap(wrapIndex) {
      this.droppedWraps.splice(wrapIndex, 1)
    },
    // 删除组件
    deleteComponent(wrapIndex, componentsIndex, index) {
      this.droppedWraps.forEach((wrap, wIndex) => {
        if (wrapIndex === wIndex) {
          wrap.components.forEach((components, cIndex) => {
            if (componentsIndex === cIndex) {
              components.components.splice(index, 1)
            }
          })
        }
      })
      this.editComponent = {}
      this.isComponentEditbarShow = false
    },
    // 选择组件进行编辑
    selectCompoent(data, wrapIndex, componentsIndex, index, e) {
      let el = e.currentTarget;
      utils.removeClass(document.querySelectorAll('.dropped-component'), 'selected');
      utils.addClass(el, 'selected');

      this.isComponentEditbarShow = true // 显示右侧菜单栏
      this.editComponent = data
    },
    cancelEdit() {
      if(this.isComponentEditbarShow) {
        this.clear()
      }
    },
    clear() {
      this.isComponentEditbarShow = false
      this.editComponentIndex = ''
      this.editComponent = {}
      utils.removeClass(utils.selector('.dropped-component'), 'selected')
    }
  },
  created() {
    this.getDetal()

    document.addEventListener('keyup', deleteComponent.bind(this))
  },
  destroyed() {
    document.removeEventListener('keyup', deleteComponent)
  }
}

// delete键删除组件
const deleteComponent = function(e) {
  let editComponentIndex = this.editComponentIndex

  if(editComponentIndex !== '' && e.code === 'Backspace') {
    this.clear()
    this.droppedComponents.splice(editComponentIndex, 1)
  }
}
</script>

<style scoped>
.tr {
  text-align: right;
}
.mr15 {
  margin-right: 15px;
}
.flex{
  display: flex;
  align-items: center;
}
.flex-1 {
  flex: 1;
}
.el-icon-remove {
  color: #f56c6c;
  cursor: pointer;
}
.el-icon-remove:hover {
  color: #f87e7e;
}
.el-icon-remove.remove-btn {
  position: absolute;
  right: 6px;
  top: 6px;
}
.drag-handle {
  display: block;
  position: absolute;
  top: 4px;
  right: 35px;
  width: 20px;
  height: 20px;
  background-image: url(../assets/images/drag.png);
  background-size: contain;
  cursor: move;
}
.drag-handle:hover {
  background-image: url(../assets/images/drag-hover.png);
}
.dropped-wrap {
  min-height: 40px;
}

.drap-row.el-row {
  border: 1px #e5e5e5 dashed;
  margin-bottom: 15px;
  background-color: rgba(34, 34, 34, 0.03);
}

.drap-row.el-row .el-col {
    border-right: 1px #e5e5e5 dashed;
    padding: 30px 15px 15px 15px;
}
.drap-row.el-row .el-col:last-child {
  border-right: 0;
}
.drag-item {
  width: 100px;
  border: 1px #fff solid;
  height: 30px;
  float: left;
  border-radius: 5px;
  margin-right: 10px;
}

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
  width: 260px;
  height: 100%;
  overflow: auto;
  background-color: #484848;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
}
.leftwrap >>> .el-tabs__item {
  color: #fff;
}
.leftwrap >>> .el-tabs__item.is-active {
  color: #409EFF;
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
  width: 80%;
  /* min-height: 800px; */
  border-radius: 3px;
  background-color: #fff;
  margin: 30px auto;
  padding: 10px;
}

.component {
  height: 40px;
  line-height: 40px;
  cursor: move;
  padding: 0 10px;
  color: #222;
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 14px;
}
.component.sortable-drag {
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
}
.component.sortable-ghost {
  /* border: 1px dashed #ccc; */
}

.tip {
  color: #ccc;
  text-align: center;
  font-size: 20px;
  padding-top: 100px;
}
.dropped-component {
  border-radius: 3px;
  cursor: pointer;
  padding: 15px 10px;
  margin-bottom: 10px;
  position: relative;
  background-color: #fff;
}
.dropped-component >>> .el-form-item {
  margin-bottom: 0;
}
.dropped-component.selected .mask{
  border: 1px #9c5454 dashed;
}

.dropped-component .delete-btn-wrap {
  width: 50px;
}

.dropped-component:last-child {
  margin-bottom: 0;
}
.dropped-component .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: transparent;
  border: 1px #fff solid;
  padding-right: 15px;
  box-sizing: border-box;
}
.dropped-component .mask:hover {
  border: 1px #9c5454 dashed;
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
  padding: 10px;
}
.component-editbar >>> .el-form-item__label {
  color: #aeaeae;
}
</style>


