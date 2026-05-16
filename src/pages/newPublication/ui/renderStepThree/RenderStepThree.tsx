import { AdCard } from '@shared/ui/others';

import { useRenderStepThree } from '../../lib/useRenderStepThree.hook';
import { TYPE_OPTIONS_EN } from '../../model/renderStepOne.consts';
import styles from './RenderStepThree.module.css';

import type { RenderStepThreeProps } from '@pages/newPublication/model/newPublicationPage.types';

const TRANSFER_TYPE_RU = Object.fromEntries(
	Object.entries(TYPE_OPTIONS_EN).map(([ru, en]) => [en, ru]),
) as Record<string, string>;

const RenderStepThree: RenderStepThreeProps = ({ formData }) => {
	const { profile } = useRenderStepThree();

	const transferTypeTag = formData.transferType
		? [
				{
					id: 'transferType',
					name:
						TRANSFER_TYPE_RU[formData.transferType] ??
						formData.transferType,
				},
				{
					id: formData.categoryId || 1,
					name: 'Ваша категория',
				},
			]
		: [];

	const userTags = (formData.tags ?? [])
		.filter(Boolean)
		.map((tag, i) => ({ id: `tag-${i}`, name: tag }));

	return (
		<>
			<div className={styles.section}>
				<h3>Предпросмотр объявления</h3>
				<AdCard
					img={formData.photos?.[0] || ''}
					title={formData.title || ''}
					author={`${profile?.firstName || 'Имя'} ${profile?.lastName || 'Фамилия'}`}
					authorAvatarUrl={profile?.avatarUrl || undefined}
					description={formData.description || ''}
					tags={[...transferTypeTag, ...userTags]}
					state="disabled"
				/>
			</div>
		</>
	);
};

export { RenderStepThree };
