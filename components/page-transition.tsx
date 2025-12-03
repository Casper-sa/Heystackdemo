"use client"

import { motion } from "framer-motion"

const DEFAULT_DURATION = 1

export default function PageTransition({
    children,
    duration = DEFAULT_DURATION,
}: {
    children: React.ReactNode
    duration?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ ease: "easeInOut", duration }}
        >
            {children}
        </motion.div>
    )
}
