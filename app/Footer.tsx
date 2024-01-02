import React from 'react'
import { Blockquote } from '@radix-ui/themes'

function Footer() {
  return (
    <div className='w-full h-20 bg-purple-200 dark:bg-purple-500 p-2 flex justify-end items-end mt-auto'>     
        <div>
            <Blockquote>Bookmarked by Lim Ding Han, 2023.</Blockquote>
        </div> 
        
    </div>
  )
}

export default Footer