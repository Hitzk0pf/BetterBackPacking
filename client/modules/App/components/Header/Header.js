import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import logo from './Logo_single.jpg';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );


  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><img src={logo} className={styles.logo} /></Link>
        </h1>
        <ul>
          <li>
            <Link to="/login" >Login</Link>
          </li>

          <li>
            <Link to="/register" >Register</Link>
          </li>

          {props.avatar ? <img style={{borderRadius: '50%', width: '2.5rem', height: '2.5rem'}}src={props.avatar}></img> : ""}

          <li><FormattedMessage id="switchLanguage" /></li>
          {languageNodes}
        </ul>
      </div>
        {
          context.router.isActive('/', true)
            ? <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
            : null
        }
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
