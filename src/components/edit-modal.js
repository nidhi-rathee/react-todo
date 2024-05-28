import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

function EditModal(props) {
  const { activeItem, isOpen, onClose, saveDetail } = props;
  const [item, setItem] = useState(activeItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            name="title"
            value={item.title}
            onChange={handleChange}
          ></Input>
          <Textarea
            value={item.description}
            name="description"
            onChange={handleChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => saveDetail(item)}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
