import request from "request";
import { errors } from "../constants/messages";
import { home, voting } from '../constants/routes';
import VotingUser from '../models/VotingUser';
import {getApiData, API_KEY} from '../.env_auth_api';

const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();

rule.year = 2022
rule.month = 10
rule.date = 13
rule.hour = 16
rule.minute =48

// schedule.scheduleJob(rule, function(){
//   console.log("투표 종료");
//   btn = document.getElementsByName('showVotingResult');
//   btn.disabled = false;
// })

function getIndex(req, res, next) {
  let sess = req.session;

  if (!sess.stdNum) {
    res.render("index");
  } else {
    req.session.destroy(function(err) {
      res.render("index");
    });
  }

  document.getElementById
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
  getIndex, postLogin
};