import { useEffect, useState } from "react"
import { user_data_state } from "./modules/states"
import { User } from "firebase/auth"
import { auth } from "./modules/firebase"
import { getProfile } from "./modules/backend_functions"

function BackEndConnection()
{
    const [user, setUser] = useState<User|null>(null);
    const [userData, setUserData] = user_data_state.useState()

    async function update_user_profile() {
        if (user)
        {
            const profile = await getProfile(user)
            console.log("profile", profile)
            setUserData(profile)
        }
        
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)

            if (user != null)
            {
                update_user_profile()
            } else {
                setUserData(null)
            }
        })


    }, [])

    return <></>
}

export default BackEndConnection