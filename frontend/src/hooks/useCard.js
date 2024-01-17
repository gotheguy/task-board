import { useState, useContext } from "react";
import { CardContext } from "../context/CardContext";
import axios from "axios";

export const useCard = () => {
  const { selectedCard, setSelectedCard } = useContext(CardContext);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCardsByListId = async (listId) => {
    setIsLoading(true);
    setError(null);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/cards/byListId?listId=${listId}`)
      .then((res) => {
        setCards(res.data.cards);
        return cards;
      })
      .catch((err) => {
        setError(err);
        return null;
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

  const updateCard = async (cardId, field, value) => {
    setIsLoading(true);
    setError(null);

    await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/cards/${cardId}`, {
        [field]: value,
      })
      .then((res) => {
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) =>
            card.id === cardId ? res.data.card : card
          );
          return updatedCards;
        });
      })
      .catch((err) => {
        setError(err);
      });
  };

  const deleteCard = async (cardId) => {
    setIsLoading(true);
    setError(null);

    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/cards/${cardId}`)
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
      .delete(
        `${process.env.REACT_APP_BASE_URL}/cards/${cardId}/comments/${index}`
      )
      .then((res) => {
        const updatedSelectedCard = { ...selectedCard };
        updatedSelectedCard.comments.splice(index, 1);
        setSelectedCard(updatedSelectedCard);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    cards,
    getCardsByListId,
    postCard,
    updateCard,
    deleteCard,
    updateComment,
    deleteComment,
    isLoading,
    error,
  };
};
