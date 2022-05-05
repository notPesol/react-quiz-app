function Answer({ value, handleClick, isSelected, id, quizId, isTrue, isFail, isChecked }) {

    const checked = (isChecked && !isTrue) || (isChecked === true && isFail === true);

    return (
        <div onClick={() => handleClick(quizId,id)} 
            className={`answer 
                ${isSelected && 'selected '} 
                ${isTrue && 'true '} 
                ${isFail && 'fail '}
                ${checked  && 'checked'}`}>
            {value}
        </div>
    );
}

export default Answer;