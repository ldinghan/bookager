"use client";

import React, { useEffect, useState } from 'react'
import { sampleBookmarks, sampleCategories } from '../../sampleData'
import AddBookmarkComponent from '../components/AddBookmarkComponent'
import BookmarkLineDisplay from '../components/BookmarkLineDisplay'
import { auth, db } from "../../firebase"
import { getDocs, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { BookmarkIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import WebBrowsing from '../components/WebBrowsing';

type BookmarkType = {
	id: string;
	name: string;
	link: string;
	category: string;
}

function Dashboard() {

    const [bookmarks, setBookmarks] = useState(sampleBookmarks);
    const [categories, setCategories] = useState<string[]>(sampleCategories);

	const retrieveBookmarks = async () => {
		const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser?.uid}/bookmarks`));
		const updatedBookmarks:BookmarkType[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			updatedBookmarks.push({id: doc.id, name:data.bookmarkName, link:data.bookmarkURL, category:data.bookmarkCategory})
		});
		setBookmarks(updatedBookmarks);
	}

	const retrieveCategories = async () => {
		const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser?.uid}/categories`));
		const updatedCategories:string[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			updatedCategories.push(data.category);
		})
		setCategories(updatedCategories);
	}

	const updateData = async () => {
		retrieveBookmarks();
		retrieveCategories();
	}

	useEffect(() => {
		if (auth.currentUser) {
			updateData();
		}
		onAuthStateChanged(auth, (user) => {
			if (user) {
			  // User is signed in, see docs for a list of available properties
			  // https://firebase.google.com/docs/reference/js/auth.user
			  const uid = user.uid;
			  updateData();
			} else {
				setBookmarks(sampleBookmarks);
				setCategories(sampleCategories);
			}
		  });
	}, [])

    return (
		<div className='w-full'>
			<div className='flex justify-center'>
				<div className='w-min-1/2'>
					<WebBrowsing />
				</div>
			</div>
			<div>
				<div className='py-2'>
					<AddBookmarkComponent categories={categories} updateData={updateData}><Button><BookmarkIcon width="16" height="16" />Add Bookmark</Button></AddBookmarkComponent>
				</div>
			</div>
			<BookmarkLineDisplay categories={categories} bookmarks={bookmarks} updateData={updateData}/>
		</div>
    )
}

export default Dashboard