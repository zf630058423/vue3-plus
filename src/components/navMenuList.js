
/**
 * 菜单列表
 *
 */
export const menuList = [
  { name: "首页", url: "/home", level: 1 },
  {
    name: "开发指南",
    url: "/guide",
    level: 1,
    children: [
      { name: "项目说明", url: "/guide/description", level: 2 },
      { name: "工具库合集", url: "/guide/toolLibrary", level: 2 },
    ],
  },
  {
    name: "常用组件",
    url: "/common",
    level: 1,
    children: [
      { name: "封装Icon组件", url: "/common/zfIcon", level: 2 },
      { name: "输入框", url: "/common/textInput", level: 2 },
      { name: 'treeCascader组件', url: '/common/treeCascader', level: 2 }
    ],
  },
  {
    name: "高级组件",
    url: "/advanced",
    level: 1,
    children: [
      {
        name: "表单动态列布局",
        url: "/advanced/rowLay",
        level: 2,
      },
      {
        name: "动态表单",
        url: "/advanced/formLay",
        level: 2,
      },
    ],
  },
  {
    name: "现代Css",
    url: "/modern",
    level: 1,
    children: [
      { name: "border", url: "/modern/border", level: 2 },
      { name: "boxShadow", url: "/modern/boxShadow", level: 2 },
      { name: "gradient", url: "/modern/gradient", level: 2 },
    ],
  },
  {
    name: "类库插件", url: "/lib", level: 1,
    children: [
      { name: 'pinia使用', url: "/lib/pinia", level: 2 },
      { name: 'echarts', url: "/lib/echarts", level: 2 },
    ]
  },
  {
    name: "函数",
    url: "/fun",
    level: 1,
    children: [
      { name: "小数计算", url: "/fun/decimalCalcu", level: 2 },
      { name: "普通函数", url: "/fun/ordinary", level: 2 },
      { name: "排序算法", url: "/fun/sortAlgorithm", level: 2 },
      { name: "设计模式", url: "/fun/designPatterns", level: 2 },
    ],
  },
  { name: "插槽作用域", url: "/asyncSlot", level: 1 },
  {
    name: "动画transition",
    url: "/transition",
    level: 2,
  },
]
