import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
<<<<<<< HEAD
import { FormattedMessage } from 'react-intl';
=======
import {FormattedMessage} from 'react-intl';
// import 'grommet/scss/vanilla/index';
>>>>>>> afa68b354c535f20a80899c0dc27cba936f63d62
import CheckBox from 'grommet/components/CheckBox';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import {fetchPost} from '../../PostActions';

// Import Selectors
import {getPost} from '../../PostReducer';

const test = () => {
    alert("test");
};

const test = () => {
	alert('test');
}

export function PostDetailPage(props) {
<<<<<<< HEAD
  return (
    <div>
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <CheckBox label="label" checked={true} onChange={test} />
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>
      </div>
    </div>
  );
=======
    return (
        <div>
            <Helmet title={props.post.title}/>
            <div className={`${styles['single-post']} ${styles['post-detail']}`}>
                <h3 className={styles['post-title']}>{props.post.title}</h3>
                <div>
                    <CheckBox label="Label" checked={true} onChange={test}/>
                </div>
                <p className={styles['author-name']}><FormattedMessage id="by"/> {props.post.name}</p>
                <p className={styles['post-desc']}>{props.post.content}</p>
            </div>
        </div>
    );
>>>>>>> afa68b354c535f20a80899c0dc27cba936f63d62
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
    return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
    return {
        post: getPost(state, props.params.cuid),
    };
}

PostDetailPage.propTypes = {
    post: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    }).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
