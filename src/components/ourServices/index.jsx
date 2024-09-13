import styles from "./styles.module.scss"

export const OurServices = () => {


    return (
        <>
            <section className={styles.ourServicesContainer}>
                <h1>Nossos Serviços</h1>
                <ul className={styles.ourServicesList}>
                    <li>
                        <h2>Odontologia Geral</h2>
                        <p>Desde limpezas de rotina até tratamentos para cáries, estamos aqui para manter seu sorriso saudável e radiante.</p>
                    </li>
                    <li>
                        <h2>Implantes Dentários</h2>
                        <p>Recupere a funcionalidade e estética do seu sorriso com nossas soluções avançadas de implantes dentários.</p>
                    </li>
                    <li>
                        <h2>Ortodontia</h2>
                        <p>Corrija problemas de alinhamento dos dentes e desfrute de um sorriso reto e harmonioso com nossos tratamentos ortodônticos personalizados.</p>
                    </li>
                    <li>
                        <h2>Estética Dental</h2>
                        <p>Transforme seu sorriso com procedimentos estéticos como clareamento dental, facetas de porcelana e correção de imperfeições.</p>
                    </li>
                    <li>
                        <h2>Periodontia</h2>
                        <p>Mantenha suas gengivas saudáveis e proteja sua saúde bucal com nossos serviços de periodontia especializados</p>
                    </li>
                </ul>
            </section>
        </>
    )
}