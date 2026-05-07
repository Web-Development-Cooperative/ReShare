import {
	TransferType as TransferEnum,
	ItemCondition as ItemConditionEnum,
} from '@shared/api/generated/listings-api';

import type { TransferType } from '@shared/api/generated/listings-api';
import type { ConditionOption } from './renderStepOne.types';

const TYPE_OPTIONS = ['Дарение', 'Запрос', 'Обмен'] as const;
const TYPE_OPTIONS_EN: Record<(typeof TYPE_OPTIONS)[number], TransferType> = {
	Дарение: TransferEnum.Gift,
	Обмен: TransferEnum.Exchange,
	Запрос: TransferEnum.Charity,
};
const CONDITION_OPTIONS: Array<ConditionOption> = [
	{ value: ItemConditionEnum.New, label: 'Новый' },
	{ value: ItemConditionEnum.LikeNew, label: 'Как новый' },
	{ value: ItemConditionEnum.Good, label: 'Хороший' },
	{ value: ItemConditionEnum.Fair, label: 'Удовлетворительный' },
	{ value: ItemConditionEnum.Poor, label: 'Плохой' },
];
export { TYPE_OPTIONS, TYPE_OPTIONS_EN, CONDITION_OPTIONS };
