import { useState, useEffect } from "react";
import axios from "axios";

export const useUser = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/64ee33e46815654d6881f3ac`
        );
        setLoggedUser(response.data.user);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const getUserById = async (userId) => {
    setIsLoading(true);
    setError(null);

    userId &&
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  return { user, loggedUser, getUserById, isLoading, error };
};
