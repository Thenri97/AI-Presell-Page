import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { ModalContext } from "../../providers/ModalContext";

export const EditTaskModal = ({ task, onClose, onSave, modalIsOpen }) => {

    // const [editedTask, setEditedTask] = useState({
    //     name:editedName,
    //     description:editedDescription,
    //     time:newEditedTime,

    // });

    const { taskModalIsOpen } = useContext(ModalContext);
    const { setTaskModalIsOpen } = useContext(ModalContext);

    const { editedName } = useContext(ModalContext);
    const { setEditedName } = useContext(ModalContext);
    const { editedDescription } = useContext(ModalContext);
    const { SetEditedDescription } = useContext(ModalContext);
    const { newEditedTime } = useContext(ModalContext);
    const { setNewEditedTime } = useContext(ModalContext);
    const { tasksList } = useContext(ModalContext);
    const { setTaskList } = useContext(ModalContext);

    const { getTask } = useContext(ModalContext);
    const { setGetTask } = useContext(ModalContext);

    const { taskId } = useContext(ModalContext);
    const { setTaskId } = useContext(ModalContext);

    useEffect(() => {
        console.log(tasksList);
        
    }, [tasksList])


  
    const substituirItem = (index, novoValor) => {
        // Criar uma cópia do array original
        const novoArray = [...tasksList];
        
        // Substituir o item no índice especificado
        novoArray.splice(index, 1, novoValor);
        
        // Atualizar o estado com o novo array
        setTaskList(novoArray);
      };

    // };
    const handleChange = (index) => {
        // Copia o objeto `getTask` para evitar modificar o original diretamente
        let editedTask = { 
            name: getTask[0].name,
            time: getTask[0].time,
            description:getTask[0].description,
            id:taskId
        };

        // Verifica se o valor de cada input foi alterado e atualiza apenas se houve mudança
        if (editedName !== "" && editedName !== getTask.name) {
            editedTask.name = editedName;
        }

        if (newEditedTime !== "" && newEditedTime !== getTask.time) {
            editedTask.time = newEditedTime;
        }

        if (editedDescription !== "" && editedDescription !== getTask.description) {
            editedTask.description = editedDescription;
        }

        substituirItem(taskId-1, editedTask)
        
       
        

        // Exibe o objeto editado
        console.log(editedTask);
    };





    return (
        <div className={`${styles.modal} ${taskModalIsOpen === true ? styles.openModal : styles.closeModal}`}>
            {/* Conteúdo do modal aqui */}

            <div className={styles.modalContent}>
                <div className={styles.headerDiv}>
                    <h1>Editar Tarefa</h1>
                    <span onClick={onClose}>X</span>
                </div>
                <label>
                    Nome
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => setEditedName(e.target.value)}
                        // value={getTask[0].name}
                    />
                </label>
                <label>
                    Horário
                    <select
                        name="time"
                        // value={getTask[0].time}
                        onChange={(e) => setNewEditedTime(e.target.value)}
                    >
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                    </select>
                </label>
                <label>
                    Descrição
                    <textarea
                        name="description"
                        // value={getTask[0].description}
                        onChange={(e) => SetEditedDescription(e.target.value)}
                    />
                </label>
                <div>
                    <button onClick={handleChange}>Salvar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

