import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((store) => store.user.username);

  console.log({ username });

  return username ? (
    <div className="hidden text-sm font-semibold sm:block sm:text-xl">
      {username}
    </div>
  ) : null;
}

export default Username;
