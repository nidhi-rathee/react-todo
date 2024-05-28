import React, { useState } from "react";
import { Box, Input, Heading, IconButton } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import EditModal from "./edit-modal";

function Todo() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Item 1",
      description: "Description for first item",
      createdAt: new Date().toISOString(),
      updatedAt: null,
      status: "active",
    },
  ]);
  const [activeItem, setActiveItem] = useState(null);
  const [inputItem, setInputItem] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  function addItem() {
    if (inputItem === "") return;
    const newItem = {
      id: Math.floor(Math.random() * 100000) + 1,
      title: inputItem,
      description: "description",
      createdAt: new Date().toISOString(),
      updatedAt: null,
      status: "active",
    };
    const clone = [...items];
    clone.push(newItem);
    setItems(clone);
    setInputItem("");
  }

  function openModal(item) {
    setActiveItem({ ...item });
    onOpen();
  }

  function saveDetail(item) {
    console.log("save", item);
    const index = items.findIndex((i) => i.id === item.id);
    const itemsClone = [...items];
    itemsClone[index] = item;
    console.log("updated items", items);

    setItems(itemsClone);
    onClose();
  }

  function deleteItem(id) {
    setItems(
      items.filter((item) => {
        return item.id !== id;
      })
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Heading>Todo list app</Heading>

      <Box mt={10} w="50%" display="flex">
        <Input
          type="text"
          placeholder="Add an item"
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Add item"
          icon={<AddIcon />}
          size="lg"
          onClick={addItem}
        ></IconButton>
      </Box>

      <Box mt={10} w="50%" display="flex" flexDirection="column">
        {items.map((item) => (
          <Box
            display="flex"
            mt={2}
            justifyContent="space-between"
            key={item.id}
          >
            <Box> {item.title}</Box>
            <Box>
              <IconButton
                size="sm"
                aria-label="Edit item"
                icon={<EditIcon />}
                onClick={() => openModal(item)}
              ></IconButton>

              <IconButton
                colorScheme="red"
                size="sm"
                aria-label="Delete item"
                icon={<DeleteIcon />}
                onClick={() => deleteItem(item.id)}
              ></IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      {isOpen && (
        <EditModal
          isOpen={isOpen}
          onClose={onClose}
          activeItem={activeItem}
          saveDetail={saveDetail}
        />
      )}
    </Box>
  );
}

export default Todo;
