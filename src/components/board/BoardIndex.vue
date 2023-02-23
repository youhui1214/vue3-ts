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
        <AppCell
          v-for="{ coord, type } in cells"
          :key="`cell-${coord.x}-${coord.y}`"
          :coord="coord"
          :piece="type"
          @grab="handleCellGrab"
        ></AppCell>
      </g>
    </svg>
    <!-- SPEECH BUBBLES -->

    <slot />
  </div>
</template>

<script setup>
import BoardDots from '@/components/board/BoardDots.vue'
import AppCell from '@/components/board/AppCell.vue'
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['grab', 'touch', 'menu'])
// const cells = reactive([1, 2, 3])
const cells = [
  {
    type: 1,
    coord: {
      x: 3,
      y: 3
    }
  },
  {
    type: 4,
    coord: {
      x: 12,
      y: 3
    }
  },
  {
    type: 5,
    coord: {
      x: 7,
      y: 3
    }
  }
]

const totalWidth = ref(832)
const totalHeight = ref(640)
const uid = ref(0)

const boardScaler = ref(null)

const getInteraction = (clientX, clientY) => {
  const rect = boardScaler.value?.getBoundingClientRect()
  console.log(rect)
  if (rect == null) throw new Error('Missing board rect on interaction')
  const x = ((clientX - rect.x) / rect.width) * 13
  const y = ((clientY - rect.y) / rect.height) * 10
  const coord = {
    x: Math.floor(x),
    y: Math.floor(y)
  }
  return { coord, interactPoint: { x, y } }
}

const handleCellGrab = (clientPos) => {
  const interaction = getInteraction(clientPos.x, clientPos.y)
  console.log(interaction)
  emit('grab', interaction)
}

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
