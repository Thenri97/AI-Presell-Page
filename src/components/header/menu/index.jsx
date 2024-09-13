import styles from "./styles.module.scss";
import { FaArrowRight } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export const Menu = () => {
    return (
        <section className={styles.menu}>

            <div>
                <div className={styles.buttonDiv}>
                    <button>Procedimentos</button>
                    <FaArrowRight size={24}/>

                </div>
                <div className={styles.buttonDiv}>
                    <button>Equipe</button>
                    <FaArrowRight size={24}/>
                </div>
                <div className={styles.buttonDiv}>

                    <a href="https://calendar.google.com/calendar/u/0/embed?src=aa65d1470e9eaeb2c7d095d01b4b672f6f6e03da98d98f7e897980772f2e1c2b@group.calendar.google.com&ctz=America/Sao_Paulo" target="_blank">Ver agenda </a>
                    <FaArrowRight size={24}/>
                </div>
            </div>
            <div className={styles.socialDivIcons}>
                <FaInstagram size={24} />
                <FaWhatsapp size={24} />
                <FaFacebook size={24} />
            </div>
        </section>
    );
}