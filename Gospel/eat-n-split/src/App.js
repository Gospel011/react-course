import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function toogleShowAddFriend() {
    setShowAddFriend((val) => !val);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && (
          <FormAddFriend
            onAddFriend={handleAddFriend}
            toogleShowAddFriend={toogleShowAddFriend}
          />
        )}
        <Button onClick={toogleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div>
        <FormSplitBill />
      </div>
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend, toogleShowAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newUser = {
      id: id,
      name: name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    console.log({ newUser });
    onAddFriend(newUser);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        handleSubmit(e);
        toogleShowAddFriend();
      }}
    >
      <TextInput value={name} onChange={(e) => setName(e.target.value)}>
        👬 Friend name
      </TextInput>

      <TextInput value={image} onChange={(e) => setImage(e.target.value)}>
        🏙️ Image url
      </TextInput>
      <Button>Add</Button>
    </form>
  );
}

function TextInput({ children, disabled, value, onChange }) {
  return (
    <>
      <label>{children}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <TextInput>💰 Bill value</TextInput>
      <TextInput>🧍 Your Expense</TextInput>
      <TextInput disabled>👬 X's Expense</TextInput>

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
