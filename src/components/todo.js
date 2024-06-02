import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  Box,
  Input,
  Heading,
  IconButton,
  useToast,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import EditModal from "./edit-modal";
import DeleteDialog from "../delete-dialog";

//  To get data from local storage

const getItemsFromLocalStorage = () => {
  let todoItems = localStorage.getItem("todo items");

  if (todoItems) {
    return JSON.parse(localStorage.getItem("todo items"));
  } else return [];
};

function Todo() {
  const [items, setItems] = useState(getItemsFromLocalStorage());
  const [activeItem, setActiveItem] = useState(null);
  const [inputItem, setInputItem] = useState("");
  const {
    isOpen: isEditModelOpen,
    onOpen: OnEditModelOpen,
    onClose: onEditModelClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const toast = useToast();

  const {
    isOpen: isActionMenuOpen,
    onOpen: onActionMenuOpen,
    onClose: onActionMenuClose,
  } = useDisclosure();

  // add data to local storage
  useEffect(() => {
    localStorage.setItem("todo items", JSON.stringify(items));
  }, [items]);

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
    toast({
      title: `${inputItem} added`,
      description: "Your item has been added",
      position: "top-right",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setInputItem("");
  }

  function openModal(item) {
    setActiveItem({ ...item });
    OnEditModelOpen();
  }

  function saveDetail(item) {
    const index = items.findIndex((i) => i.id === item.id);
    const itemsClone = [...items];
    itemsClone[index] = item;

    toast({
      title: `${item.title} updated`,
      description: "Your item has been updated",
      position: "top-right",
      status: "success",
      duration: 500,
      isClosable: true,
    });
    setItems(itemsClone);
    onEditModelClose();
  }

  function deleteItem(id) {
    setItems(
      items.filter((item) => {
        return item.id !== id;
      })
    );
    toast({
      title: `${activeItem.id} deleted`,
      description: "Your item has been deleted",
      position: "top-right",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  function markComplete(id) {
    const index = items.findIndex((itemIndex) => itemIndex.id === id);
    const updatedItems = [...items];
    updatedItems[index].status = "inactive";
    setItems(updatedItems);
  }

  function selectTodo(id) {
    const index = items.findIndex((itemIndex) => itemIndex.id === id);
    const updatedItems = [...items];
    updatedItems[index].status = updatedItems[index].status === "active";
    setItems(updatedItems);
  }

  function getDueIn(createdDate) {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const createdTime = new Date(createdDate).getTime();
    const currentTime = new Date().getTime();
    const differenceInDays = Math.floor(
      (currentTime - createdTime) / oneDayInMilliseconds
    );

    if (differenceInDays === 0) {
      return "Due today";
    } else if (differenceInDays === 1) {
      return "Due tomorrow";
    } else {
      return `Due in ${differenceInDays} days`;
    }
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Heading className="heading">Todo list app</Heading>

      <Box mt={10} w="50%" display="flex">
        <Input
          type="text"
          placeholder="Add new task"
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
            p={2}
            justifyContent="space-between"
            alignItems="center"
            borderRadius="md"
            boxShadow="lg"
            key={item.id}
            textDecoration={
              item.status === "inactive" ? "line-through" : "none"
            }
          >
            <Checkbox
              type="checkbox"
              colorScheme="green"
              checked={item.status === "inactive"}
              onChange={() => selectTodo(item.id)}
            />
            <Box
              textTransform="capitalize"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              <Box>
                {item.title}
                <Badge>
                  <CalendarIcon mr={2} />
                  <span>{formatDate(item.createdAt)}</span>
                </Badge>
              </Box>
            </Box>
            <Box>
              <Button
                size="md"
                aria-label="complete"
                onClick={() => markComplete(item.id)}
              >
                complete
              </Button>
              <IconButton
                size="sm"
                m={4}
                aria-label="Edit item"
                icon={<EditIcon />}
                onClick={() => openModal(item)}
              ></IconButton>

              <IconButton
                colorScheme="red"
                size="sm"
                aria-label="Delete item"
                icon={<DeleteIcon />}
                onClick={() => {
                  setActiveItem(item);
                  onDeleteModalOpen();
                }}
              ></IconButton>
            </Box>
            <Box>
              <span>{getDueIn(item.createdAt)}</span>
            </Box>
            <IconButton
              size="sm"
              aria-label="Actions on item"
              icon={<FaEllipsisH />}
              onClick={() => {
                setActiveItem(item);
                onActionMenuOpen();
              }}
            ></IconButton>
          </Box>
        ))}
      </Box>
      {/* Edit modal */}
      {isEditModelOpen && (
        <EditModal
          isOpen={isEditModelOpen}
          onClose={onEditModelClose}
          activeItem={activeItem}
          saveDetail={saveDetail}
        />
      )}
      {/* Alert dialog for deletion */}
      <DeleteDialog
        isOpen={isDeleteModalOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteModalClose}
        activeItem={activeItem}
        deleteItem={deleteItem}
        cancelRef={cancelRef}
      />

      {/* Actions menu */}
      {isActionMenuOpen && (
        <Menu>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Mark as Complete</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
}

export default Todo;
