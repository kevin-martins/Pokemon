import { capitalize, changeWord, getRandomValue } from "../../src/helpers/utils";

describe('Capitalize', () => {
    it('should uppercase only the first caracter of the given string', () => {
        const testingValues = [
            { test: "slt", success: "Slt" },
            { test: "yop", success: "Yop" },
            { test: "toto", success: "Toto" }
        ]
        testingValues.forEach(value => {
            const result = capitalize(value.test)

            expect(result).toBe(value.success)
        })
    })
})

describe('getRandomValue', () => {
    it('should give a random number between range', () => {
        const maxValue = 5
        const testingValues = [
            getRandomValue(maxValue),
            getRandomValue(maxValue),
            getRandomValue(maxValue),
            getRandomValue(maxValue),
            getRandomValue(maxValue)
        ]
        testingValues.forEach(value => {
            expect(value).toBeLessThanOrEqual(5)
        })
    })
})

describe('changeWord', () => {
    it('should change the word because the condition is met', () => {
        expect(changeWord(true, 'journal', 'journaux')).toEqual("journaux")
    })

    it('should not change the word because the condition is met', () => {
        expect(changeWord(false, 'journal', 'journaux')).toEqual("journal")
    })
})