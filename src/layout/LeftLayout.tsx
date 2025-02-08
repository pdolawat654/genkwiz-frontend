import { Col, Grid, Image, Row } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

const { useBreakpoint } = Grid;

const LeftLayout = () => {

  const screens = useBreakpoint();
  // const location = useLocation();
  const navigate = useNavigate();

  return(
    <Row style={{ backgroundImage: 'var(--color-gradient)' }} className={screens.xs ? "w-full" : "h-full"}>
      {
        screens.xs
        ?
          <div
            style={{ backgroundImage: 'var(--color-gradient)' }} 
            className='w-full h-16 flex items-center justify-center gap-2 bg-primary font-genkwizFont'
          >
            <Image src="/assets/logos/genKwizLogo.png" width={30} preview={false} />
            <span className='text-3xl font-semibold text-white font-genkwizFont select-none'>GenKwiz</span>
          </div>
        :
          <>
            <Col span={24} className="flex justify-center items-end">
              <Image src="/assets/logos/genKwizLogo.png" width={180} preview={false} />
            </Col>
            <Col
              span={24}
              className="flex-grow flex justify-center items-start text-white text-[5vw] font-genkwizFont font-semibold"
            >
              GenKwiz
            </Col>
            <Col span={24} className="flex justify-center text-white text-3xl text-center">
              Interactive Quizzing Platform
            </Col>
            <Col span={24} className="flex items-center justify-center gap-2 text-sm text-center text-white">
              <span className="font-genkwizFont">GenKwiz &#169; {dayjs().year()}</span>
              <span
                className="text-underline cursor-pointer underline"
                onClick={() => {
                  navigate('/about');
                }}
              >
                About
              </span>
              <span
                className="text-underline cursor-pointer underline"
                onClick={() => {
                  navigate('/blog');
                }}
              >
                Blog
              </span>
            </Col>
          </>
      }
    </Row>
)
};

export default LeftLayout;
