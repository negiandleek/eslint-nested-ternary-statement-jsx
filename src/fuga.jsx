import React from 'react'

const test = () => {
  const is = true;
  return (
    <div>
      {is ? (
      <ul>
        <li>aaa</li>
      </ul>
      ) : null}
    </div>
  );
};

export default test;
