<template>
  <div
    ref="boardScaler"
    class="board_scaler"
    :style="{ maxWidth: `${totalWidth}px`, maxHeight: `${totalHeight}px` }"
  >
    <svg class="grid" :viewBox="`0 0 ${totalWidth} ${totalHeight}`">
      <clipPath :id="`grid-clip-${uid}`">
        <rect :width="totalWidth" :height="totalHeight" />
      </clipPath>
      <!-- DOTS -->
      <BoardDots :rows="10" :cols="13" />
      <g :clip-path="`url(#grid-clip-${uid})`">
        <!-- CELLS -->

      </g>
    </svg>
    <!-- SPEECH BUBBLES -->

    <slot />
  </div>
</template>

<script setup lang="ts">
import BoardDots from '@/components/board/BoardDots.vue'
import { ref, reactive, computed } from 'vue'

const totalWidth = ref(832)
const totalHeight = ref(640)
const uid = 0

</script>

<style scoped lang="scss">
.board_scaler {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (min-width: 1001px) {
    // margin-bottom: 100px;
  }
}
</style>
