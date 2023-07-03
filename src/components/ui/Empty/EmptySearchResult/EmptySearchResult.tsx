import { FC, memo } from 'react';
import cn from 'classnames/bind';

import styles from './EmptySearchResult.module.scss';

const cx = cn.bind(styles);

interface EmptySearchResultProps {
  theme: string;
  value: string;
}

export const EmptySearchResult: FC<EmptySearchResultProps> = memo(({ theme, value }) => (
  <div className={cx('empty-search-result', `empty-search-result_${theme}`)}>
    <p>
      No matches for <span className={cx('empty-search-result__value')}>{value}</span>
    </p>
    <p className={cx('empty-search-result__description')}>
      Please try again with a different spelling or keywords.
    </p>
  </div>
));
