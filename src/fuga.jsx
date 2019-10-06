const test = () => {
  const is = true;
  return (
    <div>
      {is ? (
        <ul>
          <li>aa</li>
          <li>aa</li>
        </ul>
      ) : null}
    </div>
  );
};

export default test;
