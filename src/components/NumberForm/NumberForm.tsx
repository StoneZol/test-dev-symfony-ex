import React, { useState } from 'react';
import type { NumberType, UserInput } from '../../types';
import styles from './NumberForm.module.css';

interface NumberFormProps {
    onSubmit: (data: UserInput) => void;
    isLoading: boolean;
}

const NumberForm: React.FC<NumberFormProps> = ({ onSubmit, isLoading }) => {
    const [number, setNumber] = useState<string>('');
    const [type, setType] = useState<NumberType>('trivia');
    const [isRandom, setIsRandom] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isRandom && !number.trim()) {
            setError('Пожалуйста, введите число');
            return;
        }

        if (!isRandom) {
            const numValue = parseInt(number.trim());
            if (isNaN(numValue)) {
                setError('Число должно быть в виде цифры');
                return;
            }
        }

        const formData: UserInput = {
            number: isRandom ? undefined : parseInt(number.trim()),
            type,
            isRandom
        };

        onSubmit(formData);
    };

    const handleRandomToggle = () => {
        setIsRandom(!isRandom);
        if (!isRandom) {
            setNumber('');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Информация о числах</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label}>Тип информации:</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as NumberType)}
                        className={styles.select}
                    >
                        <option value="trivia">Интересные факты</option>
                        <option value="math">Математические факты</option>
                        <option value="date">Факты о датах</option>
                        <option value="year">Факты о годах</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={isRandom}
                            onChange={handleRandomToggle}
                            className={styles.checkbox}
                        />
                        Случайное число
                    </label>
                </div>

                {!isRandom && (
                    <div className={styles.field}>
                        <label className={styles.label}>Число:</label>
                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Введите число"
                            className={styles.input}
                            disabled={isLoading}
                        />
                    </div>
                )}

                {error && <div className={styles.error}>{error}</div>}

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Загрузка...' : 'Получить информацию'}
                </button>
            </form>
        </div>
    );
};

export default NumberForm; 