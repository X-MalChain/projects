<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <div style="height: 80%;width: 40%;margin-top: 5%;margin-left: 15%;">
              <img style="width: 100%;height: 100%;" src="../assets/病毒扫描_blue2.png" alt="" />
            </div>
          </el-col>
          <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <div
              style="height: 80%;width: 100%;text-align: left;line-height:60px;font-size: 24px;color:#fafafa;font-weight: 700;">
              Malware Behavoir Explanation
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="API Management" name="first">
              <div style="margin-top: 2em;float: left;margin-left: 2em;width: 400px;">
                <el-form label-position="left" label-width="100px" :model="apiFormAlt" size="small" :rules="rules">
                  <el-form-item label="API ID" prop="id">
                    <el-input v-model="apiFormAlt.id"></el-input>
                  </el-form-item>
                  <el-form-item label="New Name">
                    <el-input v-model="apiFormAlt.newName"></el-input>
                  </el-form-item>
                  <el-form-item label="Introduced In">
                    <el-input v-model="apiFormAlt.inLevel"></el-input>
                  </el-form-item>
                  <el-form-item label="Deprecated In">
                    <el-input v-model="apiFormAlt.outLevel"></el-input>
                  </el-form-item>
                </el-form>
                <el-button @click="confirm(0)" size="small" style="float: right;" type="primary" plain>Alter</el-button>
              </div>
              <div style="margin-left: 2em;float: left;width: 1px;height:280px;background-color:#36cfc9;">
              </div>
              <div style="margin-top: 2em;float: left;margin-left: 2em;">
                <el-form label-position="left" label-width="100px" :model="apiFormDel" size="small" :rules="rules">
                  <el-form-item label="API ID" prop='id'>
                    <el-input v-model="apiFormDel.id"></el-input>
                  </el-form-item>
                </el-form>
                <el-button @click="deleteApi" size="small" style="float: right;" type="primary" plain>Delete
                </el-button>
              </div>
              <div style="margin-left: 2em;float: left;width: 2px;height:280px;background-color:#36cfc9;">
              </div>
              <div style="margin-top: 2em;float: left;margin-left: 2em;width: 400px;">
                <el-form label-position="left" label-width="100px" :model="apiFormAdd" size="small" :rules="rules">
                  <el-form-item label="API Name" prop="addName">
                    <el-input v-model="apiFormAdd.apiName"></el-input>
                  </el-form-item>
                  <el-form-item label="Introduced In">
                    <el-input v-model="apiFormAdd.inLevel"></el-input>
                  </el-form-item>
                  <el-form-item label="Deprecated In">
                    <el-input v-model="apiFormAdd.outLevel"></el-input>
                  </el-form-item>
                  <el-form-item label="Add List">
                    <el-input v-model="apiFormAdd.addList"></el-input>
                  </el-form-item>
                  <el-form-item label="Replaced List">
                    <el-input v-model="apiFormAdd.repList"></el-input>
                  </el-form-item>
                </el-form>
                <el-button @click="addApi" size="small" style="float: right;" type="primary" plain>Insert
                </el-button>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Per Management" name="second">Per Management</el-tab-pane>

            <el-tab-pane label="Node Management" name="third">
              <div style="margin-top: 2em;float: left;margin-left: 2em;width: 400px;">
                <el-form label-position="left" label-width="120px" :model="nodeFormAlt" size="small"
                  :rules="rules_node">
                  <el-form-item label="Node ID" prop="id">
                    <el-input v-model="nodeFormAlt.id"></el-input>
                  </el-form-item>
                  <el-form-item label="Node Name">
                    <el-input v-model="nodeFormAlt.actionName"></el-input>
                  </el-form-item>
                  <el-form-item label="API List">
                    <el-input v-model="nodeFormAlt.apiList"></el-input>
                  </el-form-item>
                  <el-form-item label="Permission List">
                    <el-input v-model="nodeFormAlt.perList"></el-input>
                  </el-form-item>
                </el-form>
                <el-button @click="alter_node" size="small" style="float: right;" type="primary" plain>Alter
                </el-button>
              </div>
              <div style="margin-left: 2em;float: left;width: 1px;height:280px;background-color:#36cfc9;">
              </div>
              <div style="margin-top: 2em;float: left;margin-left: 2em;">
                <el-form label-position="left" label-width="120px" :model="nodeFromAdd" size="small"
                  :rules="rules_node">
                  <el-form-item label="Node Name">
                    <el-input v-model="nodeFromAdd.nodeName"></el-input>
                  </el-form-item>
                  <el-form-item label="API List">
                    <el-input v-model="nodeFromAdd.apiList"></el-input>
                  </el-form-item>
                  <el-form-item label="Permission List">
                    <el-input v-model="nodeFromAdd.perList"></el-input>
                  </el-form-item>
                </el-form>
                </el-form>
                <el-button @click="addNode" size="small" style="float: right;" type="primary" plain>Insert
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-main>
    </el-container>

  </div>
