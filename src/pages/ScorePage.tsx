import { Button, Col, Row } from 'antd';
import { useAppData } from '../contexts/AppContext';
import { genKwizUrl } from '../utils/constants';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from 'react-icons/fa';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';
import { useNavigate, useParams } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import { QoTDType, QuestionType } from '../utils/types';

const QuizScore = () => {
  /* extracting "navigate" from useNavigate hook */
  const navigate = useNavigate();

  const { questionType, status: attemptedStatus } = useParams();

  const { quizResponse, quizLength, userDetails, qoTDScore, qoTDStreak } = useAppData();
  const correct = quizResponse?.numberOfCorrect ? quizResponse?.numberOfCorrect : 0;
  const attempted = quizResponse?.numberOfAttempted ? quizResponse.numberOfAttempted : 0;
  const incorrect = attempted - correct;
  const score = quizResponse?.finalScore ? quizResponse.finalScore : 0;

  // function to render attempted status message
  const attemptedStatusMessage = (questionType: QuestionType) => {
    if (questionType === QuestionType.QOTD) {
      return `Shriram's`;
    } else if (questionType === QuestionType.KIDS_QOTD) {
      return 'Kids';
    } else if (questionType === QuestionType.INFINITE_ZOUNDS) {
      return `Infinite Zound's`;
    } else if (questionType === QuestionType.BERTY_QUESTION) {
      return `Berty's`;
    } else if (questionType === QuestionType.KAPS_QUIZ) {
      return `Kaps Quiz`;
    } else if (questionType === QuestionType.Q2Chew_QUESTION) {
      return `Aniruddha's`;
    } else if (questionType === QuestionType.RC_CHALLENGE) {
      return `Rajarshi's`;
    } else if (questionType === QuestionType.TODAYS_QOTD) {
      return `What Made Today Special?`;
    }
  };

  // function to return an archive url for current quiz master
  const urlForQuizMasterArchive = (questionType: QuestionType) => {
    if (questionType === QuestionType.QOTD) {
      return QoTDType.ARCHIVE;
    } else if (questionType === QuestionType.KIDS_QOTD) {
      return QoTDType.KIDS_ARCHIVE;
    } else if (questionType === QuestionType.INFINITE_ZOUNDS) {
      return QoTDType.RAMANAND_ARCHIVE;
    } else if (questionType === QuestionType.BERTY_QUESTION) {
      return QoTDType.BERTY_ARCHIVE;
    } else if (questionType === QuestionType.KAPS_QUIZ) {
      return QoTDType.KAPINJAL_ARCHIVE;
    } else if (questionType === QuestionType.Q2Chew_QUESTION) {
      return QoTDType.Q2Chew_ARCHIVE;
    } else if (questionType === QuestionType.RC_CHALLENGE) {
      return QoTDType.RC_CHALLENGE_ARCHIVE;
    } else if (questionType === QuestionType.TODAYS_QOTD) {
      return QoTDType.TODAYS_QOTD_ARCHIVE;
    }
  };

  const getResultText = () => {
    const numberOfQuestions = quizLength;
    if (questionType !== QuestionType.QUIZ) {
      if (attemptedStatus === 'attempted') {
        return {
          showConfetti: false,
          message: `You have already attempted the ${attemptedStatusMessage(questionType as QuestionType)} Question of The Day! Do visit us tomorrow`,
        };
      }
      if (attemptedStatus === 'correct') {
        return {
          showConfetti: true,
          message: `Well done ${userDetails?.name ?? ''}, You seem to be pretty good at it.`,
        };
      }
      return {
        showConfetti: false,
        message: `No worries ${userDetails?.name ?? ''}, at least you learned something today`,
      };
    }
    if (attempted === 0) {
      return {
        showConfetti: false,
        message: `Try harder, take some risk`,
      };
    }
    if ((correct / numberOfQuestions) * 100 <= 35) {
      // < = 35%
      return {
        showConfetti: false,
        message: `No worries ${userDetails?.name ?? ''}, at least you learned something today`,
      };
    } else if ((correct / numberOfQuestions) * 100 <= 70) {
      // < 70%
      return {
        showConfetti: true,
        message: `You are almost there, Good job ${userDetails?.name}`,
      }; // >= 70%
    }
    return {
      showConfetti: true,
      message: `Well done ${userDetails?.name ?? ''}, You seem to be pretty good at it.`,
    };
  };
  const { showConfetti, message } = getResultText();
  const shareText =
    'Quizzing isn’t just about knowing trivia. It is about lateral thinking. It is about inquisitiveness.';

  const scoreText = () => {
    const text =
      questionType !== QuestionType.QUIZ
        ? `${shareText}\n${message}\nMy total score: ${qoTDScore}\nStreak : ${qoTDStreak}`
        : `${shareText}\n${message}\nMy total score: ${score}\nCorrect : ${correct}\nIncorrect : ${incorrect}\n`;
    return text;
  };
  return (
    <div
      style={{
        backgroundImage: 'var(--color-gradient-result)',
      }}
    >
      {showConfetti && (
        <ReactConfetti run={true} numberOfPieces={200} opacity={0.5} gravity={0.2} />
      )}
      <Row className="h-screen text-center sm:text-nowrap mx-2 flex items-center">
        <Col span={24}>
          <Row gutter={[0, 20]} className="flex flex-col items-center justify-center">
            <Col span={24} className="text-xl sm:text-2xl mb-2">
              {message}
            </Col>
            <Col
              span={24}
              className="text-base sm:text-lg border-double border-white rounded-xl border-2 p-2 sm:p-3"
            >
              Your total score: {questionType !== QuestionType.QUIZ ? qoTDScore : score}
            </Col>
            {questionType !== QuestionType.QUIZ && (
              <Col
                span={24}
                className="text-base sm:text-lg border-double border-white rounded-xl border-2  p-2 sm:p-3"
              >
                Streak: {qoTDStreak}
              </Col>
            )}
            {questionType === QuestionType.QUIZ && (
              <>
                <Col className="flex justify-center space-x-4 text-base sm:text-lg">
                  <span className="flex justify-center items-center m-1.5 text-green-700">
                    <FaCheckCircle />
                    <p className="ml-2">{correct} Correct</p>
                  </span>
                  <span className="flex justify-center items-center m-1.5 text-rose-700">
                    <FaTimesCircle />
                    <p className="ml-2">{incorrect} Incorrect</p>
                  </span>
                </Col>
                <Col span={24} className="text-base sm:text-lg mb-1">
                  Attempted Questions: {attempted}/{quizLength}
                </Col>
              </>
            )}
            <Col span={24} className="flex justify-between space-x-4 mb-3">
              {/* {
                questionType === QuestionType.QUIZ
                && */}
              <Button
                className="button bg-primary"
                onClick={() => {
                  navigate('/quizmasters', { replace: true });
                }}
              >
                Explore other quiz masters
              </Button>
              {questionType === QuestionType.QUIZ ? (
                <Button
                  className="button bg-primary"
                  onClick={() => {
                    navigate('/playQuiz', { replace: true });
                  }}
                >
                  New quiz
                </Button>
              ) : (
                <Button
                  className="button bg-primary"
                  onClick={() => {
                    navigate('/qotd/' + urlForQuizMasterArchive(questionType as QuestionType), {
                      replace: true,
                    });
                  }}
                >
                  QoTD Archive
                </Button>
              )}
            </Col>
            <span className="flex text-lg">Share with Friends & Family</span>
            <Col span={24} className="flex justify-center space-x-10 text-3xl">
              <FacebookShareButton
                className="social-icon-button"
                url={genKwizUrl}
                hashtag={'#genkwiz, #quiz'}
              >
                <FaFacebook fill="#316FF6" />
              </FacebookShareButton>
              <TwitterShareButton
                title={scoreText()}
                url={genKwizUrl}
                hashtags={['genkwiz', 'quiz']}
                className="social-icon-button"
              >
                <FaTwitter fill="#00ACED" />
              </TwitterShareButton>
              <WhatsappShareButton
                url={genKwizUrl}
                title={scoreText()}
                separator=""
                className="social-icon-button"
              >
                <FaWhatsapp fill="#25D366" />
              </WhatsappShareButton>
              <LinkedinShareButton
                url={genKwizUrl}
                source="Genkwiz - An insightful and enlightening quizzing experience"
                title={'Genkwiz - An insightful and enlightening quizzing experience'}
                summary={scoreText()}
                className="social-icon-button"
              >
                <FaLinkedin fill="#007FB1" />
              </LinkedinShareButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default QuizScore;
