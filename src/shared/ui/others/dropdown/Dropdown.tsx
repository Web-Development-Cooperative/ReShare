import React from 'react';

import { InputBase } from '@shared/ui/inputs/inputBase/InputBase';
import { UniList } from '@shared/ui/others';
import { UIText14Medium } from '@shared/ui/paragraphs';

import useDropdown, { type Option } from './lib/useDropdown';
import styles from './Dropdown.module.css';

type Props = {
	options: Option[];
	multiple?: boolean;
	value?: string | number | Array<string | number>;
	defaultValue?: string | number | Array<string | number>;
	onChange?: (val: string) => void;
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
	} = useDropdown({
		options,
		multiple,
		value,
		defaultValue,
		onChange,
		disabled,
	});

	return (
		<div
			ref={ref}
			className={[
				styles.dropdown,
				className || '',
				disabled ? styles.disabled : '',
			]
				.join(' ')
				.trim()}
			onClick={() => !disabled && setOpen((s) => !s)}
		>
			<InputBase
				readOnly
				value={renderValueText()}
				placeholder={placeholder}
				className={styles.control}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				rightIcon={
					renderValueText() === '' ? (
						'V'
					) : (
						<p
							onClick={(e) => {
								e.stopPropagation();
								onChange?.('');
							}}
						>
							X
						</p>
					)
				}
			/>
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
								className={[
									styles.option,
									isSelected ? styles.optionSelected : '',
								]
									.join(' ')
									.trim()}
								onClick={(e) => {
									e.stopPropagation();
									toggleOption(opt);
								}}
								style={itemStyle}
							>
								{multiple && (
									<input
										readOnly
										type="checkbox"
										checked={isSelected}
									/>
								)}
								<UIText14Medium
									style={
										opt.textColor
											? { color: opt.textColor }
											: undefined
									}
								>
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

export type { Option };
