"use client";

import React, { useState, useEffect } from 'react'
import { Dialog, Button, Flex, Text, Checkbox } from '@radix-ui/themes'
import { auth, db } from "../../firebase"
import { deleteDoc, collection, doc, getDocs } from "firebase/firestore"

function DeleteCategoryDialog({ categories, updateData } : { categories:string[], updateData:Function }) {

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [updatedCategories, setUpdatedCategories] = useState(categories);
	const handleCheckboxChange = (category: string) => {
		setSelectedCategories((prevSelectedCategories) => {
		  if (prevSelectedCategories.includes(category)) {
			// Category was checked, remove it from the list
			return prevSelectedCategories.filter((c) => c !== category);
		  } else {
			// Category was unchecked, add it to the list
			return [...prevSelectedCategories, category];
		  }
		});
	};

	useEffect(() => {
        // Update the state when the categories prop changes
        categories.sort();
        setUpdatedCategories(categories);
    }, [categories]); 
	
	const handleDeleteCategory = async () => {
		if (auth.currentUser) {
			const uid = auth.currentUser.uid;
			const querySnapshot = await getDocs(collection(db, `users/${uid}/categories`));
			querySnapshot.forEach(async (document) => {
				if (selectedCategories.includes(document.data().category)) {
					await deleteDoc(doc(db, `users/${uid}/categories/${document.id}`));
					setSelectedCategories(prev => prev.filter(c => c === document.data().category));
				}
			});
			updateData();
		} else {
			// NOT LOGGED IN 
		}
	}

  	return (
    	<>
			<Dialog.Root>
			<Dialog.Trigger>
				<Text>Delete Categories</Text>
			</Dialog.Trigger>

			<Dialog.Content style={{ maxWidth: 450 }}>
				<Dialog.Title>Delete Categories</Dialog.Title>
				<Dialog.Description size="2" mb="4">
				Select categories to be deleted
				</Dialog.Description>

				<Flex direction="column" gap="3">
				<label>
				<Flex direction="column" gap="2">
					{updatedCategories.map(category => 
						<Text as="label" key={category} size="2">
							<Flex gap="2">
							<Checkbox checked={selectedCategories.includes(category)} onCheckedChange={() => handleCheckboxChange(category)} />{category}
							</Flex>
						</Text>
					)}
				</Flex>
				</label>
				</Flex>

				<Flex gap="3" mt="4" justify="end">
				<Dialog.Close>
					<Button variant="soft" color="gray">
					Cancel
					</Button>
				</Dialog.Close>
				<Dialog.Close>
					<Button onClick={handleDeleteCategory} color='red' variant='soft'>Delete</Button>
				</Dialog.Close>
				</Flex>
			</Dialog.Content>
			</Dialog.Root>
		</>
	)
}

export default DeleteCategoryDialog