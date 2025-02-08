import { Button, Col, Image, Input, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generateSessionIdForQuiz } from '../utils/apis';
import { loginApi } from '../utils/constants';
import { useAppData } from '../contexts/AppContext';
import { FaChevronLeft } from 'react-icons/fa';

const PlayQuiz = () => {
  // destructuring app context
  const { userDetails, setUserDetails, setSessionId } = useAppData();

  // const to store the paths of avatars
  const avatarPaths: string[] = [];

  /* extracting "navigate" from useNavigate hook */
  const navigate = useNavigate();

  // this is based on the number of avatar images available in assets/avatars folder
  for (let image = 1; image <= 6; image++) {
    avatarPaths.push(`/assets/avatars/${image}.png`);
  }

  /**
   * @description Handles Quiz navigation
   */
  const handleQuizNavigation = () => {
    // api to generate the session id for the quiz
    generateSessionIdForQuiz(userDetails?.name as string, loginApi)
      .then((response) => {
        setSessionId(response.sessionId);
      })
      .catch((err) => {
        console.log(err);
        setSessionId(null);
        message.error('Error while fetching the response');
      });
    navigate('/mode');
  };

  return (
    <div className="pt-8 px-4 text-center sm:text-nowrap sm:px-2">
      <span
        className="mx-2 mb-6 flex items-center select-none gap-1 underline text-primary cursor-pointer"
        onClick={() => {
          navigate('/welcome');
        }}
      >
        <FaChevronLeft />
        Back to Home
      </span>
      <Row className="pt-8 px-4 flex gap-10 text-center sm:text-nowrap sm:px-2 sm:pt-20 overflow-auto">
        <Row className="text-center sm:text-nowrap">
          <Col span={24} className="flex justify-center mb-8 sm:hidden">
            <Image src="/assets/logos/genKwizLogo.png" width={100} />
          </Col>
          <Col span={24} className="flex justify-center">
            <p className="text-xl font-medium mb-4">Lets get started with your name</p>
          </Col>
          <Col span={24} className="flex justify-center mb-4 rounded-sm">
            <Row>
              <Col>
                <Input
                  key="name"
                  placeholder="Enter your name"
                  className="rounded-lg bg-[var(--color-input-bg)] hover:bg-[var(--color-input-bg)] focus:bg-[var(--color-input-bg)]"
                  onChange={(e) => {
                    setUserDetails({
                      name: e.target.value,
                      selectedAvatar: userDetails?.selectedAvatar
                        ? userDetails.selectedAvatar
                        : '/assets/avatars/1.png',
                    });
                  }}
                  value={userDetails ? (userDetails.name as string) : ''}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24} className="flex justify-center">
            <p className="text-xl font-medium mb-10">Which avatar describes you the best</p>
          </Col>
          <Col span={24} className="flex justify-around mb-10 px-6 sm:px-16">
            <Row>
              {avatarPaths.map((item) => (
                <Col xs={8} sm={4} className="flex justify-around" key={item}>
                  <Image
                    src={item}
                    key={item}
                    onClick={() => {
                      setUserDetails({
                        name: userDetails?.name as string,
                        selectedAvatar: item,
                      });
                    }}
                    width="fit-content"
                    preview={false}
                    className={`${userDetails?.selectedAvatar === item ? 'border-2 border-solid border-primary rounded-full' : ''} transition-all hover:scale-110`}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col
            span={24}
            className="px-16 flex flex-col items-center justify-center flex-wrap gap-4 sm:justify-around"
          >
            <Button
              className="button bg-primary sm:w-auto"
              onClick={handleQuizNavigation}
              disabled={!userDetails?.name}
            >
              Proceed
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default PlayQuiz;
