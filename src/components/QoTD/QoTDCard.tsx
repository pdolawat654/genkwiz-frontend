import { Card, Divider, Grid, Image, Modal } from 'antd';
import { PlayCircleOutlined, InfoCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QoTDType } from '../../utils/types';

type QuizMasterInfo = {
  name: string;
  about: string;
  profileImage?: string;
};

type QoTDCardPropType = {
  title: string;
  quizMasterInfo: QuizMasterInfo;
  qoTDType: QoTDType;
  archiveType: QoTDType;
  cardImage: string;
};

const { useBreakpoint } = Grid;

const QoTDCard = ({
  title,
  quizMasterInfo,
  qoTDType,
  archiveType,
  cardImage,
}: QoTDCardPropType) => {
  /* extracting "navigate" from useNavigate hook */
  const navigate = useNavigate();

  const screens = useBreakpoint();

  // state to store whether HintModal is open or not
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Card hoverable className="xl:w-96 lg:w-64  md:w-2/5 sm:w-full shadow-lg">
        <div className="flex flex-col gap-4 items-center">
          <Image
            alt="quiz image"
            src={cardImage}
            preview={false}
            width={qoTDType === QoTDType.KIDS || qoTDType == QoTDType.TODAYS_QOTD ? '90%' : '60%'}
          />
          <span className="font-semibold text-base truncate">{title}</span>
          <div className="border-b" />
          <div className="flex items-center justify-around w-full">
            <InfoCircleOutlined
              className="text-blue-600 text-xl"
              onClick={() => setIsModalOpen(true)}
              title={
                qoTDType === QoTDType.KIDS
                  ? 'Get to know about Kids QoTD'
                  : 'Get to know about Quiz master'
              }
            />
            <Divider type="vertical" />
            <PlayCircleOutlined
              className="text-green-600 text-xl"
              onClick={() => {
                navigate('/qotd/' + qoTDType);
              }}
              title="Play Quiz"
            />
            <Divider type="vertical" />
            <HistoryOutlined
              className="text-yellow-600 text-xl"
              onClick={() => navigate('/qotd/' + archiveType)}
              title="Explore Archives"
            />
          </div>
        </div>
      </Card>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        cancelText="Got it!"
        destroyOnClose
        centered
        width={600}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div className={`p-6 flex items-start gap-8 ${screens.xs && 'flex-wrap'}`}>
          {quizMasterInfo.profileImage && (
            <img
              src={quizMasterInfo.profileImage}
              alt="Person Avatar"
              className="object-cover w-40 rounded-xl"
            />
          )}
          <div className="max-h-[500px] flex flex-col overflow-auto">
            <span className="font-semibold text-lg mb-2">{quizMasterInfo.name}</span>
            <span dangerouslySetInnerHTML={{ __html: quizMasterInfo.about }} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QoTDCard;
