'use client';

import React, { useState, useEffect } from 'react'
import { Dialog, Button, Flex, Text, TextField, Select } from '@radix-ui/themes'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import { auth, db, storage } from '../../firebase'
import { PlusIcon } from '@radix-ui/react-icons'

type BookmarkType = {
    isStarred: boolean;
    iconPath: string;
	id: string;
	name: string;
	link: string;
	category: string;
}

function AddBookmarkComponent({ categories, updateData, children, currentBookmark, isEdit }:{ categories:string[], updateData:Function, children:React.ReactNode, currentBookmark?:BookmarkType, isEdit?:boolean }) {


    // HANDLES CATEGORIES
    const [updatedCategories, setUpdatedCategories] = useState<string[]>(Array.from(categories));
    const [newCategory, setNewCategory] = useState("");

    const handleNewCategorySave = async () => {
		const cleanedNewCategory = newCategory.charAt(0).toUpperCase() + newCategory.slice(1).trim();
		if (cleanedNewCategory.trim() === "") {
			// NO EMPTY CATEGORY
			return;
		}
        if (!updatedCategories.includes(cleanedNewCategory)) {
            const updatedCategoriesSorted = [...updatedCategories, cleanedNewCategory];
			updatedCategoriesSorted.sort();
			setUpdatedCategories(updatedCategoriesSorted);
            try {
                await addDoc(collection(db, `users/${auth.currentUser?.uid}/categories`), {
                    category: cleanedNewCategory
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };
    useEffect(() => {
        // Update the state when the categories prop changes
        categories.sort();
        setUpdatedCategories(categories);
    }, [categories]); 




    // HANDLES ADDING OF BOOKMARKS
    const [bookmarkIsStarred, setBookmarkIsStarred] = useState(currentBookmark ? currentBookmark.isStarred : false);
    const [bookmarkIconPath, setBookmarkIconPath] = useState(currentBookmark ? currentBookmark.iconPath : "");
    const [bookmarkName, setBookmarkName] = useState(currentBookmark ? currentBookmark.name : "");
    const [bookmarkURL, setBookmarkURL] = useState(currentBookmark ? currentBookmark.link : "");
    const [bookmarkCategory, setBookmarkCategory] = useState(currentBookmark ? currentBookmark.category : updatedCategories[0]);
    
    const handleAddBookmark = async () => {
        if (bookmarkName.trim() === "" || bookmarkURL.trim() === "") {
            // DISPLAY ERROR MESSAGE - NO EMPTY NAME / URL
			return;
        }
        try {
            if (auth.currentUser) {
                let imageUrl = "";
                if (file) {
                    const storageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);
                    await uploadBytes(storageRef, file);
                    const snapshot = await getDownloadURL(storageRef);
                    imageUrl = snapshot;
                    setBookmarkIconPath(imageUrl);
                }
                await addDoc(collection(db, `users/${auth.currentUser.uid}/bookmarks`), {
                    bookmarkIsStarred,
                    bookmarkIconPath: imageUrl,
                    bookmarkName,
                    bookmarkURL,
                    bookmarkCategory
                });
                updateData();
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    // HANDLES EDITING OF BOOKMAKRS
    const handleEditBookmark = async () => {
        if (bookmarkName.trim() === "" || bookmarkURL.trim() === "") {
            // DISPLAY ERROR MESSAGE - NO EMPTY NAME / URL
			return;
        }
        try {
            if (auth.currentUser) {
                let imageUrl = "";
                if (file) {
                    const storageRef = ref(storage, `${auth.currentUser.uid}/${file.name}`);
                    await uploadBytes(storageRef, file);
                    const snapshot = await getDownloadURL(storageRef);
                    imageUrl = snapshot;
                    setBookmarkIconPath(imageUrl);
                }
                await setDoc(doc(db, `users/${auth.currentUser.uid}/bookmarks`, currentBookmark!.id), {
                    bookmarkIsStarred, 
                    bookmarkIconPath: imageUrl,
                    bookmarkName,
                    bookmarkURL,
                    bookmarkCategory
              });
              updateData();
            }
        } catch (e) {
            console.error("Error editing document: ", e);
        }
    }


    // HANDLES FILE UPLOAD
    const [file, setFile] = useState<File | undefined>(undefined);
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setFile(e.target.files[0]);
    }



    // CLEARS ALL STATES UPON CANCELLATION
    const handleCancelEvent = () => {
        //setFile(currentBookmark ? undefined : undefined);
        setBookmarkIsStarred(currentBookmark ? currentBookmark.isStarred : false);
        setBookmarkIconPath(currentBookmark ? currentBookmark.iconPath : "");
        setBookmarkName(currentBookmark ? currentBookmark.name : "");
        setBookmarkURL(currentBookmark ? currentBookmark.link : "");
        setBookmarkCategory(currentBookmark ? currentBookmark.category : "");
    }


    return (
        <>
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Add Bookmark</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                Add a bookmark to your list.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Name
                    </Text>
                    <TextField.Input
                    placeholder="Enter bookmark name"
                    defaultValue={currentBookmark ? currentBookmark.name : ""}
                    onChange={e => setBookmarkName(e.target.value)}
                    />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    URL
                    </Text>
                    <TextField.Input
                    placeholder="Enter URL"
                    defaultValue={currentBookmark ? currentBookmark.link : ""}
                    onChange={e => setBookmarkURL(e.target.value)}
                    />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Category
                    </Text>
                    <Select.Root defaultValue={currentBookmark ? currentBookmark.category : updatedCategories[0]} onValueChange={value => setBookmarkCategory(value)}>
                    <Select.Trigger/>
                        <Select.Content>
                            <Select.Group>
                                {updatedCategories.map(category => 
                                    <Select.Item key={category} value={category}>{category}</Select.Item>    
                                )}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>

                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button variant='surface'>
                                    <PlusIcon width="16" height="16" />Add Category
                                </Button>
                            
                        </Dialog.Trigger>
                        <Dialog.Content style={{ maxWidth: 450 }}>
                            <Dialog.Title>Add Category</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                            Add a new category.
                            </Dialog.Description>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                Category
                                </Text>
                                <TextField.Input
                                placeholder="Category"
                                onChange={e => setNewCategory(e.target.value)}
                                />
                            </label>
                            <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                Cancel
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button onClick={handleNewCategorySave}>Save</Button>
                            </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Image (optional)
                    </Text>
                    <input type='file' onChange={handleFileUpload}/>
                    
                </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button onClick={handleCancelEvent} variant="soft" color="gray">
                    Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button onClick={() => isEdit ? handleEditBookmark() : handleAddBookmark()}>Save</Button>
                </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
        </>
    )
}

export default AddBookmarkComponent