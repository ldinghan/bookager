"use client";
import { Link, Table } from '@radix-ui/themes'
import React, { useState, useEffect } from 'react'
import EditBookmarkButtons from './EditBookmarkButtons';

type BookmarkType = {
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

    return (
        <>
            <Table.Root>
            <Table.Header className='text-center'>
                <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>URL</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body className='text-center'>
                {bookmarks.map(bookmark => 
                    <Table.Row key={bookmark.id} className='hover:bg-fuchsia-50'>
                        <Table.RowHeaderCell>{bookmark.name}</Table.RowHeaderCell>
                        <Table.Cell><Link href={bookmark.link} target='_blank'>{bookmark.link}</Link></Table.Cell>
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