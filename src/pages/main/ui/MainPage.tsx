import React, { useState } from 'react';

import { ButtonBase } from '@shared/ui/buttons/buttonBase/ButtonBase';
import { Loupe } from '@shared/ui/icons/loupe/Loupe';
import { Settings } from '@shared/ui/icons/settings/Settings';
import { InputBase } from '@shared/ui/inputs/inputBase/InputBase';
import { UniList } from '@shared/ui/others';
import { UIText14SB } from '@shared/ui/paragraphs';
import { BgBorderDefault } from '@shared/ui/wrappers';
import { Dropdown, Option } from '@shared/ui/others/dropdown/Dropdown';

import AdCard from './adCard/AdCard';
import styles from './MainPage.module.css';

const filters: { key: string; options: Option[], multiple?: boolean, placeholder?: string, textColor?: string }[] = [
  {
    key: 'category',
    options: [
      { value: 'furniture', label: 'Мебель', bgColor: 'var(--bg-color-positive)', textColor: 'var(--text-primary-on-color)' },
      { value: 'electronics', label: 'Электроника', bgColor: '#e6f7d6', textColor: 'var(--text-primary-on-color)' },
      { value: 'clothes', label: 'Одежда', bgColor: '#ffe6e6', textColor: 'var(--text-primary-on-color)' },
    ],
    placeholder: 'Все категории',
  },
  {
    key: 'type',
    options: [
      { value: 'Дарение', label: 'Дарение', bgColor: 'var(--bg-color-positive)', textColor: 'var(--text-primary-on-color)' },
      { value: 'Запрос', label: 'Запрос', bgColor: 'var(--bg-color-blue)', textColor: 'var(--text-primary-on-color)' },
      { value: 'Обмен', label: 'Обмен', bgColor: 'var(--bg-color-teal)', textColor: 'var(--text-primary-on-color)' },
      { value: 'Сбор НКО', label: 'Сбор НКО', bgColor: 'var(--bg-color-violet)', textColor: 'var(--text-primary-on-color)' },
    ],
	placeholder: 'Тип объявления',
  },
  {
    key: 'condition',
    options: [
      { value: 'any', label: 'Любое' },
      { value: 'new', label: 'Новое' },
      { value: 'used', label: 'Б/У' },
    ],
	placeholder: 'Состояние',
  }
];

const mockCards = [
  {
    id: 1,
    title: 'Большой серый диван',
    description: '1.2 км ~ Екатеринбург, ВИЗ',
    author: 'Аполлинария В.',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://cloud.pllsll.ru/1366x/pollskill/storage/f7/09/3/b5e94b9b7c7.jpg',
  },
  {
    id: 2,
    title: 'Объявление 2',
    description: 'Описание объявления 2',
    author: 'Автор 2',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://www.rosphoto.com/images/u/articles/1604/5_14.jpg',
  },
  {
    id: 3,
    title: 'Объявление 3',
    description: 'Описание объявления 3',
    author: 'Автор 3',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQamhnksZvw8Zpez6D8XMaOCcE2eFuug4w2xg&s',
  },
  {
    id: 4,
    title: 'Объявление 4',
    description: 'Описание объявления 4',
    author: 'Автор 4',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Ez19ppwX9E70ppolD0HmVLc4hP4_YFSFnQ&s',
  },
  {
    id: 5,
    title: 'Объявление 5',
    description: 'Описание объявления 5',
    author: 'Автор 5',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://img.freepik.com/free-photo/mountain-landscape-tranquil-waters-majestic-rocky-peaks-generated-by-ai_188544-10117.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 4,
    title: 'Объявление 4',
    description: 'Описание объявления 4',
    author: 'Автор 4',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Ez19ppwX9E70ppolD0HmVLc4hP4_YFSFnQ&s',
  },
  {
    id: 5,
    title: 'Объявление 5',
    description: 'Описание объявления 5',
    author: 'Автор 5',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://img.freepik.com/free-photo/mountain-landscape-tranquil-waters-majestic-rocky-peaks-generated-by-ai_188544-10117.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 6,
    title: 'Объявление 6',
    description: 'Описание объявления 6',
    author: 'Автор 4',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Ez19ppwX9E70ppolD0HmVLc4hP4_YFSFnQ&s',
  },
  {
    id: 5,
    title: 'Объявление 5',
    description: 'Описание объявления 5',
    author: 'Автор 5',
    tags: [
      { id: 1, name: 'Тег 1' },
      { id: 2, name: 'Тег 2' },
      { id: 3, name: 'Тег 3' },
    ],
    img: 'https://img.freepik.com/free-photo/mountain-landscape-tranquil-waters-majestic-rocky-peaks-generated-by-ai_188544-10117.jpg?semt=ais_hybrid&w=740&q=80',
  },
];

const MainPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState<Record<string, unknown>>({});

  return (
    <div className={styles.main}>
      <h1>Лента объявлений</h1>

      <div className={styles.finderContainer}>
        <InputBase
          className={styles['fat-input']}
          placeholder="Поиск по доступным обновлениям"
          leftIcon={<Loupe />}
        />
        <ButtonBase
          color="shaded"
          onClick={() => setShowFilters((s) => !s)}
          aria-expanded={showFilters}
        >
          <Settings />
          <UIText14SB>Фильтры</UIText14SB>
        </ButtonBase>
      </div>

      {showFilters && (
        <div className={styles.filtersPanel} role="region" aria-label="Фильтры">
          {filters.map((f) => (
            <div key={f.key} className={styles.filterItem}>
              <Dropdown
                options={f.options}
                multiple={f.key === 'tags'}
                value={filterState[f.key]}
				placeholder={f.placeholder}
                onChange={(val) => setFilterState((s) => ({ ...s, [f.key]: val }))}
              />
            </div>
          ))}
        </div>
      )}

      <BgBorderDefault colorType="surface-1">
        <UniList className={styles.cardList} items={mockCards} renderItem={(item) => <AdCard {...item} />} />
      </BgBorderDefault>
    </div>
  );
};

export { MainPage };