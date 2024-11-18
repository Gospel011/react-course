import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
// import PropTypes from 'prop-types'

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities || !cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  const countries = cities.reduce((arr, city) => {
    if (arr.map((country) => country.country).includes(city.country)) {
      return arr;
    } else {
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
