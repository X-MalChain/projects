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
              Malicious Behavior Chains
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div id="upload" v-show="!if_upload">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" @click="upload_apk">Drag the file here or <em>Choose file</em></div>
            <div class="el-upload__tip" slot="tip">Only apk files can be uploaded.</div>
          </el-upload>
        </div>
        <div id="after-upload" v-show="if_upload">
          <el-row>
            <div style="margin-left: 2em;text-align: left ;">
              <el-card class="box-card"> <span>Apk name: test</span>
                <span> Apk Information: balabala</span></el-card>

            </div>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <div style="margin-top: 2em;float: left;margin-left: 2em;">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{this.list.filename}}</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="getDetect">检测按钮</el-button>
                </div>
                <p>特征匹配成功率：{{this.list.maprate}}</p>
                <p>部分匹配上的特征数/KG全部特征数：{{this.list.partmap}}</p>
                <p>完全匹配上的特征数/KG全部特征数：{{this.list.fullmap}}</p>
                <p>完全匹配上的特征数/部分匹配上的特征数：{{this.list.fullandpart}}</p>
                <p>完全匹配上的路径（id）：{{this.list.pathlist}}</p>
                <p>完全匹配上的路径（id+action）：{{this.list.pathaction}}</p>
                <!-- <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div> -->
              </el-card>
            </div>
            <div style="margin-top: 2em;float: left;margin-left: 2em;">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>匹配路径</span>
                  <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="getDetect">检测按钮</el-button> -->
                </div>
                <div v-for="o in this.list.pathaction" :key="o" class="text item">
                  <div v-for="x in o" :key="x" class="text item">
                    <p>↓</p>
                    <p>{{x.action }}</p>
                  </div>
                  <el-divider></el-divider>
                </div>
              </el-card>
            </div>
          </el-row>
        </div>
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
        },
        if_upload: true,
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
      },

      upload_apk() {
        this.if_upload = true
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