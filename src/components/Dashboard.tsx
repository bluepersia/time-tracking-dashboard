import styles from './Dashboard.module.css';
import data from '../data.json';
import imgAvatar from '../images/image-jeremy.png';
import imgElipsis from '../images/icon-ellipsis.svg';
import imgWork from '../images/icon-work.svg';
import imgPlay from '../images/icon-play.svg';
import imgStudy from '../images/icon-study.svg';
import imgExercise from '../images/icon-exercise.svg';
import imgSocial from '../images/icon-social.svg';
import imgSelfcare from '../images/icon-self-care.svg';

import { useState } from 'react';

const imgIcons: { [key: string]: string } = {
  Work: imgWork,
  Play: imgPlay,
  Study: imgStudy,
  Exercise: imgExercise,
  Social: imgSocial,
  'Self Care': imgSelfcare,
};

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
            className={
              styles.timeInterval +
              ' ' +
              (interval === 'daily' ? styles.active : '')
            }
          >
            Daily
          </p>
          <p
            onClick={() => setInterval('weekly')}
            className={
              styles.timeInterval +
              ' ' +
              (interval === 'weekly' ? styles.active : '')
            }
          >
            Weekly
          </p>
          <p
            onClick={() => setInterval('monthly')}
            className={
              styles.timeInterval +
              ' ' +
              (interval === 'monthly' ? styles.active : '')
            }
          >
            Monthly
          </p>
        </div>
      </div>
      {data &&
        data.map((item: IData) => (
          <div
            className={
              styles.itemWrapper + ' ' + styles[item.title.replace(' ', '')]
            }
          >
            <img src={imgIcons[item.title]} className={styles.itemIcon} />
            <div className={styles.item}>
              <header className={styles.itemHeader}>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <img src={imgElipsis} className={styles.imgElipsis} />
              </header>

              <div className={styles.itemTimeWrapper}>
                <h2 className={styles.itemTime}>
                  {item.timeframes[interval].current}
                  {item.timeframes[interval].current === 1 ? 'hr' : 'hrs'}
                </h2>
                <p className={styles.itemTimeInterval}>
                  {interval === 'daily'
                    ? 'Yesterday'
                    : interval === 'weekly'
                    ? 'Last week'
                    : 'Last month'}{' '}
                  - {item.timeframes[interval].previous}
                  {item.timeframes[interval].current === 1 ? 'hr' : 'hrs'}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
