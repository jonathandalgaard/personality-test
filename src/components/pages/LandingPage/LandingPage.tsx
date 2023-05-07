import { Link } from 'react-router-dom';
import Paper from 'components/shared/Paper/Paper';
import './LandingPage.scss';
import { useGetQuizzesQuery } from 'redux/api';

function LandingPage() {
  const { data: quizzes } = useGetQuizzesQuery();

  return (
    <article className="landing-page">
      <ul className="quizzes">
        {quizzes && quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Paper>
              <h1>{quiz.title}</h1>
              <Link to={`/quiz/${quiz.id}`} className="button">Take the quiz</Link>
            </Paper>
          </li>
        ))}
      </ul>
      <img className="background-image" alt="" src="/stars.jpg" />
    </article>
  );
}

export default LandingPage;
