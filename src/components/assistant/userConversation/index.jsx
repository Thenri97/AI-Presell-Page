import styles from "./styles.module.scss"


export const UserCv = ({ mensagem, showModal }) => {


    // const { setOpenModal } = useContext(ModalContext);
    // const { openModal } = useContext(ModalContext);

    // const showModal = () => {
    //     setOpenModal(true);
    // }

    return (

        <li className={styles.balaoUs}>
            <p>{mensagem}</p>
        </li>

    )
}