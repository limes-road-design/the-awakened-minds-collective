/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { DynamicLogo } from './home/DynamicLogo'
import { motion } from 'motion/react'
import { BiLogoInstagram, BiLogoFacebook, BiLogoTiktok } from 'react-icons/bi'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  return (
    <div className={twClassMerge(className, '')} {...props}>
      <div className="grid grid-cols-3">
        <div id="left" className="flex flex-col justify-center items-center"></div>
        <div id="center" className="flex flex-col justify-center items-center p-2">
          <div id="logo" className="relative flex flex-1 justify-center items-center">
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
          <div id="socials" className="flex gap-4 -mt-10 z-30 relative">
            <a
              className="size-10"
              href="https://instagram.com/theawakenedmindscollective"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoInstagram className="size-full" />
            </a>
            <a
              className="size-10"
              href="https://facebook.com/profile.php?id=61577785949195"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoFacebook className="size-full" />
            </a>
            <a
              className="size-10"
              href="https://tiktok.com/@awakenedmindscollective"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoTiktok className="size-full" />
            </a>
          </div>
        </div>
        <div id="right" className="flex flex-col justify-center items-center p-2"></div>
      </div>
    </div>
  )
}
