import { createState } from "state-pool";
// import { User } from "firebase/auth";
import { UserData } from "server/src/middleware/auth";

const user_data_state = createState<UserData | null>(null)

export {user_data_state}