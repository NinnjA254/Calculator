const secondaryDisplay = document.getElementById("secondary-display");
const primaryDisplay = document.getElementById("primary-display");
const deleteButton = document.getElementById("delete");
const acButton = document.getElementById("AC");
const numberButtons = document.getElementsByClassName("numbers");
const point = document.getElementById(".");
const openingBracket = document.getElementById("(");
const closingBracket = document.getElementById(")");
const operatorButtons = document.getElementsByClassName("operator");
const evalButton = document.getElementById("equals");


var openingBracketCount = 0;

var addPoint = true;
let lastOperationIsEval = false; //this variable will be used to control calculator behavior after eval is called

var operatorSet = ["+", "-", "*", "X", "÷", "%"];      //added "x" because it represents "*" on the buttons.
var multiplicativeOperatorSet = ["*","X", "÷", "%"];
var multiplicativeOperatorDenierSet = ["+", "-", "*", "÷", "%","("];         //multiplicative Operators cannot be appended immediately after these
var additiveOperatorSet = ["+", "-"];
var appendClosingBracketDenierSet = ["+", "-", "*", "÷", "%", "("] //closingBracket cannot be appended(directly, ie. when there's nothing in the primaryDisplay) if last char of secondaryDisplay is one of these

//function to replace char with another char in string,(does not alter original string, but returns new string)
function replaceChar(str,x,y){
    let a = "";
    for(character of str){
        if(character == x){
            a += y;
        }
        else a += character;

    }
    return a;
}

class Calculator{
    constructor(){
        this.expression = "";
    }

    appendNumber(j){
        if(lastOperationIsEval){
            primaryDisplay.innerText = j;
            secondaryDisplay.innerText = "";
        }
        //above:behaviour for appending numbers immediately after evaluating
        else{
            if (primaryDisplay.innerText == "0"){
                primaryDisplay.innerText = j;
            }
            else{
                primaryDisplay.innerText = primaryDisplay.innerText + j ;
            }
        }
    }

    appendPoint(j){
        if(lastOperationIsEval){
            primaryDisplay.innerText = "0" + j;
            secondaryDisplay.innerText = "";
        }
        else{
            primaryDisplay.innerText = primaryDisplay.innerText + j ;
        }   
    }

    appendBracket(bracket){
        if(lastOperationIsEval){
            secondaryDisplay.innerText = "(" ;
            primaryDisplay.innerText = "0";
        }
        //above:behaviour for appending numbers immediately after evaluating
        else{
            if(bracket[0] == "("){
                if(primaryDisplay.innerText == "0"){
                    if(!(isNaN(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1])) || secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1] == ")"){
                        secondaryDisplay.innerText = secondaryDisplay.innerText + " * (" ;
                        primaryDisplay.innerText = "0";
                    }
                    else if(operatorSet.includes(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1])){
                        secondaryDisplay.innerText = secondaryDisplay.innerText + " (" ;
                        primaryDisplay.innerText = "0";
                    }
                    else{
                        secondaryDisplay.innerText = secondaryDisplay.innerText + "(" ;
                        primaryDisplay.innerText = "0";
                    } 
                }
                else{
                    if(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1] == ")"){
                        secondaryDisplay.innerText = secondaryDisplay.innerText + " * " + primaryDisplay.innerText + " * ("
                        primaryDisplay.innerText = "0";
                    }
                    else{
                        secondaryDisplay.innerText = secondaryDisplay.innerText + " " + primaryDisplay.innerText + " * ("
                        primaryDisplay.innerText = "0";
                    }    
                }  
            }
            if(bracket[0] == ")"){
                if(primaryDisplay.innerText == "0"){
                    secondaryDisplay.innerText = secondaryDisplay.innerText + ")" ;
                    primaryDisplay.innerText = "0";
                }
                else{
                    if(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1] == ")"){
                        secondaryDisplay.innerText = secondaryDisplay.innerText + " * " + primaryDisplay.innerText + " )" ;
                        primaryDisplay.innerText = "0"; 
                    }
                    else if(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1] == "("){
                        secondaryDisplay.innerText = secondaryDisplay.innerText + " " + primaryDisplay.innerText + " )";
                        primaryDisplay.innerText = "0"; 
                    }
                    else{
                        secondaryDisplay.innerText = (operatorSet.includes(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1])) ? secondaryDisplay.innerText + " " + primaryDisplay.innerText + " )" : secondaryDisplay.innerText + primaryDisplay.innerText + " )"; //ternary operator here
                        primaryDisplay.innerText = "0"; 
    
                    }
                    
                }
                  
            }
        }
        //pushing the expression into a separate string,the one which will be evaluated
        this.expression = secondaryDisplay.innerText;
        console.log(this.expression);
    }

    appendOperator(operation){
        if(lastOperationIsEval){
            secondaryDisplay.innerText = (operation == "X") ? primaryDisplay.innerText + " " + "*" : primaryDisplay.innerText + " " + operation; //ternary operator here
            primaryDisplay.innerText = "0";
        }
        //above:behaviour for appending numbers immediately after evaluating
        else{
            if (primaryDisplay.innerText == 0){
                secondaryDisplay.innerText = (operation == "X") ? secondaryDisplay.innerText + " " + "*" + " " : secondaryDisplay.innerText + " " + operation + " " ;
                primaryDisplay.innerText = "0";
            }
            else{
                if(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1] == ")"){
                    secondaryDisplay.innerText = (operation == "X") ? secondaryDisplay.innerText + " * " + primaryDisplay.innerText + " " + "*" : secondaryDisplay.innerText + " * " + primaryDisplay.innerText + " " + operation; //ternary operator here
                }
                else{
                    secondaryDisplay.innerText = (operation == "X") ? secondaryDisplay.innerText + " " + primaryDisplay.innerText + " " + "*" : secondaryDisplay.innerText + " " + primaryDisplay.innerText + " " + operation; //ternary operator here
                    primaryDisplay.innerText = "0"; 
                }
            }
        }
        //pushing the expression into a separate string,the one which will be evaluated
        this.expression = secondaryDisplay.innerText;
        console.log(this.expression);   
    }

    evaluate(){
        if(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1] == ")"){
            let ans = eval(replaceChar(this.expression, "÷", "/"));
            secondaryDisplay.innerText =  secondaryDisplay.innerText + " = " ;
            primaryDisplay.innerText = ans;
        }
        else{
            let ans = eval(replaceChar(this.expression, "÷", "/") + primaryDisplay.innerText);
            secondaryDisplay.innerText =  secondaryDisplay.innerText + " " + primaryDisplay.innerText + " = ";
            primaryDisplay.innerText =  ans; 
        }   
    }
    

    clearAll(){
        primaryDisplay.innerText = "0";
        secondaryDisplay.innerText = "";
        this.expression = ""; //pushing the expression into a separate string,the one which will be evaluated
    }

    delete(){
        if(primaryDisplay.innerText.length == 1){
            /*if(primaryDisplay.innerText == "0"){
                secondaryDisplay.innerText = secondaryDisplay.innerText.slice(0,-1);
            } */
            //ABOVE IS A FEATURE THAT ENABLES DELETING INTO THE SECONDARYDISPLAY. IT,AND ITS ASSOCIATED LOGIC, WILL BE IMPLEMENTED LATER OR NEVER EVER

            primaryDisplay.innerText = "0";
        }
        else{
            primaryDisplay.innerText = primaryDisplay.innerText.slice(0,-1);
        }
        
    }
}



