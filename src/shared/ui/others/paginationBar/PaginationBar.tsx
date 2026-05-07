import { BgBorderDefault } from '@shared/ui/wrappers';
import { ButtonBase } from '@shared/ui/buttons';
import { Paragraph16Reg, UIText14Medium } from '@shared/ui/paragraphs';
import { UniList } from '@shared/ui/others';
import { ArrowLeft } from '@shared/ui/icons';
import {
	MAX_VISIBLE_PAGES,
	HALF_VISIBLE,
	PAGE_WINDOW_OFFSET,
	GAP_LEFT_THRESHOLD,
	LEFT_REMAINS,
	GAP_RIGHT_THRESHOLD,
	RIGHT_REMAINS,
} from '@shared/model/otherUI.consts';

import styles from './PaginationBar.module.css';

import type { FC } from 'react';
import type { PaginationBarProps } from '@shared/model/otherUI.types';

const PaginationBar: FC<PaginationBarProps> = ({
	minPage = 1,
	maxPage,
	name,
	totalElements,
	cardinality,
	currentPage,
	onPageChange,
	onPageInc,
	onPageDec,
}) => {
	return (
		<BgBorderDefault
			colorType="surface-1"
			className={styles['pagination-wrapper']}
		>
			<UIText14Medium>
				Показано {name || 'филиалов'}: {cardinality} из {totalElements}
			</UIText14Medium>
			<div className={styles.pagination}>
				<ButtonBase
					onClick={onPageDec}
					disabled={currentPage <= minPage}
				>
					<ArrowLeft />
				</ButtonBase>
				<UniList
					className={styles.pages}
					items={[
						...(+maxPage > MAX_VISIBLE_PAGES &&
						+currentPage - GAP_LEFT_THRESHOLD > 0
							? +currentPage - GAP_LEFT_THRESHOLD === LEFT_REMAINS
								? [{ id: 1, val: 1 }]
								: [
										{ id: 1, val: 1 },
										{
											id: 'dots_start',
											val: '...',
											desc: 'dots',
										},
									]
							: []),
						...Array.from(
							{
								length:
									+maxPage > MAX_VISIBLE_PAGES
										? MAX_VISIBLE_PAGES
										: +maxPage,
							},
							(_, i) => {
								const start = Math.max(
									1,
									Math.min(
										currentPage - HALF_VISIBLE,
										+maxPage - PAGE_WINDOW_OFFSET,
									),
								);
								const value = start + i;
								return { id: value, val: value };
							},
						),
						...(+maxPage > MAX_VISIBLE_PAGES &&
						+maxPage - +currentPage - GAP_RIGHT_THRESHOLD > 0
							? +maxPage - +currentPage - GAP_RIGHT_THRESHOLD ===
								RIGHT_REMAINS
								? [
										{
											id: maxPage,
											val: maxPage,
										},
									]
								: [
										{
											id: 'dots_end',
											val: '...',
											desc: 'dots',
										},
										{
											id: maxPage,
											val: maxPage,
										},
									]
							: []),
					]}
					renderItem={(item) => (
						<ButtonBase
							key={item.id}
							className={styles.page}
							onClick={() =>
								!('desc' in item) && onPageChange(item.val)
							}
							color={
								item.val === currentPage ? 'brand' : 'outline'
							}
							disabled={'desc' in item}
						>
							<Paragraph16Reg>{item.val}</Paragraph16Reg>
						</ButtonBase>
					)}
				/>
				<ButtonBase
					onClick={onPageInc}
					disabled={maxPage <= currentPage}
				>
					<ArrowLeft className={styles.svg_rotate180} />
				</ButtonBase>
			</div>
		</BgBorderDefault>
	);
};

export { PaginationBar };
