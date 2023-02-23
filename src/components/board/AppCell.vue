<template>
  <g
    :class="cellClass"
    :style="cellStyle"
    @mousedown.prevent="onMouseDown"
    @contextmenu.prevent="onContextMenu"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseout="hover = false"
  >
    <!-- BOUNDING RECTANGLE -->
<!--    <rect :width="tileSize" :height="tileSize" :class="rectClass" :style="rectStyle" />-->

    <!-- ELEMENT SVG -->
    <component :is="cellComponent" v-if="cellComponent != null" :state="pieceState" />
  </g>
</template>

<script setup>
import { elementComponents } from './cell/index'
import { computed, defineEmits, defineProps, ref } from 'vue'
// import { PieceState } from './cell/Piece'

// const tileSize = 64

const props = defineProps({
  piece: {
    type: Number,
    default: 0,
    required: true
  },
  coord: {
    type: Object
  }
})

const emit = defineEmits(['grab', 'touch', 'menu'])

const hover = ref(false)

const cellComponent = computed(() => {
  return elementComponents[props.piece]
})

const cellClass = computed(() => {
  return {
    active: true
  }
})

const gridCenter = (coord) => {
  return {
    x: (coord.x + 0.5) * 64,
    y: (coord.y + 0.5) * 64
  }
}
const gridTopLeft = (coord) => {
  return {
    x: coord.x * 64,
    y: coord.y * 64
  }
}

const cellStyle = computed(() => {
  const rotation = 0
  const coordA = props.coord
  const origin = gridCenter(coordA)
  const translate = gridTopLeft(coordA)
  const x = 0
  const y = 0

  return {
    transformOrigin: `${origin.x - x}px ${origin.y - y}px`,
    transform: `rotate(${-rotation}deg) translate(${translate.x - x}px, ${
        translate.y - y
      }px)`
  }
}
)

const ClickState = {
  Released: 'Released',
  JustClicked: 'JustClicked',
  HandledTouch: 'HandledTouch',
  HandledGrab: 'HandledGrab'
}
const clickCoords = { x: 0, y: 0 }
let clickButtons = 0

let clickState = ClickState.Released
const onMouseDown = (e) => {
  clickState = ClickState.JustClicked
  clickCoords.x = e.clientX
  clickCoords.y = e.clientY
  clickButtons = e.buttons
}
const onContextMenu = (e) => {
  clickState = ClickState.HandledTouch
  emit('menu', { x: e.clientX, y: e.clientY })
}
const onMouseMove = () => {
  hover.value = true
  if (clickState === ClickState.JustClicked) {
    if (clickButtons === 1) {
      clickState = ClickState.HandledGrab
      emit('grab', clickCoords)
    }
  }
}
const onMouseUp = () => {
  if (clickState === ClickState.JustClicked) {
    if (clickButtons === 1) {
      clickState = ClickState.HandledTouch
      emit('touch', clickCoords)
    }
  }
}

</script>

<style lang="scss" scoped>
rect {
  fill: transparent;
}

.inner-rect {
  fill: white;
  opacity: 0;
  transition: opacity 0.2s;
}

.movable-space {
  transition: opacity 0.3s;
  opacity: 0.1;
}
.frozen {
  cursor: not-allowed;
  &.laser {
    cursor: pointer;
  }
}

.interacting {
  cursor: grabbing;
}

.active {
  cursor: grab;
  .transparent {
    opacity: 0.5;
  }
}
</style>
