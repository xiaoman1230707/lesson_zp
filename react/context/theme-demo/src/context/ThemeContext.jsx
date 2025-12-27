import { 
    createContext,
    useState,
    useEffect
 } from 'react'
export const ThemeContext = createContext(null)//容器

//外面使用时将子组件包住
export default function ThemeProvider({children}){
 const [theme, setTheme] = useState('light')
 const toggleTheme = ()=>{
    setTheme((t) => t === 'light' ? 'dark' : 'light')
 }
useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
},[theme])
    return(
        <>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
        </ThemeContext.Provider>
        </>
    )
}
