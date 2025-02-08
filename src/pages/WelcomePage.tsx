import { Button, Card, Grid, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QoTDType, QuestionGenreType, QuestionModeType } from '../utils/types';
import FollowUs from '../components/FollowUs';
import { fetchQuizDetails, generateSessionIdForQuiz } from '../utils/apis';
import { loginApi, modeGenreApi, monthNames } from '../utils/constants';
import { useAppData } from '../contexts/AppContext';

const { useBreakpoint } = Grid;

const WelcomePage = () => {
  /* extracting "navigate" from useNavigate hook */
  const {
    setQuizId,
    setQuestionDetails,
    setQuizLength,
    setQuizScore,
    setQuizResponse,
    userDetails,
    setUserDetails,
    setSessionId,
  } = useAppData();
  const navigate = useNavigate();

  const screens = useBreakpoint();
  const date = new Date();
  const currentMonthName = monthNames[date.getMonth()];

  return (
    <div className="h-ful w-full py-6 flex flex-col items-center justify-around gap-6 overflow-aut">
      <span className="p-4 text-2xl sm:text-3xl text-primary-dark text-center select-none">
        Welcome to the Quizzing World!
      </span>
      <div className="w-full flex items-center flex-col gap-6 px-6">
        <div
          className={`w-full flex items-center justify-center gap-6 ${screens.xs ? 'h-[450px] flex-col' : 'h-[300px] '}`}
        >
          <Card
            className={`h-full flex flex-col gap-4
            bg-todaysSpecial bg-no-repeat hover:shadow-inner
            cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
            ${
              screens.xs
                ? 'w-full py-4 px-4 items-end justify-center bg-left bg-[55%,55%]'
                : 'w-1/3  bg-center bg-[100%,100%] hover:bg-[120%,120%]'
            }`}
            onClick={() => navigate('/qotd/' + QoTDType.TODAYS_QOTD)}
          >
            {screens.xs && (
              <span className="text-lg text-primary font-semibold">
                <span className="font-normal text-base">Today's </span>Special
              </span>
            )}
          </Card>
          <Card
            className={`h-full flex flex-col
              bg-qotdRegular bg-no-repeat hover:shadow-inner
              cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
              ${
                screens.xs
                  ? 'w-full py-4 px-4 items-end justify-center bg-left bg-[55%,55%] border-b'
                  : 'w-1/3 border-r bg-center bg-[110%,110%] hover:bg-[130%,130%]'
              }`}
            onClick={() => navigate('/qotd/' + QoTDType.REGULAR)}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">
                {' '}
                <span className="font-normal text-base">BY</span> SHRIRAM
              </span>
            )}
          </Card>
          <Card
            className={`h-full flex flex-col gap-4
              bg-infiniteZounds bg-no-repeat hover:shadow-inner
              cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
              ${
                screens.xs
                  ? 'w-full py-4 items-start justify-center bg-right bg-[55%,55%] border-b'
                  : 'w-1/3 border-r bg-center bg-[110%,110%] hover:bg-[130%,130%]'
              }`}
            onClick={() => navigate('/qotd/' + QoTDType.RAMANAND)}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">
                <span className="font-normal text-base">BY</span> RAMANAND
              </span>
            )}
          </Card>
        </div>
        <div
          className={`w-full flex items-center justify-center gap-6 ${screens.xs ? 'h-[450px] flex-col' : 'h-[300px] '}`}
        >
          <Card
            className={`h-full flex flex-col gap-4
              bg-theKapsQuiz bg-no-repeat hover:shadow-inner
              cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
              ${
                screens.xs
                  ? 'w-full py-4 px-4 items-end justify-center bg-left bg-[55%,55%]'
                  : 'w-1/3  bg-center bg-[100%,100%] hover:bg-[120%,120%]'
              }`}
            onClick={() => navigate('/qotd/' + QoTDType.KAPINJAL)}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">
                <span className="font-normal text-base">BY</span> KAPINJAL
              </span>
            )}
          </Card>
          <Card
            className={`h-full flex flex-col gap-4
              bg-bertysQuestions bg-no-repeat hover:shadow-inner
              cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
              ${
                screens.xs
                  ? 'w-full py-4 px-4 items-start justify-center bg-right bg-[55%,55%] border-b'
                  : 'w-1/3 border-r bg-center bg-[110%,110%] hover:bg-[120%,120%]'
              }`}
            onClick={() => navigate('/qotd/' + QoTDType.BERTY)}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">
                <span className="font-normal text-base">BY</span> BERTY
              </span>
            )}
          </Card>
          <Card
            className={`h-full flex flex-col gap-4
              bg-Q2CHEW bg-no-repeat hover:shadow-inner
              cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
              ${
                screens.xs
                  ? 'w-full py-4 px-4 items-end justify-center bg-left bg-[55%,55%]'
                  : 'w-1/3  bg-center bg-[100%,100%] hover:bg-[120%,120%]'
              }`}
            onClick={() => navigate('/qotd/' + QoTDType.Q2Chew)}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">
                <span className="font-normal text-base">BY</span> ANIRUDDHA
              </span>
            )}
          </Card>
        </div>
        <div
          className={`w-full flex items-center justify-center gap-6 ${screens.xs ? 'flex-col' : 'h-[300px] '}`}
        >
          <Card
            className={`h-full flex flex-col gap-4 bg-rcChallenge
             bg-no-repeat hover:shadow-inner
            cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
            ${
              screens.xs
                ? 'w-full py-4 px-4 items-start justify-center bg-right bg-[55%,55%]'
                : 'w-1/3 bg-center bg-[90%,90%] hover:bg-[100%,100%]'
            }`}
            onClick={() => navigate('/qotd/' + QoTDType.RC_CHALLENGE)}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">
                <span className="font-normal text-base">BY</span> RAJARSHI
              </span>
            )}
          </Card>
          <Card
            className={`h-full flex flex-col gap-4
            bg-kidsQotd bg-no-repeat hover:shadow-inner
            cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
            ${
              screens.xs
                ? 'w-full py-4 px-4 items-end justify-center bg-left bg-[55%,55%]'
                : 'w-1/3  bg-center bg-[100%,100%] hover:bg-[120%,120%]'
            }`}
            onClick={() => navigate('/qotd/' + QoTDType.KIDS)}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">
                <span className="font-normal text-base">FOR</span> PARENTS
              </span>
            )}
          </Card>
          <Card
            className={`h-full flex flex-col gap-4
            bg-playQuiz bg-no-repeat hover:shadow-inner
            cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
            ${
              screens.xs
                ? 'w-full py-4 px-4 items-start justify-center bg-right bg-[55%,55%]'
                : 'w-1/3 bg-center bg-[90%,90%] hover:bg-[100%,100%]'
            }`}
            onClick={() => navigate('/playQuiz')}
          >
            {screens.xs && <span className="text-2xl text-primary font-semibold">Play Quiz</span>}
          </Card>
        </div>
        <div
          className={`w-full flex items-center justify-center gap-6 ${screens.xs ? 'flex-col' : 'h-[300px] '}`}
        >
          <Card
            className={`h-full flex flex-col gap-4
          bg-challengeQuiz bg-no-repeat hover:shadow-inner
          cursor-pointer transition-all overflow-hidden rounded-2xl card-shadow
          ${
            screens.xs
              ? 'w-full py-4 items-end justify-center bg-left bg-[55%,55%]'
              : 'w-1/3  bg-center bg-[100%,100%] hover:bg-[120%,120%]'
          }`}
            onClick={() => {
              // const to store the request body for api
              const reqBody = {
                genre: currentMonthName as QuestionGenreType,
                mode: 'medium' as QuestionModeType,
                numberOfQuestions: 10,
              };
              // api to generate the session id for the quiz
              setUserDetails({
                name: 'GenKwizzer',
                selectedAvatar: userDetails?.selectedAvatar
                  ? userDetails.selectedAvatar
                  : '/assets/avatars/1.png',
              });
              generateSessionIdForQuiz('GenKwizzer', loginApi)
                .then((response) => {
                  setSessionId(response.sessionId);
                  // calling fetchQuizDetails api
                  fetchQuizDetails(modeGenreApi, reqBody, response.sessionId as string)
                    .then((response) => {
                      setQuizId(response.quizId);
                      setQuestionDetails(response.questions);
                      setQuizLength(response.questions.length);
                      setQuizResponse(null);
                      setQuizScore(0);
                      navigate('/quiz');
                    })

                    .catch((err) => {
                      console.log(err);
                      setQuizId(null);
                      setQuestionDetails([]);
                      message.error('Error while fetching the response');
                    });
                })
                .catch((err) => {
                  console.log(err);
                  setSessionId(null);
                  message.error('Error while fetching the response');
                });
            }}
            // onClick={() => navigate('/playQuiz')}
          >
            {screens.xs && (
              <span className="text-2xl text-primary font-semibold">Monthly Challenge</span>
            )}
          </Card>
        </div>
        <div
          className={`flex items-center justify-center mt-6 ${screens.xs ? 'flex-col' : 'gap-6'}`}
        >
          <Button className="button bg-primary sm:w-auto" onClick={() => navigate('/quizmasters')}>
            Explore Quizmasters
          </Button>
        </div>
      </div>

      <FollowUs />
    </div>
  );
};

export default WelcomePage;
