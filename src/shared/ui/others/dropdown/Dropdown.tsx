import React from 'react';

import { InputBase } from '@shared/ui/inputs/inputBase/InputBase';
import { UniList } from '@shared/ui/others';
import { UIText14Medium, UIText14Reg } from '@shared/ui/paragraphs';

import useDropdown, { type Option } from './lib/useDropdown';
import styles from './Dropdown.module.css';

type Props = {
  options: Option[];
  multiple?: boolean;
  value?: string | number | Array<string | number>;
  defaultValue?: string | number | Array<string | number>;
  onChange?: (val: string | number | Array<string | number> | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const Dropdown: React.FC<Props> = ({
  options,
  multiple = false,
  value,
  defaultValue,
  onChange,
  placeholder = 'Выберите',
  disabled = false,
  className,
}) => {
  const {
    ref,
    open,
    setOpen,
    selected,
    toggleOption,
    renderValueText,
    handleKeyDown,
    optionsWithId,
  } = useDropdown({ options, multiple, value, defaultValue, onChange, disabled });

  return (
    <div
      ref={ref}
      className={[styles.dropdown, className || '', disabled ? styles.disabled : ''].join(' ').trim()}
    >
      <InputBase
        readOnly
        value={renderValueText()}
        placeholder="" // предотвращаем рендер плейсхолдера из InputBase
        className={styles.control}
        onClick={() => !disabled && setOpen((s) => !s)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
       />
       {renderValueText() === '' && (
          <button
            type="button"
            className={styles.placeholderCustom}
            onClick={() => !disabled && setOpen(true)}
            aria-hidden={false}
          >
            <UIText14Reg>{placeholder}</UIText14Reg>
          </button>
        )}

      {open && (
        <UniList
          items={optionsWithId}
          className={styles.panel}
          role="listbox"
          aria-multiselectable={multiple}
          renderItem={(opt: Option & { id: string | number }) => {
            const isSelected = selected.includes(opt.value);
            const itemStyle = {
              ...(opt.bgColor ? { background: opt.bgColor } : {}),
              ...(opt.textColor ? { color: opt.textColor } : {}),
            };
            return (
              <div
                role="option"
                aria-selected={isSelected}
                className={[styles.option, isSelected ? styles.optionSelected : ''].join(' ').trim()}
                onClick={() => toggleOption(opt)}
                style={itemStyle}
              >
                {multiple && <input readOnly type="checkbox" checked={isSelected} />}
                <UIText14Medium style={opt.textColor ? { color: opt.textColor } : undefined}>
                    {opt.label}
                </UIText14Medium>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export { Option };
