import clsx from 'clsx';

import { UIText12Reg, UIText14Medium } from '@shared/ui/paragraphs';
import { Camera } from '@shared/ui/icons';
import { useInputDropZone } from '@shared/lib/inputs.hooks';

import styles from './InputDropZone.module.css';

import type { FC } from 'react';
import type { InputDropZoneProps } from '@shared/model/input.types';

const InputDropZone: FC<InputDropZoneProps> = ({
	errors,
	addPhoto,
	...props
}) => {
	const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
		useInputDropZone(addPhoto);
	return (
		<div className="">
			<label
				className={clsx(styles.uploadCard, {
					[styles.errorPhotos]: errors,
					[styles.dragging]: isDragging,
				})}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<input
					type="file"
					accept="image/*"
					multiple
					onChange={addPhoto}
					hidden
					{...props}
				/>
				<Camera />
				<div className={styles.uploadText}>
					<UIText14Medium>Добавьте фотографию вещи</UIText14Medium>
					<UIText12Reg className={styles.uploadHint}>
						JPG, HEIC, не более 5 МБ
					</UIText12Reg>
				</div>
			</label>
		</div>
	);
};

export { InputDropZone };
