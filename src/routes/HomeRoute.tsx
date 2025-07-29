/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'

import { BiLogoInstagram, BiLogoFacebook, BiLogoTiktok } from 'react-icons/bi'
import { Logo } from '~/components/logo/Logo'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  return (
    <div className={twClassMerge(className, '')} {...props}>
      <div className="grid grid-cols-3">
        <div id="left" className="flex flex-col justify-center items-center"></div>
        <div id="center" className="flex flex-col justify-center items-center p-2">
          <Logo />
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
