import { UserData } from "./middleware/auth";
import { database } from "./mongodb";

const users = database.collection<UserData>("users");
const chats = database.collection("chats");

async function makeMatch(user1: UserData, user2: UserData) {
  const user1_id = user1.firebase_id;
  const user2_id = user2.firebase_id;

  if (!user1 || !user2) {
    return;
  }

  let chat_id = (await chats.insertOne({ users: [user1_id, user2_id], messages: [] })).insertedId;
  await users.updateOne({ firebase_id: user1_id }, { "$push": { matches: { other_user_id: user2_id, chat_id, display_name: user2.display_name } } });
  await users.updateOne({ firebase_id: user2_id }, { "$push": { matches: { other_user_id: user1_id, chat_id, display_name: user1.display_name } } });
  await users.updateOne({ firebase_id: user1_id }, { "$set": { open_to_wave: false } });
  await users.updateOne({ firebase_id: user2_id }, { "$set": { open_to_wave: false } });
}

function calculate_distance(user1: UserData, user2: UserData) {
  let distance = 0
  for (let i = 0; i < user1.traits.length; i++) {
    distance += Math.pow(user1.traits[i] - user2.traits[i], 2)
  }
  return Math.sqrt(distance)
}

export async function matchWave() {
  const users: UserData[] = await database.collection<UserData>("users").find({ open_to_wave: true }).toArray();

  const user_count = users.length
  for (let i = 0; i < user_count - 1; i++) {
    let closest_user_index = -1
    let closest_user_distance = 100000000000

    const user1 = users[i]

    if (!user1.open_to_wave) { continue }

    for (let j = i + 1; j < user_count; j++) {
      const user2 = users[j]

      if (!user2.open_to_wave) { continue }

      const dist = calculate_distance(user1, user2)
      if (dist < closest_user_distance) {
        closest_user_index = j
        closest_user_distance = dist
      }
    }

    if (closest_user_index != -1) {
      user1.open_to_wave = false
      const matched_user = users[closest_user_index]

      await makeMatch(user1, matched_user);
    }
  }
}