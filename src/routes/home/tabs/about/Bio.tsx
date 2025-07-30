import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'

interface BioProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  data: BioData
  align?: 'left' | 'right'
}

export interface BioData {
  name: string
  tagline: string
  summary: string
  imgSrc: string
}

export const Bio: FC<BioProps> = ({ data, align = 'left', className, ...props }) => {
  return align === 'left' ? (
    <div className={twClassMerge(className, 'relative flex items-center')} {...props}>
      <img
        src={data.imgSrc}
        alt={`${data.name}'s profile`}
        className="rounded-full size-60 md:size-50 absolute -left-20"
      />
      <div className="outline-2 outline-primary-200 outline-dashed pl-40 md:pl-30 p-2 ml-4">
        <h2 className="font-serif font-bold text-2xl uppercase -mb-2 -mt-1.5">{data.name}</h2>
        <h3 className="font-serif font-semibold text-xl uppercase text-primary-700">
          {data.tagline}
        </h3>
        <p className="text-xs/3.5">{data.summary}</p>
      </div>
    </div>
  ) : (
    <div className={twClassMerge(className, 'relative flex items-center')} {...props}>
      <img
        src={data.imgSrc}
        alt={`${data.name}'s profile`}
        className="rounded-full size-60 md:size-50 absolute -right-20"
      />
      <div className="outline-2 outline-primary-200 outline-dashed pr-40 md:pr-30 p-2 mr-4">
        <h2 className="font-serif font-bold text-2xl uppercase -mb-2 -mt-1.5">{data.name}</h2>
        <h3 className="font-serif font-semibold text-xl uppercase text-primary-700">
          {data.tagline}
        </h3>
        <p className="text-xs/3.5">{data.summary}</p>
      </div>
    </div>
  )
}
