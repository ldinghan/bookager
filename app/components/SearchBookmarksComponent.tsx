"use client";

import { TextField } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type BookmarkType = {
    isStarred: boolean;
    iconPath: string;
	id: string;
	name: string;
	link: string;
	category: string;
}

function SearchBookmarksComponent({ bookmarks, updateDisplayedBookmarks }:{ bookmarks:BookmarkType[], updateDisplayedBookmarks:Function }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkType[]>([])

    const handleSearch = (query:string) => {
        setSearchQuery(query);
        // Update the displayed bookmarks based on the search query
        const filtered = bookmarks.filter((bookmark) =>
            bookmark.name.toLowerCase().includes(query.toLowerCase())
        );
        const sortedBookmarks = filtered.sort((a, b) => {
            const aStartsWithQuery = a.name.toLowerCase().startsWith(query.toLowerCase());
            const bStartsWithQuery = b.name.toLowerCase().startsWith(query.toLowerCase());
    
            if (aStartsWithQuery && !bStartsWithQuery) {
                return -1; // a comes first
            } else if (!aStartsWithQuery && bStartsWithQuery) {
                return 1; // b comes first
            } else {
                return 0; // no change in order
            }
        });
    
        // Update the displayed bookmarks
        setFilteredBookmarks(sortedBookmarks);
        updateDisplayedBookmarks(filteredBookmarks);
    };


    useEffect(() => {
        // Update the displayed bookmarks when filteredBookmarks changes
        updateDisplayedBookmarks(filteredBookmarks);
    }, [filteredBookmarks, updateDisplayedBookmarks]);


    const handleOpenBookmark = () => {
        window.open(filteredBookmarks[0].link);
    }

    const handleKeyPress = (e:any) => {
        if (e.key == "Enter") {
            handleOpenBookmark();
        }
    }


    return (
        <TextField.Root className='mt-2'>
            <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Search for bookmark" 
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={e => handleKeyPress(e)}/>
        </TextField.Root>
    )
}

export default SearchBookmarksComponent