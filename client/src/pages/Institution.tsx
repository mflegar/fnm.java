import { Link } from 'react-router-dom';
import '../index.css';

function Institution(){
    return(
       <>
       <h2>Here,you can create your own institution!</h2>
       <Link to="/">
       <button>Home</button>
       </Link>
       
       </> 

    );

}

export default Institution;