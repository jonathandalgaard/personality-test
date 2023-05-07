import { useGetResultQuery } from 'redux/api';
import { useParams } from 'react-router-dom';

interface ResultProps {
  score: number;
}

function Result({ score }: ResultProps) {
  const { quizId } = useParams();
  const { data: result } = useGetResultQuery({ score, quizId: Number(quizId) });

  if (!result) {
    return <p>Fetching result...</p>;
  }

  return (
    <>
      <h1>{result.title}</h1>
      <p>{result.text}</p>
    </>
  )
}

export default Result;
