/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { motion } from 'motion/react'
import { AnimatedRays } from '~/components/logo/AnimatedRays'

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const Logo: FC<LogoProps> = ({ className, ...props }) => {
  return (
    <div
      id="logo"
      className={twClassMerge(className, 'relative flex flex-1 justify-center items-center')}
      {...props}
    >
      <AnimatedRays
        rayCount={47}
        rotationSpeed={0.1}
        maxRayGaps={2}
        rayGapWidth={12}
        startRadius={100}
        minEndRadius={150}
        maxEndRadius={200}
        rayWidth={2}
      />
      <motion.svg
        className="absolute inset-0 z-10 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 260.1041 260.1041 A 85 85 45 1 1 260.1041 139.8959 A 70 70 45 1 0 260.1041 260.1041"
          stroke="#c3ecce"
          stroke-width="2"
          fill="none"
        />
      </motion.svg>
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-20">
        <span className="font-cursive lowercase text-4xl">The</span>
        <span className="font-serif uppercase text-6xl -my-2">Awakened</span>
        <span className="font-cursive lowercase text-5xl">Minds Collective</span>
      </div>
    </div>
  )
}
