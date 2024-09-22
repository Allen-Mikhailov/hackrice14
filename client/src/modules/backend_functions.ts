import { User } from "firebase/auth";
import { UserData } from "server/src/middleware/auth";

function getStartingPoint()
{
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        return "http://localhost:8080"
    else 
        return "https://motivibe.live"
}

async function getProfile(user: User): Promise<UserData | null>
{
    const starting_point = getStartingPoint();

    const response = await fetch(`${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`)
    if (!response.ok)
    {
        return null
    }
    const json = await (response.json())
    console.log("profile", json)
    return json
}

async function setProfileBio(user: User, new_bio: string) {
    const starting_point = getStartingPoint();
    const url = `${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`
    const response = await fetch(url, {
        method: "post",
        body: JSON.stringify({
            "bio": new_bio
        })
    })
}

export { getProfile, setProfileBio }