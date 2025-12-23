import React from 'react'
import Slider from 'react-slick'

export default function CarouselPreview({ images = [] }){
  if(!images || images.length === 0) return null
  const settings = { dots: true, infinite: true, slidesToShow: 1, slidesToScroll: 1 }
  return (
    <div className="mb-4">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="h-64 flex items-center justify-center bg-gray-100">
            <img src={src} alt={`img-${i}`} className="h-64 object-contain" />
          </div>
        ))}
      </Slider>
    </div>
  )
}
