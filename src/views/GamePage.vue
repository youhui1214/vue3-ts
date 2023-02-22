<template>
  <div class="game">
    <div class="container">
      <div class="header">
        量子游戏测试
      </div>
      <div class="main">
        <BoardIndex></BoardIndex>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BoardIndex from '@/components/board/BoardIndex.vue'

</script>

<style scoped lang="scss">

.game {
  width: 100%;
  height: 100%;

  //background-color: #42b983;

  .container {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    //background-color: #90c3f5;

    .header {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      background-color: aquamarine;
    }
    .main {
      width: 100%;
      //height: 100%;
      //background-color: #42b983;
      background: linear-gradient(to right, #210235 16%, #2e006a 30%, #2e006a 70%, #210235 84%);
    }

  }
}

</style>
