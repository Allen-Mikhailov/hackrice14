import { User } from "firebase/auth";

const base_url = "localhost:8080"

async function getProfile(user: User)
{
    const response = await fetch(base_url+`/profile?token_id=${await user.getIdToken()}`)
    return await (response.json())
}

export { getProfile }