import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (localStorage.getItem("token")) navigate("/dashboard");
      try {
        const response = await fetch("/api/user-info", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();

          localStorage.setItem(
            "user",
            JSON.stringify({
              id: userData.id,
              email: userData.email,
              username: userData.username,
            })
          );
          localStorage.setItem("token", userData.token);

          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch {
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default AuthRedirect;
