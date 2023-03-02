import { GenerationIProps } from './generations/generation-i'
import { GenerationIIProps } from './generations/generation-ii'
import { GenerationIIIProps } from './generations/generation-iii'
import { GenerationIVProps } from './generations/generation-iv'
import { GenerationVProps } from './generations/generation-v'
import { GenerationVIProps } from './generations/generation-vi'
import { GenerationVIIProps } from './generations/generation-vii'
import { GenerationVIIIProps } from './generations/generation-viii'

// export type GenerationProps = {
//     back_default?: string | null
//     back_gray?: string | null,
//     back_female?: string | null,
//     back_transparent?: string | null,
//     back_shiny?: string | null
//     back_shiny_female?: string | null,
//     front_default?: string | null,
//     front_gray?: string | null,
//     front_female?: string | null,
//     front_transparent?: string | null,
//     front_shiny?: string | null
//     front_shiny_female?: string | null
// }

export type VersionProps = {
    [`generation-i`]: GenerationIProps,
    [`generation-ii`]: GenerationIIProps,
    [`generation-iii`]: GenerationIIIProps,
    [`generation-iv`]: GenerationIVProps,
    [`generation-v`]: GenerationVProps,
    [`generation-vi`]: GenerationVIProps,
    [`generation-vii`]: GenerationVIIProps,
    [`generation-viii`]: GenerationVIIIProps,
}