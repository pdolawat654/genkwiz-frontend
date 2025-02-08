import { Col, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FcApproval } from 'react-icons/fc';
import { QoTDType, QuestionDetailsType } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { revealQoTDAnswer } from '../../utils/apis';
import getMasterQotdUrl from '../../utils/helpers/getMasterQotdUrl';
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

type CorrectAnswerModalPropType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  questionDetails?: QuestionDetailsType;
};

const CorrectAnswerModal = ({
  isModalOpen,
  setIsModalOpen,
  questionDetails,
}: CorrectAnswerModalPropType) => {
  const navigate = useNavigate();
  const { qoTDType } = useParams();

  // States to manage the answer reveal data
  const [revealedAnswer, setRevealedAnswer] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | null>(null);

  // Function to reveal the answer
  const revealAnswer = async () => {
    let apiPath = '';
    switch (qoTDType) {
      case QoTDType.REGULAR:
        apiPath = qotdUrlRegular + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.RAMANAND:
        apiPath = qotdUrlInfiniteZounds + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.BERTY:
        apiPath = qotdUrlBertys + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.KAPINJAL:
        apiPath = qotdUrlTheKapsQuiz + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.Q2Chew:
        apiPath = qotdUrlQ2Chew + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.RC_CHALLENGE:
        apiPath = qotdUrlRCChallenge + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.TODAYS_QOTD:
        apiPath = qotdUrlTodays + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.KIDS:
        apiPath = kidsQotdUrl + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.ARCHIVE:
        apiPath = qotdUrlRegular + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.RAMANAND_ARCHIVE:
        apiPath = qotdUrlInfiniteZounds + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.BERTY_ARCHIVE:
        apiPath = qotdUrlBertys + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.KAPINJAL_ARCHIVE:
        apiPath = qotdUrlTheKapsQuiz + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.Q2Chew_ARCHIVE:
        apiPath = qotdUrlQ2Chew + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.RC_CHALLENGE_ARCHIVE:
        apiPath = qotdUrlRCChallenge + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.KIDS_ARCHIVE:
        apiPath = kidsQotdUrl + `/answer/${questionDetails?.id}`;
        break;

      case QoTDType.TODAYS_QOTD_ARCHIVE:
        apiPath = qotdUrlTodays + `/answer/${questionDetails?.id}`;
        break;

      default:
        return; // Exit function if none of the cases match
    }

    const data = await revealQoTDAnswer(apiPath);
    setRevealedAnswer(data.answer);
    setImage(data.image);
  };

  // useEffect to trigger answer reveal when modal opens
  useEffect(() => {
    if (isModalOpen) {
      revealAnswer();
    }
  }, [isModalOpen]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => {
        if (
          !(
            qoTDType === QoTDType.ARCHIVE ||
            qoTDType === QoTDType.KIDS_ARCHIVE ||
            qoTDType === QoTDType.RAMANAND_ARCHIVE ||
            qoTDType === QoTDType.KAPINJAL_ARCHIVE ||
            qoTDType === QoTDType.BERTY_ARCHIVE ||
            qoTDType === QoTDType.Q2Chew_ARCHIVE ||
            qoTDType === QoTDType.TODAYS_QOTD_ARCHIVE ||
            qoTDType === QoTDType.RC_CHALLENGE_ARCHIVE
          )
        ) {
          navigate('/score/' + getMasterQotdUrl(qoTDType as QoTDType) + '/correct', {
            replace: true,
          });
        }
        setIsModalOpen(false);
      }}
      className="modalBtn"
      cancelText="Got it!"
      destroyOnClose
      centered
      closeIcon={false}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <Col className="flex flex-col justify-center items-center mx-2 my-4 py-3">
        <FcApproval className="text-xl flex-1 pb-2" size={25} />
        <span className="text-lg text-primary-dark font-medium text-center">
          Congratulations! Your answer is correct
        </span>
        {revealedAnswer && (
          <span
            className="text-lg text-primary-dark font-medium text-center"
            dangerouslySetInnerHTML={{ __html: revealedAnswer }}
          />
        )}
        {image && (
          <span
            className="w-full text-sm font-medium text-center"
            dangerouslySetInnerHTML={{ __html: image }}
          />
        )}
      </Col>
    </Modal>
  );
};

export default CorrectAnswerModal;
