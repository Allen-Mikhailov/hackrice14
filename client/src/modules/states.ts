import { createState } from "state-pool";
import { User } from "firebase/auth";

const user_data_state = createState<User|null>(null)

export {user_data_state}