import { Button, Col, DatePicker, Divider, Input, Radio, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { McqOptionsResponseType, QoTDType, QuestionAttemptType } from '../utils/types';
import HintModal from '../components/QoTD/HintModal';
import CorrectAnswerModal from '../components/QoTD/CorrectAnswerModal';
import IncorrectAnswerModal from '../components/QoTD/IncorrectAnswerModal';
import { useAppData } from '../contexts/AppContext';
import { fetchMcqOptions, fetchQoTD, submitQoTDAnswer } from '../utils/apis';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import {
  fetchMcqOptionsUrl,
  historicalQotdUrl,
  kidsQotdUrl,
  qotdUrlBertys,
  qotdUrlInfiniteZounds,
  qotdUrlRegular,
  qotdUrlTheKapsQuiz,
  qotdUrlQ2Chew,
  qotdUrlRCChallenge,
  qotdUrlTodays,
} from '../utils/constants';
import { FaChevronLeft } from 'react-icons/fa';
import getMasterQotdUrl from '../utils/helpers/getMasterQotdUrl';

const QuestionPage = () => {
  /* destructuring useNavigate */
  const navigate = useNavigate();

  /* destructuring params */
  const { qoTDType } = useParams();

  // destructuring app context
  const { questionDetails, setQuestionDetails, setQoTDScore, setQoTDStreak } = useAppData();

  const [heading, setHeading] = useState<string>('Question of the Day');

  // state used to to store the selected archive date
  const [qoTDArchiveDate, setQoTDArchiveDate] = useState<Dayjs | null>(dayjs().subtract(1, 'days'));

  // useState to store subjective answer
  const [subjectiveAnswer, setSubjectiveAnswer] = useState<string | undefined>();

  // useState to store subjective answer
  const [mcqOptions, setMCQOptions] = useState<McqOptionsResponseType[] | undefined>();

  // state to to store qotd loader
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // state to to store submit answer loader
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // state to store whether HintModal is open or not
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  const [hintsUsed, setHintsUsed] = useState<number>(0);

  // state to store whether CorrectAnswerModal is open or not
  const [showCorrectAnswerModal, setShowCorrectAnswerModal] = useState<boolean>(false);

  // state to store whether IncorrectAnswerModal is open or not
  const [showIncorrectAnswerModal, setShowIncorrectAnswerModal] = useState<boolean>(false);

  // useState to store closeness to answer as per AI
  const [closenesstoUserAnswer, setClosenesstoUserAnswer] = useState<string | undefined>();

  // useState to store ai hint 
  const [aiHint, setAIhint] = useState<string | undefined>();


  useEffect(() => {
    initializeQuestion();
  }, [qoTDArchiveDate]);

  /**
   * @description Initialize states for QoTD
   */
  const initializeQuestion = async () => {
    let apiPath = '';

    if (qoTDType === QoTDType.REGULAR) {
      apiPath = qotdUrlRegular;
      setHeading("Shriram's QoTD");
    } else if (qoTDType === QoTDType.RAMANAND) {
      apiPath = qotdUrlInfiniteZounds;
      setHeading('Infinite Zounds');
    } else if (qoTDType === QoTDType.BERTY) {
      apiPath = qotdUrlBertys;
      setHeading("Berty's question");
    } else if (qoTDType === QoTDType.KAPINJAL) {
      apiPath = qotdUrlTheKapsQuiz;
      setHeading('The Kaps Quiz');
    } else if (qoTDType === QoTDType.Q2Chew) {
      apiPath = qotdUrlQ2Chew;
      setHeading('Questions 2 Chew');
    } else if (qoTDType === QoTDType.RC_CHALLENGE) {
      apiPath = qotdUrlRCChallenge;
      setHeading(`RC's Challenge`);
    } else if (qoTDType === QoTDType.KIDS) {
      apiPath = kidsQotdUrl;
      setHeading('Kids question of the day');
    } else if (qoTDType === QoTDType.TODAYS_QOTD) {
      apiPath = qotdUrlTodays;
      setHeading('What Made Today Special?');
    } else {
      if (qoTDArchiveDate) {
        if (qoTDType === QoTDType.ARCHIVE) {
          apiPath = qotdUrlRegular + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHeading("Shriram's QoTD archive");
          setHintsUsed(0);
        } else if (qoTDType === QoTDType.RAMANAND_ARCHIVE) {
          apiPath = qotdUrlInfiniteZounds + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHeading('Infinite Zounds Archive');
          setHintsUsed(0);
        } else if (qoTDType === QoTDType.BERTY_ARCHIVE) {
          apiPath = qotdUrlBertys + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHeading("Berty's Questions' Archive");
          setHintsUsed(0);
        } else if (qoTDType === QoTDType.KAPINJAL_ARCHIVE) {
          apiPath = qotdUrlTheKapsQuiz + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHintsUsed(0);
          setHeading('The Kaps Quiz Archive');
        } else if (qoTDType === QoTDType.Q2Chew_ARCHIVE) {
          apiPath = qotdUrlQ2Chew + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHintsUsed(0);
          setHeading('Questions 2 Chew Archive');
        } else if (qoTDType === QoTDType.RC_CHALLENGE_ARCHIVE) {
          apiPath = qotdUrlRCChallenge + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHintsUsed(0);
          setHeading(`RC's Challenge Archive`);
        } else if (qoTDType === QoTDType.KIDS_ARCHIVE) {
          apiPath = kidsQotdUrl + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHeading('Kids Question of the Day Archive');
          setHintsUsed(0);
        } else if (qoTDType === QoTDType.TODAYS_QOTD_ARCHIVE) {
          apiPath = qotdUrlTodays + `/${qoTDArchiveDate?.format('YYYY-MM-DD')}`;
          setHeading('What Made Today Special? Archive');
          setHintsUsed(0);
        } else {
          return;
        }
      } else {
        return;
      }
    }

    setIsLoading(true);

    // function to fetch the question of the day
    const response = fetchQoTD(apiPath);

    response.then((data) => {
      setIsLoading(false);

      // console.log({ data });

      if (data.questions[0]?.type === 'MCQ') {
        const optionsData = fetchMcqOptions(fetchMcqOptionsUrl, data.questions[0].id.toString());
        optionsData.then((optionData) => {
          setMCQOptions(optionData);
        });
      }
      setQuestionDetails(data.questions);
      setQoTDScore(data.qoTDScore);
      setQoTDStreak(data.streak);

      if (
        qoTDType !== QoTDType.ARCHIVE &&
        qoTDType !== QoTDType.BERTY_ARCHIVE &&
        qoTDType !== QoTDType.KAPINJAL_ARCHIVE &&
        qoTDType !== QoTDType.KIDS_ARCHIVE &&
        qoTDType !== QoTDType.RAMANAND_ARCHIVE &&
        qoTDType !== QoTDType.Q2Chew_ARCHIVE &&
        qoTDType !== QoTDType.RC_CHALLENGE_ARCHIVE &&
        qoTDType !== QoTDType.TODAYS_QOTD_ARCHIVE &&
        data.status === QuestionAttemptType.ATTEMPTED
      ) {
        navigate('/score/' + `${getMasterQotdUrl(qoTDType)}` + '/' + 'attempted', {
          replace: true,
        });
      }
    });
  };

  /**
   * @description Handles the submit event
   */
  const handleSubmitAnswer = () => {
    let apiPath = '';

    if (qoTDType === QoTDType.REGULAR) {
      apiPath = qotdUrlRegular + '/submit';
    } else if (qoTDType === QoTDType.RAMANAND) {
      apiPath = qotdUrlInfiniteZounds + '/submit';
    } else if (qoTDType === QoTDType.BERTY) {
      apiPath = qotdUrlBertys + '/submit';
    } else if (qoTDType === QoTDType.KAPINJAL) {
      apiPath = qotdUrlTheKapsQuiz + '/submit';
    } else if (qoTDType === QoTDType.Q2Chew) {
      apiPath = qotdUrlQ2Chew + '/submit';
    } else if (qoTDType === QoTDType.RC_CHALLENGE) {
      apiPath = qotdUrlRCChallenge + '/submit';
    } else if (qoTDType === QoTDType.KIDS) {
      apiPath = kidsQotdUrl + '/submit';
    } else if (qoTDType === QoTDType.TODAYS_QOTD) {
      apiPath = qotdUrlTodays + '/submit';
    } else if (qoTDType === QoTDType.ARCHIVE) {
      apiPath = historicalQotdUrl + '/submit';
    } else if (qoTDType === QoTDType.RAMANAND_ARCHIVE) {
      apiPath = qotdUrlInfiniteZounds + '/historical/submit';
    } else if (qoTDType === QoTDType.BERTY_ARCHIVE) {
      apiPath = qotdUrlBertys + '/historical/submit';
    } else if (qoTDType === QoTDType.KAPINJAL_ARCHIVE) {
      apiPath = qotdUrlTheKapsQuiz + '/historical/submit';
    } else if (qoTDType === QoTDType.Q2Chew_ARCHIVE) {
      apiPath = qotdUrlQ2Chew + '/historical/submit';
    } else if (qoTDType === QoTDType.RC_CHALLENGE_ARCHIVE) {
      apiPath = qotdUrlRCChallenge + '/historical/submit';
    } else if (qoTDType === QoTDType.KIDS_ARCHIVE) {
      apiPath = kidsQotdUrl + '/historical/submit';
    } else if (qoTDType === QoTDType.TODAYS_QOTD_ARCHIVE) {
      apiPath = qotdUrlTodays + '/historical/submit';
    } else {
      return;
    }

    setIsSubmitting(true);

    const inputData = {
      hintsUsed:
        hintsUsed > (questionDetails[0]?.hints ?? []).length
          ? (questionDetails[0]?.hints ?? []).length
          : hintsUsed,
      userTime: 0,
      status: QuestionAttemptType.ATTEMPTED,
      userAnswer: subjectiveAnswer ?? '',
      typeOfQuestion: questionDetails[0] && questionDetails[0].type,
      questionId: questionDetails[0] && questionDetails[0].id,
    };

    const response = submitQoTDAnswer(apiPath, inputData);

    response.then((data) => {
      setQoTDScore(data.qotdScore);
      setQoTDStreak(data.streak);

      if (data.isCorrect) {
        setShowCorrectAnswerModal(true);
        setIsSubmitting(false);
        return;
      }

      setShowIncorrectAnswerModal(true);
      setIsSubmitting(false);
      setClosenesstoUserAnswer(data.openAIAnsEvalResponseDto?.closeness);
      setAIhint(data.openAIAnsEvalResponseDto?.hint);
    });
  };

  // function to render loading state or no question available message
  const renderOnLoadingOrNoQuestion = () => {
    if (!isLoading && questionDetails.length > 0) {
      return (
        <Col span={24} className="my-10 flex justify-center">
          <Spin />
        </Col>
      );
    }
    if (
      questionDetails.length === 0 &&
      (qoTDType === QoTDType.ARCHIVE ||
        qoTDType === QoTDType.RAMANAND_ARCHIVE ||
        qoTDType === QoTDType.KAPINJAL_ARCHIVE ||
        qoTDType === QoTDType.BERTY_ARCHIVE ||
        qoTDType === QoTDType.Q2Chew_ARCHIVE ||
        qoTDType === QoTDType.RC_CHALLENGE_ARCHIVE ||
        qoTDType === QoTDType.TODAYS_QOTD_ARCHIVE ||
        qoTDType === QoTDType.KIDS_ARCHIVE)
    ) {
      return (
        <Col span={24} className="my-10 flex justify-center">
          <p className="text-lg text-primary-dark">
            No question available for{' '}
            <span className="font-medium">
              {qoTDArchiveDate && qoTDArchiveDate.format('ddd, MMM DD YYYY')}.
            </span>{' '}
            Please try another date. Thank you.
          </p>
        </Col>
      );
    }
    if (
      questionDetails.length === 0 &&
      (qoTDType === QoTDType.KIDS ||
        qoTDType === QoTDType.REGULAR ||
        qoTDType === QoTDType.RAMANAND ||
        qoTDType === QoTDType.BERTY ||
        qoTDType === QoTDType.KAPINJAL ||
        qoTDType === QoTDType.Q2Chew ||
        qoTDType === QoTDType.TODAYS_QOTD ||
        qoTDType === QoTDType.RC_CHALLENGE)
    ) {
      return (
        <Col span={24} className="my-10 flex justify-center">
          <p className="text-lg text-primary-dark">
            Masters are still thinking about today's challenge. Question will be loaded soon. Please
            try again after sometime.
          </p>
        </Col>
      );
    }
    return (
      <Col span={24} className="my-10 flex justify-center">
        <p className="text-lg text-primary-dark">Uh oh! Seems like the QM overslept!</p>
      </Col>
    );
  };

  return (
    <div
      className={`pt-10 px-4 text-center sm:text-nowrap h-full overflow-auto ${qoTDType === QoTDType.KIDS ? 'kids-bg' : 'genkwiz-bg'
        }`}
    >
      <span
        className="mx-4 mb-6 flex items-center gap-1 underline text-primary select-none cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaChevronLeft />
        Go Back
      </span>

      <Row className="w-full mb-2 flex flex-col items-center justify-center gap-2">
        {location.pathname.includes(QoTDType.ARCHIVE) ? (
          <>
            <span className="text-2xl sm:text-3xl mb-4 text-primary-dark">{heading}</span>
            <span className="text-sm sm:text=base text-primary">
              Click on the box below to select a date
            </span>
            <div className="mb-4 flex items-center gap-4">
              <Button
                className="button text-xs text-primary-dark disabled:bg-[var(--color-primary-dark-disabled)]"
                disabled={!qoTDArchiveDate}
                onClick={() => {
                  setQoTDArchiveDate((prev) => prev?.subtract(1, 'days') ?? null);
                }}
                size="small"
              >
                Previous
              </Button>
              <DatePicker
                disabledDate={(current: Dayjs) =>
                  current > dayjs().subtract(1, 'days').endOf('day') ||
                  current < dayjs('2022-05-14').endOf('day')
                }
                className="rounded-lg"
                onChange={(value: Dayjs) => setQoTDArchiveDate(value)}
                value={qoTDArchiveDate}
              />
              <Button
                className="button text-xs text-primary-dark disabled:bg-[var(--color-primary-dark-disabled)]"
                disabled={
                  !qoTDArchiveDate || qoTDArchiveDate > dayjs().subtract(2, 'days').endOf('day')
                }
                onClick={() => {
                  setQoTDArchiveDate((prev) => prev?.add(1, 'days') ?? null);
                }}
                size="small"
              >
                Next
              </Button>
            </div>
            {qoTDArchiveDate && (
              <div className="mx-4 flex items-center justify-center flex-wrap gap-1 text-base">
                <span>You are playing Question from</span>
                <span className="font-medium">{qoTDArchiveDate.format('ddd, MMM DD YYYY')}</span>
              </div>
            )}
            <Divider />
          </>
        ) : (
          <span className="mb-4 text-2xl sm:text-3xl text-primary-dark">{heading}</span>
        )}
      </Row>
      {isLoading ? (
        <div className="h-72 flex items-center justify-center text-xl font-normal text-gray-500">
          Loading...
        </div>
      ) : questionDetails.length > 0 ? (
        <>
          <Col span={24} className="max-w-full mb-8 px-4 sm:px-6">
            <div
              className="whitespace-normal text-start sm:text-base leading-6 sm:leading-7 p-4 children-rounded-lg bg-white card-shadow rounded-lg"
              dangerouslySetInnerHTML={{
                __html: questionDetails[0]?.text ?? '',
              }}
            />
          </Col>
          <Col span={24} className="flex justify-center mb-10 rounded-sm px-4 sm:px-6">
            {questionDetails[0].type === 'MCQ' ? (
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
                        className="w-full lg:w-[48%] m-0 text-left rounded-lg p-4 card-shadow transition-all bg-white hover:bg-slate-400 hover:text-white hover:scale-105"
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
            <Row className="mb-8 px-4 sm:px-8">
              <Col span={12} className="mb-4 sm:mb-0 flex justify-start">
                <Button
                  className="button bg-primary-dark disabled:bg-[var(--color-primary-dark-disabled)]"
                  onClick={handleSubmitAnswer}
                  loading={isSubmitting}
                  disabled={isSubmitting || !subjectiveAnswer}
                >
                  Submit
                </Button>
              </Col>
              {questionDetails[0].type !== 'MCQ' && (
                <Col span={12} className="mb-4 sm:mb-0 flex justify-end">
                  <Button
                    className="button bg-primary disabled:bg-[var(--color-primary-dark-disabled)]"
                    disabled={!questionDetails[0]?.hints}
                    onClick={() => {
                      setShowHintModal(true);
                      setHintsUsed((prev) => prev + 1);
                    }}
                  >
                    Hint
                  </Button>
                </Col>
              )}
            </Row>
          </Col>

          {/* Correct Answer Modal Below */}
          <CorrectAnswerModal
            isModalOpen={showCorrectAnswerModal}
            setIsModalOpen={setShowCorrectAnswerModal}
            questionDetails={questionDetails[0]}
          />

          {/* Incorrect Answer Modal Below */}
          <IncorrectAnswerModal
            isModalOpen={showIncorrectAnswerModal}
            setIsModalOpen={setShowIncorrectAnswerModal}
            questionDetails={questionDetails[0]}
            closeness={closenesstoUserAnswer}
            hint={aiHint}
          />

          {/* Hint Modal Below */}
          <HintModal
            isModalOpen={showHintModal}
            setIsModalOpen={setShowHintModal}
            hint={questionDetails[0]?.hints && questionDetails[0]?.hints[hintsUsed - 1]}
          />
        </>
      ) : (
        renderOnLoadingOrNoQuestion()
      )}
    </div>
  );
};

export default QuestionPage;
