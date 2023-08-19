<template>
  <div>
    <el-row>
      <div id="mountNode"></div>
    </el-row>
    <div id="node" style="width: 500px;height:500px;"></div>
  </div>
</template>

<script>
  import G6 from '@antv/g6';

  export default {
    data() {
      return {
        nodeMapBar: null
      }
    },
    mounted() {
      this.initG6()
      this.nodeMap()
    },
    methods: {
      initG6() {
        const data = {
          nodes: [{
            id: 'node1',
            label: 'Listen to SMS'//节点内的文本名称
          }, {
            id: 'node2',
            label: 'Block broadcast'//节点内的文本名称
          }],
          edges: [{
            source: "node1",
            target: "node2"
          }]
        };
        const graph = new G6.Graph({
          container: 'mountNode',
          width: window.innerWidth,
          height: window.innerHeight,
          modes: {
            default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
          },
          defaultNode: {
            type: "circle",
            size: [30],
            color: "#5B8FF9",
            style: {
              fill: "#9EC9FF",
              lineWidth: 2
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
              lineWidth: 2,
              stroke: '#e2e2e2'
            }
          }
        });
        graph.data(data);
        graph.render();
      },
      nodeMap() {
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