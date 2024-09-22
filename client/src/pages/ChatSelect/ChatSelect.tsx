import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { user_data_state } from "../../modules/states";

function ListChats() {
  const [userData, setUserData] = user_data_state.useState();

  return (
    <div>
      <ListGroup>
        {userData &&
          userData.matches.map((match, index) => (
            <ListGroup.Item key={index}>
              <Link to={"/chat/" + match.chat_id}>
                {match.display_name || "Error No display name"}
              </Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

function ChatSelect() {
  return (
    <div>
      <h1>Active Chats:</h1>
      <ListChats />
    </div>
  );
}

export default ChatSelect;
