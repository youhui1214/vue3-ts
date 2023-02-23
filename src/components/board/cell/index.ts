import LaserCell from './LaserCell.vue'
import MirrorCell from './MirrorCell.vue'
import MineCell from './MineCell.vue'
import DetectorCell from './DetectorCell.vue'
import RockCell from './RockCell.vue'

interface numberKeyObj {
  [key: number]: any;
}

export {
  LaserCell,
  MirrorCell,
  DetectorCell,
  RockCell,
  MineCell
}

export const elementComponents: numberKeyObj = {
  1: LaserCell,
  2: MirrorCell,
  3: MineCell,
  4: DetectorCell,
  5: RockCell
}
