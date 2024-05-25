<template>
  <div class="mainTest">
    <h1>此项目通过github.com访问，git地址： https://github.com/zf630058423/test</h1>
    <br />
    <h1>GitHub无法访问，访问太慢的解决方案</h1>
    <div class="fangan">
      <h3>方案一：修改hosts文件</h3>
      <div class="fangan_test">
        <div class="fangan_test_text">
          访问某个网站，其实是操作系统通过域名解析器(DNS)解析域名拿到对应的IP地址，然后再去访问。
        </div>
        <div class="fangan_test_text">
          hosts作用是：配置在这里的域名，将不会走域名解析器，也就是说：域名解析器将不再解析，而是直接使用hosts文件里面根据域名配置好的IP地址
        </div>
        <div class="fangan_test_text">
          第一步：获取github.com的真实IP地址： https://seo.chinaz.com
        </div>
        <div class="fangan_test_text">第二步：测试网络是否通畅 ping 20.205.243.166</div>
        <div class="fangan_test_text">第三步：修改hosts文件</div>
        <div class="fangan_test_text">win+r --> 输入 打开： c:\Windows\System32\drivers\etc</div>
        <div class="fangan_test_text">更改hosts文件 20.205.243.166 github.com</div>
        <div class="fangan_test_text">
          保存后直接浏览 github.com。如果不能打开，可以尝试刷新DNS，cmd打开窗口：ipconfig /flushdns
        </div>
        <div class="fangan_test_text">
          地址： https://www.cnblogs.com/Marydon20170307/p/17466801.html
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.mainTest {
  text-align: left;

  .fangan {
    margin: 8px;

    &_test {
      margin: 8px;

      &_text {
        margin: 8px;
      }
    }
  }
}
</style>
