import { Col, Modal } from 'antd';
import { FcIdea } from 'react-icons/fc';
import { HintsType } from '../../utils/types';

type HintModalPropType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  hint?: HintsType;
};

const HintModal = ({ isModalOpen, setIsModalOpen, hint }: HintModalPropType) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      className="modalBtn"
      cancelText="Got it!"
      destroyOnClose
      centered
      okButtonProps={{ style: { display: 'none' } }}
    >
      <Col className="flex flex-col justify-center items-center mx-2 my-3 pt-3">
        <FcIdea className="text-xl flex-1 pb-1" size={25} />
        <span className="text-lg text-primary-dark font-semibold pb-3">Hint</span>
        <span
          className="text-center children-rounded-lg"
          dangerouslySetInnerHTML={{
            __html: hint?.text ?? 'There are no more hints.',
          }}
        />
      </Col>
    </Modal>
  );
};

export default HintModal;
