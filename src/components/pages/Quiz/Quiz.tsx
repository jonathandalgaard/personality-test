import { useGetQuestionsQuery } from 'redux/api';
import Question from 'components/pages/Quiz/Question/Question';
import { useState } from 'react';
import Result from 'components/pages/Quiz/Result/Result';
import Paper from 'components/shared/Paper/Paper';
import './Quiz.scss';

function Quiz() {
  const { data: questions } = useGetQuestionsQuery();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const submitAnswer = (score: number) => {
    setScore((prevScore) => prevScore + score);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  }

  if (!questions) {
    return null;
  }

  return (
    <article className="quiz-page">
      <Paper>
        {!questions[currentQuestion]
          ? <Result score={score} />
          : <Question question={questions[currentQuestion]} submitAnswer={submitAnswer} />
        }
      </Paper>
      <img className="background-image" alt="" src="/stars.jpg" />
    </article>
  );
}

export default Quiz;
