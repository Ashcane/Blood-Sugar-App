const bloodBody = document.querySelector('.blood-body')
const bloodDrop = document.querySelector('.blood-drop')
const todoInput = document.querySelector('.todo-input')
const todoDate = document.querySelector('.todo-date')
const todoNote = document.querySelector('.todo-note')
const timeOfDay = document.querySelector('.time-of-day')
const submitButton = document.querySelector('.submit-btn')
const todoDiv = document.querySelector('.todo-div')
const todoList = document.querySelector('.todo-list')
const displayAverage = document.querySelector('.display-averages')
const wakingDiv = document.querySelector('.waking-averages')
const beforeMealDiv = document.querySelector('.before-meal-div')
const afterMealDiv = document.querySelector('.after-meal-div')
const bedtimeDiv = document.querySelector('.bedtime-div')

document.addEventListener('DOMContentLoaded', getTodos)
submitButton.addEventListener('click', addtodo)
todoDiv.addEventListener('click', deLete)

function addtodo(e) {
    e.preventDefault()
    if (isNaN(todoInput.value)) {
        alert('blood sugar should be a number')
    } else if (todoInput.value == '') {
        alert('please enter all fields') 
    } else {
    const newtodoDiv = document.createElement('div')
    newtodoDiv.classList.add('newtodo-div')
    const newlistItem = document.createElement('li')
    newlistItem.classList.add('list-item')
    convertTime(todoDate.value)
    newlistItem.innerHTML = `${todoInput.value}, ${todoDate.value}, ${timeOfDay.value}, ${todoNote.value}` 
    dripDrop()
    saveLocalTodos(newlistItem.innerHTML)
    getAverage()
    getwakingAverage()
    getBeforeMealAverage()
    getAfterMealAverage()
    getBedtimeAverage()
    const delButton = document.createElement('button')
    delButton.classList.add('delete-btn')
    delButton.innerText = 'Del'
    newtodoDiv.appendChild(newlistItem)
    newtodoDiv.appendChild(delButton)
    todoDiv.appendChild(newtodoDiv)
    todoInput.value = ''
   }
}

function deLete(e) {
    const item = e.target
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement
        removeLocalTodos(todo)
        getAverage()
        getBeforeMealAverage()
        getwakingAverage()
        getAfterMealAverage()
        getBedtimeAverage()
        todo.remove()
    }
}

function saveLocalTodos(todo) {
    let todos 
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos 
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo) {
        const newtodoDiv = document.createElement('div')
        newtodoDiv.classList.add('newtodo-div')
        const newlistItem = document.createElement('li')
        newlistItem.classList.add('list-item')
        newlistItem.innerHTML = todo
        const delButton = document.createElement('button')
        delButton.classList.add('delete-btn')
        delButton.innerText = 'Del'
        newtodoDiv.appendChild(newlistItem)
        newtodoDiv.appendChild(delButton)
        todoDiv.appendChild(newtodoDiv)
    })
    getAverage()
    getwakingAverage()
    getBeforeMealAverage()
    getAfterMealAverage()
    getBedtimeAverage()
}

function removeLocalTodos(todo) {
    let todos 
    if (localStorage.getItem("todos") === null) {
        todos = []
        
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getAverage() {
    displayAverage.innerHTML = ''
    const numberSugars = []
    let todos
     if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(todo => {
    numberSugars.push(parseInt(todo))
    if (numberSugars.length === 0) {
    displayAverage.innerHTML = ''
    } else {
    const initialValue = 0
    const sum = numberSugars.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
    const average = sum / numberSugars.length
    displayAverage.innerHTML = `Overall: ${average.toFixed(0)}`
        }
    }) 
}

function getwakingAverage() {
    wakingDiv.innerHTML = ''
    const wakingsugar = []
    let todos 
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
        todos.forEach(todo => {
            if (todo.includes('Waking')) {
                wakingsugar.push(parseInt(todo))
                const initialValue = 0
                const sum = wakingsugar.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
                const wakingaverage = sum / wakingsugar.length
                wakingDiv.innerHTML = `Waking: ${wakingaverage.toFixed(0)}`
               }
            })
        }
     }
     
function getBeforeMealAverage() {
        beforeMealDiv.innerHTML = ''
        const beforesugar = []
        let todos 
        if (localStorage.getItem("todos") === null) {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem("todos"))
            todos.forEach(todo => {
                if (todo.includes('Before')) {
                    beforesugar.push(parseInt(todo))
                    const initialValue = 0
                    const sum = beforesugar.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
                    const beforeaverage = sum / beforesugar.length
                    beforeMealDiv.innerHTML = `Before Meal: ${beforeaverage.toFixed(0)}`
                }
            })
        }  
    }
            
