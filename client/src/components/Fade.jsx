import React from 'react'
import { motion } from 'motion/react';

const Fade = ({children,delay=0}) => {
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4,delay }}
    >{children}</motion.div>
  )
}

export default Fade