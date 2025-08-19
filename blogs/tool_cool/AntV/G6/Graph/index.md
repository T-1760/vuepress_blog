---
sidebar: auto
title: Graph 图
date: 2023-10-18
tags:
 - Graph
 - 图
categories: 
 - AntV G6
---

## 前言
  - 图论与可视化中的 Graph 图，具有更精确的定位：
    + 由（objects）主体与（relationships）关系的组成。
    + 它甚至不局限于视觉，主体与关系的数据也可以称为图。
  - 在 G6 中，Graph 对象是图的载体，
    + 它包含了图上的所有元素（节点、边等），同时挂载了图的相关操作（如交互监听、元素操作、渲染等）。

## Graph 对象的生命周期
  - Graph 图对象生命周期的五种状态
    + 初始化
    + 加载数据
    + 渲染
    + 更新
    + 销毁

### 初始化/实例化图
  - 通过 `new G6.Graph(config)` 进行图的实例化。
    + `config` 参数是 Object 类型的图的配置项，图的大部分功能可以通过该配置项进行全局配置。
    ```js
      const graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id
        // 画布宽高
        width: 800,
        height: 500,
      });
    ```
#### config 配置项对象
  | 属性 | 类型 | 默认值 | 含义 | 备注 |
  |:--|:--|:--|:--|:--|
  | `container` | String <br> Object |  | 图的 DOM 容器 | `String`类型为 DOM 容器的 id <br> `Object` 类型为 DOM 对象 |
  | `width`     | Number | 画布容器宽度 | 指定画布宽度 | 单位为 `px` | 
  | `height`    | Number | 画布容器高度 | 指定画布高度 | 单位为 `px` | 
  | `renderer` | String | `'canvas'` | 使用 canvas 或 svg 渲染方式 | 可选项`'canvas'`、`'svg'`; SVG 渲染也支持 Canvas 的所有功能。但注意 SVG 的性能较差，在大规模数据或图元的情况下请谨慎选择 <br> 除 V3.3.x 版本外均支持 |
  | `fitViewPadding` | Number <br> Array |  `0` | 图自适应画布时的四周留白像素值。| `fitView` 为 `true`时起效 |
  | `fitView` | Boolean | `false` | 图是否自适应画布 | `true` 开启后，图自动适配画布大小 |
  | `fitCenter` | Boolean |  `false` | 是否平移图使其中心对齐到画布中心。| 优先级低于 `fitView`<br> v3.5.1 后支持 |
  | `linkCenter` | Boolean | `false` | 指定边是否连入节点的中心 | |
  | `groupByTypes` | Boolean | `true` | 所有的节点一个分组，所有的边一个分组 | 各种元素是否在一个分组内，决定节点和边的层级 | 当为 `false` 时，节点和边的层级根据生成的顺序确定。<br> 当使用 Combo 时，必须将其设置为 `false` |
  | `autoPaint` | Boolean | `true` | 图元素更新或视口变换时，是否自动重绘。| 建议在批量操作节点时关闭，以提高性能，完成批量操作后再打开，参考 `setAutoPaint()` 方法 |
  | `minZoom` | Number | `0.02` | 最小缩放比例 | `fitView`、`zoom`、`zoomTo`等操作导致图的缩放比例小于该值，则将使用该值进行缩放，并返回 `false` |
  | `maxZoom` | Number | `10` | 最大缩放比例 | `fitView`、`zoom`、`zoomTo`等操作导致图的缩放比例大于该值，则将使用该值进行缩放，并返回 `false` |
  | `enabledStack` | boolean | `false` | 是否启用 stack（即：是否开启 redo 和 undo 功能）| V3.6 及以上版本支持 |
  | `maxStep` | number | `10` | redo & undo 最大步数, | 当 `enabledStack` 为 `true` 时起效 <br> V3.6 及以上版本支持 |

