import type { Area } from 'react-easy-crop';

const cropImage = (imageSrc: string, croppedAreaPixels: Area): Promise<File> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imageSrc;
		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = croppedAreaPixels.width;
			canvas.height = croppedAreaPixels.height;
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Canvas context unavailable'));
				return;
			}
			ctx.drawImage(
				image,
				croppedAreaPixels.x,
				croppedAreaPixels.y,
				croppedAreaPixels.width,
				croppedAreaPixels.height,
				0,
				0,
				croppedAreaPixels.width,
				croppedAreaPixels.height,
			);
			canvas.toBlob(
				(blob) => {
					if (!blob) {
						reject(new Error('Canvas toBlob failed'));
						return;
					}
					resolve(
						new File([blob], 'avatar.jpg', { type: 'image/jpeg' }),
					);
				},
				'image/jpeg',
				0.92,
			);
		};
		image.onerror = () => reject(new Error('Image load failed'));
	});

export { cropImage };
