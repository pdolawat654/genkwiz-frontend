import { responseEncoding } from "axios";

// type definition for question format type
export type QuestionFormatType = 'SJQ' | 'MCQ';

// type definition for question difficulty level mode
export type QuestionModeType = 'hard' | 'medium';

export enum QoTDType {
  REGULAR = 'regular',
  ARCHIVE = 'archive',
  KIDS = 'kids',
  KIDS_ARCHIVE = 'kids-archive',
  RAMANAND = 'infinite-zounds',
  RAMANAND_ARCHIVE = 'infinite-zounds-archive',
  BERTY = 'bertys',
  BERTY_ARCHIVE = 'berty-archive',
  Q2Chew = 'Q2Chew',
  Q2Chew_ARCHIVE = 'Q2Chew-archive',
  KAPINJAL = 'TheKapsQuiz',
  KAPINJAL_ARCHIVE = 'TheKapsQuiz-archive',
  RC_CHALLENGE = 'rc-challenge',
  RC_CHALLENGE_ARCHIVE = 'rc-challenge-archive',
  TODAYS_QOTD = 'today-special',
  TODAYS_QOTD_ARCHIVE = 'today-special-archive',
}

export enum QuestionType {
  QUIZ = 'quiz',
  QOTD = 'qotd',
  KIDS_QOTD = 'kidsQotd',
  INFINITE_ZOUNDS = 'infiniteZounds',
  KAPS_QUIZ = 'kapsQuiz',
  BERTY_QUESTION = 'bertyQuestion',
  Q2Chew_QUESTION = 'Q2ChewQuestion',
  RC_CHALLENGE = 'rcChallenge',
  TODAYS_QOTD = 'todaysQotd',
}

// enum definition for question attempt status
export enum QuestionAttemptType {
  ATTEMPTED = 'ATTEMPTED',
  NOT_ATTEMPTED = 'NOT_ATTEMPTED',
  SKIPPED = 'SKIPPED',
}

// type definition for question genre
export type QuestionGenreType =
  | 'History'
  | 'STEM'
  | 'Sports'
  | 'Arts & Languages'
  | 'Business'
  | 'Kids'
  | 'Politics'
  | 'Current Affairs'
  | 'Entertainment'
  | 'Best of 2022';

export type HintsType = {
  hintNumber: number;
  text: string;
  marksDeduction: number;
};

// type definition for Question details
export type QuestionDetailsType = {
  id: number;
  mode: {
    id: number;
    modeName: QuestionModeType;
    maxTime: number;
    maxSore: number;
  };
  serialNumber: number;
  genre: QuestionGenreType;
  rating: number;
  type: QuestionFormatType;
  hints?: [HintsType];
  text: string;
};

// type definition for question response
export type QuestionResponseType = {
  quizId: string;
  questions: [QuestionDetailsType];
  status: QuestionAttemptType;
  qotdScore: number;
  streak: number;
};

// type definition for QoTD Answer response
export type SubmitQoTDAnswerResponseType = {
  correct: boolean;
  qotdScore: number;
  streak: number;
  openAIAnsEvalResponseDto: openAIAnsEvalResponseDto;
  response: airesponseType;
};
// type definition for response of generateSessionIdForQuiz api
export type GenerateSessionIdForQuizResponse = {
  sessionId: string;
};

// type definition for request body of fetchQuizDetails api
export type FetchQuizDetailsBodyType = {
  genre: QuestionGenreType;
  mode: QuestionModeType;
  numberOfQuestions: number;
};

// type definition for response of generateQuizId response api
export type GenerateQuizIdResponseType = {
  quizId: string;
};

// type definition for response of fetchQuizDetails response api
export type FetchQuizDetailsResponse = {
  quizId: string;
  questions: QuestionDetailsType[];
};

export type SubmitQuizQuestionRequestBody = {
  userTime: number;
  hintsUsed: number;
  status: string;
  userAnswer: string | null;
  typeOfQuestion: string;
};

export type SubmitQuizQuestionResponse = {
  userTime: number;
  hintsUsed: number;
  status: string;
  userAnswer: string;
  typeOfQuestion: string;
  score: number;
  correctAnswer: string;
  serialNumber: number;
  correct: boolean;
  aiEvalScore: number;           // Added AI evaluation score
  aiHint: string;                // Added AI-generated hint
  closeness: string;             // Added closeness feedback (e.g., "far off the mark")
  errorCode: string;             // Added error code if any
  errorMessage: string;          // Added error message if any
  expectedAcceptability: string; // Added expected acceptability (e.g., "acceptable")
};

export type AnswerType = {
  correctAnswer: string;
  score: number;
  correct: boolean;
  image?: string | null;
};

export type SubmitQoTDAnswerInputType = {
  hintsUsed: number;
  userTime: number;
  status: QuestionAttemptType;
  userAnswer: string;
  typeOfQuestion: QuestionFormatType;
  questionId: number;
};

export type QotdRevealAnswerType = {
  answer: string;
  qotdScore: number;
  streak: number;
  image: string;
};

// type definition for question response
export type McqOptionsResponseType = {
  id: number;
  answerNumber: number;
  answerValue: string;
};
export type QuizFinalResponse = {
  finalScore: number;
  numberOfAttempted: number;
  numberOfCorrect: number;
};


export type openAIAnsEvalResponseDto = {
  closeness: string;
  hint: string;
};

export type airesponseType = {
  closeness: string;
  hint: string;
};