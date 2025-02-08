import { Button, Col, Row, Switch, message } from 'antd';
import { genres, modeGenreApi, modes } from '../utils/constants';
import { QuestionGenreType, QuestionModeType } from '../utils/types';
import { useAppData } from '../contexts/AppContext';
import { fetchQuizDetails } from '../utils/apis';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const QuizModePage = () => {
  // app context destructuring
  const {
    sessionId,
    quizMode,
    quizGenre,
    userDetails,
    setQuizMode,
    setQuizGenre,
    setQuizId,
    setQuestionDetails,
    setQuizLength,
    setQuizScore,
    setQuizResponse,
  } = useAppData();

  /* extracting "navigate" from useNavigate hook */
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDetails?.name) {
      navigate('/welcome');
    }
  });
  return (
    <Row className="mt-10 mx-4 text-center sm:text-nowrap sm:mx-2">
      <Col span={24} className="flex justify-center">
        <p className="text-2xl mb-10 text-primary-dark">How do you want to challenge yourself?</p>
      </Col>
      <Col
        span={24}
        className="flex justify-center text-xl text-[var(--color-body)] mb-10 sm:mb-16"
      >
        <span className={`${quizMode === 'medium' ? 'text-primary-dark' : 'text-error'}`}>
          {modes.filter((mode) => mode.value === 'medium')[0].label}
        </span>
        <Switch
          className="mt-0.5 mx-5"
          checked={quizMode === 'hard'}
          onChange={(checked) => {
            setQuizMode(checked ? 'hard' : 'medium');
          }}
        />
        <span className={`${quizMode === 'hard' ? 'text-primary-dark' : 'text-error'}`}>
          {modes.filter((mode) => mode.value === 'hard')[0].label}
        </span>
      </Col>
      <Col span={24} className="flex justify-center">
        <p className="text-xl mb-10 text-primary-dark">Tell us about your interest</p>
      </Col>
      <Col
        span={24}
        className="flex justify-center text-xl text-[var(--color-body)] mb-16 sm:mb-24"
      >
        <Row gutter={[0, 30]}>
          {genres.map((genre) => (
            <Col xs={12} sm={6} key={genre}>
              <Button
                key={genre}
                className={`button hover:bg-primary w-[170px] ${quizGenre === genre ? 'bg-primary' : 'bg-white text-black'}`}
                onClick={() => {
                  setQuizGenre(genre as QuestionGenreType);
                }}
              >
                {genre}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24} className="flex justify-center gap-4">
        <Button className="bg-white border-primary text-primary" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button
          className="button bg-primary"
          onClick={() => {
            // const to store the request body for api
            const reqBody = {
              genre: quizGenre as QuestionGenreType,
              mode: quizMode as QuestionModeType,
              numberOfQuestions: 10,
            };

            // calling fetchQuizDetails api
            fetchQuizDetails(modeGenreApi, reqBody, sessionId as string)
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
          }}
        >
          Continue
        </Button>
      </Col>
    </Row>
  );
};

export default QuizModePage;
