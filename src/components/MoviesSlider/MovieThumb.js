import React from 'react'

export const Thumb = (props) => {
    const { selected, slide, onClick } = props

    return (
        <div
            role="button"
            onClick={ onClick }
            style={ { backgroundImage: `url(${slide})`, backgroundSize: 'cover' } }
            className={ 'flex grow-0 shrink-0 basis-[15%] aspect-video rounded-xl border bg-card items-center justify-center overflow-hidden'.concat(
                selected ? ' bg-yellow' : ''
            ) }
        >

        </div>
    )
}
