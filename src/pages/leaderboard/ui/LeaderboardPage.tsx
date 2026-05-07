import clsx from 'clsx';

import { BgBorderDefault, BgIcone } from '@shared/ui/wrappers';
import { Heading36, Paragraph16Reg, UIText14Reg } from '@shared/ui/paragraphs';
import { Avatar, UniList } from '@shared/ui/others';
import {
	Box,
	Garage,
	Hanger,
	Leaves,
	Turnover,
	Users,
	Handshake,
	Team,
} from '@shared/ui/icons';

import { useLeaderboardPage } from '../lib/useLeaderboardPage.hook';
import styles from './LeaderboardPage.module.css';

import type { FC, ReactNode } from 'react';
import type { StatCard } from '../model/leaderboardPage.types';

const iconMap: Record<StatCard['icon'], ReactNode> = {
	box: <Box />,
	users: <Users />,
	turnover: <Turnover />,
	leaves: <Leaves />,
	handshake: <Handshake />,
	team: <Team />,
	garage: <Garage />,
	hanger: <Hanger />,
};

const LeaderboardPage: FC = () => {
	const { cards, leaderboard, isLoading } = useLeaderboardPage();
	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<h1 className={styles.heroTitle}>
					Экологический вклад сообщества
				</h1>
				<h2>Вместе мы меняем ситуацию к лучшему</h2>
				<Paragraph16Reg>
					Каждая вещь, переданная через сервис, продлевает срок
					использования ресурсов, уменьшает объём отходов и
					поддерживает культуру взаимопомощи.
				</Paragraph16Reg>
				<Paragraph16Reg>
					Ниже показан общий эффект, которого уже достигло наше
					сообщество
				</Paragraph16Reg>
			</div>

			<UniList
				className={styles.statsGrid}
				items={isLoading ? [] : cards}
				renderItem={(card) => (
					<BgBorderDefault
						key={card.id}
						colorType="surface-1"
						className={styles.statCard}
					>
						<div className={styles.statCardHeader}>
							<BgIcone>{iconMap[card.icon]}</BgIcone>
							<div className={styles.statCardMeta}>
								<h3>{card.title}</h3>
								<UIText14Reg
									className={styles.statCardSubtitle}
								>
									{card.subtitle}
								</UIText14Reg>
							</div>
						</div>
						<Heading36>{card.value}</Heading36>
						<UIText14Reg
							className={clsx({
								[styles.trendPositive]: card.trendPositive,
								[styles.trendNegative]: !card.trendPositive,
							})}
						>
							{card.trend}
						</UIText14Reg>
					</BgBorderDefault>
				)}
			/>

			<div className={styles.tableSection}>
				<h2 className={styles.tableTitle}>
					Таблица 10 самых активных доноров сервиса
				</h2>
				<BgBorderDefault colorType="surface-1">
					<table className={styles.table}>
						<thead>
							<tr className={styles.tableHead}>
								<th>Имя</th>
								<th>Количество отданных вещей</th>
								<th>Экономия CO2</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((entry, index) => (
								<tr key={entry.id} className={styles.tableRow}>
									<td>
										<div className={styles.donorCell}>
											<span className={styles.rank}>
												{index + 1}
											</span>
											<Avatar
												src={entry.avatarUrl}
												size="small"
												shape="circle"
											/>
											{entry.name}
										</div>
									</td>
									<td>{entry.itemsCount}</td>
									<td>{entry.co2Saved} кг</td>
								</tr>
							))}
						</tbody>
					</table>
				</BgBorderDefault>
			</div>
		</div>
	);
};

export { LeaderboardPage };
