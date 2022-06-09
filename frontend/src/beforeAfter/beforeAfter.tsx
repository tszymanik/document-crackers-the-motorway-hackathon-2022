import React, {useState} from 'react';
import styles from './beforeAfter.module.scss';

interface IBeforeAfterProps {
  // before: string // url to first image
  // after: string // url to first image
}

const BeforeAfter = (props: IBeforeAfterProps) => {
  const [rangeValue, setRangeValue] = useState<number>(50)

  const rangeChange = (e: any) => {
    setRangeValue(e.target.value)
  }

  const image1Url = 'https://artimento.pl/userdata/public/assets/Beksi%C5%84ski/1-0-2.png'
  const image2Url = 'https://artimento.pl/userdata/public/assets/Beksi%C5%84ski/1-0-1.png'

  return (
    <div className={styles.wrapper}>
      <div
        className={[styles.image, styles.first].join(' ')}
        style={{backgroundImage: `url(${image1Url})`}}
      />
      <div
        className={[styles.image, styles.second].join(' ')}
        style={{
          backgroundImage: `url(${image2Url})`,
          // opacity: rangeValue / 100
          width: `${rangeValue}%`
        }}
      />

      <div className={styles.slider}>
        <input
          type="range"
          min="0"
          max="100"
          value={rangeValue}
          onChange={rangeChange}
        />
        <p>{rangeValue}</p>
      </div>

    </div>
  );
}

export default BeforeAfter
