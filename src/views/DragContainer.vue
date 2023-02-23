<template>
  <div class="drag-container">
    <svg
      v-if="dragState"
      viewBox="0 0 64 64"
      width="64"
      height="64"
      :style="dragState.style"
    >
      <AppCell :piece="dragState.piece" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import AppCell from '@/components/board/AppCell.vue'
import { useMouseCoords } from '@/utils/event'
import { computed, defineComponent, PropType } from 'vue'

const mouse = useMouseCoords()

const dragState = computed(() => {
  const grab = props.grabCtl.grabState
  const halfTile = 64 / 2
  if (grab == null) return null
  return {
    piece: 1,
    style: {
      transformOrigin: '50% 50%',
      transform: `translate(${mouse.pageX - halfTile}px, ${mouse.pageY - halfTile}px)`
    }
  }
})

</script>

<style lang="scss" scoped>
.drag-container {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  svg {
    overflow: visible;
  }
}
</style>
