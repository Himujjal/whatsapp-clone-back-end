import messageSchema, { IMessageSchema } from "../models/message_model";

export async function getMessagesToFrom(
  to: string,
  from: string
): Promise<IMessageSchema[]> {
  try {
    const messages: IMessageSchema[] = await messageSchema.find({
      to: { $in: [to, from] },
      from: { $in: [to, from] },
    });
    return messages;
  } catch (err) {
    throw new Error("Error getting messages : " + err.message);
  }
}

export async function getMessageById(id: string): Promise<IMessageSchema> {
  return await messageSchema.findById(id);
}

export async function updateMessagesReceivedByIds(ids: string[]) {
  // @ts-ignore
  const messages: IMessageSchema[] = await messageSchema.update(
    {
      _id: { $in: ids },
    },
    {
      received: true,
    }
  );
  return messages;
}

export async function createMessage({
  message,
  to,
  toName,
  fromName,
  from,
  timestamp,
}: {
  message: string;
  fromName: string;
  from: string;
  to: string;
  toName: string;
  timestamp: string;
}): Promise<IMessageSchema> {
  try {
    const resMessage: IMessageSchema = await messageSchema.create({
      to,
      toName,
      from,
      fromName,
      message,
      timestamp,
      received: false,
    });
    return resMessage;
  } catch (err) {
    throw new Error("Error creating messages : " + err.message);
  }
}

export async function updateMessage(id: string): Promise<IMessageSchema> {
  try {
    const resMessage: IMessageSchema = await messageSchema.findByIdAndUpdate(
      id,
      { received: true }
    );
    return resMessage;
  } catch (err) {
    throw new Error("Error updating messages : " + err.message);
  }
}
