import React from 'react'

const test = () => {
  const is = true;
  const Component = () => <ul><li>aa</li></ul>;
  return (
    <div>
      {is ? (
        <ul>
          {is ? (
            <div>aa</div>
          ): null}
          <li>aaa</li>
          {/* {is && <li>bbb</li>} */}
          {(() => { 
            return (
              <li>ddd</li>
            )
          })()}
          <Component />
        </ul>
      ) : null}
    </div>
  );
};

export default test;
