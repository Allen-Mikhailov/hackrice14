import { auth } from "../../modules/firebase"
import { user_data_state } from "../../modules/states"
import React, { useEffect, useState, useRef } from "react"
import { User } from "firebase/auth"
import Button from 'react-bootstrap/Button'

import "./Userinfo.css"
import { setProfileBio, setProfileSignupStatus } from "../../modules/backend_functions"

function Bio(props: {bio: string})
{
    const {bio} = props
    const [editing, setEditing] = useState(false)
    const [localBio, setLocalBio] = useState("")
    const [userData, setUserData] = user_data_state.useState()

    useEffect(() => {
        setLocalBio(bio)
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

function MatchingSignup()
{
    const [userData, setUserData] = user_data_state.useState()

    function set_open_wave_status(status: boolean)
    {
        const new_data = JSON.parse(JSON.stringify(userData))
        new_data.open_to_wave = status
        setUserData(new_data)
        if (auth.currentUser)
            setProfileSignupStatus(auth.currentUser, status)
    }

    function cancel_signup()
    {
        set_open_wave_status(false)
    }

    function request_signup()
    {
        set_open_wave_status(true)
    }

    return <div>
        {userData && userData.open_to_wave?<div>
            <h4>You are signed up for the matching next wave</h4>
            <Button variant="danger" onClick={cancel_signup}>Cancel Signup</Button>
        </div>:<div>
            <Button variant="success" onClick={request_signup}>Signup for matching wave</Button>
        </div>}
    </div>
}

function Userinfo()
{
    const [user, setUser] = useState<User|null>()
    const [userData, setUserData] = user_data_state.useState()
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    return (user!=null?<div>
        
        <h1 style={{ fontSize: 40, color: "rgb(173, 182, 255)", fontWeight: "bold", textTransform: "uppercase" }}>{user.displayName || "Error"}</h1>
        <hr></hr>
        {userData?<Bio bio={userData?userData.bio:""} />:"Loading Bio"}
        {userData && <MatchingSignup/>}
        
    </div>:<NotSignedIn/>)
}


export default Userinfo