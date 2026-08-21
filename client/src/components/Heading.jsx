import React from 'react'

const Heading = ({heading}) => {
  return (
    <h2 className="text-white text-3xl sm:text-4xl mb-8 sm:mb-10 font-black italic uppercase">{heading}</h2>
  )
}

export default Heading