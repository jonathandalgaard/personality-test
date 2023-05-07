import { Link } from 'react-router-dom';
import Paper from 'components/shared/Paper/Paper';
import './LandingPage.scss';

function LandingPage() {
  return (
    <article className="landing-page">
      <Paper>
        <h1>Are you an introvert or an extrovert?</h1>
        <Link to="/quiz" className="button">Take the test</Link>
      </Paper>
    </article>
  );
}

export default LandingPage;
