import { AdCard } from '@shared/ui/others';

import { useRenderStepThree } from '../../lib/useRenderStepThree.hook';
import styles from './RenderStepThree.module.css';

import type { RenderStepThreeProps } from '@pages/newPublication/model/newPublicationPage.types';

const RenderStepThree: RenderStepThreeProps = ({ formData }) => {
	const { profile } = useRenderStepThree();
	return (
		<>
			<div className={styles.section}>
				<h3>Местоположение</h3>
				<AdCard
					img={formData.photos?.[0] || ''}
					title={formData.title || ''}
					author={`${profile?.firstName || 'Имя'} ${profile?.lastName || 'Фамилия'}`}
					authorAvatarUrl={profile?.avatarUrl || undefined}
					description={formData.description || ''}
					tags={[
						{
							id: formData.condition || 1,
							name: formData.condition || 'Состояние',
						},
						{ id: 2, name: '120ru' },
					]}
					state="disabled"
				/>
			</div>
		</>
	);
};

export { RenderStepThree };
