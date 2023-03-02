type RedBlueProps = {
    back_default: string,
    back_gray: string,
    back_transparent: string,
    front_default: string,
    front_gray: string,
    front_transparent: string,
}

type YellowProps = {
    back_default: string,
    back_gray: string,
    back_transparent: string,
    front_default: string,
    front_gray: string,
    front_transparent: string,
}

export type GenerationIProps = {
    [`red-blue`]: RedBlueProps,
    yellow: YellowProps,
}