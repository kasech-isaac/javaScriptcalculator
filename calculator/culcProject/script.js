class Calculator {
    constructor(prevOperandTextElement,currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined

    }

delete(){
this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }

appendNumber(number){
    // makeing sure . only includes 1s
    if(number === '.' && this.currentOperand.includes('.') )return

    // using toString() so our num can append not add
    this.currentOperand=this.currentOperand.toString() + number.toString()
    }

chooseOperation(operation){
   if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    }
compute(){
    let comptation
    const prev=parseFloat(this.previousOperand)
    const cur=parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(cur)) return

    switch (this.operation) {
        case '+':
            comptation= prev + cur
            break;
        case '-':
            comptation= prev - cur
            break;

        case '*':
            comptation= prev * cur
            break;

        case '÷':
            comptation= prev / cur
            break;
    
        default:
            return
    }
    this.currentOperand=comptation
    this.operation=undefined
    this.previousOperand=''

    }
updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand
    if(this.operation!= null){
        this.prevOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
    }else{
        this.prevOperandTextElement.innerText=''
    }
   
    }
getDisplayNum(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
}
    
}



const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButtons= document.querySelector('[data-equals]')
const deleteButtons= document.querySelector('[data-delete]')
const allClearButtons= document.querySelector('[data-all-clear]')
const prevOperandTextElement= document.querySelector('[data-prev-operand ]')
const currentOperandTextElement= document.querySelector('[data-cur-operand]')

const calc= new Calculator(prevOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
});


operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.chooseOperation(button.innerText)
    calc.updateDisplay()
  })
})

equalsButtons.addEventListener('click', button=>{
calc.compute()
calc.updateDisplay()
})

allClearButtons.addEventListener('click', button=>{
calc.clear()
calc.updateDisplay()
})

deleteButtons.addEventListener('click', button=>{
calc.delete()
calc.updateDisplay()
})
