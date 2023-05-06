const input = document.querySelector('.box_input .input'),
    showResult = document.querySelector('.box_result .input'),
    keyTypeConvert = document.querySelector('.box_input #typeConvert'),
    keyTypeResult = document.querySelector('.box_result #typeConvert'),
    btnConvert = document.querySelector('.convert-btn');
let reSave = "";
keyTypeConvert.addEventListener('change', ()=> {
    reSave = "";
    input.value = "";
})
input.addEventListener('keydown',(e)=> {
    if(e.key != 'Backspace' && e.key != 'Delete') {
        switch(keyTypeConvert.value) {
            case '2':
                checkInputBinary(e.key, e);
                break;
            case '10':
            case '8':
                checkInputDecimalAndOctal(e.key, e);
                break;
            case '16':
                checkInputHex(e.key, e);
                break;
            default:
                console.error('Invalid key type');
                break;
        }
    }
    if(e.keyCode === 13){
        Render();
    }
})

btnConvert.addEventListener('click', ()=> {
    Render();
});

// check input before convert
function checkInputBinary(key, event) {
    if((key != 1 && key != 0)) {
        input.value = reSave;
        event.preventDefault();
    } else {
        reSave += key;
    }
}

function checkInputDecimalAndOctal(key,event) {
    const testCase = reSave + key;
    if(!isNaN(testCase)) {
        reSave += key;
    } else {
        event.preventDefault();
        input.value = reSave.trim();
    }
}

function checkInputHex(key, event) {
    console.log(key);
    if("0123456789abcdef".includes((key+"").toLocaleLowerCase())) {
        reSave += key;
    } else {
        event.preventDefault();
        input.value = reSave.trim();
    }
}

// show result when handled
function Render() {
    let result = "";
    let decimalInput = input.value;
    if(keyTypeConvert.value == keyTypeResult.value) {
        result = input.value;
        showResult.value = result;
        return 0;
    } else if(keyTypeConvert.value != 10) {
        decimalInput = convertToDecimal(input.value, keyTypeConvert.value);
    }
    result = convertDecimalToBases(decimalInput, keyTypeResult.value);
    showResult.value = result;
}

//  convert number from decimal to other bases 
function convertDecimalToBases(input, keyConvert) {
    const arr = [];
    while(true) {
        let unitConvert = input % keyConvert;
        if(unitConvert >= 10 && keyConvert == 16) {
            switch(unitConvert) {
                case 10:
                    unitConvert = 'A';
                    break;
                case 11:
                    unitConvert = 'B';
                    break;
                case 12:
                    unitConvert = 'C';
                    break;
                case 13:
                    unitConvert = 'D';
                    break;
                case 14:
                    unitConvert = 'E';
                    break;
                case 15:
                    unitConvert = 'F';
                    break;
                default: 
                console.log('Invalid value');
            }
        }
        arr.push(unitConvert);
        input = Math.floor(input / keyConvert);
        if(input== 0) break;
    }
    const finalResult = arr.reverse().join('');
    return finalResult;
}

// convert other to decimal to easy to calculate
function convertToDecimal(value, keyBaseConvert) {
    let result = 0;
    let index = value.length - 1;
    for(let i = 0; i < value.length; i++) {
        let unitConvert = value[i];
        if(keyBaseConvert == 16) {
            switch(unitConvert.toUpperCase()) {
                case 'A':
                    unitConvert = 10;
                    break;
                case 'B':
                    unitConvert = 11;
                    break;
                case 'C':
                    unitConvert = 12;
                    break;
                case 'D':
                    unitConvert = 13;
                    break;
                case 'E':
                    unitConvert = 14;
                    break;
                case 'F':
                    unitConvert = 15;
                    break;
                default: 
                console.log('Invalid value');
            }
        }
        result += unitConvert * Math.pow(keyBaseConvert, index);
        index--;
    }
    return result;
}

