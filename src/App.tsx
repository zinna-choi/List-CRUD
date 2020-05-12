import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import List from "./component/List";
import AddList from "./component/AddList";

type props = {};
function App() {
  const [inputs, setInput] = useState({ name: "" });
  const [users, setUsers] = useState([]);
  const [updateUsers, setUpdateUsers] = useState<{
    id: number;
    name: string;
  }>();
  const { name } = inputs;

  const nextId = useRef(0);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      name,
    };
    setUsers(users.concat(user));

    setInput({
      name: "",
    });
    nextId.current += 1;
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...inputs,
      [name]: value,
    });
    setUpdateUsers({ ...updateUsers, [name]: value });
  };

  const onRemove = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    console.log(users);
  };

  // const onUpdate = (id: any) => {
  //   setUsers(users.map((user) => (user.id === id ? { ...user } : user)));
  //   console.log(users);
  // };

  const onEditClick = (id: number) => {
    setUpdateUsers(users.filter((user) => user.id === id)[0]);
  };

  const onEdit = () => {
    const newUsers = users.map((user) => {
      if (user.id === updateUsers?.id) {
        return {
          ...user,
          name: updateUsers.name,
        };
      }
      return user;
    });
    setUsers(newUsers);
    setUpdateUsers(undefined);
  };

  useEffect(() => {
    if (localStorage.local) {
      const local = JSON.parse(localStorage.local);
      setUsers(JSON.parse(localStorage.local));
      nextId.current = local.length;
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.local = JSON.stringify(users);
    }
  }, [users]);

  return (
    <>
      <AddList name={name} onChange={onChange} onCreate={onCreate} />
      <List
        users={users}
        onRemove={onRemove}
        onEditClick={onEditClick}
        onEdit={onEdit}
        updateUsers={updateUsers}
        setUpdateUsers={setUpdateUsers}
      />
    </>
  );
}

export default App;
