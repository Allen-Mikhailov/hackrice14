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
        <h1>Oops!
        </h1>
        <h2>Looks like you're not signed in...</h2>
        You need to sign in.
    </div>
}

function EditBio() {

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
                <div className="table">
                    <h4><Bio bio={userData?userData.bio:"Loading Bio"} /></h4>
                </div>
                <Button variant="primary" onClick={EditBio}>Edit Bio</Button>{' '}
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