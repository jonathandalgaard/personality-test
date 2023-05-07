import { useGetQuestionsQuery } from 'redux/api.ts';
import Question from 'components/pages/Quiz/Question/Question';
import { useState } from 'react';

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

  if (!questions[currentQuestion]) {
    return (
      <div>
        Your score is {score}
      </div>
    );
  }

  return (
    <div>
      <Question question={questions[currentQuestion]} submitAnswer={submitAnswer} />
    </div>
  );
}

export default Quiz;
