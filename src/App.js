import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import QuizBox from "./components/QuizBox";

function App() {

	const [isStart, setIsStart] = useState(false);
	const [firstTime, setFirstTime] = useState(true);
	const [quizs, setQuizs] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const [score, setScore] = useState(0);

	const toggleStart = () => {
		setIsStart(true);
		setFirstTime(false);
	}

	const handleClick = (quizId, id) => {
		if (!isChecked) {
			setQuizs(prevQuizs => {
				return prevQuizs.map(quiz => {
					if (quiz.id === quizId) {
						return {
							...quiz,
							answers: quiz.answers.map(answer => {
								answer.isSelected = false;
								if (answer.id === id) {
									return {
										...answer,
										isSelected: !answer.isSelected
									}
								} else {
									return answer
								}
							})
						}
					} else {
						return quiz;
					}
				})
			})
		}
	}

	const checkAnswers = () => {
		if (!isChecked) {
			setIsChecked(true);
			setQuizs(prevQuizs => {
				return prevQuizs.map(quiz => {
					return {
						...quiz,
						answers: quiz.answers.map(answer => {
							if (answer.answer === quiz.correctAnswer) {
								if (answer.isSelected) {
									setScore(prevScore => prevScore + 1);
								}
								return {
									...answer,
									isTrue: true
								}
							} else if (answer.isSelected && answer.answer !== quiz.correctAnswer) {
								return {
									...answer,
									isFail: true
								}
							} else {
								return answer
							}
						})
					}
				})
			})
		} else {
			setIsChecked(false);
		}
	}

	useEffect(() => {
		if (!isChecked) {
			setScore(0);
			fetch("https://opentdb.com/api.php?amount=5")
				.then(res => res.json())
				.then(data => {
					const results = data.results;
					const newQuizs = results.map(quiz => {
						const answers = [...quiz.incorrect_answers, quiz.correct_answer];
						return {
							id: nanoid(),
							question: quiz.question,
							correctAnswer: quiz.correct_answer,
							answers: answers.map(answer => {
								return {
									id: nanoid(),
									answer,
									isSelected: false
								}
							}).sort((_a,_b) => 0.5 - Math.random())
						}
					});
					setQuizs(newQuizs);
				})
		}

	}, [isChecked])

	return (
		<div className="App">
			{!isStart && firstTime ? <Home toggleStart={toggleStart} /> :
				<QuizBox quizs={quizs} handleClick={handleClick} checkAnswers={checkAnswers}
					isChecked={isChecked}
					score={score} />
			}
		</div>
	);
}

export default App;
