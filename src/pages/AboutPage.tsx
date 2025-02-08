import { Button, Col, Row } from 'antd';

import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  facebookProfileUrl,
  instagramProfileUrl,
  linkedInProfileUrl,
  twitterProfileUrl,
  whatsAppCommunityProfileUrl,
} from '../utils/constants';

const AboutPage = () => {
  /* extracting "navigate" from useNavigate hook */
  const navigate = useNavigate();

  return (
    <Row className="mt-10 mx-4 text-start sm:text-nowrap sm:mt-20 sm:mx-0">
      <Col span={24} className="flex justify-center">
        <p className="text-2xl sm:text-3xl mb-8 text-primary-dark">About GenKwiz</p>
      </Col>
      <Col span={24} className="px-4 mb-12 sm:px-12">
        <div className="whitespace-normal text-lg leading-8">
          <p className="mb-3">
            Welcome to GenKwiz, where we celebrate the curious spirit of humanity. As social beings,
            we cherish both fun and knowledge, making every moment an opportunity to explore and
            learn.
          </p>
          <p className="mb-3">
            In a world of diminishing attention spans, GenKwiz stands as a humble oasis. We've
            crafted a platform that turns your fleeting minutes into an entertaining and
            enlightening experience, offering nuggets of information about the world around you.
          </p>
          <p className="mb-3">
            Our pride lies in the artful framing of questions that prompt you to delve into your
            memories, experiences, and subconscious to find answers. GenKwiz is more than just facts
            – it's an exploration of the Why's and the How's, unraveling the fascinating stories
            behind everything in a quizzical manner.
          </p>
          <p className="mb-8">
            Join us on this journey of discovery, where each question is a key to unlocking a new
            perspective. We hope you enjoy the adventure.
          </p>
          <p>
            Feel free to share your feedback on{' '}
            <a className="text-primary-dark" href="mailto:Shriram@GenKwiz.com" target="_blank">
              Shriram@GenKwiz.com
            </a>
          </p>
        </div>
      </Col>
      <Col span={24} className="flex justify-center space-x-12 text-3xl mb-8">
        <a href={facebookProfileUrl} target="_blank">
          <FaFacebook fill="#316FF6" />
        </a>
        <a href={twitterProfileUrl} target="_blank">
          <FaTwitter fill="#00ACED" />
        </a>
        <a href={whatsAppCommunityProfileUrl} target="_blank">
          <FaWhatsapp fill="#25D366" />
        </a>
        <a href={linkedInProfileUrl} target="_blank">
          <FaLinkedin fill="#007FB1" />
        </a>
        <a href={instagramProfileUrl} target="_blank">
          <FaInstagram fill="#cd486b" />
        </a>
      </Col>
      <Col span={24} className="flex justify-center items-center mb-8">
        <Button
          className="button bg-primary"
          onClick={() => {
            navigate('/welcome');
          }}
        >
          Home
        </Button>
      </Col>
    </Row>
  );
};

export default AboutPage;
