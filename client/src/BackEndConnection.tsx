import { useEffect, useState } from "react"
import { user_data_state } from "./modules/states"
import { User } from "firebase/auth"
import { auth } from "./modules/firebase"
import { getProfile } from "./modules/backend_functions"

function BackEndConnection()
{
    const [user, setUser] = useState<User|null>(null);
    const [userData, setUserData] = user_data_state.useState()

    async function update_user_profile(user: User) {
        const profile = await getProfile(user)
        setUserData(profile)
        
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)

            console.log('user update')

            if (user != null)
            {
                update_user_profile(user)
            } else {
                setUserData(null)
            }
        })


    }, [])

    return <></>
}

export default BackEndConnection