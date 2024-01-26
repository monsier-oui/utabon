import { AnimationProject } from './AnimationProject'
import { BeforeSideM } from './BeforeSideM'
import { FantasticCombination } from './FantasticCombination'
import { FifthAnniv } from './FifthAnniv'
import { FourthAnniv } from './FourthAnniv'
import { FourtyNineElements } from './FourtyNineElements'
import { GrowingSignal } from './GrowingSignal'
import { NewStageEpisode } from './NewStageEpisode'
import { OriginalPieces } from './OriginalPieces'
import { Others } from './Others'
import { Passion } from './Passion'
import { PassionateFormation } from './PassionateFormation'
import { SecondAniv } from './SecondAnniv'
import { StartingLine } from './StartingLine'
import { ThirdAniv } from './ThirdAnniv'
import { WakeminiMusicCollection } from './WakeminiMusicCollection'
import { WorldTreasure } from './WorldTreasure'

import type Song from '@/types/Song'

const songs: Song[] = [
  ...BeforeSideM,
  ...StartingLine,
  ...SecondAniv,
  ...OriginalPieces,
  ...AnimationProject,
  ...ThirdAniv,
  ...WorldTreasure,
  ...WakeminiMusicCollection,
  ...FourthAnniv,
  ...FifthAnniv,
  ...NewStageEpisode,
  ...GrowingSignal,
  ...PassionateFormation,
  ...FourtyNineElements,
  ...FantasticCombination,
  ...Passion,
  ...Others,
]

export default songs
