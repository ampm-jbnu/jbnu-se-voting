import VotingUser from "../models/VotingUser";
import VotingResult from "../models/Vote";
import msgs from "../constants/messages";
import { configs } from "../constants/configuration";


async function getVotingResult(req, res, next) {
  var data = {
    voter_count: 0,
    agree: 0,
    disagree: 0,
    invalidity: 0,
    result: ""
  };

  try {
    data.voter_count = await VotingUser.countDocuments({ check_voting: true });
    data.agree = await VotingResult.countDocuments({ result: "agree" });
    data.disagree = await VotingResult.countDocuments({ result: "disagree" });
    data.invalidity = await VotingResult.countDocuments({ result: "invalidity" });

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
    res.render("chart_result", { data: data, configs});
  }
}

export default {
  getVotingResult
};