function getAfterMealAverage() {
        afterMealDiv.innerHTML = ''
        const aftersugar = []
        let todos 
        if (localStorage.getItem("todos") === null) {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem("todos"))
            todos.forEach(todo => {
                if (todo.includes('After')) {
                    aftersugar.push(parseInt(todo))
                    const initialValue = 0
                    const sum = aftersugar.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
                    const afteraverage = sum / aftersugar.length
                    afterMealDiv.innerHTML = `After Meal: ${afteraverage.toFixed(0)}`
                }
            })        
        }  
     } 
             
function getBedtimeAverage() {
        bedtimeDiv.innerHTML = ''
        const bedtimesugar = []
        let todos 
        if (localStorage.getItem("todos") === null) {
           todos = []
        } else {
            todos = JSON.parse(localStorage.getItem("todos"))
            todos.forEach(todo => {
                if (todo.includes('Bedtime')) {
                    bedtimesugar.push(parseInt(todo))
                    const initialValue = 0
                    const sum = bedtimesugar.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
                    const bedtimeaverage = sum / bedtimesugar.length
                    bedtimeDiv.innerHTML = `Bedtime: ${bedtimeaverage.toFixed(0)}`
                }
            })   
        }
     }  
              
         
     

     function dripDrop() {
        bloodDrop.setAttribute("class", 'blood-drop-drop')
        setTimeout(() => {
             bloodDrop.setAttribute("class", 'blood-drop')
        }, "4000")  
     }

     //function that converts date value in to 12 hour format

function convertTime() {
    const converted = todoDate.value
    let firstChar = converted.charAt(11)
    let secondChar = converted.charAt(12)
    const Colon = converted.charAt(13)
    let thirdChar = converted.charAt(14)
    let fourthChar = converted.charAt(15)
    let beforeCharOne = converted.charAt(0)
    let beforeCharTwo = converted.charAt(1)
    let beforeCharThree = converted.charAt(2)
    let beforeCharFour = converted.charAt(3)
    let beforeCharFive = converted.charAt(4)
    let beforeCharSix = converted.charAt(5)
    let beforeCharSeven = converted.charAt(6)
    let beforeCharEight = converted.charAt(7)
    let beforeCharNine = converted.charAt(8)
    let beforeCharTen = converted.charAt(9)
    let beforeCharEleven = converted.charAt(10)

    if (firstChar > 1 && secondChar == '0') {
        firstChar = '0'
        secondChar = '8'
    }

    if (firstChar > 1 && secondChar == '1') {
        firstChar = '0'
        secondChar = '9'
    }

    if (firstChar > 1 && secondChar == '2') {
        firstChar = '1'
        secondChar = '0'
    }

    if (firstChar > 1 && secondChar == '3') {
        firstChar = '1'
        secondChar = '1'
    }

    if (firstChar > 1 && secondChar == '4') {
        firstChar = '1'
        secondChar = '2'
    }

    if (secondChar == '0' && firstChar == '0') {
        firstChar = '1'
        secondChar = '2'

    }

    if (firstChar == '1' && secondChar >= 3 && secondChar <= 9) {
        firstChar = '0'
        secondChar = secondChar - 2
    }

    todoDate.value = `${beforeCharOne}${beforeCharTwo}${beforeCharThree}${beforeCharFour}${beforeCharFive}${beforeCharSix}${beforeCharSeven}${beforeCharEight}${beforeCharNine}${beforeCharTen}${beforeCharEleven}${firstChar}${secondChar}${Colon}${thirdChar}${fourthChar}` 
    
}
