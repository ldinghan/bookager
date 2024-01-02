"use client";

import React, { useEffect, useState } from 'react'
import { Card, Flex, Avatar, Box, Text } from '@radix-ui/themes'
import { useTheme } from 'next-themes';
import Image from 'next/image';

type BookmarkType = {
    isStarred: boolean;
    iconPath: string;
    id:string;
    name:string;
    link:string;
    category:string;
}

function BookmarkIconDisplay({ categories, bookmarks, updateData }: { categories:string[], bookmarks:BookmarkType[], updateData:Function }) {
	const [updatedCategories, setUpdatedCategories] = useState<string[]>(Array.from(categories));
    useEffect(() => {
        // Update the state when the categories prop changes
        categories.sort();
        setUpdatedCategories(categories);
    }, [categories]); 

	const theme = useTheme().theme;

	const handleHover = () => {

	}

	
	
	
	return (
		<div>
			{bookmarks.map(bookmark => 
			<div key={bookmark.id}>
				<Card style={{ maxWidth: 320 }}>
				<Flex gap="3" direction="column" align="center" justify="center">
					{bookmark.iconPath && <Image
								src={ bookmark.iconPath }
								alt='icon'
								width={35}
								height={35}
								className=''
					/>}
					<Box>
					<Text as="div" size="2" weight="bold" align="center">
						{bookmark.name}
					</Text>
					<Text as="div" size="1" color="gray" align="center">
						{bookmark.link.substring(0, 30) + (bookmark.link.length > 30 ? "..." : "")}
					</Text>
					</Box>
				</Flex>
				</Card>
			</div>
			)}
		</div>
	)
}

export default BookmarkIconDisplay