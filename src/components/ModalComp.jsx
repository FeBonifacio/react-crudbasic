/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { useState } from 'react';

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {

    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [idade, setIdade] = useState(dataEdit.idade || "");
    const [cargo, setCargo] = useState(dataEdit.cargo || "");

    const handleSave = () => {
        if (!name || !email || !idade || !cargo) return;

        if (emailAlreadyExistis()) {
            return alert("Email já em uso!")
        }

        // verificar se é edição
        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email, idade, cargo }; 
        }

        //Novos item
        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, email, idade, cargo }]
            : [...(data ? data : [])];

            localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

            setData(newDataArray);

            onClose();
        };

    const emailAlreadyExistis = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }

        return false;
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay> {/* vai escurecer ao redor */}
                    <ModalContent>
                        <ModalHeader>Cadastro</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl> {/* div */}
                                <FormControl display="flex" flexDir="column" gap={4}>
                                    <Box>
                                        <FormLabel>Nome</FormLabel>
                                        <Input
                                            type="text"
                                            value={name}
                                            returnValue={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="text"
                                            value={email}
                                            returnValue={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel>Idade</FormLabel>
                                        <Input
                                            type="number"
                                            value={idade}
                                            returnValue={idade}
                                            onChange={(e) => setIdade(e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel>Cargo</FormLabel>
                                        <Input
                                            type="text"
                                            value={cargo}
                                            returnValue={cargo}
                                            onChange={(e) => setCargo(e.target.value)}
                                        />
                                    </Box>
                                </FormControl>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter justifyContent="start">
                            <Button colorScheme="blue" mr={3} onClick={handleSave}>
                                Cadastrar
                            </Button>
                            <Button colorScheme="red" onClick={onClose}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export default ModalComp