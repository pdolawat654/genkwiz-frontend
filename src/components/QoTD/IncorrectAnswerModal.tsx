import { Col, Modal } from 'antd';
import { useState } from 'react';
import { FcBadDecision, FcDecision } from 'react-icons/fc';
import { QoTDType, QuestionDetailsType } from '../../utils/types';
import {
  kidsQotdUrl,
  qotdUrlBertys,
  qotdUrlInfiniteZounds,
  qotdUrlQ2Chew,
  qotdUrlRegular,
  qotdUrlTheKapsQuiz,
  qotdUrlRCChallenge,
  qotdUrlTodays,
} from '../../utils/constants';
import { useNavigate, useParams } from 'react-router';
import { revealQoTDAnswer } from '../../utils/apis';
import getMasterQotdUrl from '../../utils/helpers/getMasterQotdUrl';

type IncorrectAnswerModalPropType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  questionDetails?: QuestionDetailsType;
  closeness?: string;
  hint?: string;
};

const IncorrectAnswerModal = ({
  isModalOpen,
  setIsModalOpen,
  questionDetails,
  closeness,
  hint,
}: IncorrectAnswerModalPropType) => {
  const navigate = useNavigate();
  const { qoTDType } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [revealedAnswer, setRevealedAnswer] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | null>(null);

  const revealAnswer = async () => {
    let apiPath = '';

    if (qoTDType === QoTDType.REGULAR) {
      apiPath = qotdUrlRegular + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.RAMANAND) {
      apiPath = qotdUrlInfiniteZounds + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.BERTY) {
      apiPath = qotdUrlBertys + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.KAPINJAL) {
      apiPath = qotdUrlTheKapsQuiz + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.Q2Chew) {
      apiPath = qotdUrlQ2Chew + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.RC_CHALLENGE) {
      apiPath = qotdUrlRCChallenge + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.TODAYS_QOTD) {
      apiPath = qotdUrlTodays + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.KIDS) {
      apiPath = kidsQotdUrl + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.ARCHIVE) {
      apiPath = qotdUrlRegular + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.RAMANAND_ARCHIVE) {
      apiPath = qotdUrlInfiniteZounds + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.BERTY_ARCHIVE) {
      apiPath = qotdUrlBertys + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.KAPINJAL_ARCHIVE) {
      apiPath = qotdUrlTheKapsQuiz + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.Q2Chew_ARCHIVE) {
      apiPath = qotdUrlQ2Chew + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.RC_CHALLENGE_ARCHIVE) {
      apiPath = qotdUrlRCChallenge + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.KIDS_ARCHIVE) {
      apiPath = kidsQotdUrl + `/answer/${questionDetails?.id}`;
    } else if (qoTDType === QoTDType.TODAYS_QOTD_ARCHIVE) {
      apiPath = qotdUrlTodays + `/answer/${questionDetails?.id}`;
    } else {
      return;
    }

    setIsLoading(true);

    const response = revealQoTDAnswer(apiPath);

    response.then((data) => {
      setRevealedAnswer(data.answer);
      setImage(data.image);
      setIsAnswerRevealed(data.isAnswerRevealed);
      setIsLoading(false);
    });
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      onOk={() => {
        if (!isAnswerRevealed) {
          revealAnswer();
          return;
        }
        setIsModalOpen(false);
        if (
          !(
            qoTDType === QoTDType.ARCHIVE ||
            qoTDType === QoTDType.KIDS_ARCHIVE ||
            qoTDType === QoTDType.RAMANAND_ARCHIVE ||
            qoTDType === QoTDType.KAPINJAL_ARCHIVE ||
            qoTDType === QoTDType.BERTY_ARCHIVE ||
            qoTDType === QoTDType.TODAYS_QOTD_ARCHIVE ||
            qoTDType === QoTDType.Q2Chew_ARCHIVE ||
            qoTDType === QoTDType.RC_CHALLENGE_ARCHIVE
          )
        ) {
          navigate('/score/' + `${getMasterQotdUrl(qoTDType as QoTDType)}` + '/' + 'incorrect', {
            replace: true,
          });
        }
      }}
      afterClose={() => {
        setIsAnswerRevealed(false);
        setRevealedAnswer(undefined);
      }}
      className="modalBtn"
      cancelText="Retry"
      okText={isAnswerRevealed ? 'Got it!' : 'Show Answer'}
      okButtonProps={{
        loading: isLoading,
        disabled: isLoading,
      }}
      cancelButtonProps={{
        style: { display: isAnswerRevealed ? 'none' : 'inline' },
      }}
      destroyOnClose={true}
      maskClosable={false}
      keyboard={false}
      closeIcon={false}
      centered
    >
      <Col className="flex flex-col justify-center items-center mx-2 my-4 py-4">
        {isAnswerRevealed ? (
          <FcDecision className="text-xl flex-1 pb-6" size={25} />
        ) : (
          <FcBadDecision className="text-xl flex-1 pb-6" size={25} />
        )}
        <span
          className={`text-lg font-medium text-center ${isAnswerRevealed ? 'text-primary-dark children-rounded-lg' : 'text-red-500'
            }`}
          style={!isAnswerRevealed ? { color: '#e74c3c' } : undefined}
          dangerouslySetInnerHTML={{
            __html: isAnswerRevealed
              ? `<span class="pb-3">The correct answer is </span>${revealedAnswer}`
              : 'Uh oh! That is an incorrect answer.',
          }}
        />
        {!isAnswerRevealed && (
          <>
            {closeness && (
              <span className="text-xl font-semibold text-warning">{closeness}</span>
            )}
            {hint && (
              <div className="py-3 text-center">
                <strong className="text-md">Hint:</strong>
                <p
                  className="text-sm text-muted"
                  style={{ color: 'blueviolet' }} // A visually appealing color for the hint
                >
                  {hint}
                </p>
              </div>
            )}
          </>
        )}
        {isAnswerRevealed && (
          <span
            className="w-full text-sm font-medium text-center children-rounded-lg"
            dangerouslySetInnerHTML={{
              __html: image ? `${image}` : '',
            }}
          />
        )}
        {/* {image && <Image alt="answer image" src={image} preview={false} width={100} />} */}
      </Col>
    </Modal>
  );
};

export default IncorrectAnswerModal;
