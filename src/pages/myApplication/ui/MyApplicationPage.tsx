import { AdCard, PaginationBar, UniList } from '@shared/ui/others';
import { BgBorderDefault } from '@shared/ui/wrappers';
import { notification } from '@shared/lib/toast.helper';

import { useMyApplicationPage } from '../lib/useMyApplicationPage.hook';
import styles from './MyApplicationPage.module.css';

const MyApplicationPage = () => {
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
	} = useMyApplicationPage();
	if (isLoading) {
		return (
			<BgBorderDefault colorType="surface-1">
				<div>Загрузка заявок...</div>
			</BgBorderDefault>
		);
	}

	if (isError) {
		notification.error('Ошибка загрузки заявок. Попробуйте снова.', {
			toastId: 'load-ads-error',
		});
		return (
			<BgBorderDefault colorType="surface-1">
				<div>Не удалось загрузить заявки.</div>
			</BgBorderDefault>
		);
	}

	if (!activeAds.length) {
		notification.info('У вас пока нет заявок.', {
			toastId: 'no-active-ads',
		});
		return (
			<BgBorderDefault colorType="surface-1">
				<div>У вас пока нет заявок.</div>
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
				name="заявок"
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

export { MyApplicationPage };
