import ListGroup from 'react-bootstrap/ListGroup';

function Username()
{
    return <div>
        User1
    </div>
}

function ListChats()
{
    return <div>
    
        <ListGroup>
            <ListGroup.Item>{<Username></Username>}</ListGroup.Item>
        </ListGroup>

</div>
}


function ChatSelect()
{
    return <div>
    <h1>Active Chats:</h1>
    <p>
      {<ListChats></ListChats>}
    </p>
    </div>
}

export default ChatSelect