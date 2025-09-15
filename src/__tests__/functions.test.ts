import { IMovie } from '../ts/models/Movie'
import { movieSort } from '../ts/functions'

describe('Testing helper functions', () => {
    test('movieSort sorts movies by title in descending order by default', () => {
        const moveies = [{'Title':'The Lord of the Rings: The Fellowship of the Ring'},{'Title':'The Lord of the Rings: The Return of the King'},{'Title':'The Lord of the Rings: The Two Towers'},{'Title':'The Lord of the Rings: The Rings of Power'},{'Title':'The Lord of the Rings'},{'Title':'The Lord of the Rings: The War of the Rohirrim'},{'Title':'The Lord of the Rings: The Two Towers'},{'Title':'The Lord of the Rings: The Return of the King'},{'Title':'The Lord of the Rings: The Battle for Middle-Earth'},{'Title':'The Lord of the Rings: The Battle for Middle-Earth II'}] as IMovie[],
        sortedMovies = movieSort(moveies)

        expect(sortedMovies[0].Title).toBe('The Lord of the Rings')
        expect(sortedMovies[sortedMovies.length - 1].Title).toBe('The Lord of the Rings: The War of the Rohirrim')
    })
})