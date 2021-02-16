import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import style from './MultiSelect.module.scss';
import close from './assets/close.svg';
import ClickOutside from './components/ClickOutside/ClickOutside';

interface Item {
  // Unique identifier of an item.
  id: string;
  // Display text of an item.
  title: string;
}

export interface MultiSelectProps {
  // Empty placeholder. If not specified, defaults to "Please select".
  placeholder?: string;
  // Descriptors of available items.
  items: Item[];
  // Ids of selected items.
  value: string[];
  // Callback that is called with ids of selected items when the value changes.
  onChange: (selectedItems: string[]) => void;
}

enum KeysCode {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  ENTER = 'Enter',
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder = 'Please select',
  items,
  value = [],
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const [isListHidden, setIsListHidden] = useState(true);

  const validValues = value.filter((id) => items.find((item) => id === item.id));
  const defaultValues = new Set(validValues);
  const [currentValues, setCurrentValues] = useState<Set<string>>(defaultValues);

  const [focusedSelectItem, setFocusedSelectItem] = useState<number>(0);

  const refTextWidth = useRef<HTMLElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const removeAll = (event: MouseEvent) => {
    event.stopPropagation();
    setCurrentValues(new Set<string>());
  };

  const selectItem = (id: string) => {
    setCurrentValues((oldValues) => {
      const newValues = new Set(oldValues);
      if (!currentValues.has(id)) {
        newValues.add(id);
        return newValues;
      }

      newValues.delete(id);
      onChange(Array.from(newValues));
      return newValues;
    });
  };

  const filterItems = () => {
    if (!inputValue) {
      return items;
    }

    return items.filter(({ title }) => {
      return title.includes(inputValue);
    });
  };

  const filteredItems = filterItems();

  const clickOutside = () => {
    setIsListHidden(true);
  };

  useEffect(() => {
    let lastTime = Date.now();

    const onKeyDown = (event: KeyboardEvent) => {
      if (isListHidden) {
        return;
      }
      if ([KeysCode.UP.toString(), KeysCode.DOWN.toString(), KeysCode.ENTER.toString()].includes(event.code)) {
        event.preventDefault();
      }
      if (event.code === KeysCode.ENTER && filteredItems.length) {
        selectItem(filteredItems[focusedSelectItem].id);
        return;
      }
      if (Date.now() - lastTime < 100) {
        return;
      }
      lastTime = Date.now();
      const scrollTo = (list: HTMLElement, listItem: HTMLElement) => {
        const { clientHeight: listHeight, scrollTop } = list;
        const { offsetTop, clientHeight } = listItem;
        const minOffset = offsetTop;
        const maxOffset = offsetTop + clientHeight;
        if (minOffset < scrollTop) {
          list.scroll({ top: minOffset });
        }
        if (maxOffset > scrollTop + listHeight) {
          list.scroll({ top: maxOffset });
        }
      };
      if (event.code === KeysCode.UP && focusedSelectItem > 0) {
        const newFocusedSelectItem = focusedSelectItem - 1;
        setFocusedSelectItem(newFocusedSelectItem);
        scrollTo(
          dropdownRef.current as HTMLElement,
          dropdownRef.current?.children[newFocusedSelectItem] as HTMLElement,
        );
        return;
      }
      if (event.code === KeysCode.DOWN && focusedSelectItem < filteredItems.length - 1) {
        const newFocusedSelectItem = focusedSelectItem + 1;
        setFocusedSelectItem(newFocusedSelectItem);
        scrollTo(
          dropdownRef.current as HTMLElement,
          dropdownRef.current?.children[newFocusedSelectItem] as HTMLElement,
        );
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    refTextWidth.current!.innerText = event.target.value;
    setFocusedSelectItem(0);
    if (!currentValues.size) {
      refInput.current!.style.width = '100%';
      return;
    }
    refInput.current!.style.width = `${refTextWidth!.current!.clientWidth}px`;
  };

  const selectOnClick = () => {
    setIsSelectFocused(true);
    if (isListHidden) {
      dropdownRef.current?.scroll({ top: 0 });
    }
    setIsListHidden(!isListHidden);
    refInput.current?.focus();
  };

  const selectedItems = items
    .filter(({ id }) => currentValues.has(id))
    .map(({ id, title }) => (
      <div className={style.selectedItem} key={id}>
        {title}
        <button
          className={style.selectedItemClose}
          onClick={(event) => {
            event.stopPropagation();
            selectItem(id);
          }}
          type="button"
        >
          <img src={close} alt="close" />
        </button>
      </div>
    ));

  const makeSelectItemsNode = () => {
    if (!filteredItems.length) {
      return <div className={style.listEmpty}>no data</div>;
    }
    return filteredItems.map(({ id, title }, index) => (
      <button
        key={id}
        type="button"
        onMouseEnter={() => setFocusedSelectItem(index)}
        className={classNames(style.listItem, {
          [style.listItemSelected]: currentValues.has(id),
          [style.listItemFocused]: focusedSelectItem === index,
        })}
        onClick={() => {
          selectItem(id);
        }}
      >
        {title}
      </button>
    ));
  };

  const inputPlaceholder = currentValues.size ? '' : placeholder;
  const jsonValue = JSON.stringify(Array.from(currentValues));

  return (
    <div className={style.root}>
      <ClickOutside clickOutside={clickOutside}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className={classNames(style.select, { [style.selectFocused]: isSelectFocused })}
          onClick={selectOnClick}
          onBlur={() => {
            setIsSelectFocused(false);
          }}
        >
          <div className={style.selectedItems}>{selectedItems}</div>

          <span className={style.inputTextWidth} ref={refTextWidth}>
            {inputValue}
          </span>
          <input
            className={style.input}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onInputChange}
            ref={refInput}
            style={{ width: currentValues.size ? 0 : '100%' }}
          />
          {selectedItems.length > 0 && (
            <button className={style.removeAll} onClick={removeAll} type="button">
              <img src={close} alt="close" />
            </button>
          )}
        </div>

        <div
          ref={dropdownRef}
          className={classNames(style.list, {
            [style.listHidden]: isListHidden,
            [style.listVisible]: !isListHidden,
          })}
        >
          {makeSelectItemsNode()}
        </div>
      </ClickOutside>
      <input type="hidden" className={style.value} value={jsonValue} disabled />
      {jsonValue}
    </div>
  );
};
