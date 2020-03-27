import { home, voting, voting_submit } from '../constants/routes';
import { info, errors } from '../constants/messages';
import { startSession } from 'mongoose';

import VotingUser from '../models/VotingUser';
import VotingResult from '../models/Vote';

function checkVoting(req, res, next) {
  let sess = req.session;

  if (!sess.stdNum) {
    res.redirect(home);
  } else {
    VotingUser.findOne({ stdNum: sess.stdNum }, function(err, user) {
      if (err) {
        return res
          .status(500)
          .render("error", {
            message: errors.AUTH_ERROR,
            error: { status: 500 }
          });
      }
      if (!user) {
        return res
          .status(404)
          .render("error", {
            message: errors.AUTH_ERROR,
            error: { status: 404 }
          });
      } else {
        if (user.check_voting) {
          return res.redirect(voting + voting_submit + '/warning');
        } else {
          next();
        }
      }
    });
  }
}

function getVoting(req, res, next) {
  res.render("voting");
}

async function postVotingSubmit(req, res, next) {
  const body = req.body;
  let sess = req.session;

  if(body.chk) {
    try {
      const result = await VotingUser.updateOne({ stdNum: sess.stdNum }, { $set: {check_voting: true}});

      if(!result.n) {
        throw new Error();
      }

      const votingResult = new VotingResult({
        result: body.chk,
      })
      await votingResult.save();
    } catch(err) {
        console.log(err);
        return res.status(404).render('error', {message: messages.errors.AUTH_ERROR, error: {status: 500}});
    }
    res.redirect(voting + voting_submit + '/success');
  } else {
    res.redirect(voting);
  }
}

function getVotingResult(req, res, next) {
  const params = req.params;
  let msg = "";

  switch(params.status) {
    case 'success':
      msg = info.END_INFO;
      break;
    case 'warning':
      msg = errors.VOTING_ERROR;
      break;
    default:
      res.render('error', { message: "Not Found", error: {status: 404}});
      return ;
  }

  res.render('voting_result', { message: msg });
}

function logout(req, res, next) {
  const sess = req.session;

  if(sess.stdNum) {
    req.session.destroy(function(err){
      if(err){
        next();
      }else{
        next();
      }
    })
  } else {
    next();
  }
}

export default {
  checkVoting, getVoting, postVotingSubmit, getVotingResult, logout,
}