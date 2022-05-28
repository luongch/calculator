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

let numPadOptions = [7,8,9,"/", 4,5,6,"*", 1,2,3,"-",".",0,"=","+"]
const setupNumPad = () => {
    let container = document.querySelector(".numPad");
    let row = document
    for(let i = 0; i<numPadOptions.length; i++) {
        //create a new row (div)
        //add in the 4 inputs
        //add the row to the container
    }
}