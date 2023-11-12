import VotingUser from "../models/VotingUser";
import VotingResult from "../models/Vote";
import msgs from "../constants/messages";

async function getVotingResult(req, res, next) {
  const data = {
    users: 166,
    voters: 0,
    agree: 0,
    disagree: 0,
    none: 0,
    result: ""
  };

  try {
    data.voters = await VotingUser.countDocuments({ check_voting: true });
    data.agree = await VotingResult.countDocuments({ result: "agree" });
    data.disagree = await VotingResult.countDocuments({ result: "disagree" });
    data.none = await VotingResult.countDocuments({ result: "none" });

    console.log(data);
    if( data.agree / data.voters >= (2/3)) {
        data.result = msgs.info.ELECTION_INFO;
    } else {
        data.result = msgs.info.ABORTION_INFO;
    }
  } catch (err) {
    data.result = "데이터 로딩에 실패했습니다."
    console.log(err);
  } finally {
    res.render("chart_result", { data: data });
  }
}

export default {
  getVotingResult
};
