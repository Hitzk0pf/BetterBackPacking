import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Button from 'grommet/components/Button';
import logo from './Logo_single.jpg';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );

  let initialPageWizard = "";
  let loginButtons = "";
  let avatar = '';

  if (!props.isLoggedIn) {
    loginButtons = (
      <div style={{display: 'inline'}}>
          <li>
            <Link to='/login'><FormattedMessage id="login" /></Link>
          </li>
          <li>
            <Link to='/register'><FormattedMessage id="register" /></Link>
          </li>
      </div>
    )
  } else {
    avatar = props.avatar;
    if (props.isGuide) {
      initialPageWizard = (
        <li>
          <Link to='/initialPageWizard'><FormattedMessage id="editMyPage" /></Link>
        </li>
      )
    }
    loginButtons = (
      <div style={{display: 'inline'}}>
          <li>
            <Link to='/' primary onClick={() => {
              props.logoutUser();
            }}><FormattedMessage id="logout" /></Link>
          </li>
      </div>
    )
  }


  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><img src={logo} className={styles.logo} /></Link>
        </h1>
        <ul>

          <li>
            <Link to={props.isGuide ? '/guide/' + props.cuid : '/dashboard'}><FormattedMessage id="dashboard" /></Link>
          </li>

          <li>
            <Link to='/search'><FormattedMessage id="searchTours" /></Link>
          </li>

          {initialPageWizard}

          {avatar ? <Link to={'/guide/' + props.cuid} ><img style={{ borderRadius: '50%', width: '2.5rem', height: '2.5rem' }} src={props.avatar}></img></Link> : ""}

          {loginButtons}

          {languageNodes}

        </ul>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
