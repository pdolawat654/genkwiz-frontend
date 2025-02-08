import { QoTDType, QuestionType } from '../types';

// function to set archive question
const getMasterQotdUrl = (qotdType: QoTDType) => {
  if (qotdType === QoTDType.KIDS) {
    return QuestionType.KIDS_QOTD;
  } else if (qotdType === QoTDType.REGULAR) {
    return QuestionType.QOTD;
  } else if (qotdType === QoTDType.RAMANAND) {
    return QuestionType.INFINITE_ZOUNDS;
  } else if (qotdType === QoTDType.BERTY) {
    return QuestionType.BERTY_QUESTION;
  } else if (qotdType === QoTDType.KAPINJAL) {
    return QuestionType.KAPS_QUIZ;
  } else if (qotdType === QoTDType.Q2Chew) {
    return QuestionType.Q2Chew_QUESTION;
  } else if (qotdType === QoTDType.RC_CHALLENGE) {
    return QuestionType.RC_CHALLENGE;
  } else if (qotdType === QoTDType.TODAYS_QOTD) {
    return QuestionType.TODAYS_QOTD;
  }
};

export default getMasterQotdUrl;
