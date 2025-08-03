import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { motion } from 'motion/react'

interface BioProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  data: BioData
}

export interface BioData {
  name: string
  tagline: string
  summary: string
  imgSrc: string
}

export const Bio: FC<BioProps> = ({ data, className, ...props }) => {
  return (
    <div className={twClassMerge(className, 'relative flex items-center')} {...props}>
      <motion.svg
        className="mr-58 size-96 inset-0 z-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 513 513"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M256.5,256.5c0-98.1,70.63-179.69,163.81-196.72C375.91,22.77,318.81.5,256.5.5,115.12.5.5,115.12.5,256.5s114.62,256,256,256c62.31,0,119.41-22.27,163.81-59.28-93.18-17.03-163.81-98.63-163.81-196.72Z"
          stroke="#c3ecce"
          stroke-width="4"
          fill="none"
        />
      </motion.svg>
      <div id="bio-text" className="ml-58 absolute inset-0 flex flex-col z-10 mt-10">
        <div className="flex flex-col -space-y-3 font-serif font-bold uppercase -ml-4">
          <div className="text-4xl">{data.name}</div>
          <div className="text-2xl text-primary-700">{data.tagline}</div>
        </div>
        <p className="mb-25 h-full flex items-center">{data.summary}</p>
      </div>
    </div>
  )
}
