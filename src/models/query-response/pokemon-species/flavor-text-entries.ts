import { LanguageProps } from "../shared/language";

type VersionProps = {
    name: string,
    url: string,
}

export type FlavorTextEntriesProps = {
    flavorText: string,
    langauge : LanguageProps,
    version: VersionProps,
}