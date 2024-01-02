"use client";

import React, { useState } from 'react'
import { Dialog, Text, Flex, Checkbox, Button, RadioGroup } from "@radix-ui/themes"


function ChangeViewDialog({ currentView, updateSelectedView }:{ currentView:string, updateSelectedView:Function } ) {
    const [selectedView, setSelectedView] = useState(currentView);

    const handleSelectView = () => {
        updateSelectedView(selectedView);
    }

    return (
    <Dialog.Root>
        <Dialog.Trigger>
            <Text>Change View
            </Text>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Change View</Dialog.Title>
            <Dialog.Description size="2" mb="4">
            Select view
            </Dialog.Description>

            <Flex direction="column" gap="3">
            <label>
            <Flex direction="column" gap="2">
            <RadioGroup.Root defaultValue={selectedView} onValueChange={(value) => setSelectedView(value)}>
                <Flex gap="2" direction="column">
                    <Text as="label" size="2">
                    <Flex gap="2">
                        <RadioGroup.Item value="list"/> List view
                    </Flex>
                    </Text>
                    <Text as="label" size="2">
                    <Flex gap="2">
                        <RadioGroup.Item value="icon"/> Icon view
                    </Flex>
                    </Text>
                </Flex>
            </RadioGroup.Root>
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
                <Button variant='solid' onClick={handleSelectView}>Save</Button>
            </Dialog.Close>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
  )
}

export default ChangeViewDialog