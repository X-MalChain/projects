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
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  // const axios = require('axios')
  export default {
    data() {
      return {
        list: {
          'filename': '',
          'fullandpart': '',
          'fullmap': '',
          'maprate': '',
          'partmap': '',
          'pathaction': '',
          'pathlist': ''
        }
      }
    },
    methods: {
      getDetect() {
        console.log('*****getDetect*****')
        var that = this
        axios.post('detect/main').then(res => {
          if (res.status == 200) {
            console.log("最新的数据为：", res.data)
            that.list = res.data
          }
        }).catch(err => {
          console.log("出错！具体错误为：", err)
        })

        console.log(that.list)
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #00474f;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>