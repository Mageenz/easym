<template>
  <div class="container">
    <div class="operatebar">
      <el-row :gutter="15">
        <el-col :span="6"><el-input placeholder="请输入页面名称、url" size="small" clearable=""></el-input></el-col>
        <el-col :span="6"><el-button type="primary" @click="isDialogShow = true" size="small">创建页面</el-button></el-col>
      </el-row>
    </div>
    <div class="listwrap">
      <el-table :data="list" v-loading="isLoading">
        <el-table-column label="页面名称" prop="name"></el-table-column>
        <!-- <el-table-column label="页面url" prop="url"></el-table-column> -->
        <el-table-column label="描述" prop="des"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editPage(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deletePage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="isDialogShow" width="30%" title="创建页面" @closed="closed">
      <el-form label-width="100px" label-position="top" :rules="rules" :model="form" ref="form">
        <el-form-item label="页面名称：" prop="name">
          <el-input placeholder="请输入页面名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="页面描述：">
          <el-input placeholder="请输入页面描述" v-model="form.des"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="savePage" :loading="isSaving">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        name: [
          {required: true, message: '请输入页面名称', trigger: 'blur'}
        ]
      },
      list: [],
      isLoading: false,
      isDialogShow: false,
      isSaving: false,
      form: {
        name: '',
        des: ''
      }
    }
  },
  methods: {
    closed() {
      this.form = {
        name: '',
        des: ''
      }
    },
    editPage(item) {
      this.$router.push({
        name: 'create',
        query: {
          _id: item._id
        }
      })
    },
    deletePage(item) {
      this.$http.delete(`/api/page/${item._id}`).then(res => {
        if(res.data) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '删除成功',
            onClose: () => {
              this.getList()
            }
          })
        }
      })
    },
    savePage() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.isSaving = true
          this.$http.post('/api/page', this.form).then(res => {
            if(res.data._id) {
              this.$message({
                type: 'success',
                duration: 1000,
                message: '保存成功',
                onClose: () => {
                  this.isDialogShow = false
                  this.isSaving = false
                  this.getList()
                }
              })
            }
          })
        }
      })
    },
    getList() {
      this.isLoading = true
      this.$http.get('/api/page').then(res => {
        this.list = res.data
        this.isLoading = false
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
.container{
  padding: 10px;
}
.operatebar {
  margin-bottom: 30px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
}
</style>


