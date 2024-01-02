import React from 'react'
import { Card, Flex, Box, Text } from '@radix-ui/themes'
import Image from 'next/image'
import EditBookmarkButtons from './EditBookmarkButtons';
import DefaultIcon from "../../assets/DefaultIcon.png";

type BookmarkType = {
    isStarred: boolean;
    iconPath: string;
    id:string;
    name:string;
    link:string;
    category:string;
}

function BookmarkIconCard ({ bookmark, categories, updateData }:{ bookmark:BookmarkType, categories:string[], updateData:Function }) {
  return (
    <Card style={{ maxWidth: 320 }} variant='surface'>
    <Flex gap="3" direction="column" align="center" justify="center">
        <Image
            src={ bookmark.iconPath ? bookmark.iconPath : DefaultIcon}
            alt='icon'
            width={35}
            height={35} />
        <Box>
        <Text as="div" size="3" weight="bold" align="center">
            {bookmark.name}
        </Text>
        <Text as="div" size="2" color="gray" align="center">
            {bookmark.category}
        </Text>
        <Text as="div" size="1" color="gray" align="center">
            {bookmark.link.substring(0, 30) + (bookmark.link.length > 30 ? "..." : "")}
        </Text>
        </Box>
        <EditBookmarkButtons currentBookmark={bookmark} categories={categories} updateData={updateData}/>
    </Flex>
    </Card>
  )
}

export default BookmarkIconCard