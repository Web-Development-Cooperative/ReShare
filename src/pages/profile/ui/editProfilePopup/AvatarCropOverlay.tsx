import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

import { ButtonBase } from '@shared/ui/buttons';
import { UIText14SB } from '@shared/ui/paragraphs';

import styles from './AvatarCropOverlay.module.css';

import type { Area } from 'react-easy-crop';

type Props = {
	imageSrc: string;
	onConfirm: (_croppedAreaPixels: Area) => void;
	onCancel: () => void;
};

const AvatarCropOverlay = ({ imageSrc, onConfirm, onCancel }: Props) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
		null,
	);

	const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
		setCroppedAreaPixels(croppedPixels);
	}, []);

	return (
		<div className={styles.overlay}>
			<div className={styles.cropArea}>
				<Cropper
					image={imageSrc}
					crop={crop}
					zoom={zoom}
					aspect={1}
					cropShape="round"
					showGrid={false}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
				/>
			</div>
			<div className={styles.zoomSlider}>
				<input
					type="range"
					min={1}
					max={3}
					step={0.05}
					value={zoom}
					onChange={(e) => setZoom(Number(e.target.value))}
					aria-label="Масштаб"
				/>
			</div>
			<div className={styles.actions}>
				<ButtonBase color="shaded" onClick={onCancel}>
					<UIText14SB>Отмена</UIText14SB>
				</ButtonBase>
				<ButtonBase
					color="brand"
					onClick={() =>
						croppedAreaPixels && onConfirm(croppedAreaPixels)
					}
					disabled={!croppedAreaPixels}
				>
					<UIText14SB>Применить</UIText14SB>
				</ButtonBase>
			</div>
		</div>
	);
};

export { AvatarCropOverlay };
