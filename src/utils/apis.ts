import axios, { AxiosResponse } from 'axios';
import generateUUID from './cookie';
import {
  FetchQuizDetailsBodyType,
  FetchQuizDetailsResponse,
  GenerateQuizIdResponseType,
  GenerateSessionIdForQuizResponse,
  McqOptionsResponseType,
  QotdRevealAnswerType,
  QuestionResponseType,
  QuizFinalResponse,
  SubmitQoTDAnswerInputType,
  SubmitQoTDAnswerResponseType,
  SubmitQuizQuestionRequestBody,
  SubmitQuizQuestionResponse,
} from './types';
import { quizStaticApi } from './constants';
import { message } from 'antd';

/**
 * API to fetch the question of the day
 * @param apiPath String
 * @returns QuestionResponseType
 */
export const fetchQoTD = async (apiPath: string) => {
  try {
    const response: AxiosResponse<QuestionResponseType> = await axios.get(apiPath, {
      headers: {
        'x-genkwiz-session-id': import.meta.env.VITE_GENKWIZ_SESSION_ID,
        'user-id': generateUUID(),
      },
    });

    if (response.status === 200) {
      return {
        status: response.data.status,
        questions: response.data.questions,
        qoTDScore: response.data.qotdScore,
        streak: response.data.streak,
      };
    }

    message.error('API call failed. Please try again later.');
    return {
      status: '',
      questions: [],
      qoTDScore: 0,
      streak: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      status: '',
      questions: [],
      qoTDScore: 0,
      streak: 0,
    };
  }
};

/**
 * @description API call to submit QoTD answer
 * @param inputData SubmitQoTDAnswerInputType
 * @param urlToSubmit String: URL for API
 * @returns Boolean: Whether call is successful
 */
export const submitQoTDAnswer = async (apiPath: string, inputData: SubmitQoTDAnswerInputType) => {
  try {
    const response: AxiosResponse<SubmitQoTDAnswerResponseType> = await axios.post(
      apiPath,
      inputData,
      {
        headers: {
          'x-genkwiz-session-id': import.meta.env.VITE_GENKWIZ_SESSION_ID,
          'user-id': generateUUID(),
        },
      },
    );

    if (response.status === 200) {
      return {
        isCorrect: response.data.correct,
        qotdScore: response.data.qotdScore,
        streak: response.data.streak,
        openAIAnsEvalResponseDto: apiPath.includes('historical') ? response.data.response : response.data.openAIAnsEvalResponseDto,
      };
    }

    message.error('API call failed. Please try again later.');
    return {
      isCorrect: false,
      qotdScore: 0,
      streak: 0,
    };
  } catch (error) {
    console.log(error);
    message.error('Network error detected. Please try again later.');
    return {
      isCorrect: false,
      qotdScore: 0,
      streak: 0,
    };
  }
};

// TODO: Write code for revealAnswer API
export const revealQoTDAnswer = async (apiPath: string) => {
  try {
    const response: AxiosResponse<QotdRevealAnswerType> = await axios.get(apiPath, {
      headers: {
        'x-genkwiz-session-id': import.meta.env.VITE_GENKWIZ_SESSION_ID,
        'user-id': generateUUID(),
      },
    });

    if (response.status === 200) {
      return {
        answer: response.data.answer,
        isAnswerRevealed: true,
        image: response.data.image,
      };
    }

    message.error('API call failed. Please try again later.');
    return {
      answer: '',
      isAnswerRevealed: false,
      image: null,
    };
  } catch (error) {
    console.log(error);
    message.error('Network error detected. Please try again later.');
    return {
      answer: '',
      isAnswerRevealed: false,
      image: null,
    };
  }
};

// api to generate the session id for quiz
export const generateSessionIdForQuiz = async (name: string, urlToGenerate: string) => {
  // const to store the response of generateSessionIdForQuiz api
  const generateSessionIdForQuizResponse: AxiosResponse<GenerateSessionIdForQuizResponse> =
    await axios.post(urlToGenerate, {
      username: name,
      avatarId: 1,
    });

  return generateSessionIdForQuizResponse.data;
};

// api to fetch quiz details
export const fetchQuizDetails = async (
  urlToGenerate: string,
  reqBody: FetchQuizDetailsBodyType,
  quizSessionId: string,
) => {
  // const to store the request configuration for an api
  const reqConfig = {
    headers: {
      'x-genkwiz-session-id': quizSessionId,
    },
  };

  // const to store the response of generate quiz id api
  const fetchQuizIdResponse: AxiosResponse<GenerateQuizIdResponseType> = await axios.post(
    urlToGenerate,
    reqBody,
    reqConfig,
  );

  // const to store the response of fetch quiz details api
  const fetchQuizDetailsResponse: AxiosResponse<FetchQuizDetailsResponse> = await axios.get(
    `${quizStaticApi}${fetchQuizIdResponse.data.quizId}`,
    reqConfig,
  );

  return fetchQuizDetailsResponse.data;
};

// api to submit quiz question answer
export const submitQuizQuestion = async (
  urlToSubmit: string,
  reqBody: SubmitQuizQuestionRequestBody,
  quizSessionId: string,
) => {
  // const to store the request configuration for an api
  const reqConfig = {
    headers: {
      'x-genkwiz-session-id': quizSessionId,
    },
  };

  // const to store the response of submitted quiz question
  const SubmitQuizQuestionResponse: AxiosResponse<SubmitQuizQuestionResponse> = await axios.post(
    urlToSubmit,
    reqBody,
    reqConfig,
  );

  return SubmitQuizQuestionResponse;
};

// api to submit quiz details
export const submitQuiz = async (urlToSubmit: string, quizSessionId: string) => {
  // const to store the request configuration for an api
  const reqConfig = {
    headers: {
      'x-genkwiz-session-id': quizSessionId,
    },
  };

  // Submit quiz Question
  const submitQuizResponse: AxiosResponse<QuizFinalResponse> = await axios.post(
    urlToSubmit,
    reqConfig,
  );

  return submitQuizResponse;
};

/**
 * API to fetch the mcq options of the question
 * @param apiPath String
 * @param questionId String
 * @returns McqOptionsResponseType[]
 */
export const fetchMcqOptions = async (apiPath: string, questionId: string) => {
  try {
    const response: AxiosResponse<McqOptionsResponseType[]> = await axios.get(
      `${apiPath}/${questionId}`,
      {
        headers: {
          'x-genkwiz-session-id': import.meta.env.VITE_GENKWIZ_SESSION_ID,
          'user-id': generateUUID(),
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    }

    message.error('API call failed. Please try again later.');
    return [
      {
        id: 0,
        answerNumber: 0,
        answerValue: '',
      },
    ];
  } catch (error) {
    console.log(error);
    return [
      {
        id: 0,
        answerNumber: 0,
        answerValue: '',
      },
    ];
  }
};
