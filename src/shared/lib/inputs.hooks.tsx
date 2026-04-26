import { useState } from 'react';

import type { ChangeEvent, DragEvent } from 'react';

const useInputDropZone = (
	addPhoto: (e: ChangeEvent<HTMLInputElement, Element>) => void,
) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};
	const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const files = e.dataTransfer.files;

			const fakeEvent = {
				target: { files },
			} as unknown as ChangeEvent<HTMLInputElement>;

			addPhoto(fakeEvent);
		}
	};
	return {
		isDragging,
		handleDragOver,
		handleDragLeave,
		handleDrop,
	};
};

export { useInputDropZone };
