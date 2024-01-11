import React, { FC } from 'react';

const App: FC = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h2>hello world</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default App;
