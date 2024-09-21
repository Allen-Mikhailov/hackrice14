import { auth } from "../../modules/firebase"
import { UserData } from "server/src/middleware/auth"
import { user_data_state } from "../../modules/states"
import { useEffect, useState, useRef } from "react"
import { User } from "firebase/auth"

function Username(props: {username: string})
{
    let {username} = props
    return <div>
        {username}
    </div>
}

function Bio(props: {bio: string})
{
    let {bio} = props
    const [editing, setEditing] = useState(false)

    const textboxRef = useRef(null);

    return <div>
        {editing?<textarea ref={textboxRef}>
            
        </textarea>:<div>
            {bio}
        </div>}
        
    </div>
}

function NotSignedIn()
{

    return <div>
        You need to sign in
    </div>
}

function InfoWindow()
{
    const [user, setUser] = useState<User|null>()
    const [userData, setUserData] = user_data_state.useState()
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    return (user!=null?<div>
        
            <div className="Table">
                <Username username={user.displayName || "Error"}/>
            </div>
            <div className="Table">
                <Bio bio={userData?userData.bio:"Loading Bio"} />
            </div>
            
        
    </div>:<NotSignedIn/>)
}


function Userinfo()
{
    return <div>
    <h1>This is the user info page.</h1>
    <>
      {<InfoWindow></InfoWindow>}
    </>
    </div>
}

export default Userinfo