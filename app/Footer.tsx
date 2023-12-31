import React from 'react'
import { Blockquote } from '@radix-ui/themes'

function Footer() {
  return (
    <div className='w-full h-20 bg-purple-200 dark:bg-purple-500 p-2 mt-auto flex justify-end items-end'>     
        <div>
            <Blockquote>Bookmarked by Lim Ding Han, 2023.</Blockquote>
        </div> 
        
    </div>
  )
}

export default Footer