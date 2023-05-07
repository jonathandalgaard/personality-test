import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <article>
      <h1>Are you an introvert or an extrovert?</h1>
      <Link to="/quiz">Take the test</Link>
    </article>
  );
}

export default LandingPage;
