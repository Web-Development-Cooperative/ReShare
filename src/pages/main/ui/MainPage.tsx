import InputBase from '~~>shared/ui/inputs/inputBase/InputBase';
import styles from './MainPage.module.css';
import { ButtonBase } from '~~>shared/ui/buttons/buttonBase/ButtonBase';
import { UniList } from '~~>shared/ui/others';
import AdCard from './adCard/AdCard';

const mockAds = Array.from({ length: 10 }, (_, i) => ({ id: `Заглушка вместо карточки-${i + 1}` }));

const MainPage = () => {
    return (
        <div className={styles.main}>
            <h1>Лента объявлений</h1>
            <InputBase></InputBase>
            <ButtonBase>Кнопка</ButtonBase>
            <UniList items={mockAds} renderItem={(item) => <div>{item.id}</div>}></UniList>
            <AdCard></AdCard>
        </div>
    );
};

export { MainPage };