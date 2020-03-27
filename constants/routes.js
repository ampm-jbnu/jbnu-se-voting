// global
const HOME = "/";
const LOGIN = "/login";

const VOTING = "/voting";
const VOTING_SUBMIT = "/submit";
const VOTING_RESULT = "/submit/:status";

const RESULT = "/voting_result";

module.exports = {
  home: HOME,
  login: LOGIN,
  voting: VOTING,
  voting_submit: VOTING_SUBMIT,
  voting_result: status => {
    if(status) {
      return `/submit/${status}`
    } else {
      return VOTING_RESULT;
    }
  },
  result: RESULT,
}