import React from 'react'

const test = () => {
  const is = true;
  const Component = () => <li>eee</li>;
  return (
    <div>
      {is ? (
        <ul>
          <li>aaa</li>
          {is && <li>bbb</li>}
          {(() => (
            <li>ddd</li>
          ))()}
          {(() => (
            <li>ddd</li>
          ))()}
        </ul>
      ) : null}
    </div>
  );
};

export default test;
