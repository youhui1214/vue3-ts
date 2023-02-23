<template>
  <h1 ref="boardScaler">Ref属性获取dom</h1>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup () {
    // 先定义一个空的响应式数据ref定义的
    // setup中返回该数据，你想获取那个dom元素，在该元素上使用ref属性绑定该数据即可
    const boardScaler = ref(null)

    onMounted(function () {
      console.log(boardScaler)
      const rect = boardScaler.value?.getBoundingClientRect()
      console.log(rect)
    })
    return {
      boardScaler
    }
  }
}
</script>
