import { createMessage } from "../services/message_service";
import { getUserByUsername } from "../services/user_service";

// checks if the new message is created by a single user
export async function verifyNewMessageUser(
  toId: string,
  fromId: string,
  username: string
) {
  const user = await getUserByUsername(username);
  if (user._id == toId || user._id == fromId) {
    return true;
  } else {
    return false;
  }
}
