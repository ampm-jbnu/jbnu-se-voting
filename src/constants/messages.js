import { configs } from "./configuration";


const ERRORS = {
    AUTH_ERROR: '이 서비스에 이용 권한이 없습니다.' ,  
    VOTING_ERROR: '이미 투표를 하셨습니다. ' + configs.END_YEAR + '년 ' + configs.END_MONTH + '월 ' + configs.END_DATE + '일 ' + configs.END_HOUR + ':' + configs.END_MINUTE + '이후 결과가 공개됩니다.',
};

const INFO = {
    ELECTION_INFO: "단일 후보 찬성이 2/3 넘었으므로 정후보 " + configs.MAIN_CANDIDATE + ", 부후보 " + configs.SUB_CANDIDATE + "이 당선되었습니다.",
    ABORTION_INFO: "단일 후보 찬성이 2/3을 넘지 않았으므로 정후보 " + configs.MAIN_CANDIDATE + ", 부후보 " + configs.SUB_CANDIDATE + "이 낙선되었습니다.",
    END_INFO: '투표에 참여해주셔서 감사합니다. ' + configs.END_YEAR + '년 ' + configs.END_MONTH + '월 ' + configs.END_DATE + '일 ' + configs.END_HOUR + ':' + configs.END_MINUTE + ' 이후 결과가 공개됩니다.'
};

module.exports = {
    errors: ERRORS,
    info: INFO,
}