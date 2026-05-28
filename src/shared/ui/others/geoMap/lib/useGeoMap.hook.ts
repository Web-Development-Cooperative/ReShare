import { useState } from 'react';

import { useYMaps } from '@pbe/react-yandex-maps';

import type { IGeocodeResult } from 'yandex-maps';
import type {
	Coordinates,
	Address,
	GeoMapProps,
} from '@shared/model/otherUI.types';
import type { IClickEvent } from '../model/geoMap.types';

const useGeoMap = ({
	initialCoordinates,
	initialAddress,
	setInitialCoordinates,
	setInitialAddress,
}: GeoMapProps) => {
	const ymaps = useYMaps(['geocode']);

	const [coordinates, setCoordinates] = useState<Coordinates | null>(
		initialCoordinates ?? null,
	);
	const [address, setAddress] = useState<Address | null>(
		initialAddress ?? null,
	);

	const getCoordinates = (e: IClickEvent) => {
		const coords = e.get('coords');
		return coords;
	};
	const updateCoordinates = (newCoords: Coordinates | null) => {
		if (newCoords) {
			setCoordinates(newCoords);
			setInitialCoordinates?.(newCoords);
		} else {
			setCoordinates(null);
			setInitialCoordinates?.(null);
		}
	};
	const handleClickMap = (e: IClickEvent) => {
		if (!ymaps) {
			console.warn('Yandex Maps API is not loaded yet');
			return;
		}

		const coords = getCoordinates(e);
		updateCoordinates(coords);
		console.log(coords);
		console.log(ymaps);
		ymaps
			.geocode(coords, { results: 1 })
			.then((res) => {
				console.log('Ответ геокодера (RAW):', res);

				if (res.geoObjects.getLength() === 0) {
					console.warn('Адрес не найден');
					setAddress(null);
					return;
				}
				const address = handleGeoResult(res);
				setAddress(address);
				setInitialAddress?.(address);
				console.log('Адрес:', address);
			})
			.catch((error) => {
				console.error('Ошибка при геокодировании:', error);
				setAddress(null);
				setInitialAddress?.(null);
			});
	};
	const handleGeoResult = (result: IGeocodeResult) => {
		const firstGeoObject = result.geoObjects.get(0);
		if (firstGeoObject) {
			const properties = firstGeoObject.properties;

			const location = String(properties.get('description', {}));
			const route = String(properties.get('name', {}));

			const foundAddress = {
				location,
				route,
			};
			return foundAddress;
		}
		return null;
	};

	return { coordinates, address, handleClickMap };
};

export { useGeoMap };
