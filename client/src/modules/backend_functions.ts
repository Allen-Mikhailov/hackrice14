import { User } from "firebase/auth";
import { UserData } from "server/src/middleware/auth";

// const base_url = "http://localhost:8080"

async function getProfile(user: User): Promise<UserData | null>
{
    const response = await fetch(`/api/profile?id_token=${encodeURIComponent(await user.getIdToken(true))}`)
    if (!response.ok)
    {
        return null
    }
    return await (response.json())
}

export { getProfile }