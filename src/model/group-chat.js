import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
      max: 500,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    files: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GroupChatSchemal = new mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    background: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      max: 100,
      min: 1,
    },
    messages: [MessageSchema],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GroupChat = mongoose.model("GroupChat", GroupChatSchemal);
export default GroupChat;
