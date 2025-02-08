import { useEffect, useState } from 'react';
import { Button, Col, Image, Input, Modal, Radio, Row, Spin } from 'antd';
import { useAppData } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  fetchMcqOptionsUrl,
  questionStatus,
  quizStaticApi,
  submitQuizAnswerPath,
  submitScorePath,
} from '../../utils/constants';
import { fetchMcqOptions, submitQuiz, submitQuizQuestion } from '../../utils/apis';
import {
  QuestionDetailsType,
  AnswerType,
  SubmitQuizQuestionResponse,
  QuestionType,
  QuizFinalResponse,
  McqOptionsResponseType,
} from '../../utils/types';
import { AxiosResponse } from 'axios';
import HintModal from '../QoTD/HintModal';
import { FcApproval, FcBadDecision, FcDecision } from 'react-icons/fc';

const QuizQuestion = (props: {
  question: QuestionDetailsType;
  nextQuestionId: number;
  index: number;
  nextQuestionTime: number;
}) => {
  // app context destructuring
  const { userDetails, quizId, sessionId, quizLength, quizScore, setQuizScore, setQuizResponse } =
    useAppData();

  // useState to store subjective answer
  const [subjectiveAnswer, setSubjectiveAnswer] = useState<string>('');
  // state to store whether hint modal is open or not
  const [isHintModalOpen, setIsHintModalOpen] = useState<boolean>(false);
  // state to store whether correct modal is open or not
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState<boolean>(false);
  // state to store whether Incorrect modal is open or not
  const [isIncorrectModalOpen, setIsIncorrectModalOpen] = useState<boolean>(false);
  // state to store whether Any modal is open or not for time left
  const [isAnyModalOpen, setIsAnyModalOpen] = useState<boolean>(false);

  // state to store whether Incorrect modal is open or not
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  // state to store whether retry is disabled or not
  const [isDisabledRetry, setIsDisabledRetry] = useState<boolean>(false);
  // state to store whether answer
  const [answer, setAnswer] = useState<AnswerType>({ correct: false, correctAnswer: '', score: 0 });
  // state to store hintsUsed
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  // useState to store subjective answer
  const [mcqOptions, setMCQOptions] = useState<McqOptionsResponseType[] | undefined>(undefined);

  // props destructuring
  const { question, nextQuestionId, index, nextQuestionTime } = props;
  // extracting "navigate" from useNavigate hook
  const navigate = useNavigate();
  // Initial time left for each question
  const [timeLeft, setTimeLeft] = useState<number>(question?.mode?.maxTime);
  const [incorrectModalData, setIncorrectModalData] = useState({
    userAnswer: "",
    correctAnswer: "",
    closeness: "",
    aiHint: "",
    expectedAcceptability: "",
  });

  // server api url
  const quizSubmitQuestionURL =
    quizStaticApi + quizId + submitQuizAnswerPath + question?.serialNumber;
  const quizSubmitLastQuestionURL = quizStaticApi + quizId + submitScorePath;

  //set hint for new question
  useEffect(() => {
    if (question.type === 'MCQ') {
      const optionsData = fetchMcqOptions(fetchMcqOptionsUrl, question.id as unknown as string);
      optionsData.then((optionData) => {
        setMCQOptions(optionData);
      });
    }
    setHintsUsed(0);
  }, [question]);

  useEffect(() => {
    setIsAnyModalOpen(isHintModalOpen);
  }, [isHintModalOpen]);

  // Update timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnyModalOpen) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);
    // Cleanup the timer when the component unmounts or the question changes
    return () => clearInterval(timer);
  }, [question, isAnyModalOpen]);

  // Handle the case when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft]);

  // function to navigate to next question
  const goNextPage = () => {
    if (nextQuestionId) {
      navigate(`/quiz/${nextQuestionId}`);
      setTimeLeft(nextQuestionTime); // Reset timer for the next question
    } else navigate('/score/' + QuestionType.QUIZ + '/result', { replace: true });
    setSubjectiveAnswer('');
  };

  const submitLastQuestion = async () => {
    //submit quiz if last question
    if (question?.serialNumber === quizLength) {
      const quizFinalResponse: AxiosResponse<QuizFinalResponse> = await submitQuiz(
        quizSubmitLastQuestionURL,
        sessionId as string,
      );
      setQuizResponse(quizFinalResponse.data);
    }
  };

  // Function to handle when time runs out
  const handleTimeout = async () => {
    //calculating time taken to solve the question
    const timeTaken = question?.mode?.maxTime - timeLeft;

    //saving the details on the server
    const body = {
      userTime: timeTaken,
      hintsUsed:
        hintsUsed > (question?.hints ?? []).length ? (question?.hints ?? []).length : hintsUsed,
      status: questionStatus.ATTEMPTED,
      userAnswer: !subjectiveAnswer || subjectiveAnswer.length === 0 ? null : '',
      typeOfQuestion: question?.type,
    };

    submitQuizQuestion(quizSubmitQuestionURL, body, sessionId as string).catch((e: Error) => {
      console.log('Error', e);
    });

    //submit quiz if last question
    submitLastQuestion();
    goNextPage();
  };

  // Function to handle when user skips the question
  const skipHandle = async () => {
    //calculating time taken to solve the question
    const timeTaken = question?.mode?.maxTime - timeLeft;

    // saving the details on the server
    const body = {
      userTime: timeTaken,
      hintsUsed:
        hintsUsed > (question?.hints ?? []).length ? (question?.hints ?? []).length : hintsUsed,
      status: questionStatus.SKIPPED,
      userAnswer: '',
      typeOfQuestion: question.type,
    };
    submitQuizQuestion(quizSubmitQuestionURL, body, sessionId as string);

    //submit quiz if last question
    submitLastQuestion();

    goNextPage();
  };

  // function to handle if the user ends quiz
  const endQuizHandle = async () => {
    const quizFinalResponse: AxiosResponse<QuizFinalResponse> = await submitQuiz(
      quizSubmitLastQuestionURL,
      sessionId as string,
    );
    setQuizResponse(quizFinalResponse.data);
    navigate('/score/' + QuestionType.QUIZ + '/result');
  };

  //function to handle answer submit
  const handleSubmit = async () => {
    const timeTaken = question?.mode?.maxTime - timeLeft;

    // Saving the details on the server
    const body = {
      userTime: timeTaken,
      hintsUsed:
        hintsUsed > (question?.hints ?? []).length ? (question?.hints ?? []).length : hintsUsed,
      status: questionStatus.ATTEMPTED,
      userAnswer: subjectiveAnswer,
      typeOfQuestion: question.type,
    };

    try {
      const quizQuestionResponse: AxiosResponse<SubmitQuizQuestionResponse> =
        await submitQuizQuestion(quizSubmitQuestionURL, body, sessionId as string);

      const {
        correct,
        score,
        correctAnswer,
        closeness,
        aiHint,
        userAnswer,
        expectedAcceptability,
      } = quizQuestionResponse.data;

      setQuizScore((prev) => prev + score);
      setAnswer({ correctAnswer, score, correct });

      // Open respective modals with additional context
      if (correct) {
        setIsAnyModalOpen(true);
        setIsCorrectModalOpen(true);
      } else {
        setIsAnyModalOpen(true);
        setIsIncorrectModalOpen(true);
        setIncorrectModalData({
          userAnswer,
          correctAnswer,
          closeness,
          aiHint,
          expectedAcceptability,
        });
      }
    } catch (error) {
      console.error("Error submitting quiz question:", error);
    }
  };


  const handleCorrectAnswer = () => {
    setIsAnyModalOpen(false);
    setIsCorrectModalOpen(false);
    submitLastQuestion();
    goNextPage();
  };

  const handleIncorrectAnswerNext = async () => {
    const timeTaken = question?.mode?.maxTime - timeLeft;

    //saving the details on the server
    const body = {
      userTime: timeTaken,
      hintsUsed:
        hintsUsed > (question?.hints ?? []).length ? (question?.hints ?? []).length : hintsUsed,
      status: questionStatus.ATTEMPTED,
      userAnswer: subjectiveAnswer,
      typeOfQuestion: question.type,
    };
    const quizQuestionResponse: AxiosResponse<SubmitQuizQuestionResponse> =
      await submitQuizQuestion(quizSubmitQuestionURL, body, sessionId as string);

    setQuizScore((prev) => prev + quizQuestionResponse.data.score);

    //submit quiz if last question
    submitLastQuestion();
    setAnswer({ correct: false, correctAnswer: '', score: 0 });
    setShowAnswer(false);
    setIsAnyModalOpen(false);
    setIsIncorrectModalOpen(false);
    setIsDisabledRetry(false);
    goNextPage();
  };

  return (
    <Row className="pb-6 text-center sm:text-nowrap">
      <Col span={24} className="sticky top-0 mb-10 z-[499]">
        <Row className="flex justify-between items-center px-3 py-3 sm:px-6 bg-primary text-white">
          <Col className="text-sm sm:text-lg">Score: {quizScore}</Col>
          <Col className="text-sm sm:text-lg">Question: {index + 1}/10</Col>
          <Col className="text-sm sm:text-lg">Time Left: {timeLeft}</Col>
          <Col className="flex items-center gap-2 text-sm sm:text-lg">
            <Image
              src={`${userDetails?.selectedAvatar}`}
              key={userDetails?.selectedAvatar}
              width="35px"
              preview={false}
              className="rounded-full border-2 border-solid border-primary-dark hover:scale-110"
            />
            <span>{userDetails?.name}</span>
          </Col>
        </Row>
      </Col>
      {/* <hr className="h-px w-full bg-black border-0 mb-10" /> */}
      {question ? (
        <>
          <Col span={24} className="max-w-full mb-8 px-4 sm:px-6">
            <div
              className="whitespace-normal text-start sm:text-base leading-6 sm:leading-7 p-4 children-rounded-lg bg-white card-shadow rounded-lg"
              dangerouslySetInnerHTML={{
                __html: question.text,
              }}
            />
          </Col>
          <Col span={24} className="flex justify-center mb-10 rounded-sm px-4 sm:px-6">
            {question.type === 'MCQ' ? (
              <Radio.Group
                name="subjectiveAnswer"
                className="flex justify-between items-center w-full flex-col lg:flex-row lg:flex-wrap gap-4"
                onChange={(e) => setSubjectiveAnswer(e.target.value)}
              >
                {mcqOptions &&
                  mcqOptions.map((option) => {
                    return (
                      <Radio
                        value={option.answerValue}
                        key={option.id}
                        className="w-full lg:w-[48%] m-0 text-left rounded-lg p-4 card-shadow bg-white hover:bg-slate-400 hover:text-white hover:scale-105"
                      >
                        {option.answerValue}
                      </Radio>
                    );
                  })}
              </Radio.Group>
            ) : (
              <Input
                key="subjectiveAnswer"
                placeholder="Enter your answer"
                className="border-4 rounded-lg"
                onChange={(e) => {
                  setSubjectiveAnswer(e.target.value);
                }}
                value={subjectiveAnswer}
              />
            )}
          </Col>

          <Col span={24}>
            <Row className="px-6 flex items-center justify-between flex-wrap gap-4 sm:justify-between">
              <Button
                className="button bg-primary disabled:bg-[var(--color-primary-disabled)] w-[45%] sm:w-[10%]"
                disabled={!subjectiveAnswer}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
              <Button
                className="button text-primary disabled:bg-[var(--color-primary-disabled)] w-[45%] sm:w-[10%]"
                onClick={() => {
                  skipHandle();
                }}
              >
                Skip
              </Button>
              <Button
                className="button text-primary disabled:bg-[var(--color-primary-disabled)] w-[45%] sm:w-[10%]"
                disabled={!question.hints}
                onClick={() => {
                  setIsHintModalOpen(true);
                  setHintsUsed((prev) => prev + 1);
                }}
              >
                Hint
              </Button>
              <Button
                className="button bg-red-400 border-red-400 w-[45%] sm:w-[10%]"
                onClick={() => {
                  endQuizHandle();
                }}
              >
                End Quiz
              </Button>
            </Row>
          </Col>

          {/* {Hint Modal} */}
          <HintModal
            isModalOpen={isHintModalOpen}
            setIsModalOpen={setIsHintModalOpen}
            hint={question?.hints && question?.hints[hintsUsed - 1]}
          />

          {/* {Correct Modal} */}
          <Modal
            open={isCorrectModalOpen}
            onOk={() => {
              handleCorrectAnswer();
            }}
            closable={false}
            className="modalBtn"
            okText="Next"
            destroyOnClose
            centered
            cancelButtonProps={{ style: { display: 'none' } }}

          >
            <Col className="flex flex-col justify-center items-center mx-2 my-4 py-3">
              <FcApproval className="text-xl flex-1 pb-2" size={25} />
              <span className="text-lg text-primary-dark font-medium text-center">
                Congratulations! Your answer is correct
              </span>
              <br />
              <span className="pb-3">The correct answer is </span>
              <span
                className="text-lg text-primary-dark font-medium text-center children-rounded-lg"
                dangerouslySetInnerHTML={{
                  __html: answer?.correctAnswer,
                }}
              />
              {answer?.image && (
                <Image alt="answer image" src={answer?.image} preview={false} width={100} />
              )}
            </Col>

          </Modal>

          {/* {Incorrect Modal} */}
          <Modal
            open={isIncorrectModalOpen}
            onCancel={() => { }}
            closable={false}
            okButtonProps={{ disabled: isDisabledRetry }}
            className="modalBtn"
            okText="Retry"
            cancelText="Show answer and Next"
            destroyOnClose
            centered
            footer={[
              <Button
                key={'retry'}
                onClick={() => {
                  setIsAnyModalOpen(false);
                  setIsIncorrectModalOpen(false);
                }}
                disabled={isDisabledRetry}
              >
                Retry
              </Button>,
              <Button
                key={'answer'}
                onClick={() => {
                  setIsDisabledRetry(true);
                  setShowAnswer(true);
                }}
              >
                Show Answer
              </Button>,
              <Button
                key={'next'}
                className="button"
                type="primary"
                onClick={() => {
                  handleIncorrectAnswerNext();
                }}
              >
                Next
              </Button>,
            ]}
          >
            <Col className="flex flex-col justify-center items-center mx-2 my-4 py-3">
              {/* Icon based on correctness */}
              {showAnswer ? (
                <FcDecision className="text-xl flex-1 pb-2" size={25} />
              ) : (
                <FcBadDecision className="text-xl flex-1 pb-2" size={25} />
              )}

              {/* Feedback based on answer correctness */}
              {showAnswer ? (
                <>
                  <span className="text-lg text-primary-dark font-medium text-center">
                    The correct answer is
                  </span>
                  <span
                    className="text-lg text-primary-dark font-medium text-center children-rounded-lg"
                    dangerouslySetInnerHTML={{
                      __html: `${answer?.correctAnswer}`,
                    }}
                  />
                  {/* Show the answer image if available */}
                  {answer?.image && (
                    <Image alt="answer image" src={answer?.image} preview={false} width={100} />
                  )}
                </>
              ) : (
                <>
                  {/* Incorrect answer feedback */}
                  <span
                    className="text-lg font-medium text-center"
                    style={{ color: '#e74c3c' }}  // A softer, but still strong red shade
                  >
                    Uh oh! That is an incorrect answer.
                  </span>
                  <div className="text-center pt-3">
                    {/* Closeness feedback */}
                    <span className="text-xl font-semibold text-warning">
                      {incorrectModalData.closeness}
                    </span>
                  </div>
                  {/* Hint */}
                  {incorrectModalData.aiHint && (
                    <div className="py-3 text-center">
                      <strong className="text-md">Hint:</strong>
                      <p className="text-sm text-muted"
                        style={{ color: 'blueviolet' }}  // A softer, but still strong red shade

                      >{incorrectModalData.aiHint}</p>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Modal>
        </>
      ) : (
        <Col span={24} className="h-screen flex justify-center">
          <Spin />
        </Col>
      )}
    </Row>
  );
};

export default QuizQuestion;
