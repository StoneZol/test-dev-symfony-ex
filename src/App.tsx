import { useState } from 'react'
import styles from './App.module.css'
import NumberForm from './components/NumberForm'
import NumberResult from './components/NumberResult'
import type { UserInput, NumberInfo } from './types'
import { NumbersApiService } from './services/numbersApi'

function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [userInput, setUserInput] = useState<UserInput | null>(null)
    const [numberInfo, setNumberInfo] = useState<NumberInfo | null>(null)

    const handleFormSubmit = async (data: UserInput) => {
        setIsLoading(true)
        setError('')

        try {
            let result

            if (data.isRandom) {
                result = await NumbersApiService.getRandomNumberInfo(data.type)
            } else {
                result = await NumbersApiService.getSpecificNumberInfo(data.number!, data.type)
            }

            const numberInfo: NumberInfo = {
                text: result.text,
                number: result.number,
                type: data.type
            }

            setUserInput(data)
            setNumberInfo(numberInfo)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных')
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        setUserInput(null)
        setNumberInfo(null)
        setError('')
    }

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1 className={styles.title}>Numbers API</h1>
                <p className={styles.subtitle}>Узнайте интересные факты о числах</p>
            </header>

            <main className={styles.main}>
                {error && (
                    <div className={styles.errorContainer}>
                        <p className={styles.errorText}>{error}</p>
                    </div>
                )}

                {!userInput || !numberInfo ? (
                    <NumberForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                ) : (
                    <NumberResult
                        userInput={userInput}
                        numberInfo={numberInfo}
                        onBack={handleBack}
                    />
                )}
            </main>

            <footer className={styles.footer}>
                <p>Powered by <a href="http://numbersapi.com" target="_blank" rel="noopener noreferrer">Numbers API</a></p>
            </footer>
        </div>
    )
}

export default App
