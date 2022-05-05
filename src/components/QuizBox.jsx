import Quiz from "./Quiz";

function QuizBox({ quizs, handleClick, checkAnswers, isChecked, score }) {

    const quizsElement = quizs.map((quiz) => {
        return <Quiz
            key={quiz.id}
            id={quiz.id}
            question={quiz.question}
            answers={quiz.answers}
            handleClick={handleClick}
            isChecked={isChecked}
        />
    })

    return (
        <div className="QuizBox">
            {quizsElement}
            {!isChecked ?
                <div className="button-box">
                    <button onClick={checkAnswers}>Check answers</button>
                </div> :
                <div className="button-box">
                    <h3>Your scored {score / 2} / 5 correct answers</h3>
                    <button onClick={checkAnswers}>Play again</button>
                </div>}
        </div>
    );
}

export default QuizBox;