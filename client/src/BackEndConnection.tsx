import { useEffect, useState } from "react"
import { user_data_state } from "./modules/states"
import { User } from "firebase/auth"
import { auth } from "./modules/firebase"

function BackEndConnection()
{
    const [user, setUser] = useState<User|null>(null);
    const [userData, setUserData] = user_data_state.useState()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })

        
    }, [])

    return <></>
}

export default BackEndConnection