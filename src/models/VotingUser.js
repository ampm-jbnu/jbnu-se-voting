import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  stdNum: {type: String},
  name: {type: String},
  check_voting: {type: Boolean, default: false},
});

const model = mongoose.model('VotingUser', UserSchema, "voting_users");

export default model;