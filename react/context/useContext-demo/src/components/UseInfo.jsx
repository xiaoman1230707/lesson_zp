import { useContext } from 'react'
import { UserContext } from '../App'

export default function UseInfo(){
    const user = useContext(UserContext)
    return(
        <div>Hello {user.name}</div>
    )
}