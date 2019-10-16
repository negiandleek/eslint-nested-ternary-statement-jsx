import React from 'react'

const test = () => {
  const is = true;
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
        </ul>
      ) : null}
    </div>
  );
};

export default test;
