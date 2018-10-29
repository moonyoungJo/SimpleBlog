import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';

const cx = classNames.bind(styles);

const PostItem = ({ title, body, publishedDate, tags, id, username, userid}) => {
  const tagList = tags.map(
    tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
  );
  
  return (
    <div className={cx('post-item')}>
      <Link to={`/post/${id}`}>
      <h2>{title}</h2>
      <div className={cx('date')}>{moment(publishedDate).format('ll')} &nbsp;&nbsp;&nbsp;{username}[{userid}]</div>
      <p>{removeMd(body)}</p>
      </Link>
      <div className={cx('tags')}>
        {tagList}
      </div>
    </div>
  )
}

const PostList = ({posts}) => {
  const postList = posts.map(
    (post) => {
      const { _id, title, body, publishedDate, tags, username, userid } = post.toJS();
      return (
        <PostItem
          title={title}
          body={body}
          publishedDate={publishedDate}
          tags={tags}
          key={_id}
          id={_id}
          username={username}
          userid={userid}
        />
      )
    }
  );
  return (
    <div className={cx('post-list')}>
      {postList}
    </div>
  );
};

export default PostList;