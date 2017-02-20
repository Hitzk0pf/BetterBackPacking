import React, { PropTypes } from 'react';
import { Link } from 'react-router';
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
  let avatar = "";

  if (!props.isLoggedIn) {
    loginButtons = (
      <div style={{display: 'inline'}}>
          <li>
            <Button label='Login' primary path="/login"/>
          </li>
          <li>
            <Button label='Register' primary path="/register" />
          </li>
      </div>
    )
  } else {
    avatar = props.avatar;
    if (props.isGuide) {
      initialPageWizard = (
        <li>
          <Button label="Edit my Page" primary path="/initialPageWizard" />
        </li>
      )
    }
    loginButtons = (
      <div style={{display: 'inline'}}>
          <li>
            <Button label='Logout' primary onClick={() => {
              props.logoutUser();
            }} path="/"/>
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
            <Button label="Search Tours" primary path="/search" />
          </li>

          {initialPageWizard}

          {avatar ? <img style={{borderRadius: '50%', width: '2.5rem', height: '2.5rem'}}src={props.avatar}></img> : ""}

          {loginButtons}

        </ul>
      </div>
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
