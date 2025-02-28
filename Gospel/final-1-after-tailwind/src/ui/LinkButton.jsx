import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to, className }) {
  const navigate = useNavigate();
  // const className = '';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
