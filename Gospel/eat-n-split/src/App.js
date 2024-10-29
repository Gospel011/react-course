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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function toogleShowAddFriend() {
    setShowAddFriend((val) => !val);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    toogleShowAddFriend();
  }

  function handleFriendSelection(friend) {
    // console.log({ friend });
    setSelectedFriend(selectedFriend?.id === friend.id ? null : friend);
    setShowAddFriend(false)
  }

  function handleSplitBill(friendsShare) {
    console.log({share: friendsShare})
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + friendsShare }
          : friend
      )
    );

    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onAddFriend={handleFriendSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={toogleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div>
        {selectedFriend && (
          <FormSplitBill
            friend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

function FriendsList({ friends, onAddFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onAddFriend={onAddFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onAddFriend }) {
  const isSelected = friend.id === selectedFriend?.id;

  // console.log(`${selectedFriend.name} ${isSelected}`);
  return (
    <li className={`${isSelected ? "selected" : ""}`}>
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
      <Button onClick={() => onAddFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick, type }) {
  return (
    <button type={type} className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
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
    <form className="form-add-friend" onSubmit={handleSubmit}>
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

function FormSplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [ownExpense, setOwnExpense] = useState("");
  const [paidBy, setPaidBy] = useState("user");
  const friendExpense = bill - ownExpense;

  function handleSplitBill() {
    const friendsShare = paidBy === "user" ? friendExpense : -1 * ownExpense;

    onSplitBill(friendsShare);

    console.log(`Friend Share: ${friendsShare}`);
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <TextInput value={bill} onChange={(e) => setBill(Number(e.target.value))}>
        💰 Bill value
      </TextInput>
      <TextInput
        value={ownExpense}
        onChange={(e) => setOwnExpense(Number(e.target.value))}
      >
        🧍 Your Expense
      </TextInput>
      <TextInput disabled value={friendExpense}>
        👬 {friend.name}'s Expense
      </TextInput>

      <label>🤑 Who is paying the bill?</label>
      <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button type="button" onClick={handleSplitBill}>
        Split Bill
      </Button>
    </form>
  );
}
