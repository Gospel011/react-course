import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-all duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200';
  // const base =
  //   className;

  const styles = {
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    small: base + ' px-4 text-xm py-2 md:px-5 md:py-2.5',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-200 font-semibold uppercase tracking-wide text-stone-400 transition-all duration-300 hover:text-stone-800 hover:bg-stone-300 focus:outline-none focus:text-stone-800  focus:ring focus:bg-stone-300 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 px-4 py-2.5 sm:px-6 sm:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;