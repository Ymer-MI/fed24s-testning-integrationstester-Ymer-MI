import { getData } from '../ts/services/movieService'

jest.mock('axios', () => ({
    get: async (url: string) => {
        switch (true) {
            case /.*s=lotr$/.test(url):
                return Promise.resolve({ data: {'Search':[{'Title':'The Lord of the Rings: The Fellowship of the Ring','Year':'2001','imdbID':'tt0120737','Type':'movie','Poster':'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The Return of the King','Year':'2003','imdbID':'tt0167260','Type':'movie','Poster':'https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The Two Towers','Year':'2002','imdbID':'tt0167261','Type':'movie','Poster':'https://m.media-amazon.com/images/M/MV5BMGQxMDdiOWUtYjc1Ni00YzM1LWE2NjMtZTg3Y2JkMjEzMTJjXkEyXkFqcGc@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The Rings of Power','Year':'2022–','imdbID':'tt7631058','Type':'series','Poster':'https://m.media-amazon.com/images/M/MV5BNmVmZGQ2ZTctYzE4NC00YzkxLThhNjYtNGIyZjJmZGEwMjUzXkEyXkFqcGc@._V1_SX300.jpg'},{'Title':'The Lord of the Rings','Year':'1978','imdbID':'tt0077869','Type':'movie','Poster':'https://m.media-amazon.com/images/M/MV5BZmI4ZmIxOGQtMGY2ZS00Y2Y5LTllMDItYzllOWFmMTNlMmY2XkEyXkFqcGc@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The War of the Rohirrim','Year':'2024','imdbID':'tt14824600','Type':'movie','Poster':'https://m.media-amazon.com/images/M/MV5BOTg4OTgyMDYtMDA0NC00ZjJhLWJiOGMtMjlkM2ZjNTgxNGI0XkEyXkFqcGc@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The Two Towers','Year':'2002','imdbID':'tt0347436','Type':'game','Poster':'https://m.media-amazon.com/images/M/MV5BODI0Mzk3OTM4N15BMl5BanBnXkFtZTgwMTM4MTk4MDE@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The Return of the King','Year':'2003','imdbID':'tt0387360','Type':'game','Poster':'https://m.media-amazon.com/images/M/MV5BMjE5NTQwMTY5MV5BMl5BanBnXkFtZTgwODcwNjUwMTE@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The Battle for Middle-Earth','Year':'2004','imdbID':'tt0412935','Type':'game','Poster':'https://m.media-amazon.com/images/M/MV5BYWI5ODU0ZGEtYTA4YS00YzliLWJiZjEtYThkNTBkNTY1Y2FhXkEyXkFqcGdeQXVyNDAzNzA0MzE@._V1_SX300.jpg'},{'Title':'The Lord of the Rings: The Battle for Middle-Earth II','Year':'2006','imdbID':'tt0760172','Type':'game','Poster':'https://m.media-amazon.com/images/M/MV5BZTFlNTg5NzgtZmUyNS00MWJjLWFmNDktZmNiODEzZWY2YjgwXkEyXkFqcGdeQXVyNDAzNzA0MzE@._V1_SX300.jpg'}],'totalResults':'85','Response':'True'} })
            case /.*s=$/.test(url):
                return Promise.resolve({ data: {'Response':'False','Error':'Incorrect IMDb ID.'} })
            default:
                return Promise.reject('API call failed')
        }
    }
}))

describe('Testing movie service', () => {
    test('it should get data when searching with a normal value', async () => {
        const movies = await getData('lotr')

        expect(movies.length).toBe(10)
        expect(movies[0].imdbID).toBe('tt0120737')
        expect(movies[movies.length - 1].imdbID).toBe('tt0760172')
    })

    test('it should return undefined when searching with an empty value', async () => {
        expect((await getData(''))).toBe(undefined)
    })

    test('it should return an empty array when the API call fails', async () => {
        expect((await getData('asdasdasd')).length).toBe(0)
    })
})