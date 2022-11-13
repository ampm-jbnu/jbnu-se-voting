const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();

rule.year = 2022
rule.month = 10
rule.date = 13
rule.hour = 16
rule.minute =42

export default rule;
