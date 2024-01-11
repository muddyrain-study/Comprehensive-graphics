import React, { FC, Suspense, lazy } from 'react';
import styles from '@/styles/app.module.scss';
import image1 from '@/assets/1.jpeg';
import Loading from './components/loading';
const About = lazy(() => delayDemo(import('@/components/About'), 2000));
const App: FC = () => {
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <h2>hello world</h2>
      <p>Count: {count}</p>
      <img width={200} height={200} src={image1} alt='' />
      <button className={styles['button']} onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <hr />
      <button
        className={styles['button']}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        show about
      </button>
      {visible && (
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      )}
    </div>
  );
};

//添加一个固定延迟，以便看到加载效果
async function delayDemo(promise: Promise<any>, delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  }).then(() => promise);
}

export default App;
