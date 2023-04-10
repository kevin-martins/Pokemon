export const capitalize = (str: string): string => {
    return str[0].toUpperCase() + str.split('').splice(1, str.length).join('')
}

export const getRandomValue = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getFile = (path: string, ext = "png"): string => {
    return process.env.PUBLIC_URL + path + "." + ext
}

export const plurial = (condition: boolean, plurialType: string): string => {
    return condition ? plurialType : ""
}