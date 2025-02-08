import { useAppData } from '../contexts/AppContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/Quiz/QuizQuestion';
import { useEffect } from 'react';
import { Row } from 'antd';

const QuizPage = () => {
  // destructuring app context
  const { questionDetails, userDetails } = useAppData();
  // extracting "navigate" from useNavigate hook
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDetails?.name) {
      navigate('/welcome');
    }
  });
  return (
    <Row>
      <Routes>
        {questionDetails &&
          questionDetails.map((question, index) => {
            const id = question.id;
            const questionPath = `/${id}`; // Use id directly for cleaner paths
            const nextQuestionId = questionDetails[index + 1]?.id; // Optional chaining for safety
            const nextQuestionTime = questionDetails[index + 1]?.mode?.maxTime || 90; // Set default time to 90 if not provided

            return (
              <Route
                key={id}
                path={questionPath}
                element={
                  <QuizQuestion
                    question={question}
                    nextQuestionId={nextQuestionId}
                    index={index}
                    nextQuestionTime={nextQuestionTime}
                  />
                }
              />
            );
          })}
        {questionDetails && questionDetails[0] && (
          <Route
            path="/" // Redirect to the first question path directly
            element={
              <Navigate to={`${questionDetails[0].id}`} replace /> // Use Navigate for clarity
            }
          />
        )}
      </Routes>
    </Row>
  );
};

export default QuizPage;
