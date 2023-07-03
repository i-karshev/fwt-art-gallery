import React, { ReactNode, DragEvent, useState, useEffect } from 'react';
import cn from 'classnames/bind';

import styles from '@/components/ui/CardGrid/CardGrid.module.scss';

const cx = cn.bind(styles);

type GridItem<T> = T & { order: number };

interface DraggableCardGridProps<T> {
  items: T[];
  renderItem: (item: T, index?: number) => ReactNode;
  theme: string;
}

export const DraggableCardGrid = <T,>({ items, renderItem, theme }: DraggableCardGridProps<T>) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState(-1);
  const [gridItems, setGridItems] = useState<GridItem<T>[] | null>(null);

  useEffect(() => setGridItems(items.map((item, i) => ({ ...item, order: i }))), [items]);

  const handleDrag = (index: number) => setDragIndex(index);
  const handleDragLeave = () => setHoverIndex(null);
  const handleDragOver = (e: DragEvent<HTMLLIElement>, index: number) => {
    if (dragIndex === index) return;
    e.preventDefault();
    setHoverIndex(index);
  };

  const handleDrop = (dropIndex: number) => {
    if (!gridItems?.length || dragIndex < 0) return;

    const newGridItems = gridItems
      .map((item) => {
        if (item.order === dragIndex) {
          return { ...item, order: dropIndex };
        }

        if (item.order >= dropIndex && item.order <= dragIndex) {
          return { ...item, order: item.order + 1 };
        }

        if (item.order <= dropIndex && item.order >= dragIndex) {
          return { ...item, order: item.order - 1 };
        }

        return item;
      })
      .sort((a, b) => a.order - b.order);

    setGridItems(newGridItems);
    setHoverIndex(null);
  };

  return (
    <ul className={cx('card-grid', `card-grid_${theme}`)}>
      {gridItems?.map((item, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={cx('card-grid__item', { 'card-grid__item_drag': hoverIndex === index })}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDragStart={() => handleDrag(index)}
          onDrop={() => handleDrop(index)}
          draggable
        >
          <div className={cx('card-grid__drag-handle')} />
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};
