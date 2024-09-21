import ListGroup from 'react-bootstrap/ListGroup';

function Username()
{
    return <div>
        username goes here
    </div>
}

function Bio()
{
    return <div>
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
        Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah 
        
    </div>
}


function InfoWindow()
{
    return <div>
    
        <ListGroup>
            <ListGroup.Item>{<Username></Username>}</ListGroup.Item>
            <ListGroup.Item>{<Bio></Bio>}</ListGroup.Item>
        </ListGroup>

</div>
}


function Userinfo()
{
    return <div>
    <h1>This is the user info page.</h1>
    <p>
      {<InfoWindow></InfoWindow>}
    </p>
    </div>
}

export default Userinfo