import styles from "./styles.module.scss"


export const Agenda = () => {

    return (
        <>

            <section className={styles.agendaDiv}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=aa65d1470e9eaeb2c7d095d01b4b672f6f6e03da98d98f7e897980772f2e1c2b%40group.calendar.google.com&ctz=America%2FSao_Paulo"
                    style={{ border: '0' }}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    
                    
                    
                    >
                        
                    <link rel="stylesheet" type="text/scss" href="../../styles/agenda.scss" />

                </iframe>

                
            </section>

        </>
    )
}