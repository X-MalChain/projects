<template>
  <div>
    <div id="feature" style="width: 1400px;height: 400px;">
    </div>
    <div id="node" style="width: 300px;height: 150px;">
    </div>
  </div>

</template>

<script>
  import qs from 'qs'
  import axios from 'axios'
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        featureMapBar: null,
        featureX: [],
        featureY: [],
        dataset: {
          "android.permission.READ_LOGS": 33,
          "android.permission.SEND_SMS": 71,
          "java/net/URL;->openConnection": 693,
          "android/content/Intent;->setFlags": 277,
          "android.permission.READ_PHONE_STATE": 75,
          "android.permission.REQUEST_INSTALL_PACKAGES": 1,
          "android/telephony/TelephonyManager;->getLine1Number": 104,
          "java/io/File;->createNewFile": 558,
          "android/telephony/SmsMessage;->getDisplayOriginatingAddress": 60,
          "android/telephony/SmsManager;->getDefault": 266,
          "android.permission.INTERNET": 97,
          "android.permission.MODIFY_PHONE_STATE": 11,
          "java/lang/System;->exit": 97,
          "android/telephony/PhoneStateListener;->onCallStateChanged": 1,
          "android/os/Environment;->getExternalStorageDirectory": 810,
          "android.permission.WRITE_SECURE_SETTINGS": 5,
          "android/content/Intent;->setDataAndType": 165,
          "android.permission.WRITE_CONTACTS": 9,
          "android.permission.RECEIVE_BOOT_COMPLETED": 72,
          "android.permission.SYSTEM_ALERT_WINDOW": 78,
          "android/telephony/SmsMessage;->getMessageBody": 118,
          "android/content/Intent;->getStringExtra": 528,
          "android/telephony/TelephonyManager;->getSimSerialNumber": 232,
          "android/content/Context;->getResources": 1166,
          "android/database/Cursor;->getColumnIndex": 688,
          "android/net/Uri;->getPath": 42,
          "android/telephony/TelephonyManager;->getNetworkType": 120,
          "java/io/InputStreamReader;->read": 34,
          "android/content/ContentResolver;->delete": 269,
          "android/os/Handler;->sendMessage": 817,
          "android/telephony/TelephonyManager;->getNetworkOperatorName": 56,
          "java/lang/Runnable;->run": 245,
          "android/content/res/Resources;->openRawResource": 56,
          "android/telephony/TelephonyManager;->getSimOperator": 65,
          "android/os/PowerManager;->isScreenOn": 8,
          "android/media/AudioManager;->getRingerMode": 5,
          "android/app/admin/DevicePolicyManager;->lockNow": 36,
          "java/util/zip/ZipOutputStream;->putNextEntry": 27,
          "android/content/Intent;->putExtra": 1584,
          "android/content/Intent;->setAction": 467,
          "android/os/Messenger;->send": 51,
          "android/telephony/TelephonyManager;->getDeviceId": 701,
          "java/lang/Object;->toString": 1956,
          "android/content/pm/PackageManager;->getInstalledPackages": 150,
          "android/telephony/SmsManager;->sendDataMessage": 124,
          "com.android.browser.permission.READ_HISTORY_BOOKMARKS": 3,
          "android.permission.ACCESS_COARSE_LOCATION": 57,
          "android.permission.CALL_PHONE": 26,
          "java/net/URLConnection;->connect": 33,
          "android/telephony/TelephonyManager;->getNetworkOperator": 104,
          "android/media/AudioManager;->setVibrateSetting": 4,
          "android/content/BroadcastReceiver;->abortBroadcast": 21,
          "android/net/wifi/WifiManager;->setWifiEnabled": 49,
          "android/widget/EditText;->getText": 153,
          "java/lang/Thread;->run": 99,
          "android/content/pm/PackageManager;->setComponentEnabledSetting": 15,
          "android.permission.READ_CALL_LOG": 31,
          "android/app/admin/DevicePolicyManager;->resetPassword": 40,
          "android/view/View;->setOnClickListener": 220,
          "android/telephony/TelephonyManager;->getSubscriberId": 573,
          "android/content/ContentResolver;->query": 535,
          "android/os/Handler;->post": 662,
          "android/content/Intent;->setData": 217,
          "android.permission.INSTALL_PACKAGES": 2,
          "android/content/Intent;->getAction": 818,
          "com.android.launcher.permission.INSTALL_SHORTCUT": 43,
          "android.permission.READ_SMS": 51,
          "java/lang/String;->equals": 6076,
          "android.permission.READ_EXTERNAL_STORAGE": 52,
          "android.permission.DEVICE_POWER": 1,
          "android.permission.WAKE_LOCK": 70,
          "android/location/Location;->getLatitude": 121,
          "android/content/Intent;->addFlags": 454,
          "android/telephony/TelephonyManager;->getImei": 4,
          "android/content/Context;->getPackageManager": 1682,
          "java/lang/Math;->random": 226,
          "android/telephony/SmsMessage;->getDisplayMessageBody": 31,
          "android.permission.WRITE_EXTERNAL_STORAGE": 96,
          "android.permission.CHANGE_NETWORK_STATE": 47,
          "android.permission.CHANGE_WIFI_STATE": 57,
          "android/location/Location;->getLongitude": 117,
          "android/content/Context;->getSystemService": 3332,
          "android/content/Context;->getContentResolver": 1117,
          "android/os/PowerManager;->isInteractive": 3,
          "android.permission.ACCESS_FINE_LOCATION": 58, "android.permission.READ_CONTACTS": 31, "android/telephony/SmsMessage;->getOriginatingAddress": 93, "android.permission.ACCESS_WIFI_STATE": 67, "android/telephony/SmsManager;->sendTextMessage": 232, "android/telephony/SmsManager;->sendMultipartTextMessage": 49, "android.permission.ACCESS_NETWORK_STATE": 94
        },
        datasetNode: { "1": 47, "5": 7, "6": 5, "7": 71, "8": 28, "11": 22, "14": 35, "15": 35, "17": 27, "18": 15, "23": 9, "31": 28, "32": 78, "39": 36, "40": 35, "42": 16, "46": 50, "47": 63, "48": 55, "49": 24, "50": 83 },
        nodeMapBar: null,
        nodeX: [],
        nodeY: []
      }
    },
    mounted() {
      this.featureX, this.featureY = this.readData(this.dataset)
      this.featureMap()
      this.nodeX, this.nodeY = this.readDataByOrder(this.datasetNode)
      console.log('node x:', this.nodeX)
      console.log('node y:', this.nodeY)
      this.nodeMap1()
    },
    methods: {
      readData(dict) {
        var x = [] // x轴
        var y = [] // y轴
        for (var key in dict) {
          x.push(key)
          y.push(dict[key])
        }
        return x, y
      },

      readDataByOrder(dict, count) {
        var x = []
        var y = []
        var i = 1
        while (i <= count) {
          if (dict[str(i)] != undefined) {
            x.push(i)
            y.push(dict[i])
          }
          else {
            x.push(i)
            y.push(0)
          }
          i = i + 1
        }
        return x, y
      },

      featureMap() {
        // KG上节点的映射结果
        this.featureMapBar = echarts.init(document.getElementById('feature'));
        this.featureMapBar.setOption({
          // title: {
          //   text: 'feature Map',
          //   textStyle: {
          //     fontSize: 14
          //   }
          // },
          // tooltip: {},
          // xAxis: {
          //   label: {
          //     show: true,
          //     position: 'top',
          //   },
          //   // data: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
          //   data: this.featureX,
          //   axisTick: {
          //     show: false
          //   },
          //   axisLine: {
          //     show: true,
          //   },
          //   axisLabel: {
          //     interval: 0,
          //     rotate: 45,
          //     textStyle: {
          //       fontSize: '10',
          //       itemSize: ''
          //     }
          //   },
          // },
          // yAxis: {},
          // series: [
          //   {
          //     // name: 'sales',
          //     type: 'bar',
          //     itemStyle: {
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         { offset: 0, color: '#83bff6' },
          //         { offset: 0.5, color: '#188df0' },
          //         { offset: 1, color: '#188df0' }
          //       ])
          //     },
          //     emphasis: {
          //       itemStyle: {
          //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //           { offset: 0, color: '#2378f7' },
          //           { offset: 0.7, color: '#2378f7' },
          //           { offset: 1, color: '#83bff6' }
          //         ])
          //       }
          //     },
          //     // label: {
          //     //   show: true,
          //     //   position: 'top',
          //     // },
          //     // data: [0, 0, 12, 106, 271, 351],
          //     data: this.featureY
          //   }
          // ]

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
            data: this.featureX
          },
          series: [
            {
              // name: '2011',
              type: 'bar',
              data: this.featureY
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
      nodeMap1() {
        // KG上节点的映射结果
        this.nodeMapBar = echarts.init(document.getElementById('node'));
        this.nodeMapBar.setOption({
          xAxis: {
            type: 'category',
            label: {
              show: true,
              position: 'top',
            },
            data: ["Download", "Read SMS", "Block broadcast", "Access the Internet"],
            // data: this.nodeX,
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
            },
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              // name: 'sales',
              type: 'bar',
              label: {
                show: true,
                position: 'top',
              },
              data: [1, 2, 2, 4],
              // data: this.nodeY
            }
          ]
        });
      },
    }
  }
</script>

<style scoped>

</style>