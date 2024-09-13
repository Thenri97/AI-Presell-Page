import { useContext } from "react";
import { Menu } from "./menu";
import styles from "./styles.module.scss"
import { IoMdMenu } from "react-icons/io";
import { ModalContext } from "../../providers/ModalContext";

import { IoCloseSharp } from "react-icons/io5";



export const Header = () => {

    const { menu } = useContext(ModalContext);
    const { setMenu } = useContext(ModalContext);

    const { setOpenModal } = useContext(ModalContext);
    const { openModal } = useContext(ModalContext);


    const closeAssistant = () => {
        setMenu(true);
        setOpenModal(false);
    }


    // const openAssistant = () => {
    //     setOpenModal(true);
    //     set
    // }


    return (
        <header className={styles.header}>

            {
                menu === true ? <IoCloseSharp size={36} onClick={() => setMenu(false)} /> : <IoMdMenu size={36} onClick={() => closeAssistant()} />
            }

            {
                openModal === true? setMenu(false) : null
            }
            {menu === true ? <Menu /> : null}
            {/* <span>Home</span> */}
            {/* <h1>OdontoMais</h1> */}
            <h1>Entrega Fácil Store</h1>

            

        </header>
    );
}