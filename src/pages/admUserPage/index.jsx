import { useContext, useEffect, useState } from "react"
import { Header } from "../../components/header"
import styles from "./styles.module.scss"
import { EditTaskModal } from "../../components/editTaskModal";
import { ModalContext } from "../../providers/ModalContext";

export const AdmPage = () => {

    useEffect(() => {
        console.log(taskModalIsOpen);

    }, [])




    const [newName, setNewname] = useState("");
    const [newDate, setNewDate] = useState(0);
    const [newTime, setNewTime] = useState("09:00");
    // const [taskId, setTaskId] = useState(1);
    const [description, setDescription] = useState("");
    const [currentTask, setCurrentTask] = useState(1);
    

    const { taskId } = useContext(ModalContext);
    const { setTaskId } = useContext(ModalContext);
    const { taskModalIsOpen } = useContext(ModalContext);
    const { setTaskModalIsOpen } = useContext(ModalContext);
    const { tasksList } = useContext(ModalContext);
    const { setTaskList } = useContext(ModalContext);

    const [editedName, setEditedName] = useState("");
    const [editedDescription, SetEditedDescription] = useState("");
    const [newEditedTime, setNewEditedTime] = useState("09:00");


    const { getTask } = useContext(ModalContext);
    const { setGetTask } = useContext(ModalContext);


    useEffect(() => {
        console.log("atualização da taskList");
        // console.log(currentTask);


    }, [tasksList])

    


    const editTask = (id) => {
        // console.log(taskModalIsOpen);
        setTaskModalIsOpen(true);
        setCurrentTask(id);
        setTaskId(id)
        // alert(currentTask);

        const pegarTaks = tasksList.filter(element => element.id === id);
        console.log(pegarTaks);
        
        setGetTask(pegarTaks)



    }





    const addNewSchedule = (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        const newSchedule = {
            name: newName,
            time: newTime,
            description: description,
            id: taskId
        };

        // Adicionando o novo agendamento à lista de tarefas
        setTaskList([...tasksList, newSchedule]);
        setTaskId(taskId + 1)
        console.log(newSchedule);
    };

    const removeSchedule = (id) => {
        const updatedTasksList = tasksList.filter(element => element.id !== id);

        if (updatedTasksList.length !== tasksList.length) {
            setTaskList(updatedTasksList);
            // Atualiza o estado com a nova lista sem o item removido
        } else {
            console.log("Erro ao remover da lista: item não encontrado");
        }
    };



    return (
        <section className={styles.main}>
            <Header />
            <div className={styles.agendamentoDiv}>
                <h1>Agendamentos</h1>
            </div>
            <div className={styles.addlist} >
                <form >
                    <label>
                        Nome
                        <input type="text"
                            id="nome" name="nome"
                            placeholder="Digite o nome aqui..."
                            onChange={(e) => setNewname(e.target.value)}
                        />
                    </label>

                    <label>
                        Data
                        <input
                            type="text"
                            placeholder="digite a data da consulta..."
                            name="data"
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Horário
                        <select name="horarios"
                            id="select"
                            onChange={(e) => setNewTime(e.target.value)}
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
                        <textarea name="description"
                            className={styles.textarea}
                            placeholder="Digite sua descrição aqui..."
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    <button onClick={addNewSchedule}>Agendar</button>
                </form>
            </div>
            <div className={styles.listContainer}>
                <ul>
                    {
                        tasksList.map(element =>
                            <li key={element.id}>
                                <div className={styles.liFirstDiv}>
                                    <h3>{`Nome: ${element.name}`}</h3>
                                    <span>{`Horário da Consulta ${element.time}`}</span>
                                    <p>{`Descrição: ${element.description}`}</p>
                                </div>

                                <div className={styles.liSecondDiv}>
                                    <button onClick={() => editTask(element.id)}>Editar</button>
                                    <button onClick={() => removeSchedule(element.id)}>Remover</button>
                                </div>
                            </li>
                        )
                    }

                </ul>
            </div>

        </section>
    )
}