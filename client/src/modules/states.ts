import { createState } from "state-pool";

const user_data_state = createState<any>(null)
const user_state = createState<any>(null)

export {user_state, user_data_state}