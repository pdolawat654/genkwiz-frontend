import React, { useContext, useMemo, useState } from 'react';
import {
  QuestionDetailsType,
  QuestionGenreType,
  QuestionModeType,
  QuizFinalResponse,
} from '../utils/types';

/* Type definition for props */
type Props = {
  children: React.ReactNode;
};

/* Type definition for user details */
type UserDetailsType = {
  name: string | null;
  selectedAvatar: string | null;
};

/* App context type */
export type AppContextType = {
  userDetails: UserDetailsType | null;
  questionDetails: QuestionDetailsType[] | [];
  sessionId: string | null;
  quizId: string | null;
  quizMode: QuestionModeType | null;
  quizGenre: QuestionGenreType | null;
  quizResponse: QuizFinalResponse | null;
  quizScore: number | 0;
  quizLength: number | 10;
  qoTDScore: number | 0;
  qoTDStreak: number | 0;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsType | null>>;
  setQuestionDetails: React.Dispatch<React.SetStateAction<QuestionDetailsType[] | []>>;
  setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
  setQuizId: React.Dispatch<React.SetStateAction<string | null>>;
  setQuizMode: React.Dispatch<React.SetStateAction<QuestionModeType | null>>;
  setQuizGenre: React.Dispatch<React.SetStateAction<QuestionGenreType | null>>;
  setQuizResponse: React.Dispatch<React.SetStateAction<QuizFinalResponse | null>>;
  setQuizScore: React.Dispatch<React.SetStateAction<number | 0>>;
  setQuizLength: React.Dispatch<React.SetStateAction<number | 10>>;
  setQoTDScore: React.Dispatch<React.SetStateAction<number | 0>>;
  setQoTDStreak: React.Dispatch<React.SetStateAction<number | 0>>;
};

/* Created app context */
export const AppContext = React.createContext<AppContextType>({
  userDetails: null,
  questionDetails: [],
  sessionId: null,
  quizId: null,
  quizMode: null,
  quizGenre: null,
  quizResponse: null,
  quizScore: 0,
  quizLength: 10,
  qoTDScore: 0,
  qoTDStreak: 0,
  setUserDetails: () => {},
  setQuestionDetails: () => {},
  setSessionId: () => {},
  setQuizId: () => {},
  setQuizMode: () => {},
  setQuizGenre: () => {},
  setQuizScore: () => {},
  setQuizResponse: () => {},
  setQuizLength: () => {},
  setQoTDScore: () => {},
  setQoTDStreak: () => {},
});

/* Created app context provider */
export const AppContextProvider = ({ children }: Props) => {
  // const to fetch the user details
  const fetchUserDetails: UserDetailsType = JSON.parse(
    localStorage.getItem('userDetails') as string,
  );

  // state used to store the user details
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(fetchUserDetails || null);

  // state used to store the question details
  const [questionDetails, setQuestionDetails] = useState<QuestionDetailsType[] | []>([]);

  // state used to store the session id
  const [sessionId, setSessionId] = useState<string | null>(null);

  // state used to store the quiz id
  const [quizId, setQuizId] = useState<string | null>(null);

  // state used to store the quiz mode
  const [quizMode, setQuizMode] = useState<QuestionModeType | null>('medium');

  // state used to store the quiz genre
  const [quizGenre, setQuizGenre] = useState<QuestionGenreType | null>('History');

  // state used to store the question details
  const [quizResponse, setQuizResponse] = useState<QuizFinalResponse | null>(null);
  //state to store score
  const [quizScore, setQuizScore] = useState<number | 0>(0);

  // state used to store the question details
  const [quizLength, setQuizLength] = useState<number | 10>(10);

  const [qoTDScore, setQoTDScore] = useState<number | 0>(0);

  const [qoTDStreak, setQoTDStreak] = useState<number | 0>(0);

  const contextValues = useMemo(
    () => ({
      userDetails,
      questionDetails,
      sessionId,
      quizId,
      quizMode,
      quizGenre,
      quizResponse,
      quizLength,
      quizScore,
      qoTDScore,
      qoTDStreak,
      setUserDetails,
      setQuestionDetails,
      setSessionId,
      setQuizId,
      setQuizMode,
      setQuizGenre,
      setQuizResponse,
      setQuizScore,
      setQuizLength,
      setQoTDScore,
      setQoTDStreak,
    }),
    [
      userDetails,
      questionDetails,
      sessionId,
      quizId,
      quizMode,
      quizGenre,
      quizResponse,
      quizScore,
      quizLength,
      qoTDScore,
      qoTDStreak,
    ],
  );

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};

/* useAppData context hook */
export const useAppData = (): AppContextType => useContext<AppContextType>(AppContext);
