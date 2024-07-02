export default {
  //默认提示文字
  placeholder: {
    type: String,
    default: '请选择',
  },
  //展示方式 hover: 鼠标移入时展示下一个children click:鼠标点击的时展示下一个children
  // expandTrigger: {
  //   type: String,
  //   default: 'hover',
  // },
  //tree数据 格式必须是： [{label:'',value:'',children:[]}]
  optionsTree: {
    type: Array,
    default: () => [],
  },
  //定位方式
  positionMethod: {
    type: String,
    default: 'absolute',
  },
  //组件的宽度
  width: {
    type: String,
    default: '200px',
  },
  //组件的高度
  height: {
    type: String,
    default: '26px',
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  //类别名称
  proPfmClassName: {
    type: String,
    default: '',
  },
  //类别id
  proPfmClassId: {
    type: String,
    default: '',
  },
  //类型
  type: {
    type: String,
    default: 'ADD',
  },
  //默认下拉的宽度
  maskWidth: {
    type: String,
    default: '130px',
  },
  //下拉框默认距离左侧的距离
  maskLeft: {
    type: String,
    default: '0px',
  },
}
