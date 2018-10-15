import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Pagination = ({page, lastPage, tag}) => {

  const createPagePath = (page) => {
    return tag?`/tag/${tag}/${page}`:`/page/${page}`;
  }

  let start = page - (page-1)%5;
  let last = start+4;
  if(lastPage < last)
    last = lastPage
  const list = [];

  for(let i = start; i <= last ; i++){
    if(i === page)
    list.push(<Button disable key={i}>{i}</Button>);
    else
      list.push(<Button theme='grayoutline' key={i} to={createPagePath(i)}>{i}</Button>);
  }
  

  return (
    <div className={cx('pagination')}>
      <Button disabled={start === 1} to={createPagePath(page -1)}>
        ◀
      </Button>

      <div className={cx('number')}>
        {list}
      </div>
      
      <Button disabled={last===lastPage} to={createPagePath(page+1)}>
        ▶
      </Button>
    </div>
  );
};

export default Pagination;