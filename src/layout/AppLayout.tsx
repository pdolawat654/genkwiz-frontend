import { Col, Grid, Row } from 'antd';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';
import ScrollToTop from '../utils/helpers/ScrollToTop';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

const { useBreakpoint } = Grid;

const AppLayout = () => {
  const navigate = useNavigate();

  const screens = useBreakpoint();

  return (
    <>
      <ScrollToTop />
      <Row
        className={`h-screen ${screens.xs && 'flex overflow-auto'}`}
        style={screens.xs ? { flexFlow: 'column' } : undefined}
      >
        <Col sm={8} className={`h-full ${screens.xs && 'w-full'}`}>
          <LeftLayout />
        </Col>
        <Col
          sm={16}
          xs={24}
          className={`flex flex-col justify-between overflow-auto h-full ${screens.xs ? 'mt-16' : ''}`}
        >
          <RightLayout />
          {/** App Footer Below */}
          {
            screens.xs &&
            <Row className="p-4 flex items-center justify-center gap-2 text-sm text-center">
              <span className="font-genkwizFont">GenKwiz &#169; {dayjs().year()}</span>
              <span
                className="text-underline cursor-pointer underline text-blue-500"
                onClick={() => {
                  navigate('/about');
                }}
              >
                About
              </span>
              <span
                className="text-underline cursor-pointer underline text-blue-500"
                onClick={() => {
                  navigate('/blog');
                }}
              >
                Blog
              </span>
            </Row>
          }
        </Col>
      </Row>
    </>
  );
};

export default AppLayout;
