import { Question } from 'redux/api';
import './Question.scss';

interface QuestionProps {
  question: Question;
  submitAnswer: (score: number) => void;
}

function Question({ question, submitAnswer }: QuestionProps) {
  return (
    <div className="question">
      <h2>{question.title}</h2>
      <ul className="options">
        {question.options?.map((option) => (
          <li key={option.id}>
            <button
              className="button"
              onClick={() => submitAnswer(Number(option.score))}
            >
              {option.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
