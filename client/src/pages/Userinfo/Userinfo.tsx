import { auth } from "../../modules/firebase"
import { UserData } from "server/src/middleware/auth"
import { user_data_state } from "../../modules/states"
import { useEffect, useState, useRef } from "react"
import { User } from "firebase/auth"
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form'

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

    function save_bio()
    {
        setEditing(false)
    }

    function cancel_edit()
    {
        setEditing(false)
    }

    function start_edit()
    {
        setEditing(true)
    }

    return <div>
        <textarea ref={textboxRef}>
            
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
            <div>
                <div className="table">
                    <h1><Username username={user.displayName || "Error"}/></h1>
                </div>
                {userData?<Bio bio={userData?userData.bio:""} />:"Loading Bio"}
            </div>    

        
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