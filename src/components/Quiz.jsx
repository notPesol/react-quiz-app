import Answer from "./Answer";

function Quiz({ question, answers, handleClick, id, isChecked }) {

    const answersElement = answers.map((answer) => (
        <Answer
            quizId={id}
            id={answer.id}
            key={answer.id}
            value={answer.answer}
            isSelected={answer.isSelected}
            handleClick={handleClick}
            isTrue={answer.isTrue}
            isFail={answer.isFail}
            isChecked={isChecked}
        />
    ))

    return (
        <div className="Quiz">
            <h3 className="question">{question}</h3>
            <div className="answers-box">
                {answersElement}
            </div>
            <hr />
        </div>
    );
}

export default Quiz;