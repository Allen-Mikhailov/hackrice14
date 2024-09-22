import { auth } from "../../modules/firebase"
import { UserData } from "server/src/middleware/auth"
import { user_data_state } from "../../modules/states"
import React, { useEffect, useState, useRef } from "react"
import { User } from "firebase/auth"
import Button from 'react-bootstrap/Button'

import "./Userinfo.css"
import { setProfileBio } from "../../modules/backend_functions"

function Bio(props: {bio: string})
{
    let {bio} = props
    const [editing, setEditing] = useState(false)
    const [localBio, setLocalBio] = useState("")
    const [userData, setUserData] = user_data_state.useState()

    useEffect(() => {

    }, [bio])

    const textboxRef = useRef(null);

    function can_save()
    {
        return localBio.length <= 500
    }

    function save_bio()
    {
        if (!textboxRef.current) {return;}

        if (can_save())
        {
            const new_data = JSON.parse(JSON.stringify(userData))
            new_data.bio = localBio
            setUserData(new_data)
            
            if (auth.currentUser != null)
                setProfileBio(auth.currentUser, localBio)
        } else {
            setLocalBio(bio)
        }

        setEditing(false)
    }

    function cancel_edit()
    {
        setLocalBio(bio)
        setEditing(false)
    }

    function start_edit()
    {
        setEditing(true)
    }

    function textbox_change(e: any)
    {
        setLocalBio(e.target.value)
    }

    return <div>
        <h3>Biography</h3>
        <textarea ref={textboxRef} className="biotextarea" disabled={!editing} value={localBio} onChange={textbox_change}>
            
        </textarea>
        <br/>
        {editing?<div>
            <Button variant="primary" onClick={save_bio}>Save Bio</Button>
            <Button variant="danger" onClick={cancel_edit}>Cancel</Button>
        </div>:<div>
            <Button variant="primary" onClick={start_edit}>Edit Bio</Button>
        </div>}
        
    </div>
}

function NotSignedIn()
{

    return <div>
        <h1>Oops!
        </h1>
        <h2>Looks like you're not signed in...</h2>
        You need to sign in.
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
        <div className="table">
            <h1>{user.displayName || "Error"}</h1>
        </div>
        {userData?<Bio bio={userData?userData.bio:""} />:"Loading Bio"}

        
    </div>:<NotSignedIn/>)
}


function Userinfo()
{
    return <div>
    <>
      {<InfoWindow></InfoWindow>}
    </>
    </div>
}

export default Userinfo