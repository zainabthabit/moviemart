import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './MovieThumb'
import Autoplay from 'embla-carousel-autoplay'
import { Rating } from '@mui/material'
const MoviesSlider = (props) => {
    const { movies, options } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 3000 })
    ])
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className="shrink-0 grow-0 basis-1/2 ">
            <div className="overflow-hidden " ref={ emblaMainRef }>
                <div className="flex touch-pan-y gap-2 	 ">
                    { movies.map((movie, index) => (
                        <div style={ { backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`})`, backgroundSize: 'cover' } } className="flex grow-0 shrink-0 basis-full aspect-video rounded-xl border bg-card overflow-hidden w-3/4 h-[35rem] " key={ index }>
                            <div className='flex flex-col items-start pl-7 '>
                                <div className=" rounded-sm text-[3rem] font-semibold flex justify-center items-center h-[10rem] text-white "> { movie.title }</div>

                                <div className=" rounded-sm text-[1rem] font-semibold flex justify-center items-center h-[10rem] text-justify w-[30rem] text-white"> { movie.overview }</div>
                                <Rating value={ movie.vote_average } precision={ 0.5 } readOnly max={ 5 } />

                                <div className='flex justify-between pt-20'>
                                    <button className='h-[3rem] w-[10rem] text-white bg-amber-600 rounded-3xl'>Watch Now</button>
                                    <button className='h-[3rem] w-[10rem] text-white  '>+ Add to Watch List</button>
                                    <button className='h-[3rem] w-[10rem] text-white'>Watch the Trailer</button>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>

            <div className="">
                <div className="overflow-hidden " ref={ emblaThumbsRef }>
                    <div className="flex touch-pan-y gap-2">
                        { movies.map((movie, index) => (
                            <Thumb
                                key={ index }
                                onClick={ () => onThumbClick(index) }
                                selected={ index === selectedIndex }
                                slide={ `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }
                            />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoviesSlider
