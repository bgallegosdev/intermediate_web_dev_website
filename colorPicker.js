// Name: Benjamin Gallegos
// Class: Intermediate Web Programming
// Assignment: Semester Project

// This semester project is based on JavaScript code we learned in class, using it in an application like a JavaScript/HTML/CSS Random Color Palette Generator. Credit to the tutorial I followed online for this project: Source: YouTube/Channel: Tyler Potts/Link: https://www.youtube.com/watch?v=y9F-XzrYIrs&list=PL2V0XMPQmXlFzTI7VMHHIGbAeqm9hAZcL&index=7&t=29s

/*
TESTING JQUERY CLONE FUNCTION
$(document).ready(function(){
    $("#addPalette").click(function(){
        let lineBreak = document.createElement("br");
        let clone = $(".clone-use").clone();
        let clones = $(".outline").clone();
        $("main").append(lineBreak);
        $("main").append(clones);
    });
});
*/

$(document).ready(function(){
    $("#hideOne").click(function(){
        $("#clone-two").fadeToggle(1000);
        $("#clone-three").fadeToggle(1000);
        $("#clone-four").fadeToggle(1000);
        $("#clone-five").fadeToggle(1000);
    });
});

$(document).ready(function(){
    $("#hideTwo").click(function(){
        $("#clone-three").fadeToggle(1000);
        $("#clone-four").fadeToggle(1000);
        $("#clone-five").fadeToggle(1000);
    });
});

$(document).ready(function(){
    $("#hideThree").click(function(){
        $("#clone-four").fadeToggle(1000);
        $("#clone-five").fadeToggle(1000);
    });
});

$(document).ready(function(){
    $("#hideFour").click(function(){
        $("#clone-five").fadeToggle(1000);
    });
});

$(document).ready(function(){
    $("#hideFive").click(function(){
        $("#clone-one").fadeToggle(1000);
        $("#clone-two").fadeToggle(1000);
        $("#clone-three").fadeToggle(1000);
        $("#clone-four").fadeToggle(1000);
        $("#clone-five").fadeToggle(1000);
    });
});

class Color {
    constructor (hex, element){
        this.hex = hex;
        this.element = element;
        this.locked = false;
    }

    /*  function labeled as setHex
        function sets the randomly generated hex code from generateHex to local variable hex,
        and uses it to change both the background color and text of the html element '.color-input'
    */
    setHex (hex) {
        //Sets generated hex number as hex
        this.hex = hex;
        //Uses hex number generated as background color using a query selector for CSS
        this.element.style.backgroundColor = hex;
        //Changes text filled in input field to generated hex number
        this.element.querySelector('.color-input').value = hex;
    }

    /*
        function labeled as setLocked
        function takes value from 'locked' parameter and uses an if else statement to toggle on/off a class of 'locked';
        and toggles between the symbols of 'locked' and 'unlocked'
    */

    setLocked (locked) {
        this.locked = locked;

        if(locked){
            this.element.classList.add('locked');
            this.element.querySelector('img').src = './images/lock-svgrepo-com.svg';
        }
        else{
            this.element.classList.remove('locked');
            this.element.querySelector('img').src = './images/lock2-svgrepo-com.svg';
        }
    }

    toggleLocked () {
        this.setLocked(!this.locked);
    }

    /*
        function labeled as generateHex
        function catches if the icon has been switched to 'locked' and returns nothing. To lock in the color.
        if not locked, the function creates constant character values and a standard hex symbol;
        then, uses a for loop to generate 6 random characters and concatonates them to the symbol;
        finally, function returns the results to setHex function above.
    */

    generateHex () {
        // if the icon is locked then do nothing, return nothing from this function call
        if (this.locked) {
            return;
        }

        //constant of valid hex color integers and characters for random selection
        const chars = '0123456789ABCDEF'

        //append the formal '#' in front of hex generation call
        let hex = '#';

        //using for loop to loop through the constant chars variable and choose random set of characters to append to the hex variable
        for(let i = 0; i < 6; i++)
        {
            hex += chars[Math.floor(Math.random()*16)];
        }

        //calling setHex function with the now generated random hex call above
        this.setHex(hex);
    }

    /*
        function labeled as copyToClipboard
        function selects the classes of the HTML input objects and on select the JavaScript API (had to update from online tutorial, new API for copying clipboard was researched and inserted below; Then adds a class to 'copied')
    */

    copyToClipboard(){
        const input = this.element.querySelector('.color-input');
        input.select();
        //in the video, the tutorial leader uses '.execCommand' but this is deprecated; 
        //I researched the new JavaScript API for copying to a clipboard and added it from freeCodeCamp.org:
        //https://www.freecodecamp.org/news/copy-text-to-clipboard-javascript/#:~:text=To%20copy%20text%20with%20the,used%20to%20hold%20a%20string.
        // document.execCommand('copy'); //deprecated from video tutorial
        navigator.clipboard.writeText(input.value); //new JavaScript API is now writeText, changed from video instruction to handle deprecated function call
        input.blur();

        this.element.classList.add('copied');
        setTimeout(() => {
            this.element.classList.remove('copied');
        }, 1000);
    }
}


const color_elements = document.querySelectorAll('.colors .color');
const colors = [];

/*
    loop below selects all inputs, lock buttons, and copy buttons; uses all above JavaScript to call on functions above to set values to each newly created constants. Pushes hex to the array colors.
*/

for(let i = 0; i < color_elements.length; i++)
{
    const color_element = color_elements[i];

    const input = color_element.querySelector('.color-input');
    const lock_toggle = color_element.querySelector('.lock-toggle');
    const copy_hex = color_element.querySelector('.copy-hex');

    const hex = input.value;

    const color = new Color(hex, color_element);

    input.addEventListener('input', () => color.setHex(e.target.value));
    lock_toggle.addEventListener('click', () => color.toggleLocked());
    copy_hex.addEventListener('click', () => color.copyToClipboard());

    color.generateHex();
    colors.push(color);
}

    /*
        loop below generates Hex numbers on a click to the colors array
    */

    document.querySelector('.generator-button').addEventListener('click', () => {
        for(let i = 0; i < colors.length; i++)
        {
            colors[i].generateHex();
        }
    });

    /*
        loop below generates Hex numbers on a 'keypress' of the spacebar to the colors array
    */

    document.addEventListener('keypress', (e) => {
        if(e.code.toLowerCase() === 'space') 
        {
            for(let i = 0; i < colors.length; i++)
            {
                colors[i].generateHex();
            }
        }
    });