##### 全局元素配置
  | 属性 | 类型 | 默认值 | 含义 | 备注 |
  |:--|:--|:--|:--|:--|
  | `defaultNode` | Object | `{}` | 默认状态下，全局节点的配置项（样式等属性）| 会被写入的 `data` 覆盖, [内置节点](https://g6.antv.antgroup.com/manual/middle/elements/nodes/default-node)。|
  | `defaultEdge` | Object | `{}` | 默认状态下，全局边的配置项（样式等属性）|会被写入的 `data` 覆盖, [内置边](https://g6.antv.antgroup.com/manual/middle/elements/edges/default-edge)。|
  | `defaultCombo` | Object |``{}` | 默认状态下，全局 Combo 的配置项（样式等属性）| 会被写入的 data 覆盖。[内置 Combo](https://g6.antv.antgroup.com/manual/middle/elements/combos/default-combo)。3.5 版本新增.|
  | `nodeStateStyles` | Object | `{}` | 各状态（除默认状态外，如`hover`、`selected`）下节点的样式配置 | [状态 State](https://g6.antv.antgroup.com/manual/middle/states/state) | 
  | `edgeStateStyles` | Object | `{}` | 各状态（除默认状态外，如`hover`、`selected`）下边的样式配置 | [状态 State](https://g6.antv.antgroup.com/manual/middle/states/state)。|
  | `comboStateStyles` | Object | `{}` | 各状态（除默认状态外，如`hover`、`selected`）下 Combo 的样式配置 | [状态 State](https://g6.antv.antgroup.com/manual/middle/states/state) |

##### 布局相关配置
  - `layout`<Object\>：若数据中不存在节点位置，则默认为随机布局。配置布局类型详见 
    + [布局 Layout](https://g6.antv.antgroup.com/zh/docs/manual/middle/layout/graph-layout)
    + [图布局 API](https://g6.antv.antgroup.com/zh/docs/api/graph-layout/guide)
    + [树图布局 API](https://g6.antv.antgroup.com/zh/docs/api/tree-graph-layout/guide)

##### 交互行为相关配置
  - `modes`<Array\>：配置多种交互模式及其包含的交互事件的。
    + [交互模式 Mode](https://g6.antv.antgroup.com/zh/docs/manual/middle/states/mode)。

##### 动画相关配置
  - `animate`<Boolean\>；是否启用全局动画。默认值 `false`。
    + `true` 启用后，布局变化时将会以动画形式变换节点位置。
  - `animateCfg`<Object\>：全局动画的配置项（动画效果、动画时长等）。
    + [动画 Animation](https://g6.antv.antgroup.com/zh/docs/manual/middle/animation)。

##### 插件
  - `plugins`<Array\>：配置辅助插件。
    + 详见 [插件与工具](https://g6.antv.antgroup.com/zh/docs/manual/tutorial/plugins)

### 加载数据
  - 通过 `graph.data()` 方法加载数据
    + `graph.data(data)` 读取数据源 data 到图 graph 实例中

### 渲染
  - 通过 `graph.render()` 方法渲染图

## Graph 实例方法
### 数据
#### graph.data()
  - 功能：设置图初始化数据。
  - 语法：`graph.data(data)`
  - 参数：
    + data<Object\>：初始化的图数据（包括 `nodes` 数组和 `edges` 数组的对象）
  - 案例：
    ```js
      const data = {
        nodes: [
          {
            id: 'node_1',
            label: 'node_1',
          },
          {
            id: 'node_2',
            label: 'node_2',
          },
        ],
        edges: [
          {
            source: 'node_1',
            target: 'node_2',
          },
        ],
      };

      // graph 是 Graph 的实例
      graph.data(data);
    ```
#### graph.save()
  - 功能：获取图数据。
  - 语法：`graph.save()`
  - 返回值<Object\>；返回值包括所有节点和边，
    ```js
      // 返回值数据结构
      {
	      nodes: [],
        edges: [],
        groups: [],
      }
    ```
#### graph.read()
  - 功能：接收数据，并进行渲染，read 方法的功能相当于 data 和 render 方法的结合。
  - 语法：`graph.read(data)`
  - 参数：
    + data<Object\>：初始化的图数据（包括 `nodes` 和 `edges` 的对象）
  - 返回值
    ```js
      const data = {
        nodes: [
          {
            id: 'node1',
            label: 'node1',
          },
          {
            id: 'node2',
            label: 'node2',
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };

      // graph是Graph的实例
      graph.read(data);
    ```
#### graph.changeData()
  - 功能：更新数据源，根据新的数据重新渲染视图。
  - 语法：`graph.changeData([data, stack])`
  - 参数：
    + data<Object\>：图数据（包括 nodes 和 edges 的对象）。
      * 若不指定该参数，则使用当前数据重新渲染
    + stack<boolean\>：操作是否入 undo & redo 栈，
      * 当实例化 Graph 时设置 `enableStack：true` 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，
      * 如果不需要，则设置 `enableStack：false` 即可
  - 案例
    ```js
      const data = {
        nodes: [
          {
            id: 'node1',
            label: 'node1',
          },
          {
            id: 'node2',
            label: 'node2',
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };

      graph.changeData(data);
      // 若不指定该参数，则使用当前图上的数据重新渲染
      graph.changeData();
    ```

### 渲染与更新
#### graph.render()
  - 功能：根据提供的数据渲染视图。
  - 语法：`graph.render()`

### 饰扣操作
#### graph.getZoom()
  - 功能：获取当前视口的缩放比例。
  - 语法：`graph.getZoom()`
  - 返回值<Number\>：表示当前视口的缩放比例， 默认值 `1`。
#### graph.zoom()
  - 功能：改变视口的缩放比例，在当前画布比例下缩放，是相对比例。
  - 语法：`graph.zoom(ratio[, center, animate, animateCfg])`
  - 参数：
    + ratio<Number\>：缩放比例
    + center<Object\>：以 center 的 x、y 坐标为中心缩放，若省略 center 参数，则以元素当前位置为中心缩放
    + animate<Boolean\>：是否开启动画
    + animateCfg<GraphAnimateConfig\>：若带有动画，可配置动画，若未配置，则跟随 graph 的 `animateCfg` 参数
  - 案例
    ```js
      // 以 (100, 100) 为中心点，放大到 3
      graph.zoom(3, { x: 100, y: 100 });

      // 以绘制坐标系的原点 (0, 0) 为缩放中心，缩小到 0.5。注意绘制坐标系的原点 != 视窗左上角，可用 graph.getCanvasByViewport进行转换。各坐标系解析文档： https://g6.antv.antgroup.com/manual/advanced/coordinate-system
      graph.zoom(0.5);

      // 带动画以 (100, 100) 为中心点，放大到 3
      graph.zoom(3, { x: 100, y: 100 }, true, {
        duration: 100,
      });
    ```
#### graph.zoomTo()
  - 功能：缩放视窗窗口到一个固定比例。
  - 语法：`graph.zoomTo(toRatio[, center, animate, animateCfg])`
  - 参数：
    + toRatio<Number\>：固定比例值
    + center<Object\>：	以 center 的 x、y 坐标为中心缩放，若省略 center 参数，则以元素当前位置为中心缩放
    + animate<Boolean\>：是否开启动画
    + +animateCfg<GraphAnimateConfig\>：	若带有动画，可配置动画，若未配置，则跟随 graph 的 `animateCfg` 参数
  - 案例
    ```js
      // 以 (100, 100) 为中心点，放大3倍
      graph.zoomTo(3, { x: 100, y: 100 });

      // 以当前元素位置为中心，缩小到 0.5
      graph.zoomTo(0.5);

      // 带动画以 (100, 100) 为中心点，放大3倍
      graph.zoomTo(3, { x: 100, y: 100 }, true, {
        duration: 100,
      });
    ```
#### graph.changeSize()
  - 功能：改变画布大小
  - 语法：`graph.changeSize(width, height)`
  - 参数：
    + width<Number\>：画布宽度
    + height<Number\>：画布高度
  - 案例
    ```js
      graph.changeSize(600, 350);
    ```
#### graph.translate()
  - 功能：采用相对位移来平移画布。
  - 语法：`graph.translate(dx, dy[, animate, animateCfg])`
  - 参数：
    + dx<Number\>：水平方向位移
    + dy<Number\>：垂直方向位移
    + animate<Boolean\>：是否开启动画
    + animateCfg<GraphAnimateConfig\>：若带有动画，可配置动画，若未配置，则跟随 graph 的 `animateCfg` 参数
  - 案例
    ```js
      graph.translate(100, 100);

      // 带动画
      graph.translate(100, 100, true, {
        duration: 100,
      });
    ```
#### graph.moveTo()
  - 功能：采用绝对位移将画布移动到指定坐标。
  - 语法：`graph.moveTo(x, y[, animate, animateCfg])`
  - 参数：
    + x<Number\>：水平方向坐标
    + y<Number\>：垂直方向坐标
    + animate<boolean\>：是否带有动画。若未配置，则跟随 graph 的 `animate` 参数
    + animateCfg<Object\>：若带有动画，可配置动画，若未配置，则跟随 graph 的 `animateCfg` 参数
  - 案例
    ```js
      graph.moveTo(200, 300);

      // 带动画
      graph.moveTo(200, 300, true, {
        duration: 100,
      });
    ```
#### graph.fitView()
  - 功能：让画布内容适应视口。
  - 语法：`graph.fitView([padding, rules, animate, animateCfg])`
  - 参数：
    + padding<Number\> | <Array\>上右下左 四个方向上的间距值
    + rules	<Object\>：fitView 的规则
      + `{ onlyOutOfViewPort?: boolean; direction?: 'x' | 'y' | 'both'; ratioRule?: 'max' | 'min}`
    + animate<boolean\>：是否带有动画。若未配置，则跟随 graph 的 `animate` 参数
      * v4.6.15 后支持
    + animateCfg<Object\>：若带有动画，可配置动画。若未配置，则跟随 graph 的 `animateCfg` 参数
      * v4.6.15 后支持
  - 案例
    ```js
      // padding 只设置为一个值，则表示 top = right = bottom = left = 20
      graph.fitView(20); // 等价于 graph.fitView([20]);    

      // padding 设置为数组，只传 2 个值，则 top = bottom = 20, right = left = 10
      graph.fitView([20, 10]);

      // padding 设置为数组，四个方向值都指定
      graph.fitView([20, 10, 20, 15]);

      // 使用fitViewByRules, 默认rules: onlyOutOfViewPort = false, direction = 'both', ratioRule = 'min'
      graph.fitView(0, {});

      // 使用fitViewByRules, 自定义rules
      graph.fitView(0, { onlyOutOfViewPort: true, direction: 'y' });
    ```
#### graph.fitCenter()
  - 功能：平移图到中心将对齐到画布中心，但不缩放。优先级低于 `fitView`。
    + v3.5.1 后支持。该方法在渲染和动画完成后调用
  - 语法：`graph.fitCenter([animate, animateCfg])`
  - 参数：
    + animate<boolean\>：是否带有动画。若未配置，则跟随 graph 的 `animate` 参数
      * v4.6.15 后支持。
    + animateCfg<Object\>：若带有动画，可配置动画。若未配置，则跟随 graph 的 `animateCfg` 参数
      * v4.6.15 后支持。
#### graph.focusItem()
  - 功能：移动图，使得 item 对齐到视口中心，
    + 该方法可用于做搜索后的缓动动画。
  - 语法：`graph.focusItem(item[, animate, animateCfg])`
  - 参数：
    + item<string\> | <Object\>：元素 ID 或元素实例
    + animate<boolean\>：是否带有动画。若未配置，则跟随 graph 的 `animate` 参数
    + animateCfg<Object\>：若带有动画，可配置动画。若未配置，则跟随 graph 的 `animateCfg` 参数
  - 案例
    ```js
      graph.focusItem(item);

      // 动画地移动
      graph.focusItem(item, true);

      // 动画地移动，并配置动画
      graph.focusItem(item, true, {
        easing: 'easeCubic',
        duration: 400,
      });
    ```
    
### 获取/设置
#### graph.get() 
  - 功能：根据 key 获取属性值。
  - 语法：`graph.get(key)`
  - 参数：
    + key<string\>：属性的键
  - 案例
    ```js
      const group = graph.get('group'); // 获取 group

      const canvas = graph.get('canvas'); // 获取 canvas 实例

      const autoPaint = graph.get('autoPaint'); // 获取 autoPaint 值
    ```
#### graph.set()
  - 功能：设置属性值
  - 语法：`graph.set(key, val)`
  - 参数：
    + key<String\>：属性的键
    + val	<Any\>：属性的值
  - 案例：
    ```js
      graph.set('capture', false);// 设置 capture 值为 false

      graph.set('customGroup', group);// 设置 customGroup 值为 group

      graph.set('nodeIdList', [1, 3, 5]);// 设置 nodeIdList 值为数组
    ```
#### graph.getContainer()
  - 功能：获取 Graph 的 DOM 容器。
  - 语法：`graph.getContainer()`
#### graph.getGroup()
  - 功能：获取 Graph 根图形分组。
  - 语法：`graph.getGroup()`
#### graph.getMinZoom()
  - 功能：获取 graph 当前允许的最小缩放比例。
  - 语法：`graph.getMinZoom()`
#### graph.setMinZoom()
  - 功能：设置 graph 当前允许的最小缩放比例。
  - 语法：`graph.setMinZoom(ratio)`
  - 参数
    + ratio<number\>：最小缩放比例值
  - 案例
    ```js
      graph.setMinZoom(0.001);
    ```
#### graph.getMaxZoom()
  - 功能：获取 graph 当前允许的最大缩放比例。
  - 语法：`graph.getMaxZoom()`
#### graph.setMaxZoom()
  - 功能：设置 graph 当前允许的最大缩放比例。
  - 语法：`graph.setMaxZoom(ratio)`
  - 参数：
    + ratio<number\>：最大缩放比例值
  - 案例：
    ```js
      graph.setMaxZoom(1000);
    ```
#### graph.getWidth()
  - 功能：获取 graph 当前的宽度。
  - 语法：`graph.getWidth()`
#### graph.getHeight()
  - 功能：获取 graph 当前的高度。
  - 语法：`graph.getHeight()`

### 元素操作
#### graph.getNodes()
  - 功能：获取图中所有节点的实例。
    + 注意: 返回的是节点的实例，而非节点的数据项。
  - 语法：graph.getNodes()
  - 返回值<Array\>：表示图中所有节点的实例。
#### graph.getEdges()
  - 功能：获取图中所有边的实例。
    + 注意: 返回的是边的实例，而非边的数据项。
  - 语法：`graph.getEdges()`
  - 返回值<Array\>：表示图中所有边的实例。
#### graph.getCombos()
  - 功能：获取当前图中所有 combo 的实例。
  - 语法：`graph.getCombos()`
  - 返回值<Array\>：表示图中所有 combo 的实例。
#### graph.getComboChildren()
  - 功能：获取指定 combo 中所有的子节点及子 combo。
  - 语法：`graph.getComboChildren(combo)`
  - 参数：
    + combo<string\>| <ICombo\>：Combo ID 或 combo 实例
  - 返回值：指定 combo 中的子元素（子节点及子 combo）
    ```js
      {
        nodes: INode[],
        edges: ICombo[]
      }
    ```
  - 案例
    ```js
      const elements: {
        nodes: INode[],
        combos: ICombo[]
      } = graph.getComboChildren('combo1')
    ```
#### graph.getNeighbors()
  - 功能：获取指定节点附近的邻居节点
  - 语法：`graph.getNeighbors(node[, type])`
  - 参数：
    + node<string\>| <INode\>：节点 ID 或节点实例
    + type <string\> | <undefined\>：邻居类型， 可选值：`'source'` | `'target' `
      * `'source'`：只获取当前节点的源节点，
      * `'target'`：只获取当前节点指向的目标节点， 
      * 若不指定则返回所有类型的邻居
  - 返回值<Array\>：返回值符合要求的节点数组。
  - 案例
    ```js
      const neighbors = graph.getNeighbors('node1', 'source');
    ```
#### graph.find()
  - 功能：根据具体规则查找单个元素。
  - 语法：`graph.find(type, fn)`
  - 参数：
    + type<string\>：元素类型，可选值 `'node'`、`'edge'`
    + fn<Function\>：查找的规则
  - 返回值<Object\>：返回第一个符合规则匹配的元素实例，否则返回 `undefined` 。
  - 案例
    ```js
      const findNode = graph.find('node', (node) => {
        return node.get('model').x === 100;
      });
    ```
#### graph.findById()
  - 功能：根据 ID，查询对应的元素实例。
  - 语法：`graph.findById(id)`
  - 参数：
    + id<string\>：元素 ID
  - 返回值<Object\>：返回符合规则的元素实例，否则返回 `undefined`。
  - 案例
    ```js
      const node = graph.findById('node');
    ```
#### graph.findAll()
  - 功能：查询所有满足规则的元素。
  - 语法：`graph.findAll(type, fn)`
  - 参数：
    + type<string\>：元素类型，可选值 `'node'`、`'edge'`
    + fn<Function\>：查找的规则
  - 返回值<Array\>：返回所有符合规则的元素实例，否则返回 `undefined`。
  - 案例
    ```js
      const nodes = graph.findAll('node', (node) => {
        return node.get('model').x;
      });
    ```
#### graph.findAllByState()
  - 功能：查找所有处于指定状态的元素。
  - 语法：`graph.findAllByState(type, state)`
  - 参数：
    + type<string\>：元素类型，可选值 `'node'`、`'edge'`
    + state<string\>：状态名称
  - 返回值<Array|>：返回所有指定状态的元素实例。
  - 案例
    ```js
      // 查询所有选中的元素
      const nodes = graph.findAllByState('node', 'selected');
    ```
#### graph.addItem()
  - 功能：新增（node 节点、edge 边）元素。
    + 直接使用 model 对象作为新增元素的数据模型，G6 内部可能会对其增加或修改一些必要的字段。
    + 若不希望原始参数被修改，建议在使用深拷贝后的 model。
  - 语法：`graph.addItem(type, model[, stack])`
  - 参数：
    + type<string\>：元素类型，可选值为 `'node'`、`'edge'`
    + model<Object\>：元素的数据模型，具体内容参见元素配置项。
    + stack<boolean\>：操作是否入 undo & redo 栈，
      * 当实例化 Graph 时设置 `enableStack：true` 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，
      * 如果不需要，则设置 `enableStack：false` 即可
  - 案例
    ```js
      const model = {
        id: 'node',
        label: 'node',
        address: 'cq',
        x: 200,
        y: 150,
        style: {
          fill: 'blue',
        },
      };

      graph.addItem('node', model);
    ```
#### graph.removeItem()
  - 功能：删除元素，
    + 当 item 为 group ID 时候，则删除分组。
  - 语法：`graph.removeItem(item[, stack])`
  - 参数：
    + item<string\> | <Object\>：元素 ID 或元素实例
    + stack<boolean\>：操作是否入 undo & redo 栈，
      * 当实例化 Graph 时设置 `enableStack：true` 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，
      * 如果不需要，则设置 `enableStack：false` 即可
  - 案例
    ```js
      // 通过 ID 查询节点实例
      const item = graph.findById('node');
      graph.removeItem(item);

      // 该操作不会进入到 undo & redo 栈，即 redo & undo 操作会忽略该操作
      graph.removeItem(item, false);
    ```
#### graph.updateItem()
  - 功能：更新元素，包括更新数据、样式等。
    + 若图上有 `combo` 使用该函数更新一个节点位置后，需调用 `updateCombo(combo)` 以更新相关 `combo` 的位置。
  - 语法：`graph.updateItem(item, model[, stack])`
  - 参数：
    + item<string\> | <Object\>：元素 ID 或元素实例
    + model<Object\>：需要更新的数据模型，具体内容参见元素配置项
    + stack<boolean\>：操作是否入 undo & redo 栈，
      * 当实例化 Graph 时设置 `enableStack：true` 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，
      * 如果不需要，则设置 `enableStack：false` 即可
  - 案例
    ```js
      const model = {
        id: 'node',
        label: 'node',
        address: 'cq',
        x: 200,
        y: 150,
        style: {
          fill: 'blue',
        },
      };

      // 通过 ID 查询节点实例
      const item = graph.findById('node');
      graph.updateItem(item, model);
    ```
#### graph.refreshItem()
  - 功能：刷新指定元素。
  - 语法：`graph.refreshItem(item)`
  - 参数：
    + item<string\> | <Object\>：元素 ID 或元素实例
  - 案例：
    ```js
      // 通过 ID 查询节点实例
      const item = graph.findById('node');
      graph.refreshItem(item);  
    ```
#### graph.refreshPositions()
  - 功能：当节点位置发生变化时，刷新所有节点位置，并重计算边的位置。
  - 语法：`graph.refreshPositions()`
#### graph.updateCombos()
  - 功能：根据子元素（子节点与子 `combo`）的 bbox 更新所有 `combos` 的绘制（包括 `combos` 的位置和范围）
  - 语法：`graph.updateCombos()` // 更新所有 combos。
#### graph.updateCombo()
  - 功能：仅更新 `combo` 及其所有祖先 `combo`。
    + 建议在使用 `graph.updateItem` 来更新节点位置时，调用该方法以更新节点的祖先 `combos`。
  - 语法：`graph.updateCombo(combo)`
  - 参数：
    + combo	<string\> | <ICombo\>： Combo ID 或 Combo 实例
  - 案例
    ```js
      // 更新了某个节点的位置
      const node1 = graph.findById('node1');
      graph.updateItem(node1, {
        x: 100,
        y: 100,
      });
      const comboId = node1.getModel().comboId;

      // 更新 node1 所属的 combo 及其所有祖先 combo 的大小和位置
      graph.updateCombo(comboId);
    ```
#### graph.updateComboTree()
  - 功能：更新 Combo 结构，例如移动子树等。
  - 语法：`graph.updateComboTree(item[, parentId])`
  - 参数：
    + item<string\> | <INode\> | <ICombo\>：需要被更新的 Combo 或 节点 ID
    + parentId<string\> | <undefined\>	：新的父 combo ID，`  ` 代表没有父 combo
  - 案例
    ```js
      // 将 combo1 从父 combo 中移出，完成后同原父 combo 平级
      graph.updateComboTree('combo1')

      // 将 combo1 移动到 Combo2 下面，作为 Combo2 的子元素
      graph.updateComboTree('combo1', 'combo2')
    ```
#### graph.node()
  - 功能：设置各个节点样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。
    + 提示: 该方法必须在调用 `render` 方法之前，否则不起作用。
  - 语法：`graph.node(nodeFn)`
  - 参数：
    + nodeFn<Function\>：返回每个节点的配置
  - 案例
    ```js
      graph.node((node) => {
        return {
          id: node.id,
          type: 'rect',
          style: {
            fill: 'blue',
          },
        };
      });

      graph.data(data);
      graph.render();
    ```
#### graph.edge()
  - 功能：设置各个边样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。
    + 提示: 该方法必须在调用 `render` 方法之前，否则不起作用。
  - 语法：`graph.edge(edgeFn)`
  - 参数：
    + edgeFn<Function\>：返回每条边的配置
  - 案例：
    ```js
      graph.edge((edge) => {
        return {
          id: edge.id,
          type: 'cubic-horizontal',
          style: {
            stroke: 'green',
          },
        };
      });

      graph.data(data);
      graph.render();
    ```
#### graph.combo()
  - 功能：设置各个 combo 样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。
    + 提示: 该方法必须在调用 `render` 方法之前，否则不起作用。
  - 语法：`graph.combo(comboFn)`
  - 参数：
    + comboFn<Function\>：返回每个 combo 的配置
  - 案例：
    ```js
      graph.combo((combo) => {
        return {
          id: combo.id,
          type: 'rect',
          style: {
            stroke: 'green',
          },
        };
      });

      graph.data(data);
      graph.render();
    ```
#### graph.showItem()
  - 功能：显示指定的元素。
    + 若 `item` 为节点，则相关边也会随之显示。而 `item.show()` 则将只显示自身。
  - 语法：`graph.showItem(item, stack)`
  - 参数：
    + item<string\>| <Object\>：元素 ID 或元素实例
    + stack<boolean\>：操作是否入 undo & redo 栈，
      * 当实例化 Graph 时设置 `enableStack：true` 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，
      * 如果不需要，则设置 `enableStack：false` 即可
  - 案例：
    ```js
      // 通过 ID 查询节点实例
      const item = graph.findById('nodeId');
      graph.showItem(item);

      // 等价于
      graph.showItem('nodeId');
    ```
#### graph.hideItem()
  - 功能：隐藏指定元素。若 item 为节点，则相关边也会随之隐藏。而 item.hide() 则将只隐藏自身。
  - 语法：`graph.hideItem(item, stack)`
  - 参数：
    + item<string\> | <Object\>：元素 ID 或元素实例
  - 案例
    ```js
      // 通过 ID 查询节点实例
      const item = graph.findById('nodeId');
      graph.hideItem(item);

      // 等价于
      graph.hideItem('nodeId');
    ```


### Combo 操作
  - 比较 Combo 与 Hull
    ![比较 Combo 与 Hull](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*08b2SZIUX1oAAAAAAAAAAAAAARQnAQ)
#### graph.collapseCombo()
  - 功能：收起指定的 Combo。
  - 语法：`graph.collapseCombo(combo)`
  - 参数：
    + combo	<string\> | <ICombo\>: combo ID 或 combo 实例
#### graph.expandCombo()
  - 功能：展开指定的 Combo。
  - 语法：`graph.expandCombo(combo)`
  - 参数：
    + combo	<string\> | <ICombo\>: combo ID 或 combo 实例
#### graph.collapseExpandCombo()
  - 功能：展开或收缩指定的 Combo。
  - 语法：`graph.collapseExpandCombo(combo)`
  - 参数：
    + combo	<string\> | <ICombo\>: combo ID 或 combo 实例
#### graph.createCombo()
  - 功能：根据已经存在的节点或 combo 创建新的 combo。
  - 语法：`graph.createCombo(combo, elements[, stack)]`
  - 参数：
    + combo	<string\> | <ICombo\>: combo ID 或 combo 实例
    + elements	<string[]\>：添加到 Combo 中的元素 ID，包括节点和 combo
    + stack	<boolean\>：操作是否入 undo & redo 栈，
      * 当实例化 Graph 时设置 `enableStack：true` 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，
      * 如果不需要，则设置 `enableStack：false` 即可
      * v4.7.17 及后续版本支持 
  - 案例
    ```js
      // 第一个参数为 combo ID
      graph.createCombo('combo1', ['node1', 'node2', 'combo2'])

      // 第一个参数为 combo 配置
      graph.createCombo({
        id: 'combo1',
        style: {
          fill: '#f00'
        }
      }, ['node1', 'node2', 'combo2'])
    ```  
#### graph.uncombo()
  - 功能：拆解 Combo，即拆分组/解组。
    + 调用后，combo 本身将被删除，而该分组内部的子元素将会成为该分组父分组（若存在）的子元素。
  - 语法：`graph.uncombo(combo[, stack])`
  - 参数：
    + combo	<string\> | <ICombo\>: combo ID 或 combo 实例
    + stack	<boolean\>：操作是否入 undo & redo 栈，
      * 当实例化 Graph 时设置 `enableStack：true` 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，
      * 如果不需要，则设置 `enableStack：false` 即可
      * v4.7.17 及后续版本支持 
#### graph.updateCombos()
  - 功能：根据子元素（子节点与子 combo）的 bbox 更新所有 combos 的绘制，包括 combos 的位置和范围。
  - 语法：`graph.updateCombos()` // 更新所有 combos
#### graph.updateCombo()
  - 功能：仅更新 combo 及其所有祖先 combo。
    + 建议在使用 graph.updateItem 来更新节点位置时，调用该方法以更新节点的祖先 combos。
  - 语法：`graph.updateCombo(combo)`
  - 参数：
    + combo	<string\> | <ICombo\>: combo ID 或 combo 实例
  - 案例
    ```js
      // 更新了某个节点的位置
      const node1 = graph.findById('node1');
      graph.updateItem(node1, {
        x: 100,
        y: 100,
      });
      const comboId = node1.getModel().comboId;

      // 更新 node1 所属的 combo 及其所有祖先 combo 的大小和位置
      graph.updateCombo(comboId);
    ```
#### graph.updateComboTree()
  - 功能：更新 Combo 结构，例如移动子树等。
  - 语法：`graph.updateComboTree(item[, parentId])`
  - 参数：
    + item<string\> | <INode\> | <ICombo\>：需要被更新的 Combo 或 节点 ID
    + parentId<string\> | <undefined\>：新的父 combo ID，undefined 代表没有父 combo
  - 案例
    ```js
      // 将 combo1 从父 combo 中移出，完成后同原父 combo 平级
      graph.updateComboTree('combo1')

      // 将 combo1 移动到 Combo2 下面，作为 Combo2 的子元素
      graph.updateComboTree('combo1', 'combo2')
    ```
  
### 元素状态
#### graph.setItemState()
  - 功能：设置元素状态。支持单个状态多值的情况，详情参考 G6 状态管理最佳实践。
    + 该方法在执行过程中会触发 `beforitemstatechange`，`afteritemstatechange` 事件。
  - 语法：`graph.setItemState(item, state, value)`
  - 参数：
    + item<string\> | <Item\>:	元素 ID 或元素实例
    + state	<string\>:	状态值，支持自定义，如 selected、hover、actived 等。
    + value<Boolean\> | <string\>:	是否启用状态
  - 案例
    ```js
      // 布尔状态 'selected'
      graph.setItemState('node1', 'selected', true);

      // 多值状态 'body'
      graph.setItemState('node1', 'body', 'health');
      graph.setItemState('node2', 'body', 'ill');
    ```
#### graph.clearItemStates()
  - 功能：清除元素状态，可以一次性清除多个状态。
  - 语法：`graph.clearItemStates(item[, states])`
  - 参数：
    + item<string\> | <Object\>：元素 ID 或元素实例
    + states<string\> | <Array\> | <null\>：取值可以是单个状态值，也可以是状态值数组
  - 案例
    ```js
      graph.clearItemStates(node, 'a'); // 清除单个状态

      graph.clearItemStates(node, ['a', 'b']); // 清除多个状态

      graph.clearItemStates(node); // 清除所有
    ```
#### graph.priorityState(item, state)
  - 功能：将指定状态的优先级提升为最高优先级。
  - 语法：`graph.priorityState(item, state)`
  - 参数：
    + item<string\> | <Object\>：元素 ID 或元素实例
    + states<string\>：状态名称
  - 案例
    ```js
      // 将 node 的 a 状态调整为优先级最高
      graph.priorityState(node, 'a');
    ```

### 行为模式
#### graph.setMode()
  - 功能：切换图行为模式。
    + 主要用于不同模式下的行为切换，如从编辑模式下切换到只读模式。
  - 语法：`graph.setMode(mode)`
  - 参数
    + mode<string\>	模式的名称
  - 案例
    ```js
      const graph = new G6.Graph({
          container: div,
          width: 500,
          height: 500,
          modes: {
            default: [...],
            custom: [...]
          }
      })

      graph.setMode('custom')
    ```
#### graph.getCurrentMode()
  - 功能：获取当前的行为模式。
  - 语法：`graph.getCurrentMode()`
  - 返回值<String\>：返回值表示当前的行为模式。

### 事件绑定/解绑
#### graph.on()
  - 功能：为图绑定事件监听。
  - 语法：`graph.on(eventName, handler)`
  - 参数：
    + eventName<string\>：事件名
    + handler<Function\>：监听函数
      * item<Item\>：被操作的 item
      * target<Ishape\>：被操作的具体图形
  - 案例
    ```js
      // 为图上的所有节点绑定点击监听
      graph.on('node:click', (evt) => {
        const item = evt.item; // 被操作的节点 item
        const target = evt.target; // 被操作的具体图形
      });

      // 为画布绑定点击监听
      graph.on('click', (evt) => { });
    ```
#### graph.emit()
 - 功能：手动触发某个事件。类似于 dispatch。
 - 语法：`graph.emit(eventName, params)`
 - 参数：
    + eventName<string\>：事件名，
      * 可选事件名参见 Event。也可以是自定事件名，同样通过 graph.on 监听该事件名
    + params<object\>：触发该事件的参数。
      * 若用于触发 Event 中的事件，可能需要模拟一些必要的事件参数
  - 案例
    ```js
      const node = graph.findById('node1');
      // 模拟触发节点点击事件
      graph.emit('node:click', {
        item: node, // 被点击的节点
              target: node.getKeyShape(), // 具体图形，这里使用了节点的 keyShape，也可以是该节点 node.getContainer() 图形分组中的其它图形
        x: 10,
        y: 10
        // ...
      })

      // 模拟触发一个自定义名为 someevent 的事件，并传入自定义参数
      // 使用 graph.on('someevent', e => {}) 可监听该事件。注意，请在该事件触发之前绑定监听（graph.on）
      graph.emit('someevent', {
        name: 'xxx',
        value: 'xxx'
      });      
    ```
#### graph.off()
  - 功能：为图解除指定的事件监听。
  - 语法：`graph.off(eventName, handler)`
  - 参数：
    + eventName<string\>：事件名
    + handler<Function\>：监听函数
      * item<Item\>：被操作的 item
      * target<Ishape\>：被操作的具体图形
      * 该 handler 必须与 on 绑定该事件的 handler 是同一对象。
  - 案例
    ```js
      // 监听函数
      const fn = (evt) => {
        const item = evt.item; // 被操作的节点 item
        const target = evt.target; // 被操作的具体图形
      };
      // 为图上的所有节点绑定点击监听
      graph.on('node:click', fn);

      // 解除上面的点击监听事件，注意 fn 必须是同一个对象
      graph.off('node:click', fn);
    ```
#### graph.off()
  - 功能：为图解除某事件的所有监听。
  - 语法：`graph.off(eventName)`
  - 参数
    + eventName<string\>：事件名，
  - 案例
    ```js
      // 监听函数
      const fn1 = (evt) => {
        const item = evt.item; // 被操作的节点 item
        const target = evt.target; // 被操作的具体图形
      };
      const fn2 = (evt) => { };
      // 为图上的所有节点绑定点击监听
      graph.on('node:click', fn1);
      graph.on('node:click', fn2);

      // 解除上面的所有节点点击监听事件
      graph.off('node:click');
    ```
#### graph.off()
  - 功能：为图解除所有监听。该函数无参数。
  - 语法：`graph.off()`
  - 案例
    ```js
      // 监听函数
      const fn1 = (evt) => { };
      const fn2 = (evt) => { };
      // 为图上的所有节点绑定点击监听
      graph.on('node:mouseenter', fn1);
      graph.on('afteranimate', fn2);

      // 解除图上所有监听事件
      graph.off();
    ```

### 布局
#### graph.layout()
  - 功能：重新以当前配置的属性进行一次布局。
  - 语法：`graph.layout()`
  - 案例
    ```js
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 1000,
        height: 600,
        layout: {
          type: 'force',
        },
        modes: {
          default: ['drag-node'],
        },
      });

      graph.data({
        nodes: data.nodes,
        edges: data.edges.map((edge, i) => {
          edge.id = 'edge' + i;
          return Object.assign({}, edge);
        }),
      });

      graph.render();

      function refreshDragedNodePosition(e) {
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
      }

      graph.on('node:dragstart', (e) => {
        // 拖动节点时重新布局
        graph.layout();
        refreshDragedNodePosition(e);
      });

      graph.on('node:drag', (e) => {
        refreshDragedNodePosition(e);
      });

      graph.on('node:dragend', (e) => {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
      });
    ```
#### graph.updateLayout()
  - 功能：更新布局配置项。
  - 语法：`graph.updateLayout(cfg)`
  - 参数
    + cfg<Object\>：新布局配置项
      * 若 cfg 中含有 `type` 字段，其类型为 <String\> 且与现有布局方法不同，则更换布局；
      * 若 cfg 中不包含 `type` 字段，则保持原有布局，仅更新布局配置项。
  - 案例
    ```js
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 1000,
        height: 600,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        layout: {
          type: 'circular',
          center: [500, 300],
        },
        animate: true,
      });
      graph.data(data);
      graph.render();

      // 实例化时通过 layout 指定布局，在合适的时候通过 updateLayout 更新布局配置
      graph.updateLayout({
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
        divisions: 5,
        ordering: 'degree',
      });
    ```
#### graph.destroyLayout()
  - 功能：销毁布局方法，在此之后调用 changeData 等方法将不会按照原有的布局算法进行布局。
  - 语法：`graph.destroyLayout()`
  - 案例
    ```js
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 1000,
        height: 600,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        layout: {
          type: 'circular',
          center: [500, 300],
        },
        animate: true,
      });

      graph.data(data);
      graph.render();
      graph.destroyLayout();
      // 此时 changeData，若 data2 中的节点没有位置信息，将按照初始化计算方法被放置；若有位置信     息，则按照该信息被放置
      graph.changeData(data2);
    ```

### 增删复合交互
#### graph.addBehaviors()
  - 功能：新增行为，将单个或多个行为添加到单个或多个模式中。
  - 语法：`graph.addBehaviors(behaviors, modes)`
  - 参数：
    + behaviors<string\> | <Array\>：添加的行为的名称
    + modes<string\> | <Array\>：模式的名称

## 参考资料
  - [Hello World 图可视化](https://zhuanlan.zhihu.com/p/83685690)
  - [G6 Graph API](https://g6.antv.antgroup.com/api/Graph)
