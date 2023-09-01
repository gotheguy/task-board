import { useState } from "react";
import axios from "axios";

export const useCard = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCardByListId = async (listId) => {
    setIsLoading(true);
    setError(null);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/cards/${listId}`)
      .then((res) => {
        setCards(res.data.cards);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const postCard = async (list, title) => {
    setIsLoading(true);
    setError(null);

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/cards`, {
        title,
        list,
      })
      .then((res) => {
        setCards([...cards, res.data.card]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const updateComment = async (cardId, index, comment) => {
    setIsLoading(true);
    setError(null);

    await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/cards/${cardId}/comments`, {
        index,
        comment,
      })
      .then((res) => {
        setCards([...cards, res.data.card]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const deleteComment = async (cardId, index) => {
    setIsLoading(true);
    setError(null);

    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/cards/${cardId}/comments`, {
        index,
      })
      .then((res) => {
        setCards([...cards, res.data.card]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    cards,
    getCardByListId,
    postCard,
    updateComment,
    deleteComment,
    isLoading,
    error,
  };
};
