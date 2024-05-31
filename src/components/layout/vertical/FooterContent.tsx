'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
/* import useVerticalNav from '@menu/hooks/useVerticalNav'
import useHorizontalNav from '@menu/hooks/useHorizontalNav'
import { useSettings } from '@core/hooks/useSettings' */

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  /*  const { settings } = useSettings()
   const { isBreakpointReached: isVerticalBreakpointReached } = useVerticalNav()
   const { isBreakpointReached: isHorizontalBreakpointReached } = useHorizontalNav()
 
   // Vars
   const isBreakpointReached =
     settings.layout === 'vertical' ? isVerticalBreakpointReached : isHorizontalBreakpointReached */

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span className='text-textSecondary'>{`© ${new Date().getFullYear()}, Hecho `}</span>
        <span className='text-textSecondary'>{` por `}</span>
        <Link href='https://realincstudio.com' target='_blank' className='text-primary uppercase'>
          Real inc studio
        </Link>
      </p>

    </div>
  )
}

export default FooterContent
