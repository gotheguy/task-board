import { useState } from "react";
import axios from "axios";

export const useList = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLists = async () => {
    setIsLoading(true);
    setError(null);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/lists`)
      .then((res) => {
        setLists(res.data.lists);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const postList = async (listTitle) => {
    setIsLoading(true);
    setError(null);

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/lists`, {
        title: listTitle,
      })
      .then((res) => {
        setLists([...lists, res.data.list]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    lists,
    getLists,
    postList,
    isLoading,
    error,
  };
};
