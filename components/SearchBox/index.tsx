import styles from './styles.module.css'
import Link from 'next/link'
import { useEffect } from 'react'

interface Props {
    result: any;
    setSearching:any
}

const SearchBox:React.FC<Props> = ({result, setSearching}) => {
    


    return (
        <section className={styles.container}>
            {result?.map((item:any)=>{
                return (
                    <Link href={`/${item.username}`} key={item.id} passHref >
                    <div className={styles.result} onClick={()=>setSearching(false)}>
                        <img src={item.displayPicture} alt="user image" />
                        <p>{item.username}</p>
                    </div>
                    </Link>
                )
            })}

            {!result && <p>Press Enter to Search</p>}
        </section>
    )
}

export default SearchBox
