import { IMovie } from '../ts/models/Movie'
import { movieSort } from '../ts/functions'

enum Title {
    A = 'The Lord of the Rings',
    Z = 'The Lord of the Rings: The War of the Rohirrim'
}

describe('Testing helper functions', () => {
    let movies: IMovie[] = []

    beforeEach(() => {
        movies = [{'Title':'The Lord of the Rings: The Fellowship of the Ring'},{'Title':'The Lord of the Rings: The Return of the King'},{'Title':'The Lord of the Rings: The Two Towers'},{'Title':'The Lord of the Rings: The Rings of Power'},{'Title':'The Lord of the Rings'},{'Title':'The Lord of the Rings: The War of the Rohirrim'},{'Title':'The Lord of the Rings: The Two Towers'},{'Title':'The Lord of the Rings: The Return of the King'},{'Title':'The Lord of the Rings: The Battle for Middle-Earth'},{'Title':'The Lord of the Rings: The Battle for Middle-Earth II'}] as IMovie[]
    })

    test('movieSort sorts movies by title in descending order by default', () => {
        const sortedMovies = movieSort(movies)

        expect(sortedMovies[0].Title).toBe(Title.A)
        expect(sortedMovies[sortedMovies.length - 1].Title).toBe(Title.Z)
    })

    test('movieSort sorts movies by title in ascending order when desc is false', () => {
        const sortedMovies = movieSort(movies, false)

        expect(sortedMovies[0].Title).toBe(Title.Z)
        expect(sortedMovies[sortedMovies.length - 1].Title).toBe(Title.A)
    })
})