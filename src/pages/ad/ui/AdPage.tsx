import { ButtonBase } from '@shared/ui/buttons';
import {
	Paragraph16Reg,
	UIText12Reg,
	UIText14Reg,
	UIText14SB,
} from '@shared/ui/paragraphs';
import { ArrowLeft, Heart, Share } from '@shared/ui/icons';
import { Avatar, Rating, UniList } from '@shared/ui/others';
import { BgBorderDefault } from '@shared/ui/wrappers';

const AdPage = () => {
	const title = 'Продам велосипед';
	const description =
		'Диван серого цвета, 3 года в эксплуатации. Чистый, без пятен и дефектов. Переезжаю в другой город. Могу отдать по будням после 19:00 по указанному адресу';
	const transMethod = 'Доставка, личная встреча';
	const fio = 'Аполлинария В.';
	const rating = 4.9;
	const compTrans = 15;
	const year = 2024;
	const location = 'Екатеринбург, Верх-Исетский район, ул. Татищева 94';
	const date = '5 часов назад';
	const views = 123;

	return (
		<div className="ad">
			<div className="top-buttons">
				<ButtonBase>
					<ArrowLeft />
					<UIText14SB>Вернуться назад</UIText14SB>
				</ButtonBase>
				<ButtonBase>
					<Share />
					<UIText14SB>Поделиться</UIText14SB>
				</ButtonBase>
				<ButtonBase>
					<Heart />
					<UIText14SB>В избранное</UIText14SB>
				</ButtonBase>
			</div>
			<div className="first-data">
				<div className="photos-wrapper">
					<img className="main-photo"></img>
					<UniList
						className="all-photo"
						items={[]}
						renderItem={() => <img />}
					/>
				</div>
				<div className="eco-wrapper">{/* TODO */}</div>
			</div>
			<BgBorderDefault colorType="surface-1">
				<h1>{title}</h1>
				<UniList
					className="tags-list"
					items={[]}
					renderItem={() => <div className="tag"></div>}
				/>
				<div className="description">
					<h3>Описание</h3>
					<Paragraph16Reg>{description}</Paragraph16Reg>
				</div>
				<div className="trans-method">
					<h3>Способы передачи</h3>
					<Paragraph16Reg>{transMethod}</Paragraph16Reg>
				</div>
				<BgBorderDefault colorType="white">
					<Avatar className="avatar" size="huge" shape="circle" />
					<div className="avatar-info">
						<UIText14Reg>{fio}</UIText14Reg>
						<div className="avatar-tags">
							<Rating rating={rating} />
						</div>
						<UIText12Reg>
							{compTrans} завершенных сделок
						</UIText12Reg>
						<UIText12Reg>На ShareSphere с {year} года</UIText12Reg>
					</div>
				</BgBorderDefault>
				<div className="settings-buttons">
					<ButtonBase color="brand">Снять с публикации</ButtonBase>
					<ButtonBase color="shaded">
						Редактировать объявление
					</ButtonBase>
				</div>
				<div className="location">
					<h3>Местоположение</h3>
					<Paragraph16Reg>{location}</Paragraph16Reg>
					<img />
					<div className="location-sec-data">
						<Paragraph16Reg>Опубликовано {date}</Paragraph16Reg>
						<UIText14Reg>•</UIText14Reg>
						<Paragraph16Reg>{views} просмотров</Paragraph16Reg>
					</div>
				</div>
			</BgBorderDefault>
		</div>
	);
};

export { AdPage };
