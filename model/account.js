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

const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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

    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    refreshToken: {
      type: String,
      required: true,
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
