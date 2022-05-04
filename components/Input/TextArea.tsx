
interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{

}

const TextArea:React.FC<Props> = ({ ...props }) => {
    return (
        <textarea {...props}>

        </textarea>
    )
}

export default TextArea