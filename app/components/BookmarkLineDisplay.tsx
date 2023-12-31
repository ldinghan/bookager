"use client";
import { Link, Table } from '@radix-ui/themes'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes';
import EditBookmarkButtons from './EditBookmarkButtons';
import Image from "next/image";
import classnames from 'classnames';
import DefaultIcon from "../../assets/DefaultIcon.png";

type BookmarkType = {
    isStarred: boolean;
    iconPath: string;
    id:string;
    name:string;
    link:string;
    category:string;
}

function BookmarkLineDisplay({ categories, bookmarks, updateData }: { categories:string[], bookmarks:BookmarkType[], updateData:Function }) {
    const [updatedCategories, setUpdatedCategories] = useState<string[]>(Array.from(categories));
    useEffect(() => {
        // Update the state when the categories prop changes
        categories.sort();
        setUpdatedCategories(categories);
    }, [categories]); 

    const theme = useTheme().theme;

    return (
        <>
            <Table.Root>
            <Table.Header className='text-center'>
                <Table.Row>
                <Table.ColumnHeaderCell>Icon</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>URL</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body className='text-center'>
                {bookmarks.map(bookmark => 
                    <Table.Row key={bookmark.id} className={classnames({
                        'hover:bg-fuchsia-100': theme === 'light',
                        'hover:bg-violet-700': theme === 'dark'
                    })} >
                        <Table.RowHeaderCell>
                        <div className='bg-white w-auto'><Image
                            src={ bookmark.iconPath ? bookmark.iconPath : DefaultIcon}
                            alt='icon'
                            width={24}
                            height={24}
                            className='mx-auto'
                        /></div></Table.RowHeaderCell>
                        <Table.Cell>{bookmark.name}</Table.Cell>
                        <Table.Cell><Link href={bookmark.link} target='_blank' tabIndex={-1} >{bookmark.link}</Link></Table.Cell>
                        <Table.Cell>{bookmark.category}</Table.Cell>
                        <Table.Cell><EditBookmarkButtons currentBookmark={bookmark} updateData={updateData} categories={updatedCategories}/></Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
            </Table.Root>
        </>
    )
}

export default BookmarkLineDisplay