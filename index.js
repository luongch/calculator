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

console.log(operator('+',1,2))
console.log(operator('-',1,2))
console.log(operator('*',1,2))
console.log(operator('/',1,2))

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
};
let numPadOptions = [7,8,9,"/", 4,5,6,"*", 1,2,3,"-",".",0,"=","+"]
const setupNumPad = () => {
    let container = document.querySelector(".numPad");
    let row = createRow();

    for(let i = 0; i<numPadOptions.length; i++) {
        //add in the 4 inputs
        let input = document.createElement('button');
        input.classList.add('numPadOption');
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

const addEvents = () => {
    let buttons = document.querySelectorAll("button")
    
    buttons.forEach(button => {
        button.addEventListener("click", function(){
            lastInput = numPadObjects[button.value];
            switch(lastInput.type) {
                case "equals":
                    getTotal();
                    break;
                case 'operator':
                    op = lastInput.value;
                    break;
                case "number":
                    if(op != null) {
                        num2 += lastInput.value
                    }
                    else {
                        num1 += lastInput.value
                    }
                default:
                    text = "opps something went wrong"
                    break;
                    
            }
            displayInput();
        });
    });
}

const isOperator = (value) => {
    if(value == "+" || value == "-" || value == "*" || value == "/") {
        return true;
    }
    return false;

}

const getTotal = () => {
    total = operator(op,parseInt(num1),parseInt(num2));
    let totalDiv = document.querySelector('.total');
    totalDiv.innerHTML = total;
}

const displayInput = () => {
    let inputDiv = document.querySelector(".input");
    let text = "";
    if(num1 != "") {
        text += num1;
    }
    if(op != null) {
        text += op;
    }
    if(num2 != "") {
        text += num2;
    }
    inputDiv.innerHTML = text;
}

let lastInput = "";
let input = ""
let total = 0;
let num1 = "";
let op = null;
let num2 = "";

setupNumPad();
addEvents();