import styles from "./styles.module.scss"

export const Typing = () => {
    return (
        <div className={styles.typing}>
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
        </div>
    )
}