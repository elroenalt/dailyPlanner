
function loadData() {
    const userStyle = localStorage.getItem('userStyle');
    if(userStyle) {
        changeUserStyle(parseInt(userStyle))
    }else {
        localStorage.setItem('userStyle', 0);
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
window.addEventListener('load', loadData);