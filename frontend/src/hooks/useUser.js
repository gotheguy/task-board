import { useState } from "react";
import axios from "axios";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        });
  };

  return { user, getUserById, isLoading, error };
};
