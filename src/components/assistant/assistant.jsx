import { React, useRef, useEffect, useContext } from 'react';
import OpenAI from "openai";
import { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import styles from "./styles.module.scss"
import { Conversation } from "./conversation/conversation";
import { UserCv } from "./userConversation";
import { Logger } from 'sass';
import { Link } from 'react-scroll';
import { Typing } from './typingCard/typing';
import { ModalContext } from '../../providers/ModalContext';
import { BiSolidSend } from "react-icons/bi";
import { event } from 'jquery';
import sound from "../../assets/mixkit-dry-pop-up-notification-alert-2356.wav"
// import { json } from 'stream/consumers';

export const Assistant = () => {


    const openai = new OpenAI({

        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,// Habilita o uso da API em um navegador
    });

    useEffect(() => {

        const linha = localStorage.getItem('emptyThread');
        const linhaConvertida = JSON.parse(linha);

        if (!linhaConvertida) {

            const startThread = async () => {
                const emptyThread = await openai.beta.threads.create();
                // Armazenar emptyThread no localStorage
                localStorage.setItem('emptyThread', JSON.stringify(emptyThread));

            }
            startThread();
        }

        let emptyThread = localStorage.getItem('emptyThread');

        emptyThread ? localStorage.removeItem("emptyThread") : null


    }, []
    )


    const [contador, setContador] = useState(0);
    const [contadorDois, setContadorDois] = useState(0);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);



    const findeAssistant = async () => {

        const assistants = await openai.beta.assistants.list();
        return assistants
    }

    // findeAssistant()

    //  OBJETO QUE VAI DEFINIR SE A MENSAGEM É DO USUÁRIO OU DO CHATBOT 
    function handleSubmit(e) {
        if (input === "") {
            alert("Digite sua mensagem!")
        }
        e.preventDefault();
        console.log('Você clicou em enviar.');

        // Adiciona a mensagem do usuário à lista
        messageList.push({ text: input, isUser: true });
        localStorage.setItem('messageList', JSON.stringify(messageList));
        // Incrementa o contador
        setContadorDois(contadorDois + 1);
        console.log(contadorDois);
        // Define o estado para mostrar o componente
        setShowComponent(true);
        // Reseta o valor do input
        formRef.current.reset();

        // Chama a função principal para lidar com a lógica principal
        main();
        setInput("");
        console.log(input); // Se necessário
        console.log(messageList); // Se necessário
    }

    const [input, setInput] = useState("")

    function handleChange(e) {
        setInput(e.target.value);
        // setIsTyping(input.length)
        // alert(isTyping)
    }

    const { chosenName } = useContext(ModalContext);

    const [message, setMessage] = useState("")

    // const [messageList, setMessageList] = useState([{ text: `Olá! Antes de começarmos, poderia fornecer seu nome completo, número de telefone e, se possível, seu email? Isso nos ajudará a garantir um atendimento mais eficiente. Obrigado!`, isUser: false }])
    // console.log(messageList);


    const [renderCv, setRenderCv] = useState(false)

    const formRef = useRef(null);
    const scrollRef = useRef(null);

    // console.log('API Key:', env.VITE_PENAI_API_KEY);


    useEffect(() => {
        // código a ser executado quando o array messageList for alterado
        if (contador > 0) {

            // alert("Olá, eu sou o assistente virtual da Fast Food, como posso te ajudar?")
            console.log("Ocorreu uma atualização no contador");

            const list = listRef.current;
            const lastListItem = list.lastChild;
            lastListItem.scrollIntoView({ behavior: 'smooth' });
        }


    }, [contador]);

    const listRef = useRef(null);

    useEffect(() => {
        // código a ser executado quando o array messageList for alterado
        if (contadorDois > 0) {

            // alert("Olá, eu sou o assistente virtual da Fast Food, como posso te ajudar?")
            console.log("Ocorreu uma atualização no contador 2");

            const list = listRef.current;
            const lastListItem = list.lastChild;
            lastListItem.scrollIntoView({ behavior: 'smooth' });
        }


    }, [contadorDois]);

    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (showComponent === true) {

                messageList.push({ text: "Digitando...", typing: true });
                localStorage.setItem('messageList', JSON.stringify(messageList));
                console.log(messageList);
                setCvUpdadet(true)
                const list = listRef.current;
                const lastListItem = list.lastChild;
                lastListItem.scrollIntoView({ behavior: 'smooth' });
            }
        }, 3000);

    }, [showComponent]);

    const [cvUpdadet, setCvUpdadet] = useState(false);

    useEffect(() => {

        if (cvUpdadet === true) {
            const list = listRef.current;
            const lastListItem = list.lastChild;
            lastListItem.scrollIntoView({ behavior: 'smooth' });
        }
    }, [cvUpdadet]);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) {
            // Logic to fetch initial messages or perform any other actions when modal shows up
            findeAssistant()
        }
    }, [showModal]);

    const main = async () => {

        const myAssistant = await openai.beta.assistants.retrieve("asst_wajpn9zegEDhgHgtMs9yhmg3")




        // const emptyThread = await openai.beta.threads.create();

        let emptyThread = localStorage.getItem('emptyThread');

        emptyThread = emptyThread ? JSON.parse(emptyThread) : null;


        if (!emptyThread) {
            await startThread();
            emptyThread = JSON.parse(localStorage.getItem('emptyThread'));
        }

        const threadMessages = await openai.beta.threads.messages.create(
            emptyThread.id,
            { role: "user", content: input }
        );

        const run = await openai.beta.threads.runs.create(
            emptyThread.id,
            { assistant_id: myAssistant.id }
        );


        const checkStatusAndPrintMessages = async (threadId, runId) => {
            let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
            if (runStatus.status === "completed") {
                let messages = await openai.beta.threads.messages.list(threadId);
                console.log(messages.data);
                messages.data.forEach((msg) => {
                    const role = msg.role;
                    const content = msg.content[0].text.value;
                    console.log(
                        `${role.charAt(0).toUpperCase() + role.slice(1)}: ${content}`
                    );
                    if (!messageList.some(item => item.text === content)) {
                        messageList.push({ text: content, isUser: false });
                        localStorage.setItem('messageList', JSON.stringify(messageList));


                    }

                    const agendamento = JSON.parse(localStorage.getItem("Agendamento"));


                    if (!agendamento) {

                        if (messageList.some(item => item.text.includes("Seu pedido foi confirmado"))) {


                            localStorage.setItem("Agendamento", JSON.stringify("Seu pedido foi confirmado"))

                            const messList = localStorage.getItem('messageList');
                            const messListConvert = JSON.parse(messList);
                            sendEmail(messListConvert)

                            // sendEmail()
                            localStorage.removeItem("emptyThread")

                            const startThread = async () => {
                                const emptyThread = await openai.beta.threads.create();
                                // Armazenar emptyThread no localStorage
                                localStorage.setItem('emptyThread', JSON.stringify(emptyThread));

                            }
                            startThread()
                            // localStorage.removeItem("messageList")
                        }

                    }


                });

                console.log(messageList);
                setContador(contador + 1);
                console.log(contador);
                setShowComponent(false)

                //ACHA MENSAGEM === "Typing..." E REMOVE ELA

                const index = messageList.findIndex(message => message.text === 'Digitando...');
                if (index !== -1) {
                    messageList.splice(index, 1);
                    setCvUpdadet(false)
                }

            } else {
                console.log("Run is not completed yet.");

            }
        };

        // setTimeout(() => {
        //     checkStatusAndPrintMessages(emptyThread.id, run.id)
        //     console.log(messageList);
        // }, 10000);

        // Função para chamar a função checkStatusAndPrintMessages com timeout recursivo
        function callWithTimeout(delay) {
            setTimeout(() => {
                checkStatusAndPrintMessages(emptyThread.id, run.id);
            }, delay);
        }

        // Chama a função com timeout inicial de 5 segundos
        callWithTimeout(5000);

        // Função que verifica se houve resposta em 5 segundos e decide se deve tentar novamente com um timeout maior
        function checkStatusAndPrintMessagesWithRetry(emptyThreadId, runId, currentDelay) {
            checkStatusAndPrintMessages(emptyThreadId, runId)
                .then(response => {
                    // Resposta obtida com sucesso, não é necessário mais nenhuma tentativa
                    console.log("Resposta obtida:", response);
                })
                .catch(error => {
                    // Tratar erro, se necessário
                    console.error("Erro ao obter resposta:", error);

                    // Aumenta o delay para a próxima tentativa
                    currentDelay *= 2;

                    // Limita o delay máximo a 30 segundos
                    if (currentDelay > 30000) {
                        console.log("Tentativas esgotadas");
                        return;
                    }

                    console.log(`Tentando novamente em ${currentDelay / 1000} segundos`);
                    callWithTimeout(currentDelay);
                });
        }

        // Chama a função com timeout inicial de 5 segundos
        checkStatusAndPrintMessagesWithRetry(emptyThread.id, run.id, 5000);



    };



    const { messageList } = useContext(ModalContext);
    const { setMessageList } = useContext(ModalContext);

    const { setOpenModal } = useContext(ModalContext);
    const { openModal } = useContext(ModalContext);

    const toggleModal = () => {
        setOpenModal(false);
    };

    const { sendEmail } = useContext(ModalContext);
    const { sendEmailTwo } = useContext(ModalContext);

    const modalFunctions = () => {

        const agendamento = JSON.parse(localStorage.getItem("Agendamento"));

        const messList = localStorage.getItem('messageList');
        const messListConvert = JSON.parse(messList);


        const containsSequence = messageList.some(item => {
            // Verificando se a propriedade 'text' contém 8 ou 9 números em sequência
            return /\b\d{9,11}\b/.test(item.text);
        });


        if (!agendamento && containsSequence) {
            sendEmailTwo(messListConvert)
        }


        toggleModal()
        setPopUp(false)

        // sendEmail()
    }

    const { popUp } = useContext(ModalContext)
    const { setPopUp } = useContext(ModalContext)
    const { isTyping } = useContext(ModalContext)
    const { setIsTyping } = useContext(ModalContext)



    // useEffect(() => {

    //     if (input != "") {

    //         const playAudio = () => {

    //             new Audio(sound).play()
    //         }
    //         playAudio()
    //     }

    // }, [input])

    return (


        <div className={styles.modal}>
            <div className={styles.modalCcontent}>
                <div className={styles.modalHeader}>
                    <div className={styles.profileDiv}>
                        <img src="https://th.bing.com/th?id=OIP.jryuUgIHWL-1FVD2ww8oWgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="profile image" />
                        <h2>{chosenName}</h2>
                        <span className={styles.close} onClick={modalFunctions}>X</span>
                        <div>
                        </div>
                        <div className={styles.statusDiv}></div>
                        <span>online</span>
                    </div>
                </div>
                <ul className={styles.modalBody} ref={listRef}>
                    {


                        messageList.map((message, index) => (
                            message.isUser ? <UserCv key={index} mensagem={message.text} id="lastUserCV" /> :
                                <Conversation key={index} mensagem={message.text} id="lastAssisCV" />
                        ))}
                </ul>
                <div className={styles.modalFooter}>
                    <form onSubmit={
                        handleSubmit} ref={formRef}>
                        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Digite sua mensagem..." />
                        <button type="submit">
                            <BiSolidSend size={30} />
                        </button>
                    </form>
                </div>
            </div>
        </div>




    )
}