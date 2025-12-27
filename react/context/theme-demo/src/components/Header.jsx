import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Header(){
    const {theme,toggleTheme} = useContext(ThemeContext)
    return(
        <>
        <div style={{margin: 24}}>
            <h1>当前主题：{theme}</h1>
            <button onClick={toggleTheme}>切换主题</button>
        </div>
        </>
    )
}