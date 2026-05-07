import { ButtonBase } from '@shared/ui/buttons/buttonBase/ButtonBase';
import { Loupe } from '@shared/ui/icons/loupe/Loupe';
import { Settings } from '@shared/ui/icons/settings/Settings';
import { InputBase } from '@shared/ui/inputs/inputBase/InputBase';
import { UniList, AdCard } from '@shared/ui/others';
import { UIText14SB } from '@shared/ui/paragraphs';
import { BgBorderDefault } from '@shared/ui/wrappers';
import { notification } from '@shared/lib/toast.helper';
import { Dropdown } from '@shared/ui/others/dropdown/Dropdown';

import styles from './AdsPage.module.css';
import { useAdsPage } from '../lib/useAdsPage.hook';

const AdsPage = () => {
	const {
		allAds,
		isLoading,
		isError,
		showFilters,
		setShowFilters,
		allFilters,
		filterState,
		onChangeOption,
		searchQuery,
		onSearchChange,
	} = useAdsPage();

	let content = (
		<UniList
			className={styles.cardList}
			items={allAds}
			renderItem={(item) => <AdCard {...item} />}
		/>
	);

	if (isLoading) {
		content = <BgBorderDefault colorType="surface-1"></BgBorderDefault>;
	}

	if (isError) {
		notification.error('Ошибка загрузки объявлений. Попробуйте снова.', {
			toastId: 'load-ads-error',
		});
		content = <div>Не удалось загрузить объявления.</div>;
	}

	if (!allAds.length) {
		notification.info('Пока нет объявлений.', {
			toastId: 'no-active-ads',
		});
		content = <div>Пока нет объявлений.</div>;
	}

	return (
		<div className={styles.main}>
			<h1>Лента объявлений</h1>
			<div className={styles.finderContainer}>
				<InputBase
					className={styles['fat-input']}
					placeholder="Поиск по доступным обновлениям"
					leftIcon={<Loupe />}
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
				/>
				<ButtonBase
					color="shaded"
					onClick={() => setShowFilters((s) => !s)}
					aria-expanded={showFilters}
				>
					<Settings />
					<UIText14SB>Фильтры</UIText14SB>
				</ButtonBase>
			</div>
			{showFilters && (
				<UniList
					className={styles.filtersPanel}
					role="region"
					aria-label="Фильтры"
					items={allFilters}
					renderItem={(filterType) => (
						<Dropdown
							options={filterType.options}
							multiple={filterType.id === 'tags'}
							value={filterState[filterType.id]}
							placeholder={filterType.placeholder}
							onChange={(val) => onChangeOption(val, filterType)}
						/>
					)}
				/>
			)}
			<BgBorderDefault colorType="surface-1">{content}</BgBorderDefault>
		</div>
	);
};

export { AdsPage };
