import React from 'react';
import styles from './footer.module.scss';
import chervon from './chervon.png'

const Footer = () => {
    return <div className={styles.footer}>
        <span> Made with <span role="img" aria-label="sheep">❤️</span> to development </span>
        <img src={chervon} alt='chervon footer'></img>
    </div>
}

export default Footer;