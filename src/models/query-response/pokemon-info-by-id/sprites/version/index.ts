import { GenerationIProps } from './generations/generation-i'
import { GenerationIIProps } from './generations/generation-ii'
import { GenerationIIIProps } from './generations/generation-iii'
import { GenerationIVProps } from './generations/generation-iv'
import { GenerationVProps } from './generations/generation-v'
import { GenerationVIProps } from './generations/generation-vi'
import { GenerationVIIProps } from './generations/generation-vii'
import { GenerationVIIIProps } from './generations/generation-viii'

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