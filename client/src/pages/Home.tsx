import { Link } from 'react-router-dom';
import '../index.css';

function Home(){
  return (
    <div>
      <h1>AI Research Lab Management</h1>
      <p>Welcome to our application that follows researchers led by a team leader to build algorithms in the field of artificial intelligence.The research management process includes initiating project proposals, approving
      proposals by the institution, assigning tasks to team members, monitoring progress, and testing results.</p>
      <Link to="/dashboard">
        <button>LOG IN</button> 
      </Link>
    </div>
  );
};

export default Home;
