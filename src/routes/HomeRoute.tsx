/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { DynamicLogo } from './home/DynamicLogo'
import { motion } from 'motion/react'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  return (
    <div className={twClassMerge(className, '')} {...props}>
      <div id="logo" className="relative flex justify-center items-center p-10">
        <DynamicLogo
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
          <g transform="rotate(45 200 200)">
            <path
              d="M270 200 A70 70 0 1 1 200 130 A55 55 0 1 0 270 200"
              stroke="#c3ecce"
              strokeWidth="2"
              fill="none"
            />
          </g>
        </motion.svg>
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-20">
          <span className="font-cursive lowercase text-4xl">The</span>
          <span className="font-serif uppercase text-6xl -my-2">Awakened</span>
          <span className="font-cursive lowercase text-5xl">Minds Collective</span>
        </div>
      </div>
    </div>
  )
}