const calculator1 = new Calculator(primaryDisplay,secondaryDisplay);

//function to display number of unbalanced parenths
function displayNumberOfUnbalancedBrackets(){
    if(openingBracketCount > 0){
        openingBracket.innerHTML = "(" + "<sub>" + openingBracketCount + "</sub>";
    }
    else{
        openingBracket.innerHTML = "(" ;
    }
}

//clear functionality
acButton.addEventListener("click",() =>{
    calculator1.clearAll();

    addPoint = true;
    lastOperationIsEval = false;
    openingBracketCount = 0;
    displayNumberOfUnbalancedBrackets();
});


//delete functionality
deleteButton.addEventListener("click", () => {
    if(!lastOperationIsEval){
        if (primaryDisplay.innerText[primaryDisplay.innerText.length - 1] == "."){
            addPoint = true;
            lastOperationIsEval = false;
            console.log(addPoint);
    
        }
        calculator1.delete();
    }
    
})

//appending numbers
for (let button of numberButtons){
    button.addEventListener("click", () =>{
        calculator1.appendNumber(button.innerText);

        lastOperationIsEval = false;
    })
}
//appending point and related logic
point.addEventListener("click",() =>{
    if(addPoint){
        calculator1.appendPoint(point.innerText);
        addPoint = false;
        lastOperationIsEval = false;
    }
});

//brackets
openingBracket.addEventListener("click", () => {
    if(primaryDisplay.innerText[primaryDisplay.innerText.length - 1] !="."){
        calculator1.appendBracket(openingBracket.innerText);
        openingBracketCount++;
        displayNumberOfUnbalancedBrackets();
        addPoint = true;
        lastOperationIsEval = false;
    }   
});

closingBracket.addEventListener("click", () => {
    if(openingBracketCount > 0){
        let secondaryDisplayLastChar = secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1];
        let appendClosingBracket = (appendClosingBracketDenierSet.includes(secondaryDisplayLastChar)) ? false : true;
        if(primaryDisplay.innerText[primaryDisplay.innerText.length - 1] != "."){
            if (primaryDisplay.innerText == 0){
                if(appendClosingBracket){
                    calculator1.appendBracket(closingBracket.innerText);
                    openingBracketCount--; 
                    displayNumberOfUnbalancedBrackets(); 
                    addPoint = true;
                    lastOperationIsEval = false;
                }
            }
            else{
                calculator1.appendBracket(closingBracket.innerText);
                openingBracketCount--; 
                displayNumberOfUnbalancedBrackets(); 
                addPoint = true; 
                lastOperationIsEval = false;   
            }
        }
        
        

    }
    
   
    

    
});

//operators
for(let operator of operatorButtons){
    operator.addEventListener("click", () => {
        if(primaryDisplay.innerText[primaryDisplay.innerText.length - 1] != "."){
            if(additiveOperatorSet.includes(operator.innerText)){
                calculator1.appendOperator(operator.innerText);

                addPoint = true;
                lastOperationIsEval = false;
            }
            else if(multiplicativeOperatorSet.includes(operator.innerText)){
                if(primaryDisplay.innerText == "0"){
                    if(secondaryDisplay.innerText.length > 0){
                        if (!(multiplicativeOperatorDenierSet.includes(secondaryDisplay.innerText[secondaryDisplay.innerText.length - 1])) ){
                            calculator1.appendOperator(operator.innerText);
                            addPoint = true;
                            lastOperationIsEval = false;
                        }
                    } 
                }
                else{
                    calculator1.appendOperator(operator.innerText);
    
                    addPoint = true;
                    lastOperationIsEval = false;

                } 
            }  
        } 
    });
}

//evaluate
evalButton.addEventListener("click", () => {
    if(openingBracketCount == 0 && primaryDisplay.innerText[primaryDisplay.innerText.length - 1] != "."){
        if(!lastOperationIsEval){
            calculator1.evaluate();

            lastOperationIsEval = true; 
            addPoint = true;
        }
        
    }
    
});
















/* checklist

point logic and bracket increment for del




*/
