<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <div style="height: 50px;width: 50px;float: left;margin-left: 0px;margin-top: 5px;">
            <img style="width: 100%;height: 100%;" src="../assets/病毒扫描_blue2.png" alt="" />
          </div>
          <div
            style="height: 50px;width: 800px;margin-left:15px;text-align: left;line-height:60px;font-size: 24px;font-family: 'Trebuchet MS', sans-serif;color:#fafafa;font-weight: 700;float: left;">
            X-MalChain
          </div>
        </el-row>
      </el-header>

      <el-main>
        <div id="upload" style="margin-top: 5%;" v-show="!if_upload">
          <el-upload class="upload-demo" drag multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" @click="upload_apk">Drag the file here or <em>Choose file</em>
            </div>
            <div class="el-upload__tip" slot="tip">Only apk files can be uploaded.</div>
          </el-upload>
        </div>

        <!--上传完成后，开始输出相关信息-->
        <el-row :gutter="10" v-show='if_upload'>
          <!--第1列-->
          <el-col :span="8">
            <el-card style="width: 380px;height:190px">
              <div slot="header" style="font-size: 16px;font-family: 'Trebuchet MS', sans-serif;">
                <span>APK Basic Information</span>
              </div>
              <div style="font-size: 12px;text-align: left;">
                <p>APK Name: TestMalware</p>
                <p>File Size: 12M</p>
                <p>SDK Level: Android 9</p>
                <p>Release Date: 2018-08-06</p>
              </div>
            </el-card>

            <el-card style="width: 380px;height:310px;margin-top: 10px;">
              <div slot="header" style="font-size: 16px;font-family: 'Trebuchet MS', sans-serif;">
                <span>Key Features</span>
              </div>
              <div style="font-size: 12px;text-align: left;">
                <p style="font-family: 'Trebuchet MS', sans-serif;font-size:14px">Permissions:</p>
                <span style="white-space: pre-wrap;">permission.READ_SMS<br />permission.INTERNET<br />
                </span>

                <p style="font-family: 'Trebuchet MS', sans-serif;font-size: 14px;">API calls:</p>
                <span style="white-space: pre-wrap;">permission.READ_SMS<br />permission.INTERNET<br />
                </span>
              </div>
              <!-- <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div> -->
            </el-card>
          </el-col>

          <!--第2列-->
          <el-col :span="8">
            <el-card style="width:400px;height: 510px;">
              <div slot="header" style="font-size: 16px;font-family: 'Trebuchet MS', sans-serif;">
                <span>Malicious Behavior Chains</span>
              </div>
              <div style="width: 400px;height: 95px;margin:0px;font-size: 12px;text-align: left;">
                <div style="float: left;">
                  <li v-for="o in this.behaviors.slice(0,5)">
                    {{o.action}}
                  </li>
                </div>
                <div style="float: left;margin-left:30px;">
                  <li v-for="o in this.behaviors.slice(5,9)">
                    {{o.action}}
                  </li>
                </div>
              </div>
              <el-divider><i class="el-icon-d-caret"></i></el-divider>
              <div id="mountNode" ref="container">
              </div>
              <!-- <div v-for="o in this.list.pathaction" :key="o" class="text item">
                <div v-for="x in o" :key="x" class="text item">
                  <p>↓</p>
                  <p>{{x.action }}</p>
                </div>
                <el-divider></el-divider>
              </div> -->
              <!-- <div v-for="o in this.list.pathaction" class="text item">
                <p>↓</p>
                <p>{{o}}</p>
                <el-divider></el-divider>
              </div> -->
            </el-card>
          </el-col>

          <!--第3列-->
          <el-col :span="8">
            <el-card style="width: 380px;height:510px;margin-left: 20px;">
              <div slot="header" style="font-size: 16px;font-family: 'Trebuchet MS', sans-serif;">
                <span>Malicious Behavior Description</span>
              </div>
              <div id="feature" style="width: 380px;height: 95px;">
              </div>
              <el-divider><i class="el-icon-d-caret"></i></el-divider>
              <div style="width: 340px;height: 430px;margin:0px;font-size: 12px;text-align: justify;">
                <span>Malware may, for example, first <span style="color:#0e6974;font-weight: 600;">listen to SMS</span>
                  received through
                  system
                  events, and then <span style="color:#97c976;font-weight: 600;">block the
                    broadcast</span>. Next, it may also <span style="color:#0e6974;font-weight: 600;">read the body of
                    the SMS</span>, and subsequently <span style="color:#0e6974;font-weight: 600;">forforward it</span>
                  without
                  the
                  user's authorization, resulting in endangering the user's personal privacy and security... </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import G6 from '@antv/g6'
  import * as echarts from 'echarts'
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
          'pathaction': ['Listen to SMS', 'Block broadcast', 'Read SMS', 'Leak SMS'],
          'pathlist': ''
        },
        if_upload: true,
        behaviors: [{
          action: 'Listen to SMS',
          level: 'sensitive'
        }, {
          action: 'Block broadcast',
          level: 'others'
        }, {
          action: 'Read SMS',
          level: 'sensitive'
        }, {
          action: 'Leak SMS',
          level: 'sensitive'
        }, {
          action: 'Access the Internet',
          level: 'sensitive'
        }, {
          action: 'Download',
          level: 'sensitive'
        }, {
          action: 'Install',
          level: 'sensitive'
        }, {
          action: 'Launch Apps',
          level: 'sensitive'
        }, {
          action: 'Hide icon',
          level: 'sensitive'
        }],
        nodeX: ["Download", "Read SMS", "Block broadcast", "Access the Internet"],
        nodeY: [1, 2, 2, 4],
        featureX: ["Download", "Read SMS", "Block broadcast", "Access the Internet"],
        featureY: [1, 2, 2, 4],

      }
    },

    // 初始化
    mounted() {
      // this.if_upload = false
      this.initG6()
      this.featureMap()
      this.nodeMap()
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

      initG6() {
        const data = {
          nodes: [{
            id: 'node1',
            label: 'Listen to SMS'//节点内的文本名称
          }, {
            id: 'node2',
            label: 'Block broadcast',//节点内的文本名称
            style: {
              fill: "#bae79c", // 填充色
              stroke: "#237804", // 节点描边色
              lineWidth: 1
            },
          }, {
            id: 'node3',
            label: 'Read SMS'
          }, {
            id: 'node4',
            label: 'Leak SMS'
          }, {
            id: 'node5',
            label: 'Access the Internet'
          }, {
            id: 'node6',
            label: 'Download'
          }, {
            id: 'node7',
            label: 'Install'
          }, {
            id: 'node8',
            label: 'Launch Apps'
          }, {
            id: 'node9',
            label: 'Hide icon'
          }],
          edges: [{
            source: "node1",
            target: "node2"
          }, {
            source: 'node2',
            target: 'node3'
          }, {
            source: 'node3',
            target: 'node4'
          }, {
            source: 'node5',
            target: 'node6'
          }, {
            source: 'node6',
            target: 'node7'
          }, {
            source: 'node7',
            target: 'node8'
          }, {
            source: 'node8',
            target: 'node9'
          }]
        };
        const graph = new G6.Graph({
          container: 'mountNode',
          width: 320,
          height: 300,
          fitView: true,
          modes: {
            default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
          },
          defaultNode: {
            type: "circle",
            size: [30],
            style: {
              fill: "#b7dee2", // 填充色
              stroke: "#00474f", // 节点描边色
              lineWidth: 1
            },
            labelCfg: {
              style: {
                fill: "black",
                fontSize: 10
              }
            }
          },
          defaultEdge: {
            shape: 'polyline',
            style: {
              endArrow: true,
              lineWidth: 1,
              stroke: '#bfbfbf'
            },
            labelCfg: {
              autoRotate: true,
            }
          }
        });
        graph.data(data);
        graph.render();
        graph.fitView();
      }
    },

    upload_apk() {
      this.if_upload = true
      // this.initG6()
    },

    featureMap() {
      // KG上节点的映射结果
      this.featureMapBar = echarts.init(document.getElementById('feature'));
      this.featureMapBar.setOption({
        title: {
          text: 'Feature Map'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ["Download", "Read SMS", "Block broadcast", "Access the Internet"]
        },
        series: [
          {
            // name: '2011',
            type: 'bar',
            data: [1, 2, 2, 4]
          }
        ]
      });
    },

    nodeMap() {
      // KG上节点的映射结果
      this.nodeMapBar = echarts.init(document.getElementById('node'));
      this.nodeMapBar.setOption({
        title: {
          text: 'Node Map',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {},
        xAxis: {
          label: {
            show: true,
            position: 'top',
          },
          // data: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
          data: this.nodeX,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              fontSize: '10',
              itemSize: ''
            }
          },
        },
        yAxis: {},
        series: [
          {
            // name: 'sales',
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            label: {
              show: true,
              position: 'top',
            },
            // data: [0, 0, 12, 106, 271, 351],
            data: this.nodeY
          }
        ]
      });
    },
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
    margin-bottom: 14px;
  }

  /* >>>.el-card>.el-card_body {
    padding: 10px !important;
  } */
</style>