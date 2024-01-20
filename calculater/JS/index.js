var operationsButtons = document.getElementsByClassName('button-blockClass');


let input1 = document.getElementById('number1');
let input2 = document.getElementById('number2');


function makeOperation(operationCode) {
    var number1 = Number(input1.value);
    var number2 = Number(input2.value);
    if (operationCode === '+') {
        var result = number1 + number2;
    } else if (operationCode === '-') {
        var result = number1 - number2;
    } else if (operationCode === '*') {
        var result = number1 * number2;
    } else if (operationCode === '/') {
        var result = number1 / number2;
    } else {
        window.alert('Operation is no found')
    }
    window.alert(result);
}

function onOperationButtonClick(eventObject) {
    var clickedElement = eventObject.currentTarget;
    var operation = clickedElement.innerHTML;
    makeOperation(operation);
}



for (let i = 0; i < operationsButtons.length; i++) {
    var batton = operationsButtons[i];
    batton.addEventListener('click', onOperationButtonClick);
}


