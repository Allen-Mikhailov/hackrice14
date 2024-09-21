import { User } from "firebase/auth";
import { UserData } from "server/src/middleware/auth";

async function getProfile(user: User): Promise<UserData | null>
{
    let starting_point = ""
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        starting_point = "http://localhost:8080"
    else 
        starting_point = "https://motivibe.live"

    const response = await fetch(`${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`)
    if (!response.ok)
    {
        return null
    }
    const json = await (response.json())
    console.log("profile", json)
    return json
}

export { getProfile }