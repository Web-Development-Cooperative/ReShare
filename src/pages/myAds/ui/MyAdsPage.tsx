import { AdCard, PaginationBar, UniList } from '@shared/ui/others';
import { BgBorderDefault } from '@shared/ui/wrappers';
import { notification } from '@shared/lib/toast.helper';

import { useMyAdsPage } from '../lib/useMyAdsPage';
import styles from './MyAdsPage.module.css';

const MyAdsPage = () => {
	const {
		activeAds,
		isLoading,
		isError,
		currentPage,
		totalPages,
		totalElements,
		cardinality,
		onPageChange,
		onPageInc,
		onPageDec,
	} = useMyAdsPage();
	if (isLoading) {
		return (
			<BgBorderDefault colorType="surface-1">
				<div>Загрузка объявлений...</div>
			</BgBorderDefault>
		);
	}

	if (isError) {
		notification.error('Ошибка загрузки объявлений. Попробуйте снова.', {
			toastId: 'load-ads-error',
		});
		return (
			<BgBorderDefault colorType="surface-1">
				<div>Не удалось загрузить объявления.</div>
			</BgBorderDefault>
		);
	}

	if (!activeAds.length) {
		notification.info('У вас пока нет объявлений.', {
			toastId: 'no-active-ads',
		});
		return (
			<BgBorderDefault colorType="surface-1">
				<div>У вас пока нет объявлений.</div>
			</BgBorderDefault>
		);
	}

	return (
		<>
			<BgBorderDefault colorType="surface-1">
				<UniList
					className={styles['ads-list']}
					items={activeAds}
					renderItem={(item) => <AdCard {...item} />}
				/>
			</BgBorderDefault>
			<PaginationBar
				maxPage={totalPages}
				name="объявлений"
				totalElements={totalElements}
				cardinality={cardinality}
				currentPage={currentPage}
				onPageChange={onPageChange}
				onPageInc={onPageInc}
				onPageDec={onPageDec}
			/>
		</>
	);
};

export { MyAdsPage };
