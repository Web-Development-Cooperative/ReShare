// Тип для правила валидации одного поля
type ValidationRule<T = unknown> = {
	required?: boolean | (() => boolean); // true или функция-условие
	message?: string; // Кастомное сообщение об ошибке
	// Можно добавить больше правил в будущем:
	// minLength?: number;
	// pattern?: RegExp;
	validate?: (value: T) => string | undefined;
};

// Карта правил: ключ — имя поля, значение — правило
type ValidationSchema<T extends Record<string, unknown>> = {
	[K in keyof T]?: ValidationRule<T[K]>;
};

// Результат валидации: объект с ошибками или null, если всё ок
type ValidationErrors<T extends Record<string, unknown>> = Partial<
	Record<keyof T, string>
> | null;

const validateFields = <T extends Record<string, unknown>>(
	data: Partial<T>,
	schema: ValidationSchema<T>,
	defaultRequiredMessage = 'Это поле обязательно для заполнения',
): ValidationErrors<T> => {
	const errors: Partial<Record<keyof T, string>> = {};

	for (const [fieldKey, rule] of Object.entries(schema)) {
		const key = fieldKey as keyof T;
		const value = data[key];

		// Пропускаем поле, если оно не обязательное или условие не выполнено
		const isRequired =
			typeof rule?.required === 'function'
				? rule.required()
				: rule?.required;

		if (!isRequired) continue;

		// Проверка на пустоту в зависимости от типа значения
		const isEmpty =
			value == null || // null или undefined
			(typeof value === 'string' && value.trim() === '') || // пустая строка
			(Array.isArray(value) && value.length === 0) || // пустой массив
			(typeof value === 'object' &&
				value !== null &&
				Object.keys(value).length === 0); // пустой объект

		if (isEmpty) {
			errors[key] = rule?.message || defaultRequiredMessage;
		}
	}

	return Object.keys(errors).length > 0 ? errors : null;
};

export { validateFields };
export type { ValidationSchema, ValidationRule };
