"use client";

import { GearIcon } from '@radix-ui/react-icons'
import { Button, DropdownMenu } from "@radix-ui/themes"
import React, { useEffect, useState } from 'react'
import DeleteCategoryDialog from './DeleteCategoryDialog'
import ChangeViewDialog from './ChangeViewDialog';

function SettingsComponent( { categories, updateData, updateSelectedView, currentView } : { categories:string[], updateData:Function, updateSelectedView:Function, currentView:string }) {
	const [updatedCategories, setUpdatedCategories] = useState(categories);
	useEffect(() => {
        // Update the state when the categories prop changes
        categories.sort();
        setUpdatedCategories(categories);
    }, [categories]); 
  return (
    <div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button><GearIcon width="16" height="16" />Settings</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
					<ChangeViewDialog currentView={currentView} updateSelectedView={updateSelectedView} />
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onSelect={(e) => e.preventDefault()}><DeleteCategoryDialog categories={updatedCategories} updateData={updateData} /></DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
      	
    </div>
  )
}

export default SettingsComponent