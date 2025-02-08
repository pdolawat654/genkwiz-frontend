import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import WelcomePage from './pages/WelcomePage';
import QuestionPage from './pages/QuestionPage';
import AboutPage from './pages/AboutPage';
import QuizModePage from './pages/QuizModePage';
import QuizPage from './pages/QuizPage';
import QuizScore from './pages/ScorePage';
import QuizMasters from './pages/QuizMasters';
import PlayQuiz from './pages/PlayQuiz';
import Blog from './pages/Blog';

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="welcome" element={<WelcomePage />} />
      <Route path="playQuiz" element={<PlayQuiz/>}/>
      <Route path="about" element={<AboutPage />} />
      <Route path="blog" element={<Blog />} />
      <Route path="qotd">
        <Route path=":qoTDType" element={<QuestionPage />} />
      </Route>
      <Route path="mode" element={<QuizModePage />} />
      <Route path="quizMasters" element={<QuizMasters />} />

    </Route>
    <Route path="quiz/*" element={<QuizPage />} />
    <Route path="score">
      <Route path=":questionType/:status" element={<QuizScore />} />
    </Route>

    <Route path="/" element={<Navigate to="/welcome" />} />
  </Routes>
);

export default App;
