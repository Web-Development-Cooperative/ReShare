import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

export type Option = {
	value: string | number;
	label: string;
	bgColor?: string;
	textColor?: string;
};

type Params = {
	options: Option[];
	multiple?: boolean;
	value?: string | number | Array<string | number>;
	defaultValue?: string | number | Array<string | number>;
	onChange?: (val: string) => void;
	disabled?: boolean;
};

const toArray = (v?: unknown) => (v == null ? [] : Array.isArray(v) ? v : [v]);

export const useDropdown = ({
	options,
	multiple = false,
	value,
	onChange,
	disabled = false,
}: Params) => {
	const controlled = value !== undefined;
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const selected = controlled ? toArray(value) : toArray(value);

	useEffect(() => {
		const onDoc = (e: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', onDoc);
		return () => document.removeEventListener('mousedown', onDoc);
	}, []);

	const toggleOption = (opt: Record<'value', string | number>) => {
		if (disabled) return;
		let next: Array<string>;
		const exists = selected.includes(opt.value);
		if (multiple) {
			next = exists
				? selected.filter((v) => v !== opt.value)
				: [...selected, opt.value];
		} else {
			next = exists ? [] : [opt.value.toString()];
		}
		onChange?.(next[0]);
		if (!multiple) setOpen(false);
	};

	const renderValueText = () => {
		if (selected.length === 0) return '';
		if (multiple) {
			return selected
				.map((v) => options.find((o) => o.value === v))
				.filter(Boolean)
				.map((o) => (o as Option).label)
				.join(', ');
		}
		const opt = options.find((o) => o.value === selected[0]);
		return opt ? opt.label : '';
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (disabled) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			setOpen((s) => !s);
		} else if (e.key === 'Escape') {
			setOpen(false);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			setOpen(true);
		}
	};

	const optionsWithId = options.map((o) => ({ ...o, id: o.value }));

	return {
		ref,
		open,
		setOpen,
		selected,
		toggleOption,
		renderValueText,
		handleKeyDown,
		optionsWithId,
	};
};

export default useDropdown;
