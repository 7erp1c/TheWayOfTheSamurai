let bPlus = document.getElementById('bPlus');
let bMinus = document.getElementById('bMinus');
let bMultiply = document.getElementById('bMultiply');
let bDevide = document.getElementById('bDevide');

function onButtonPlusClick() {
    let input1 = document.getElementById('number1');
    let input2 = document.getElementById('number2');
    let number1 = Number(input1.value);
    let number2 = Number(input2.value);

    let result = number1+number2;
    window.alert(result);
}

function onButtonMinusClick() {
    let input1 = document.getElementById('number1');
    let input2 = document.getElementById('number2');
    let number1 = Number(input1.value);
    let number2 = Number(input2.value);

    let result = number1-number2;
    window.alert(result);
}

function onButtonMultiplyClick() {
    let input1 = document.getElementById('number1');
    let input2 = document.getElementById('number2');
    let number1 = Number(input1.value);
    let number2 = Number(input2.value);

    let result = number1*number2;
    window.alert(result);
}

function onButtonDevideClick() {
    let input1 = document.getElementById('number1');
    let input2 = document.getElementById('number2');
    let number1 = Number(input1.value);
    let number2 = Number(input2.value);

    let result = number1 / number2;
    window.alert(result);
}
bPlus.addEventListener('click', onButtonPlusClick);
bMinus.addEventListener('click', onButtonMinusClick);
bMultiply.addEventListener('click', onButtonMultiplyClick);
bDevide.addEventListener('click', onButtonDevideClick);