"use client";

import React, { useEffect, useState } from 'react'
import { Button, AlertDialog, Flex, IconButton } from '@radix-ui/themes'
import { Pencil2Icon, StarFilledIcon, StarIcon, TrashIcon } from '@radix-ui/react-icons'
import { doc, deleteDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import AddBookmarkComponent from './AddBookmarkComponent';

type BookmarkType = {
	isStarred: boolean;
	iconPath: string;
	id: string;
	name: string;
	link: string;
	category: string;
}

function EditBookmarkButtons({ currentBookmark, updateData, categories }: { currentBookmark:BookmarkType, updateData:Function, categories:string[] }) {

	// HANDLES DELETE
	const handleDelete = async () => {
		if (auth.currentUser) {
			await deleteDoc(doc(db, `users/${auth.currentUser.uid}/bookmarks`, currentBookmark.id));
			updateData();
		} else {
			// NOT LOGGED IN 
		}
	}

	// UPDATES THE CATEGORIES
	const [updatedCategories, setUpdatedCategories] = useState<string[]>(Array.from(categories));
    useEffect(() => {
        // Update the state when the categories prop changes
        categories.sort();
        setUpdatedCategories(categories);
    }, [categories]);


	// TOGGLES STARRED BOOKMARK
	const [isStarred, setIsStarred] = useState(currentBookmark.isStarred);
	const handleStarred = async () => {
		let starred = isStarred;
		starred = !starred;
		setIsStarred(star => !star);
		updateData();
		try {
            if (auth.currentUser) {
                await setDoc(doc(db, `users/${auth.currentUser.uid}/bookmarks`, currentBookmark!.id), {
                    bookmarkIsStarred: starred, 
					bookmarkIconPath: currentBookmark.iconPath,
                    bookmarkName: currentBookmark.name,
                    bookmarkURL: currentBookmark.link,
                    bookmarkCategory: currentBookmark.category
              });
              updateData();
            }
        } catch (e) {
            console.error("Error editing document: ", e);
        }
	}



	return (
		<div className='flex items-center justify-end'>
			<IconButton color='gold' variant='solid' onClick={handleStarred}>
				{isStarred 
					? <StarFilledIcon width="16" height="16" color="yellow" />
					: <StarIcon width="16" height="16" color='yellow' />
				}
			</IconButton>
			<AddBookmarkComponent categories={updatedCategories} updateData={updateData} currentBookmark={currentBookmark} isEdit>
				<Button variant='soft'>
					<Pencil2Icon width="16" height="16"/>Edit
				</Button>
			</AddBookmarkComponent>
			<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color="red" variant="soft"><TrashIcon width="16" height="16"/>Delete</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content style={{ maxWidth: 450 }}>
				<AlertDialog.Title>Delete Bookmark</AlertDialog.Title>
				<AlertDialog.Description size="2">
				Are you sure? This bookmark cannot be retrieved once deleted.
				</AlertDialog.Description>

				<Flex gap="3" mt="4" justify="end">
				<AlertDialog.Cancel>
					<Button variant="soft" color="gray">
					Cancel
					</Button>
				</AlertDialog.Cancel>
				<AlertDialog.Action>
					<Button variant="solid" color="red" onClick={handleDelete}>
					Delete
					</Button>
				</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	)
}

export default EditBookmarkButtons