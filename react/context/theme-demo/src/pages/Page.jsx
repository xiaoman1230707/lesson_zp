import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Header from '../components/Header'

export default function Page(){
    const {theme} = useContext(ThemeContext)
    return(
        <>
        <div style={{padding: 24}}>
            <Header />
        </div>
        </>
    )
}