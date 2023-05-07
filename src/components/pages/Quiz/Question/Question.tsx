import { Question } from 'redux/api.ts';

interface QuestionProps {
  question: Question;
  submitAnswer: (score: number) => void;
}

function Question({ question, submitAnswer }: QuestionProps) {
  return (
    <>
      <h2>{question.title}</h2>
      <ul>
        {question.options.map((option) => (
          <li key={option.id}>
            <button onClick={() => submitAnswer(option.score)}>{option.title}</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Question;
