import { Link } from 'react-router-dom';

const Problem = () => {
  return (
    <div>
      Problem
      <Link to='/coding'>Coding Problem</Link>
      <Link to='/math'>Math Problem</Link>
    </div>
  );
};

export default Problem;
