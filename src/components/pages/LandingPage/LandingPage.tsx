import { Link } from 'react-router-dom';
import Paper from 'components/shared/Paper/Paper';
import { useGetQuizzesQuery } from 'redux/api';
import Loader from 'components/shared/Loader/Loader';
import './LandingPage.scss';

function LandingPage() {
  const { data: quizzes } = useGetQuizzesQuery();

  return (
    <article className="landing-page">
      {quizzes ? (
        <ul className="quizzes">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Paper>
                <h2>{quiz.title}</h2>
                <Link to={`/quiz/${quiz.id}`} className="button">Take the quiz</Link>
              </Paper>
            </li>
          ))}
        </ul>
      ) : <Loader />}
    </article>
  );
}

export default LandingPage;
