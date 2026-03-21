import React from 'react';
import styles from './AdCard.module.css';
import { UIText14Medium } from '~~>shared/ui/paragraphs';

const AdCard = () => {
    return (
        <div>
            <div>Компонент с лайком</div>
            <img src="#" alt="Картинка объявления" />
            <div>
                <h4>Заголовок объявления</h4>
                <div>
                    <img src="#" alt="аватарка автора" />
                    <p>Имя автора объявления</p>
                </div>
                <UIText14Medium className={styles.description}>Описание(расстоние, город, район)</UIText14Medium>
            </div>
            <div>
                теги
            </div>
        </div>
    );
};

export default AdCard;