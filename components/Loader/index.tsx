import React from 'react'
import styles from './styles.module.css'

const Loader = ({ size = "md" }: { size?: "sm" | "md" }) => {
    return <div className={`${styles.loader} ${styles[size]}`} />;
  };

export default Loader