import * as HTMLFunctions from '../ts/HTMLFunctions'
import { testMoviesData } from '../ts/services/__mocks__/movieService'
import { handleSubmit, init } from '../ts/movieApp'

enum ID {
    SEARCH_FORM = 'searchForm',
    SEARCH_INPUT = 'searchText',
    SEARCH_BUTTON = 'search',
    MOVIEs_CONTAINER = 'movie-container'
}

jest.mock('../ts/services/movieService')

describe('testing movie app functions', () => {
    const mockedCreateHtml = jest.spyOn(HTMLFunctions, 'createHtml'), mockedDisplayNoResult = jest.spyOn(HTMLFunctions, 'displayNoResult')

    beforeEach(() => {
        document.body.innerHTML = `
            <form id='${ ID.SEARCH_FORM }'>
				<input type='text' id='${ ID.SEARCH_INPUT }' placeholder='Skriv titel här' />
				<button type='submit' id='${ ID.SEARCH_BUTTON }'>Sök</button>
			</form>
			<div id='${ ID.MOVIEs_CONTAINER }'></div>
        `
        jest.clearAllMocks()
    })

    test('should find the form and add an event listener', () => {
        const form = document.getElementById(ID.SEARCH_FORM) as HTMLFormElement, mockedAddEventListener = jest.spyOn(form, 'addEventListener'),
        mockedConsoleLog = jest.spyOn(console, 'log')

        init();
        (document.getElementById(ID.SEARCH_BUTTON) as HTMLButtonElement).click()
        
        expect(mockedAddEventListener).toHaveBeenCalledTimes(1)
        expect(mockedConsoleLog).toHaveBeenCalledWith('submitted')
    })

    test('should find the value, search with it and call createHtml with correct data', async () => {
        (document.getElementById(ID.SEARCH_INPUT) as HTMLInputElement).value = 'lotr'

        await handleSubmit()

        expect(mockedCreateHtml).toHaveBeenCalledWith(testMoviesData, document.getElementById(ID.MOVIEs_CONTAINER))
    })

    test('should find an empty value and call displayNoResult', async () => {
        await handleSubmit()

        expect(mockedDisplayNoResult).toHaveBeenCalledWith(document.getElementById(ID.MOVIEs_CONTAINER))
    })

    test('should find "bad" value and call displayNoResult', async () => {
        (document.getElementById(ID.SEARCH_INPUT) as HTMLInputElement).value = '\u037E\u037E\u037E\u037E\u037E\u037E\u037E\u037E\u037E\u037E\u037E\u037E\u037E\u037E'

        await handleSubmit()

        expect(mockedDisplayNoResult).toHaveBeenCalledWith(document.getElementById(ID.MOVIEs_CONTAINER))
    })
})