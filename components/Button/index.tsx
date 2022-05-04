import styles from './styles.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    buttonType?: 'link' | 'solid' | 'outline'
}

const Button: React.FC<Props> = ({text, buttonType = 'solid', ...props}) => {
    


    return (
        <button {...props} 
        className={`${styles.button} ${styles[buttonType || 'solid']}`}>
            {text}
        </button>
    )
}

export default Button