import { useEffect, useRef } from 'react';
import { Question } from 'redux/api';
import './Question.scss';

interface QuestionProps {
  question: Question;
  submitAnswer: (score: number) => void;
}

function Question({ question, submitAnswer }: QuestionProps) {
  const optionsRef = useRef<Record<number, HTMLButtonElement | null>>([]);

  useEffect(() => {
    // Allow clicking the options using the number keys.
    const onKeyUp = (event: KeyboardEvent) => {
      const index = Number(event.key) - 1;
      if (event.code.startsWith('Digit') && optionsRef.current[index]) {
        optionsRef.current[index]?.click();
      }
    }

    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [optionsRef]);

  return (
    <div className="question">
      <h2>{question.title}</h2>
      <ul className="options">
        {question.options?.map((option, index) => (
          <li key={option.id}>
            <button
              className="button"
              onClick={() => submitAnswer(Number(option.score))}
              ref={(element) => optionsRef.current[index] = element}
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
