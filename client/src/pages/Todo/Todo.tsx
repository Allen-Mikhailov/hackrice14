import "./Todo.css"
import { user_data_state } from "../../modules/states"

function Todo()
{
    const [userData, setUserData] = user_data_state.useState()

    return <div>
        <h2>To-do:</h2>
        {/* {userData && userData.todo_list.map()} */}
    <br></br>
        make the to-do list
    </div>
}

export default Todo