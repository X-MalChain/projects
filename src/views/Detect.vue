<template>
  <div>
    <el-row>
      <div id="mountNode"></div>
    </el-row>
  </div>
</template>

<script>
  import G6 from '@antv/g6';

  export default {
    mounted() {
      this.initG6()
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
      }
    }
  }
</script>