import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

import { useGeoMap } from './lib/useGeoMap.hook';

import type { IGeoMap } from '@shared/model/otherUI.types';
import type { IClickEvent } from './model/geoMap.types';

const GeoMap: IGeoMap = ({
	initialCoordinates = null,
	initialAddress = null,
	setInitialCoordinates,
	setInitialAddress,
	zoom = 16,
}) => {
	const { handleClickMap, coordinates } = useGeoMap({
		initialCoordinates,
		initialAddress,
		setInitialCoordinates,
		setInitialAddress,
	});

	return (
		<Map
			defaultState={{
				center: initialCoordinates ?? [0, 0],
				zoom,
			}}
			style={{ width: '100%', height: '500px' }}
			onClick={(e: IClickEvent) => {
				handleClickMap(e);
			}}
		>
			{coordinates && <Placemark geometry={coordinates} />}
		</Map>
	);
};

const GeoMapProvider: IGeoMap = (props) => {
	return (
		<YMaps
			query={{
				lang: 'ru_RU',
				apikey: '1b61d717-bafe-4fcf-91e0-83909a156604',
				load: 'package.full',
			}}
		>
			<GeoMap {...props} />
		</YMaps>
	);
};

export { GeoMapProvider as GeoMap };
