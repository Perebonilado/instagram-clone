interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const TextInput: React.FC<TextInputProps> = ({...props}) => {
    return (
        <input type="text" {...props}/>
    )
}

export default TextInput