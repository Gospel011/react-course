function Progress({index, questionsLength, points, maxPossiblePoints}) {
  return (
    <header className="progress">
        <progress max={questionsLength} value={index} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsLength}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
