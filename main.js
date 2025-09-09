let material;
let question;
let languages = [];
let jsonFiles = [
  'jsonFiles/OldNorse.json',
  'jsonFiles/French.json',
]
async function fetchJsonFiles() {
    try {
        for(let file of jsonFiles) {
        const response = await fetch(file)
        if(!response.ok) {
          throw new Error('Error! while laoding '+ file + ' status: ' + responseNorse.status)
        }
        const data = await response.json()
        let words = [];
          for(let segment of data.segments) {
              for(let word of segment.words) {
              words.push(word);
            }
          }
        data.words = words;
        languages.push(data)
      }
    }catch (error) {
        console.error("Error while starting:", error);
    } 
}
class Questions {
    constructor() {
        this.questions = []
        this.length;
        this.progress;
        this.name;
        this.question = 0;
        
    }
    initQuestionSet() {
        this.question = 0;
        this.questions = []
        this.generateNewQuestionSet(language)
    }
    generateNewQuestionSet(language) {
        const uniqueWordIndices = new Set();
        const totalWords = language.words.length;
    
        while (uniqueWordIndices.size < amount) {
            const randomIndex = getRndInt(0, totalWords);
            uniqueWordIndices.add(randomIndex);
        }
    
        const wordIndices = Array.from(uniqueWordIndices);

        for(let i = 0; i < amount; i++) {
            const wordIndex = wordIndices[i];
            const question = this.generateQuestion(language,wordIndex,dirType);
            this.questions.push(question);
        }
    }
    generateQuestion(language,wordIndex,dirType) {
        const words = language.words
        const question = {}
        console.log(dirType)
        switch(dirType) {
            case 0: 
                question.dir = true
                console.log('a')
            break;
            case 1:
                question.dir = false
                console.log('b')
            break;
            case 2:
                question.dir = getRndInt(0,1) > 0 ? true : false
                console.log('c')
            break;
        }
        const used = new Set([wordIndex])
        const wordPos = getRndInt(0,3)
        let options = []
        for(let i = 0; i < 3; i++) {
            const index = getRndIntExcept(used,language.words.length)
            used.add(index)
            options.push(i == wordPos ? words[wordIndex] : words[index])
        }
        question.corIndex = wordPos
        question.options = options
        return question
    }
}
class Material {
    constructor() {
        this.curMaterial
        this.materialAdresses = this.getMaterialAdresses()
        this.material = []
        for(let adress of this.materialAdresses) {
            this.material.push({
                data: this.getMaterialData(adress),
                name: adress,
            })
        }
        this.displayMaterialSelection()
        document.querySelector('#backWorkMaterial').addEventListener('click', () => {
            this.backToSelection()
        })
    }
    createMaterial() {
        const name = document.querySelector('#MaterialNameInput').value
        const content = document.querySelector('#MaterialContentInput').value
        console.log(name, content)
        this.addToMaterialScreen(name)
    }
    addToMaterialScreen(name) {
        const Screen = document.querySelector('#workMaterialSelection')
        this.createMaterialDisplay({name: name, data: ['dd','hiiii']})
        const element = createElement({type: 'div', text: name,className: 'materialDisplay', event: () => this.openMaterialScreen(name)})
        Screen.appendChild(element)
    }
    backToSelection() {
        toggleDisplay('workMaterialSelection')
        toggleDisplay(this.curMaterial)
        toggleDisplay('workMaterialDisplay')
    }
    openMaterialScreen(material) {
        this.curMaterial = material + 'container'
        const title = document.querySelector('#titleWorkMaterial')
        title.textContent = material
        toggleDisplay(this.curMaterial)
        toggleDisplay('workMaterialDisplay')
        toggleDisplay('workMaterialSelection')
    }
    createMaterialDisplay(material) {
        const Screen = document.querySelector('#workMaterialDisplay')
        const container = createElement({type: 'div', id: material.name + 'container', className: 'workMaterialContainer'})
        for(let line of material.data) {
            const Line = createElement({type: 'span',text: line,className: 'lineMaterial'})
            container.appendChild(Line)
        }
        container.style.display = 'none'
        Screen.appendChild(container)
    }
    displayMaterialSelection() {
        const Screen = document.querySelector('#workMaterialSelection')
        for(let material of this.material) {
            this.createMaterialDisplay(material, )
            const element = createElement({type: 'div', text: material.name,className: 'materialDisplay', event: () => this.openMaterialScreen(material.name)})
            Screen.appendChild(element)
        }
        Screen.style.display = 'block'
        
    }
    getMaterialAdresses() {
        let adresses = loadData('MaterialAdress','Hi|HI')
        adresses = adresses.split('|')
        return adresses
    }
    getMaterialData(adress) {
        let data = loadData(adress + 'MaterialData', 'Hello|why')
        data = data.split('|')
        return data
    }
}
function createElement(options) {
    const element = document.createElement(options.type)
    if(options.id) {element.id = options.id}
    if(options.text) {element.textContent = options.text}
    if(options.event) {
        element.addEventListener('click',options.event)
    }
    if(options.className) {element.className = options.className}
    return element
}
function loadData(dataAdress,baseValue) {
    const data = localStorage.getItem(dataAdress);
    if(data) {
        return data
    }else {
        localStorage.setItem(dataAdress, baseValue);
        return baseValue
    }
}
function changeUserStyle(style = 0) {
    const body = document.body
    body.classList.remove('light-theme', 'dark-theme', 'colorful-theme');
    switch(style) {
        case 0:
            body.classList.add('dark-theme');
        break;
        case 1:
            body.classList.add('colorful-theme');
        break;
        case 2:
            body.classList.add('light-theme');
        break;
    }
    localStorage.setItem('userStyle', style);
}
function toggleDisplay(id,className) {
    let element
    if(className) {
        element = document.querySelector('#' + className)
    }else {
        element = document.querySelector('#' + id)
    }
    const display = element.style.display
    if(display == 'block') {element.style.display = 'none'}
    else {element.style.display = 'block'}
}
document.addEventListener('DOMContentLoaded', () => {
    let curBigScreen = 'spaceholder'
    let curTinyScreen = 'spaceholder'
    changeUserStyle(parseInt(loadData('userStyle', 0)));
    material = new Material();
    toggleDisplay('createMaterialScreen');
    toggleDisplay('createMaterialScreen');
    
    document.querySelector('#settingsButton').addEventListener('click', () => {
        toggleDisplay(curTinyScreen)
        curTinyScreen = 'AppSettings'
        toggleDisplay('AppSettings')
        toggleDisplay('displayScreenTiny')
    });
    document.querySelector('#closeTinyScreen').addEventListener('click', () => {
        toggleDisplay('displayScreenTiny')
    });
    document.querySelector('#openThemeSelection').addEventListener('click', () => {
        toggleDisplay('selectThemeContainer')
    });
    document.querySelector('#closeBigScreen').addEventListener('click', () => {
        toggleDisplay('displayScreenBig')
    });
    
    document.querySelector('#openWorkMaterials').addEventListener('click', () => {
        toggleDisplay('workMaterialScreen');
        toggleDisplay('displayScreenBig');
        toggleDisplay(curBigScreen)
        curBigScreen = 'workMaterialScreen'
    });
    document.querySelector('#createNewWorkMaterial').addEventListener('click', () => {
        toggleDisplay(curTinyScreen)
        curTinyScreen = 'createMaterialScreen'
         toggleDisplay('createMaterialScreen');
         toggleDisplay('displayScreenTiny')
    })
    document.querySelector('#createMaterial').addEventListener('click', () => {
        material.createMaterial()
    })
    document.querySelector('#openLearner').addEventListener('click', () => {
        toggleDisplay(curBigScreen)
        curBigScreen = 'workMaterialScreen'
        toggleDisplay('questionContainer')
        toggleDisplay('displayScreenBig');
    })

    document.querySelector('#darkTheme').addEventListener('click', () => changeUserStyle(0));
    document.querySelector('#colorfullTheme').addEventListener('click', () => changeUserStyle(1));
    document.querySelector('#lightTheme').addEventListener('click', () => changeUserStyle(2));
});