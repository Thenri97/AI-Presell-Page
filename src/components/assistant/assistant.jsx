import styles from "./styles.module.scss";
import OpenAI from "openai";
import { useRef, useEffect, useContext, useState } from 'react';
import { AiFillMessage } from "react-icons/ai";
import { BiSolidSend } from "react-icons/bi";
import { ModalContext } from '../../providers/ModalContext';
import sound from "../../assets/mixkit-dry-pop-up-notification-alert-2356.wav";
import { UserCv } from "./userConversation";
import { Typing } from './typingCard/typing';
import { Conversation } from "./conversation/conversation";

export const Assistant = () => {

    const { popUp } = useContext(ModalContext)
    const { setPopUp } = useContext(ModalContext)

    const { setOpenModal } = useContext(ModalContext);
    const { openModal } = useContext(ModalContext);

    const [isOpen, setIsOpen] = useState(true); // Estado para controlar a visibilidade do modal

    const toggleModal = () => {
        setOpenModal(false);
        setPopUp(false)
    };
    

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const [input, setInput] = useState("");
    const [messageList, setMessageList] = useState([{ text: `Olá! Como posso te ajudar?`, isUser: false }]);
    const [showTyping, setShowTyping] = useState(false);

    const formRef = useRef(null);
    const listRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() === "") {
            alert("Digite sua mensagem!");
            return;
        }

        const newMessage = { text: input, isUser: true };
        setMessageList(prev => [...prev, newMessage]);
        localStorage.setItem('messageList', JSON.stringify([...messageList, newMessage]));

        setInput("");
        formRef.current.reset();

        setShowTyping(true);
        setTimeout(() => sendToAssistant(input), 3000);
    };

    const sendToAssistant = async (userMessage) => {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'Você é um assistente útil.' },
                    { role: 'user', content: userMessage },
                ],
            });

            const assistantMessage = response.choices[0].message.content;
            setMessageList((prevMessages) => [
                ...prevMessages,
                { text: assistantMessage, isUser: false },
            ]);
            localStorage.setItem('messageList', JSON.stringify([...messageList, { text: assistantMessage, isUser: false }]));
            setShowTyping(false);
        } catch (error) {
            console.error("Erro ao interagir com o assistente:", error);
        }
    };

    useEffect(() => {
        if (messageList.length > 0) {
            const list = listRef.current;
            const lastListItem = list.lastChild;
            lastListItem.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageList]);



    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalCcontent}>
                    <div className={styles.modalHeader}>
                        <div className={styles.profileDiv}>
                            <img src="https://th.bing.com/th?id=OIP.jryuUgIHWL-1FVD2ww8oWgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="profile image" />
                            <h2>Assistente</h2>
                            <span
                                className={styles.close}
                                onClick={toggleModal}>X</span>
                        </div>
                    </div>
                    <ul className={styles.modalBody} ref={listRef}>
                        {messageList.map((message, index) => (
                            message.isUser ? <UserCv key={index} mensagem={message.text} id="lastUserCV" /> :
                                <Conversation key={index} mensagem={message.text} id="lastAssisCV" />
                        ))}
                        {showTyping && <Conversation key="typing" mensagem="Digitando..." id="lastAssisCV" />}
                    </ul>

                    <div className={styles.modalFooter}>
                        <form onSubmit={handleSubmit} ref={formRef}>
                            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Digite sua mensagem..." />
                            <button type="submit">
                                <BiSolidSend size={30} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
