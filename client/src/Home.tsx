import "./Home.css";

const Home = () => {
  // Funkcija za prijavu putem GitHub-a
  const handleGitHubLogin = () => {
    window.location.href = "/api/oauth2/authorization/github";
  };

  return (
    <>
      <div className="home-container">
        <img src="/images/Logo.png" alt="Logo"></img>
        <p id="text">
          AIReLM is an application that enables good organization and monitoring
          of the flow while working on a specific project. To get started, you
          have to login!
        </p>
        <button onClick={handleGitHubLogin} className="login-button">
          Log in with GitHub
        </button>
      </div>
    </>
  );
};

export default Home;
