import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: [3, "Minimum length of first_name should be of 3 characters!"],
  },
  last_name: {
    type: String,
    min: [3, "Minimum length of last_name should be of 3 characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email address!`,
    },
    min: [10, "Minimum length of email should be of 10 characters!"],
  },
  phone_no: {
    type: Number,
    validate: {
      validator: function (v: number) {
        return /^\d{10}$/.test(`${v}`);
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not supported!",
    },
  },
  address: {
    type: String,
    max: [100, "Maximum length of address should be of 100 characters only!"],
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
