import styles from './Dashboard.module.css';
import data from '../data.json';
import imgAvatar from '../images/image-jeremy.png';
import imgElipsis from '../images/icon-ellipsis.svg';
import { useState } from 'react';

type IData = {
  title: string;
  timeframes: {
    [key: string]: {
      current: number;
      previous: number;
    };
  };
};

export default function Dashboard(): JSX.Element {
  const [interval, setInterval] = useState<string>('daily');
  return (
    <div className={styles.dashboard}>
      <div className={styles.intro}>
        <div className={styles.head}>
          <img src={imgAvatar} className={styles.imgAvatar} />
          <div className={styles.introTxt}>
            <p className={styles.reportFor}>Report for</p>
            <h2 className={styles.name}>Jeremy Robson</h2>
          </div>
        </div>
        <div className={styles.introTime}>
          <p
            onClick={() => setInterval('daily')}
            className={styles.timeInterval}
          >
            Daily
          </p>
          <p
            onClick={() => setInterval('weekly')}
            className={styles.timeInterval}
          >
            Weekly
          </p>
          <p
            onClick={() => setInterval('monthly')}
            className={styles.timeInterval}
          >
            Monthly
          </p>
        </div>
      </div>
      <main className={styles.grid}>
        {data &&
          data.map((item: IData) => (
            <div className={styles.item + ` ${item.title}`}>
              <header className={styles.itemHeader}>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <img src={imgElipsis} className={styles.imgElipsis} />
              </header>
              <h2 className={styles.itemTime}>
                {item.timeframes[interval].current}hrs
              </h2>
              <p>
                {interval === 'daily'
                  ? 'Yesterday'
                  : interval === 'weekly'
                  ? 'Last week'
                  : 'Last month'}{' '}
                - {item.timeframes[interval].previous}hrs
              </p>
            </div>
          ))}
      </main>
    </div>
  );
}
