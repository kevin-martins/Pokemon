import { LanguageProps } from "../shared/language";

type VersionProps = {
    name: string,
    url: string,
}

export type FlavorTextEntriesProps = {
    flavor_text: string,
    langauge : LanguageProps,
    version: VersionProps,
}