import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({ children, disabled, to, type }) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-all duration-300 hover:bg-yellow-300 hover:text-stone-700 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-yellow-200 disabled:text-stone-700 ";

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-sm",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold tracking-wide text-stone-400 uppercase transition-all duration-300 hover:bg-stone-300  hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-yellow-200 disabled:text-stone-700 px-4 py-2.5 md:px-6 md:py-3.5",
  };

  console.log(`type: ${type}`);

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
