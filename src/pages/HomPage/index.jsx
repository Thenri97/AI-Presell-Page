import { useContext, useEffect, useState } from "react";
import { Assistant } from "../../components/assistant/assistant";
import { Conversation } from "../../components/assistant/conversation/conversation";
import { UserCv } from "../../components/assistant/userConversation";
import styles from "./styles.module.scss"
import { ModalContext } from "../../providers/ModalContext";
import EmailSender from "../../components/emailJS";
import { Header } from "../../components/header";
import { Agenda } from "../Agenda";
import sound from "../../assets/mixkit-dry-pop-up-notification-alert-2356.wav"
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import bannerImg from "../../assets/larana.png"
import bannerTwo from "../../assets/banner 2.png"
import { OurServices } from "../../components/ourServices";
import { Footer } from "../../components/footer";

export const HomePage = () => {

    const { names } = useContext(ModalContext);
    const { chosenName } = useContext(ModalContext);
    const { mess } = useContext(ModalContext);
    const { setOpenModal } = useContext(ModalContext);
    const { openModal } = useContext(ModalContext);


    const { a } = useContext(ModalContext)
    const { setA } = useContext(ModalContext)

    const showModal = () => {
        setOpenModal(true)
        setA(false)
        console.log(a);
        // changePop()
        // setPopUp(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    useEffect(() => {

        setTimeout(() => {
            setPopUp(true);
        }, 2000);

    }, [])

    const { popUp } = useContext(ModalContext)
    const { setPopUp } = useContext(ModalContext)

    const changePop = () => {
        setPopUp(true)
    }

    return (
        <>

            {/* <body>
                <header>adasdsad</header>
                <main>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas architecto explicabo ipsum vero assumenda, error eveniet doloremque? Molestias omnis rerum, saepe non explicabo sapiente nostrum mollitia sint incidunt tempore dolore!</p>
                </main>
                <footer>
                    <p>este é o fotter</p>
                </footer>
            </body> */}

            <body>


                <Header />
                <section className={styles.main}>

                    {
                        openModal === true ? <Assistant /> : openModal === false && popUp === true ?
                            <div className={styles.openDiv}>
                                <span onClick={() => setPopUp(false)} >
                                    <IoIosCloseCircle size={30} />
                                </span>
                                <ul className={styles.profileDiv}>
                                    <img src="https://th.bing.com/th?id=OIP.jryuUgIHWL-1FVD2ww8oWgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="profile image" onClick={showModal} />
                                    {mess.map((message, index) => (
                                        message.isUser ? <Conversation key={index} mensagem={message.text} id="lastConversation" onClick={showModal} /> :
                                            <UserCv key={index} mensagem={message.text} id="lastAssisCV" />
                                    ))}
                                </ul>
                            </div> :
                            <span onClick={showModal} className={styles.messageButton}> <AiFillMessage size={45} /></span>
                    }

                    <section className={styles.banner}>
                        <div className={styles.bannerImgDiv}>
                            <img src={bannerImg} alt="banner image" />
                        </div>
                        <p>Na WRA Odontologia, acreditamos que cada sorriso é único e merece atenção personalizada. Somos uma clínica de odontologia comprometida em proporcionar o mais alto padrão de cuidados odontológicos, combinando tecnologia de ponta com uma abordagem compassiva e centrada no paciente.</p>

                    </section>

                    <OurServices />

                    <section className={styles.whySection}>
                        <img src={bannerTwo} alt="" />

                        <ul tabIndex="0">
                            <li>
                                <h2>Equipe Profissional e Cuidadosa</h2>
                                <p>Nossa equipe é composta por profissionais altamente qualificados e dedicados, prontos para oferecer a você um atendimento personalizado e compassivo em cada visita.</p>
                            </li>
                            <li>
                                <h2>Tecnologia Avançada</h2>
                                <p>Utilizamos tecnologia de última geração para garantir tratamentos precisos, eficazes e confortáveis, proporcionando resultados excepcionais aos nossos pacientes.</p>
                            </li>
                            <li>
                                <h2>Ambiente Confortável</h2>
                                <p>Criamos um ambiente acolhedor e relaxante para garantir que cada visita à nossa clínica seja uma experiência positiva e confortável para você e sua família.</p>
                            </li>
                            <li>
                                <h2>Abordagem Centrada no Paciente</h2>
                                <p>Na WRA Odontologia, colocamos você em primeiro lugar. Estamos comprometidos em ouvir suas necessidades, responder suas perguntas e criar um plano de tratamento personalizado que atenda às suas expectativas e objetivos.</p>
                            </li>
                        </ul>
                    </section>

                    {/* <Agenda/> */}
                    {/* {
                    isPlayng === true ? playAudio() : null
                 } */}

                </section>
             <Footer/>
            </body>



        </>
    );
}