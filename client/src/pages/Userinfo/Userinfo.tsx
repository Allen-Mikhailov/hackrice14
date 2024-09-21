

function Username()
{
    return <div>
        username goes here
    </div>
}

function Bio()
{
    return <div>
        Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio
        
        Bio Bio Bio Bio
    </div>
}

function InfoWindow()
{
    return <div>
        
            <div className="Table">
                {<Username></Username>}
            </div>
            <div className="Table">
                {<Bio></Bio>}
            </div>
            
        
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