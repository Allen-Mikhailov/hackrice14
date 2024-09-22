import { UserData } from "./middleware/auth";

// Get User Data somehow of all users

const users: UserData[] = []

function calculate_distance(user1: UserData, user2: UserData)
{
    let distance = 0
    for (let i = 0; i < user1.traits.length; i++)
    {
        distance += Math.pow(user1.traits[i]-user2.traits[i], 2)
    }
    return Math.sqrt(distance)
}

const user_count = users.length
for (let i = 0; i < user_count-1; i++)
{   
    let closest_user_index = -1
    let closest_user_distance = 100000000000

    const user1 = users[i]

    if (!user1.open_to_wave) {continue}

    for (let j = i+1; j < user_count; j++)
    {
        const user2 = users[j]

        if (!user2.open_to_wave) {continue}

        const dist = calculate_distance(user1, user2)
        if (dist < closest_user_distance)
        {
            closest_user_index = j
            closest_user_distance = dist
        }
    }

    if (closest_user_index != -1)
    {
        user1.open_to_wave = false
        const matched_user = users[closest_user_index]
        // Create match in the database and make them not open to wave
        // user1.matches.push({other_user_id: matched_user.firebase_id, display_name: matched_user.display_name})
    }
}
