import styles from "./styles.module.scss"


export const LoginPage = () => {

    return (
        <main className={styles.main}>

               <section className={styles.loginSection}>
                    <h1>Login</h1>
               <form action="" className={styles.form}>
                    <label>
                        Email
                        <br />
                        <input type="text" name="email" id="email" placeholder="digite seu email" />
                    </label>
                    <label>
                        Senha
                        <br />
                        <input type="text" name="email" id="email" placeholder="digite seu email" />
                    </label>
                    <button>Sign In</button>
                    <a href="">Register Account</a>
                </form>
                <div>
                    <button>login with Gooogle</button>
                </div>
               </section>
               <section>

               </section>
           

        </main>
    )
}