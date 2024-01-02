"use client";

import React, { useEffect, useState } from 'react'
import { Grid } from '@radix-ui/themes'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import BookmarkIconCard from './BookmarkIconCard';

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

	
	
	
	
	return (
		<Grid columns="5" gap="4" width="auto" justify="center" align="center">
			{bookmarks.map(bookmark => 
			<div key={bookmark.id}>
				<BookmarkIconCard bookmark={bookmark} categories={updatedCategories} updateData={updateData} />
			</div>
			)}
		</Grid>
	)
}

export default BookmarkIconDisplay