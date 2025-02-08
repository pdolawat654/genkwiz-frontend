import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import FollowUs from '../components/FollowUs';

const Blog = () => {
  /* extracting "navigate" from useNavigate hook */
  const navigate = useNavigate();

  return (
    <Row className=" mt-10 mx-4 text-start sm:text-nowrap sm:mt-20 sm:mx-0">
      <Col span={24} className="flex justify-center">
        <span className="px-2 text-2xl mb-8 text-primary-dark text-center">
          The story behind the trivia powerhouse!
        </span>
      </Col>
      <Col span={24} className="px-4 mb-12 sm:px-12">
        <div className="flex flex-col gap-2 whitespace-normal text-lg leading-8">
          <span>
            At GenKwiz, we believe in the power of curiosity and the joy of learning. Our platform
            isn't just about general knowledge quizzes; it's about unraveling stories, igniting
            minds, and fostering a love for knowledge.
          </span>
          <span>
            In this blog post, we invite you on a journey behind the scenes to discover the story
            behind GenKwiz - from the initial spark of curiosity to the creation of engaging quizzes
            that captivate minds. For our founder, Shriram, the journey of GenKwiz began during his
            college days at the College of Engineering Pune. They say a human being is a fun-loving
            social animal with an innate craving for knowledge. Shriram caught this bug during his
            college days, fueled by techno-cultural events and the quest for knowledge checks. It
            was there that he developed a deep curiosity for the stories behind everything, fueled
            by history quizzes and the thirst for trivia. One question, linking Archimedes and
            Sherlock Holmes, sparked an "Eureka" moment, igniting a passion for quizzing that would
            shape the future of GenKwiz.
          </span>
          <span>
            What started as a hobby - asking fun riddles for adults to friends, maintaining a blog
            overflowing with brain teasers, and creating his own quiz maker for friends - evolved
            into GenKwiz, a platform dedicated to sharing bite-sized information and intriguing
            stories. GenKwiz believes that quizzing should be fun and accessible to everyone,
            regardless of age. Our quizzes are crafted to engage minds, jog memories, and spark
            curiosity in people of all ages and interests, whether you're a trivia enthusiast or a
            lifelong learner looking for some daily quizzes or mind tests.
          </span>
          <span>
            GenKwiz draws inspiration from everyday life, uncovering fascinating stories and
            anecdotes hidden in plain sight. From browsing the internet to reading books, our team
            identifies interesting tidbits of information and transforms them into engaging quiz
            questions and answers. Each question is meticulously crafted to challenge minds, evoke
            memories, and encourage deeper reflection. We go beyond the typical GK quiz format,
            aiming to create a platform that offers more than just smart quizzes or impossible
            quizzes.
          </span>
          <span>
            Behind every GenKwiz quiz lies a meticulous curation process. Ideas are transformed into
            quiz templates, undergoing rigorous checks to ensure accuracy, relevance, and
            engagement. Our quizzes are designed to not only test knowledge but also stimulate
            critical thinking, encouraging users to connect the dots and delve deeper into the
            subject matter. We want you to walk away from a GenKwiz session not just with a score,
            but with a newfound appreciation for the topic, even if it involves challenging your IQ
            test free online.
          </span>
          <span>
            Once the quizzes are ready, they are published on the GenKwiz website, ready to be
            explored by curious minds around the world. From trivia enthusiasts to lifelong
            learners, our quizzes offer something for everyone. And as users engage with the
            quizzes, we track their interactions, gaining insights into how knowledge is consumed
            and applied in the real world. This allows us to continuously improve and create even
            more engaging online quiz games for the future, whether it's a geography quiz or a
            cricket quiz.
          </span>
          <span>
            At GenKwiz, our mission is simple: to inspire curiosity, ignite minds, and celebrate the
            joy of learning. We hope this glimpse behind the scenes has given you a deeper
            appreciation for the story behind GenKwiz and the passion that drives us to create
            engaging quizzes every day. Join us on this journey of discovery, and together, let's
            uncover the stories that shape our world.
          </span>
        </div>
      </Col>
      <Col span={24} className="flex flex-col items-center gap-4 text-lg mb-8">
        <FollowUs />
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

export default Blog;
