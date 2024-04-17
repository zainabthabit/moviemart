import { create } from 'zustand'

export const useMovies = create((set) => ({
    movies: {
        nowPlaying: [],
        topRated: [],
        popular: [],
        upcoming: [],
    },
    getNowPlaying: async () => {
        const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=df33cc3643480375cb7c9277cd1d41fe")
        const result = await response.json()
        set((state) => ({
            movies: {
                ...state.movies,
                nowPlaying: result.results
            }
        }))

    },
    getTopRated: async () => {
        const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=df33cc3643480375cb7c9277cd1d41fe")
        const result = await response.json()
        set((state) => ({
            movies: {
                ...state.movies,
                topRated: result.results
            }
        }))

    },
    getPopular: async () => {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=df33cc3643480375cb7c9277cd1d41fe")
        const result = await response.json()
        set((state) => ({
            movies: {
                ...state.movies,
                popular: result.results
            }
        }))


    },
    getUpcoming: async () => {
        const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=df33cc3643480375cb7c9277cd1d41fe")
        const result = await response.json()
        set((state) => ({
            movies: {
                ...state.movies,
                upcoming: result.results
            }
        }))
        console.log(result)


    }



    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    // updateBears: (newBears) => set({ bears: newBears }),
}))