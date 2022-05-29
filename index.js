const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1,num2) => {
    return num1-num2;
}

const multiply = (num1, num2) => {
    return num1*num2;
}

const divide = (num1,num2) => {
    return num1/num2;
}

const operator = (oper, num1, num2) => {
    switch(oper) {
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '*':
            return multiply(num1,num2);
            break;
        case '/':
            return divide(num1,num2);
            break;   
        default:
            console.log("invalid operator")    
        
    }
}

let numPadObjects = {
    7:{
        value: 7,
        type: "number"
    },
    8:{
        value: 8,
        type: "number"
    },
    9:{
        value: 9,
        type: "number"
    },
    '/':{
        value: '/',
        type: "operator"
    },
    4:{
        value: 4,
        type: "number"
    },
    5:{
        value: 5,
        type: "number"
    },
    6:{
        value: 6,
        type: "number"
    },
    '*':{
        value: '*',
        type: "operator"
    },
    
    1:{
        value: 1,
        type: "number"
    },
    2:{
        value: 2,
        type: "number"
    },
    3:{
        value: 3,
        type: "number"
    },
    '-':{
        value: '-',
        type: "operator"
    },
    '.':{
        value: '.',
        type: "decimal"
    },
    0:{
        value: 0,
        type: "number"
    },
    '=':{
        value: '=',
        type: "equals"
    },
    '+':{
        value: '+',
        type: "operator"
    },
    'clear': {
        value: 'clear',
        type: 'clear'
    },
    'delete': {
        value: 'delete',
        type: 'delete'
    }
};
let numPadOptions = [7,8,9,"/", 4,5,6,"*", 1,2,3,"-",".",0,"=","+"]

const setupNumPad = () => {
    let container = document.querySelector(".numPad");
    let row = createRow();

    for(let i = 0; i<numPadOptions.length; i++) {
        //add in the 4 inputs
        let input = document.createElement('button');
        input.classList.add('numPadOption');
        if(numPadObjects[numPadOptions[i]].type == "operator") {
            input.classList.add('operator')
        }
        if(numPadObjects[numPadOptions[i]].type == "equals") {
            input.classList.add('equals')
        }
        input.value = numPadOptions[i];
        input.textContent = numPadOptions[i];
        
        row.appendChild(input);
        //add the row to the container if 4 things have been added
        if(row.childNodes.length == 4) {
            container.appendChild(row)
            //reset the row
            row = createRow();
        }
    }
}

const createRow = () => {
    let row = document.createElement('div');
    row.classList.add("row")

    return row;
}

function evaluateAction(button) {
    let lastInput = numPadObjects[button.value];
            switch(lastInput.type) {
                case "clear":
                    clearAll();
                    break;
                case "delete":
                    deleteLast();
                    break;
                case "equals":
                    if(isAllValuesEmpty()) {
                        displayTotal(0)
                    }
                    else if((num1 != "" || op != null) && num2 == "") {
                        displayTotal(num1);
                    }
                    else {
                        getTotal(); 
                    }
                    break;
                case 'operator':
                    if(isAllValuesEmpty()) {
                        getTotal();
                    }
                    if(num1 === "") {
                        num1 = 0;
                    }
                    op = lastInput.value;
                    break;
                case "number":
                    if(op != null) {
                        num2 += lastInput.value
                    }
                    else {
                        num1 += lastInput.value
                    }
                    break;
                case "decimal": {
                    addDecimal();
                    break;
                }
            }
            displayInput();
}

const isAllValuesEmpty = () => {
    return num1 !== "" && op !== null && num2 !== "";
}
const addDecimal = () => {
    //if there is an operator add to num2
    if(op === null) {
        if(num1 === "") {
            num1 = 0;
        }
        //check if a decimal already exists
        if(num1.toString().includes('.')) {
            return;
        }
        else {
            num1 += '.';
        }
        
    }
    else {
        if(num2 === "") {
            num2 = 0;
        }
        if(num2.toString().includes('.')) {
            return;
        }
        else {
            num2 += '.';
        }
        
    }
}
const addEvents = () => {
    let buttons = document.querySelectorAll("button")
    
    buttons.forEach(button => {
        button.addEventListener("click", function(){
            evaluateAction(button) //why can't I just pass in the function? it has to be wrapped to work
        });
    });
}

const handleTotalAfter = () => {
    num1 = total
    op = null
    num2 = ""
}
const getTotal = () => {
    total = operator(op,parseInt(num1),parseInt(num2));
    if(total == Infinity) {
        displayTotal("Cannot divide by 0")
    }
    else {
        displayTotal(total)
        handleTotalAfter()
    }
    
}

const displayInput = () => {
    let inputDiv = document.querySelector(".input");
    let text = "";
    if(num1 !== "") {
        text += num1;
    }
    if(op !== null) {
        text += op;
    }
    if(num2 !== "") {
        text += num2;
    }
    inputDiv.innerHTML = text;
}

const displayTotal = (value) => {
    let totalDiv = document.querySelector('.total');
    totalDiv.innerHTML = value;
}

const clearAll = () => {
    total = 0;
    num1 = "";
    op = null;
    num2 = "";
    displayTotal(0)
}

const deleteLast = () => {
    //if there is already an operator then we delete from num2
    if(op != null) {
        num2 = num2.slice(0,-1);
    }
    else {
        num1 = num1.slice(0,-1);
    }
    displayInput()
}

let total = 0;
let num1 = "";
let op = null;
let num2 = "";

setupNumPad();
addEvents();

//todo list
//set up the decimal button
//add keyboard support