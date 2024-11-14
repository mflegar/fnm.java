import { Link } from 'react-router-dom';
import '../index.css';

function Researcher() {
    return (
        <>
            <h2>Here, you are enabled to join the institution you like!</h2>
            <Link to="/">
                <button>Home</button>
            </Link>

        </>


    );

}

export default Researcher;