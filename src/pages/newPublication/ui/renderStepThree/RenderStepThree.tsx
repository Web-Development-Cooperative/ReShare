import { AdCard } from '@shared/ui/others';

import styles from './RenderStepThree.module.css';

import type { RenderStepThreeProps } from '@pages/newPublication/model/newPublicationPage.types';

const RenderStepThree: RenderStepThreeProps = ({ formData }) => {
	return (
		<>
			<div className={styles.section}>
				<h3>Местоположение</h3>
				<AdCard
					img={formData.photos?.[0] || ''}
					title={formData.title || ''}
					author={'Имя фамилия'}
					description={formData.description || ''}
					tags={[
						{
							id: formData.category || 1,
							name: formData.category || 'Категория',
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
