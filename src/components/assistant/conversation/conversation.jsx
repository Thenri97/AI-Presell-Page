import styles from "./styles.module.scss"

export const Conversation = ({ mensagem }) => {

        const https = "Click on the link below";
        console.log(mensagem)

        const newMessage = mensagem.replace(/\【.*?\】/g, "");

        return (

                <li className={styles.balao}>
                        <p>{newMessage}</p>
                        {
                                mensagem.includes(https) ? <a href="https://api.whatsapp.com/send/?phone=5524992086911&text&type=phone_number&app_absent=0" target="blank">Click here!</a> : null
                        }
                </li>

        )
}