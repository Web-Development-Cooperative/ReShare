import type { TransferType } from '@shared/api/generated/listings-api';

const TransferTypeRu: Record<keyof typeof TransferType, string> = {
	Gift: 'Дарение',
	Exchange: 'Обмен',
	Charity: 'Запрос',
} as const;

export { TransferTypeRu };
