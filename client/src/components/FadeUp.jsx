import React from 'react'
import { motion } from 'motion/react';

const FadeUp = ({ children,delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4,delay }}>{children}</motion.div>
    )
}

export default FadeUp