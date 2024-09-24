import { Footer } from "../../components/footer"
import { Header } from "../../components/header"

export const DefaultTemplate = ({ children }) => {
    return (
        <>

            {/* <Header /> */}
            <main>
                {children}
            </main>
            {/* <Footer /> */}
        </>

    )
}