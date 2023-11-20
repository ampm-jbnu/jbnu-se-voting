import { Schema, model as _model } from "mongoose";

const VoteSchema = new Schema({
  result: {type: String},
});

const model = _model('Vote', VoteSchema, "voting_result");

export default model;