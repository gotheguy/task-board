import React, { useEffect, useContext, useState } from "react";

import classes from "./App.module.scss";
import { UserContext } from "./context/UserContext";
import { CardContext } from "./context/CardContext";
import { useUser } from "./hooks/useUser";
import { useList } from "./hooks/useList";

import Header from "./components/Layout/Header";
import Logo from "./components/Layout/Logo";
import Navbar from "./components/Layout/Navbar";
import List from "./components/List/List";
import AddList from "./components/List/AddList";
import Modal from "./components/UI/Modal/Modal";

function App() {
  const { setLoggedUser } = useContext(UserContext);
  const { selectedCard } = useContext(CardContext);
  const { loggedUser } = useUser();
  const { lists, getLists, postList, isLoading, error } = useList();
  const [listAdded, setListAdded] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      setLoggedUser(loggedUser);
    }
    getLists();
  }, [loggedUser, setLoggedUser]);

  useEffect(() => {
    if (listAdded) {
      setListAdded(false);
    }
  }, [listAdded]);

  const handleAddList = async (listTitle) => {
    await postList(listTitle);
    setListAdded(true);
  };

  const findListById = (listId) => {
    const filteredList = lists?.filter((item) => item._id === listId);
    if (filteredList?.length > 0) {
      return filteredList[0];
    }
    return filteredList;
  };

  const filteredList = findListById(selectedCard?.list);

  const items = lists?.map((item) => {
    return <List key={item._id} id={item._id} title={item.title} />;
  });

  return (
    <div className={classes.app}>
      <Navbar>
        <Logo />
        <Header />
      </Navbar>
      {selectedCard && selectedCard.isSelected && (
        <Modal filteredList={filteredList} />
      )}
      <div className={classes["app__list-wrapper"]}>
        {items}
        <AddList onAddList={handleAddList} />
      </div>
    </div>
  );
}

export default App;
