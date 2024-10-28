export default function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((el) => el.packed === true).length;

  const decimalPlace = 0;
  const precision = Math.pow(10, decimalPlace);

  const percentagePacked =
    Math.round((packedItems / numItems) * 100 * precision) / precision;

  if (numItems === 0)
    return (
      <footer className="stats">
        <p>Start adding items to your list...</p>
      </footer>
    );

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You got everything! Ready to go ✈"
          : `💼 You have ${numItems} items on your list, and you already packed ${packedItems} (${percentagePacked}%)`}
      </em>
    </footer>
  );
}
