<template>
  <div class="tollibary-com">
    <h2>前端 JavaScript 必会工具库合集</h2>
    <div class="compontent-content">
      <el-input
        class="title-input"
        v-model="titleValue"
        placeholder="请输入标题关键字搜索"
        @input="titleInput"
      ></el-input>
      <div class="container">
        <div class="container_item" v-for="item in toolList" :key="item.id">
          <div class="container_item_title">{{ item.title }}</div>
          <div class="container_item_website" v-if="item.officialWebsite">
            <span class="container_item_website_text">官网：</span>
            <a :href="item.officialWebsite" target="_blank">{{ item.officialWebsite }}</a>
          </div>
          <div class="container_item_china" v-if="item.chinaWebsite">
            <span class="container_item_china_text">中文网：</span>
            <a :href="item.officialWebsite" target="_blank">{{ item.chinaWebsite }}</a>
          </div>
          <div class="container_item_mark" v-if="item.mark">
            <span class="container_item_mark_text">{{ item.mark }}</span>
          </div>
          <div class="container_item_github" v-if="item.gitHubUrl">
            <span class="container_item_github_text">github地址：</span>
            <a :href="item.gitHubUrl" target="_blank">{{ item.gitHubUrl }}</a>
          </div>
          <div class="container_item_address" v-if="item.address">
            <span class="container_item_address_text">下载地址：</span>
            <a :href="item.address" target="_blank">{{ item.address }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import myFun from '@/utils/fun'

const titleValue = ref('')
const toolList = ref([])
const dataList = ref([
  {
    id: 1,
    title: 'jQuery: 让操作DOM变得更容易',
    officialWebsite: 'https://jquery.com/',
    chinaWebsite: 'https://jquery.cuishifeng.cn/',
  },
  {
    id: 2,
    title: 'Lodash: 你能想到的工具函数它都帮你写了',
    officialWebsite: 'https://lodash.com/docs',
    chinaWebsite: 'https://www.lodashjs.com/',
  },
  {
    id: 3,
    title: 'Animate.css: 常见的CSS动画效果都帮你写好了',
    officialWebsite: 'https://animate.style/',
    chinaWebsite: '',
  },
  {
    id: 4,
    title: 'Axios: 让网络请求变得更简单',
    officialWebsite: 'https://axios-http.com/zh/',
    chinaWebsite: '',
  },
  {
    id: 5,
    title: 'MockJS: ajax拦截和模拟数据生成',
    officialWebsite: 'http://mockjs.com/',
    chinaWebsite: '',
  },
  {
    id: 6,
    title: 'Moment: 让日期处理更容易',
    officialWebsite: 'https://momentjs.com/',
    chinaWebsite: 'http://momentjs.cn/',
  },
  {
    id: 7,
    title: 'ECharts: 搞定所有你能想到的图表',
    officialWebsite: 'https://echarts.apache.org/zh',
    chinaWebsite: '',
  },
  {
    id: 8,
    title: 'animejs: 简单好用的JS动画库',
    officialWebsite: 'https://animejs.com/',
    chinaWebsite: '',
  },
  {
    id: 9,
    title: 'editormd: markdown编辑器',
    officialWebsite: 'https://pandao.github.io/editor.md',
    chinaWebsite: '',
  },
  {
    id: 10,
    title: 'validate: 简单好用的JS对象验证库',
    officialWebsite: 'http://validatejs.org/',
    chinaWebsite: '',
  },
  {
    id: 11,
    title: 'date-fns: 功能和Moment几乎相同',
    officialWebsite: 'https://date-fns.org/',
    chinaWebsite: '',
    mark: '支持tree shaking',
  },
  {
    id: 12,
    title: 'zepto: 功能和jQuery几乎相同',
    officialWebsite: 'https://zeptojs.com/',
    chinaWebsite: '',
    mark: '对移动端支持更好，包体积更小',
  },
  {
    id: 13,
    title: 'nprogress: 简单好用的进度条插件YouTube就使用的是它',
    officialWebsite: 'https://github.com/rstacruz/nprogress',
    chinaWebsite: '',
  },
  {
    id: 14,
    title: 'qs: 一个用于解析url的小工具',
    officialWebsite: 'https://github.com/ljharb/qs',
    chinaWebsite: '',
  },
  {
    id: 15,
    title: 'nodeJS: 一个用于开发的JavaScript运行环境',
    officialWebsite: 'https://nodejs.org/',
    chinaWebsite: 'https://www.nodejs.com.cn/',
    address: 'https://nodejs.org/en/download/',
  },
  {
    id: 16,
    title: 'npmJS: npm包管理工具',
    officialWebsite: 'https://www.npmjs.com/',
    chinaWebsite: '',
  },
  {
    id: 17,
    title: 'nvm: node版本管理工具',
    officialWebsite: 'https://nvmusa.org/',
    chinaWebsite: '',
    address: 'https://github.com/coreybutler/nvm-windows/releases',
  },
  {
    id: 18,
    title: 'yarn: yarn包管理工具',
    officialWebsite: 'https://yarnpkg.com/',
    chinaWebsite: '',
  },
  {
    id: 19,
    title: 'typeScript: typeScript是javascript超集',
    officialWebsite: 'https://www.typescriptlang.org/',
    chinaWebsite: 'https://www.typescriptlang.org/zh/',
  },
  {
    id: 20,
    title: 'Sass: 预编译',
    officialWebsite: '',
    chinaWebsite: 'https://www.sass.hk/',
  },
  {
    id: 21,
    title: 'Less: 预编译',
    officialWebsite: '',
    chinaWebsite: 'https://lesscss.cn/',
  },
  {
    id: 22,
    title: 'Babel: JS兼容性处理工具',
    officialWebsite: 'https://babeljs.io/',
    chinaWebsite: 'https://www.babeljs.cn/',
  },
  {
    id: 23,
    title: 'Pinia: Vue.js状态管理库',
    officialWebsite: 'https://pinia.vuejs.org/',
    chinaWebsite: 'https://pinia.vuejs.org/zh/',
  },
  {
    id: 24,
    title: 'Collect.js: JavaScript 处理数组和对象的方便且无依赖的包装类工具',
    officialWebsite: 'https://collect.js.org/',
    chinaWebsite: '',
    gitHubUrl: 'https://github.com/ecrmnn/collect.js',
  },
  {
    id: 25,
    title: 'Day.js: 极简的JavaScript库，可以为现代浏览器解析、验证、操作和显示日期和时间',
    officialWebsite: 'https://day.js.org/',
    chinaWebsite: '',
    gitHubUrl: 'https://github.com/iamkun/dayjs/',
  },
  {
    id: 26,
    title: 'nanoid: 小巧、安全、URL友好、唯一的 JavaScript 字符串ID生成器',
    officialWebsite: 'https://zelark.github.io/nano-id-cc/',
    chinaWebsite: '',
    gitHubUrl: 'https://github.com/ai/nanoid',
  },
  {
    id: 27,
    title:
      'Numeral.js: 用来对数值进行操作和格式化的 JS 库。可将数字格式化为货币、百分比、时间，甚至是序数词的缩写（比如1st，100th）',
    officialWebsite: 'http://numeraljs.com/',
    chinaWebsite: '',
    gitHubUrl: 'https://github.com/adamwdraper/Numeral-js',
  },
  {
    id: 28,
    title: 'Colourcode:  探索和发现颜色的工具',
    officialWebsite: 'https://colourco.de/',
    chinaWebsite: '',
  },
  {
    id: 29,
    title: 'react native官网',
    officialWebsite: 'https://reactnative.dev/',
    chinaWebsite: 'https://reactnative.cn/',
  },
  {
    id: 30,
    title: 'webGL官网',
    officialWebsite: 'http://www.hewebgl.com/',
    chinaWebsite: 'http://www.hewebgl.com/article/articledir/1',
  },
])

onMounted(() => {
  toolList.value = dataList.value
})

const titleInput = myFun.debounce(function (value) {
  toolList.value = dataList.value.filter((el) => el.title.includes(value))
}, 500)
</script>

<style lang="scss" scoped>
$topBottomInterval: 16px; //上下间隔
$fontSize16: 16px; //字体大小

//混合 调用(传参数)公共样式
@mixin tbMargin($tbMargin: 8px, $lrMargin: 0) {
  margin: $tbMargin $lrMargin;
}

.tollibary-com {
  height: 100%;

  .compontent-content {
    margin: 24px 0;
    text-align: left;
    position: relative;
    height: calc(100% - 60px);

    .title-input {
      width: 400px;
      margin: 0 16px;
    }
  }

  .tollibary-title {
    text-align: center;
  }

  .container {
    text-align: left;
    margin: 8px;
    overflow: auto;
    height: calc(100% - 40px);
    padding: 8px;

    &_item {
      @include tbMargin(24px, 8px);

      &_title {
        font-size: 20px;
        font-weight: bold;
        @include tbMargin;
      }

      &_website {
        @include tbMargin;
      }

      &_china {
        @include tbMargin;
      }

      &_mark {
        @include tbMargin;
      }

      &_address {
        @include tbMargin;
      }

      &_github {
        @include tbMargin;
      }
    }
  }
}
</style>