</template>

<script>
  import qs from 'qs'
  import axios from 'axios'
  export default {
    data() {
      return {
        activeName: 'first',
        apiFormAlt: {
          id: '',
          newName: '',
          inLevel: '',
          outLevel: ''
        },
        apiFormDel: {
          id: 0
        },
        apiFormAdd: {
          apiName: '',
          inLevel: 0,
          outLevel: 0,
          addList: '',
          repList: ''
        },
        rules: {
          id: [
            { required: true, message: 'please enter API\'s ID', trigger: 'blur' },
          ],
          addName: [
            { required: true, message: 'please enter API\'s Name', trigger: 'blur' },
          ],
        },

        nodeFormAlt: {
          id: '',
          actionName: '',
          perList: '',
          apiList: ''
        },
        nodeFromAdd: {
          nodeName: '',
          apiList: '',
          perList: ''
        },
        rules_node: {
          id: [
            { required: true, message: 'please enter Node\'s ID', trigger: 'blur' },
          ],
          nodeName: [
            { required: true, message: 'please enter node\'s Name', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // },

      alter_api() {
        console.log('*****alter_api*****')
        var that = this
        var json_str_data = JSON.stringify(this.apiFormAlt).toString()
        axios.post('manage/alterapi', json_str_data).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: 'Successfully modified!'
            });
          }
        }).catch(err => {
          console.log("出错！具体错误为：", err)
        })
      },

      addApi() {
        var that = this
        var json_str_data = JSON.stringify(this.apiFormAdd).toString()
        axios.post('manage/addapi', json_str_data).then(res => {
          if (res.status == 200) {
            console.log('add api:', res)
            this.$message({
              type: 'success',
              message: 'Successfully Insert!'
            });
          }
        }).catch(err => {
          console.log("出错！具体错误为：", err)
        })
      },

      deleteApi() {
        var that = this
        axios.post('manage/deleteapi', JSON.stringify(that.apiFormDel).toString()).then(res => {
          if (res.status == 200) {
            console.log("delete api", res.data)
            that.list = res.data
          }
        }).catch(err => {
          console.log("出错！具体错误为：", err)
        })
      },

      alter_node() {
        var that = this
        var json_str_data = JSON.stringify(this.nodeFormAlt).toString()
        axios.post('manage/alternode', json_str_data).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: 'Successfully modified!'
            });
          }
        }).catch(err => {
          console.log("出错！具体错误为：", err)
        })
        console.log(that.list)
      },

      addNode() {
        var that = this
        var json_str_data = JSON.stringify(this.nodeFromAdd).toString()
        axios.post('manage/addnode', json_str_data).then(res => {
          if (res.status == 200) {
            console.log('add node:', res)
            this.$message({
              type: 'success',
              message: 'Successfully Insert!'
            });
          }
        }).catch(err => {
          console.log("出错！具体错误为：", err)
        })
      },


      confirm(flag) {
        var that = this
        var retStr = ''
        if (flag == 0) {
          axios.post('manage/query', qs.stringify({
            id: that.apiFormAlt['id'],
            flag: flag
          })).then(res => {
            that.retStr = res.data
            console.log('resStr', that.retStr)
            this.$confirm('Do you want to modify the API:\n' + that.retStr + '?', 'Tips', {
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              type: 'warning'
            }).then(() => {
              this.alter_api()
              // this.$message({
              //   type: 'success',
              //   message: 'Successfully modified!'
              // });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Operation cancelled'
              })
            })

          }).catch(() => {
            console.log('query failed.')
          })
        }
      },
    },
  }
</script>

<style scoped>
  .el-header {
    background-color: #00474f;
  }
</style>