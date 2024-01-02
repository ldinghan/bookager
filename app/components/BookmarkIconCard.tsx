"use client";

import React, { useState } from 'react'
import { Card, Flex, Text, Link } from '@radix-ui/themes'
import Image from 'next/image'
import EditBookmarkButtons from './EditBookmarkButtons';
import DefaultIcon from "../../assets/DefaultIcon.png";
import { useTheme } from 'next-themes';

type BookmarkType = {
    isStarred: boolean;
    iconPath: string;
    id:string;
    name:string;
    link:string;
    category:string;
}

function BookmarkIconCard ({ bookmark, categories, updateData }:{ bookmark:BookmarkType, categories:string[], updateData:Function }) {

    const [isHover, setIsHover] = useState(false);
    const theme = useTheme().theme;

    return (
        <Card style={{ maxWidth: 320 }} variant='surface' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        
            <Flex gap="3" direction="column" align="center" justify="center">
                
                <div className='bg-white'><Image
                    src={ bookmark.iconPath ? bookmark.iconPath : DefaultIcon}
                    alt='icon'
                    width={35}
                    height={35} />
                </div>
                <Link href={bookmark.link} target="_blank" tabIndex={-1} >
                <Text as="div" size="3" weight="bold" align="center">
                    {bookmark.name}
                </Text>
                <Text as="div" size="2" color={theme == "dark" ? "ruby" : "crimson"} align="center">
                    {bookmark.category}
                </Text>
                <Text as="div" size="1" color="gray" align="center">
                    {isHover ? bookmark.link : bookmark.link.substring(0, 30) + (bookmark.link.length > 30 ? "..." : "")}
                </Text>
                </Link>

                <EditBookmarkButtons currentBookmark={bookmark} categories={categories} updateData={updateData}/>
            </Flex>
        </Card>
    )
}

export default BookmarkIconCard