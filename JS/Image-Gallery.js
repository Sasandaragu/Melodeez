// Getting Elements By ID For Font Controls

const increaseBtn = document.getElementById('increaseFontSizeButton');
const decreaseBtn = document.getElementById('decreaseFontSizeButton');
const contentElement = document.getElementById('content');

let fontSize = 16; // Let The Initial Font Size Be 16

// Creating A Function To Increase The Font Size

increaseBtn.addEventListener('click', () => {

    fontSize += 5;
    contentElement.style.fontSize = fontSize + 'px';

});

decreaseBtn.addEventListener('click', () => {

    fontSize -= 5;
    contentElement.style.fontSize = fontSize + 'px';
    
});

