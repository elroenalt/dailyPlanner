

function loadData() {
    const userStyle = localStorage.getItem('userStyle');
    if(userStyle) {
        changeUserStyle(parseInt(userStyle))
    }else {
        changeUserStyle(0)
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
function toggleDisplay(id,dir) {
    const element = document.querySelector('#' + id)
    const display = element.style.display
    if(display == 'none') {element.style.display = 'block'}
    else {element.style.display = 'none'}
}
window.addEventListener('load', loadData);
document.querySelector('#settingsButton').addEventListener('click',() => toggleDisplay('displayScreenTiny')) 
document.querySelector('#closeTinyScreen').addEventListener('click',() => toggleDisplay('displayScreenTiny'))
document.querySelector('#openThemeSelection').addEventListener('click', () => toggleDisplay('selectThemeContainer'))

document.querySelector('#openWorkMaterials').addEventListener('click', () => toggleDisplay('displayScreenBig'))
document.querySelector('#closeBigScreen').addEventListener('click', () => toggleDisplay('displayScreenBig'))

document.querySelector('#darkTheme').addEventListener('click', () => changeUserStyle(0))
document.querySelector('#colorfullTheme').addEventListener('click', () => changeUserStyle(1))
document.querySelector('#lightTheme').addEventListener('click', () => changeUserStyle(2))