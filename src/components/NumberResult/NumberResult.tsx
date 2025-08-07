import React from 'react';
import type { NumberInfo, UserInput } from '../../types';
import styles from './NumberResult.module.css';

interface NumberResultProps {
    userInput: UserInput;
    numberInfo: NumberInfo;
    onBack: () => void;
}

const NumberResult: React.FC<NumberResultProps> = ({ userInput, numberInfo, onBack }) => {
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'trivia': return 'Интересные факты';
            case 'math': return 'Математические факты';
            case 'date': return 'Факты о датах';
            case 'year': return 'Факты о годах';
            default: return type;
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Результат</h2>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Ваш запрос:</h3>
                <div className={styles.userInput}>
                    <p><strong>Тип информации:</strong> {getTypeLabel(userInput.type)}</p>
                    <p><strong>Число:</strong> {userInput.isRandom ? 'Случайное' : userInput.number}</p>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Информация о числе:</h3>
                <div className={styles.numberInfo}>
                    <div className={styles.numberDisplay}>
                        <span className={styles.number}>{numberInfo.number}</span>
                        <span className={styles.type}>{getTypeLabel(numberInfo.type)}</span>
                    </div>
                    <p className={styles.fact}>{numberInfo.text}</p>
                </div>
            </div>

            <button onClick={onBack} className={styles.backButton}>
                ← Назад к форме
            </button>
        </div>
    );
};

export default NumberResult; 