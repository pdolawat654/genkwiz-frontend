import { Col, Row } from 'antd';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import QoTDCard from '../components/QoTD/QoTDCard';
import kidsQotdImage from '/assets/images/kids-qotd.png';
import shriram_profile from '/assets/images/shriram_profile.png';
import kapinjal_profile from '/assets/images/kapinjal_profile.png';
import berty_profile from '/assets/images/berty_profile.png';
import q2chew_profile from '/assets/images/aniruddha_profile.png';
import ramanand_profile from '/assets/images/ramanand_profile.png';
import rc_profile from '/assets/images/rc_profile.png';
import todays_special from '/assets/images/todays-special.png';

import {
  bertyAshley,
  jRamanand,
  shriramQoTD,
  kapinjalChoudhury,
  kidsQoTD,
  aniruddhaDutta,
  todaysQoTD,
  rajarshiChanda,
} from '../utils/constants';
import { QoTDType } from '../utils/types';

const QuizMasters = () => {
  /* extracting "navigate" from useNavigate hook */
  const navigate = useNavigate();

  return (
    <Row className="pt-8 px-4 text-center sm:text-nowrap sm:px-2">
      <span
        className="mx-2 mb-6 flex items-center gap-1 underline text-primary select-none cursor-pointer"
        onClick={() => {
          navigate('/welcome');
        }}
      >
        <FaChevronLeft />
        Back to Home
      </span>
      <Col span={24} className="flex justify-center">
        <span className="text-2xl sm:text-3xl mb-4 text-primary-dark">Quizmasters</span>
      </Col>
      <div className="px-4 pt-6 pb-12 flex items-center justify-center flex-wrap gap-10 overflow-auto">
        <QoTDCard
          title="Shriram's QoTD"
          quizMasterInfo={{ ...shriramQoTD, profileImage: '/assets/images/shriram_profile.png' }}
          qoTDType={QoTDType.REGULAR}
          archiveType={QoTDType.ARCHIVE}
          cardImage={shriram_profile}
        />
        <QoTDCard
          title="Infinite Zounds"
          quizMasterInfo={{ ...jRamanand, profileImage: '/assets/images/ramanand_profile.png' }}
          qoTDType={QoTDType.RAMANAND}
          archiveType={QoTDType.RAMANAND_ARCHIVE}
          cardImage={ramanand_profile}
        />
        <QoTDCard
          title="TheKapsQuiz"
          quizMasterInfo={{
            ...kapinjalChoudhury,
            profileImage: '/assets/images/kapinjal_profile.png',
          }}
          qoTDType={QoTDType.KAPINJAL}
          archiveType={QoTDType.KAPINJAL_ARCHIVE}
          cardImage={kapinjal_profile}
        />
        <QoTDCard
          title="Berty's Questions"
          quizMasterInfo={{ ...bertyAshley, profileImage: '/assets/images/berty_profile.png' }}
          qoTDType={QoTDType.BERTY}
          archiveType={QoTDType.BERTY_ARCHIVE}
          cardImage={berty_profile}
        />
        <QoTDCard
          title="Questions 2 Chew"
          quizMasterInfo={{
            ...aniruddhaDutta,
            profileImage: '/assets/images/aniruddha_profile.png',
          }}
          qoTDType={QoTDType.Q2Chew}
          archiveType={QoTDType.Q2Chew_ARCHIVE}
          cardImage={q2chew_profile}
        />
        <QoTDCard
          title="RC's Challenge"
          quizMasterInfo={{
            ...rajarshiChanda,
            profileImage: '/assets/images/rc_profile.png',
          }}
          qoTDType={QoTDType.RC_CHALLENGE}
          archiveType={QoTDType.RC_CHALLENGE_ARCHIVE}
          cardImage={rc_profile}
        />

        <QoTDCard
          title="Kids Question of the Day"
          quizMasterInfo={{ ...kidsQoTD }}
          qoTDType={QoTDType.KIDS}
          archiveType={QoTDType.KIDS_ARCHIVE}
          cardImage={kidsQotdImage}
        />
        
        <QoTDCard
          title="What Made Today Special?"
          quizMasterInfo={{ ...todaysQoTD }}
          qoTDType={QoTDType.TODAYS_QOTD}
          archiveType={QoTDType.TODAYS_QOTD_ARCHIVE}
          cardImage={todays_special}
        />
      </div>
    </Row>
  );
};

export default QuizMasters;
