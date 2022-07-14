import mongoose from "mongoose";

const UserInformationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 100,
      default: "Anonymous",
    },
    avatar: {
      type: String,
      required: false,
      default: "",
    },
    sid: {
      type: String,
      required: false,
      default: "",
    },
    background: {
      type: String,
      required: false,
      default: "",
    },
    birthDay: {
      type: String,
      required: false,
      default: "01/01/1999",
    },
    major: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    others: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const AccountTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PrivilegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      match: /* /.+\@.+\..+/ */ [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    userInformation: UserInformationSchema,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountType",
    },

    privileges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Privilege",
      },
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupChat",
      },
    ],
    invites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupChat",
      },
    ],
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    loginFailedCount: {
      type: Number,
      required: true,
      max: 5,
      default: 0,
    },
    lockState: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AccountType = mongoose.model("AccountType", AccountTypeSchema);
export const Privilege = mongoose.model("Privilege", PrivilegeSchema);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
