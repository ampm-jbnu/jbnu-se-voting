import { monthMapper } from "./mapper";


const CONFIGS = {
    YEAR: "2023",
    VOTE_COUNTER: "김재현(개표위원장)",
    MAIN_CANDIDATE: "19학번 정용한",
    SUB_CANDIDATE: "19학번 김건우",
    POSTER_URL: "/images/candidate_poster.png",
    USER_NUMBERS: 1,
    
    // 선거 종료 일시 설정
    // 입력 표준은 KST
    END_YEAR: 2023,
    END_MONTH: monthMapper.SEP, // month base = 0
    END_DATE: 8,
    END_HOUR: 23,
    END_MINUTE: 27,
};

module.exports = {
    configs: CONFIGS,
}