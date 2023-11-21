import request, { get } from "request";
import { errors } from "../constants/messages";
import { admin, home, voting } from '../constants/routes';
import VotingUser from '../models/VotingUser';
import { configs } from "../constants/configuration";

const { API_KEY, getApiData } = require('../../../../secret/.env_auth_api.js');
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();

// 선거 종료 일시 설정
// 입력 표준은 KST
rule.year = configs.END_YEAR
rule.month = configs.END_MONTH // month base = 0
rule.date = configs.END_DATE
rule.hour = configs.END_HOUR 
rule.minute = configs.END_MINUTE
let visibility = false

schedule.scheduleJob(rule, function(){
  console.log("투표 종료");
  visibility = true
})

function getIndex(req, res, next) {
  let sess = req.session;
  if (!sess.stdNum) {
    res.render("index", {visibility, configs});
  } else {
    req.session.destroy(function(err) {
      res.render("index", {visibility, configs});
    });
  }
}

function getAdmin(req, res, next) {
  let sess = req.session;
  if (!sess.stdNum) {
    res.render("admin", {visibility, configs});
  } else {
      req.session.destroy(function(err) {
        res.render("admin", {visibility, configs});
    });
  }
}

async function postLogin(req, res, next) {
  const body = req.body;
  const sess = req.session;
  const data = getApiData(body.stdNum, body.stdPwd);  // 오아시스 api 데이터 암호화

  const options = {
    method: "POST",
    url: API_KEY,   // 오아시스 api 암호화
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  request(options, function(error, response) {

    var jsonObject = JSON.parse(options.body);
    var userNo = jsonObject.userNo;
    var userPwd = jsonObject.userPwd;

    // root 계정 확인 후 root 페이지로 라우트
    if (userNo == 'root' && userPwd == 'ampm315!') {
      return res.redirect(admin)
    }

    // root 계정이 아닐 시
    if (error) {
      res.render("voting_result", { message: errors.AUTH_ERROR });
    } else {
      if(response.body.search(`"errorMessage":"Expected a ',' or '}'`) !== -1) {
        return res.redirect(home);
      }
      const users = JSON.parse(response.body).users;
  
      if (users == null || users.length === 0) {
        return res.redirect(home);
      } else {
        // 유저가 있을 때
        VotingUser.findOne({stdNum: users[0].USERNO}, function(err, user) {
          if (err) {
            return res.status(500).render('error', {message: errors.AUTH_ERROR, error: {status: 500}});
          }
          if (!user) {
            return res.status(404).render('error', {message: errors.AUTH_ERROR, error: {status: 404}});
          } else {
            sess.stdNum = users[0].USERNO;
            return res.redirect(voting);
          }
        });
      }
    }
  });
}

export default {
  getIndex, getAdmin, postLogin
};