import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Thumb } from './MovieThumb'

const GeneralMovieSlider = (props) => {
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
            <div className="">
                <div className="overflow-hidden " ref={ emblaThumbsRef }>

                    <div className="flex touch-pan-y gap-2">
                        { movies.map((movie, index) => (
                            // <div className='flex flex-col '>
                            <Thumb
                                key={ index }
                                onClick={ () => onThumbClick(index) }
                                selected={ index === selectedIndex }
                                slide={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` }
                            />
                            /* <p>{ movie.title }</p> */
                            // </div>
                        )) }
                    </div>


                </div>
            </div>
        </div>
    )
}

export default GeneralMovieSlider
