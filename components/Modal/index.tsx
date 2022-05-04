import React from 'react';
import { AppContext, AppTypes } from '../../context/AppContext';
import styles from './styles.module.css'

interface Props {
    handleClose?: ()=>void
}

const Modal: React.FC<Props> = ({children, handleClose}) => {
    const { isModal } = React.useContext(AppContext) as AppTypes
    
    return (
        <>
        {isModal && 
        <div className={styles.modal}>
            <p className={styles.closeIcon} onClick={handleClose}>&times;</p>
            {children}
        </div>}
        </>
    )
}

export default Modal