import { Dialog, Button, Text, Flex } from '@radix-ui/themes'
import React from 'react'

function NotLoggedInAlert() {
  return (
        <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Description size="2" mb="4">
            Action not allowed.
            </Dialog.Description>

            <Flex direction="column" gap="3">
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                You need to be logged in to perform this action.
                </Text>
            </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
                <Button>Close</Button>
            </Dialog.Close>
            </Flex>
        </Dialog.Content>   
  )
}

export default NotLoggedInAlert