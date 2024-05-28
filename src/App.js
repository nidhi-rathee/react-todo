import React, { useState } from 'react';
import { Box, Input, Button, Heading, IconButton,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview, } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'

function App() {
  const [items, setItems] = useState([{
    id: 1,
    title: 'Item 1',
    description: 'Description for first item',
    createdAt: new Date().toISOString(),
    updatedAt: null,
    status: 'active'
  }]);
  const [inputItem, setInputItem] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()


  function addItem() {
    if(inputItem === '') return
    const newItem = {
      id: Math.floor(Math.random() * 100000) + 1,
      title: inputItem,
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: null,
      status: 'active'
    }
    const clone = [...items]
    clone.push(newItem)
    setItems(clone)
    setInputItem('')
  }

  function openModal() {
    onOpen();
  }

  function saveDetail(item) {
    console.log('save', item);
    onClose();
  }

  function deleteItem(id) {
    setItems(items.filter((item) => { 
      return item.id !== id
    }))

  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Heading>Todo list app</Heading>

      <Box mt={10} w='50%' display='flex'>
        <Input type="text" placeholder="Add an item" value={inputItem} onChange={(e) => setInputItem(e.target.value)} />
        <IconButton colorScheme='blue'
          aria-label='Add item'
          icon={<AddIcon />}
          size='lg'
          onClick={addItem}>
        </IconButton>
      </Box>

      <Box mt={10} w='50%' display='flex' flexDirection='column'>
        {items.map((item) => (
          <Box display='flex' mt={2} justifyContent='space-between' key={item.id}>
            <Box contentEditable={true}> {item.title}</Box>
            <Box>
              <IconButton size='sm'
                aria-label='Edit item'
                icon={<EditIcon />}
                onClick={() => openModal(item)}>
              </IconButton>
            
              <IconButton colorScheme='red' size='sm'
                aria-label='Delete item'
                icon={<DeleteIcon />}
                onClick={() => deleteItem(item.id)} >
              </IconButton>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{item.title}</ModalHeader>
              <ModalCloseButton />
            <ModalBody>
            <Editable defaultValue={item.description}>
              <EditablePreview />
              <EditableTextarea />
            </Editable>
              
            </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={()=> saveDetail(item)}>
                  Save
                </Button>
                <Button variant='ghost' onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
        </Modal>
          </Box>
        ))}
      </Box>
    
      
    </Box>
  );
}

export default App;
