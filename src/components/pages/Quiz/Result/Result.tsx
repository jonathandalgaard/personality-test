import { useGetResultQuery } from 'redux/api';

interface ResultProps {
  score: number;
}

function Result({ score }: ResultProps) {
  const { data: result } = useGetResultQuery({ score });

  if (!result?.text) {
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
