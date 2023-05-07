import { useGetQuestionsQuery } from 'redux/api';
import { CornerUpLeftIcon } from 'lucide-react';
import Question from 'components/pages/Quiz/Question/Question';
import { useState } from 'react';
import Result from 'components/pages/Quiz/Result/Result';
import Paper from 'components/shared/Paper/Paper';
import { Link, useParams } from 'react-router-dom';
import './Quiz.scss';

function Quiz() {
  const { quizId } = useParams();
  const { data: questions } = useGetQuestionsQuery({ quizId: Number(quizId) });
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
        <Link to="/" className="back-link">
          <CornerUpLeftIcon size="1.125em" strokeWidth={2.5} />
          Go back
        </Link>
        {!questions[currentQuestion]
          ? <Result score={score} />
          : <Question question={questions[currentQuestion]} submitAnswer={submitAnswer} />
        }
      </Paper>
    </article>
  );
}

export default Quiz;
