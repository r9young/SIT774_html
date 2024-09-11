
// test text:

// I love wearing a baseball cap on a sunny afternoon at the park made me feel effortlessly cool and shielded from the glaring sun.
// The soft fabric of the cap and it's relaxed fit gave me a sense of casual ease, perfect for a day of laid-back enjoyment. Absolutely love my cap!



function processTextOld() {

    const inputString = document.getElementById("exampleFormControlTextarea1").value;
    const searchString = document.getElementById("searchWord").value.toLocaleLowerCase();
    const numCharacters = inputString.length;
    

    if ( inputString == "" || searchString == "" ) {
        alert("Input String or searchString is empty!")
    } else if ( numCharacters < 10 ) {
        alert("number of characters should between 10 and 50.")
    } else {
        character_string (inputString);
        word_string ();
        upperCase ();
        number_occurances (searchString);
        number_char_first();
        number_char_last();
    }
}


// -------------------------

// length of string (characters):
function character_string (text) {
    const stringlength = document.getElementById("strResult1");
    const text_length = text.length; 
    stringlength.innerHTML = text_length

}


// length of string (words):
function word_string () {

    // Display the total number of words found in the provided input string. >
    // NOTE: Consider using the String.split(" ") method here to create an array of
    // strings (words) from the input. Then you can display the size (length) of the
    // string.

    const text = document.getElementById("exampleFormControlTextarea1").value;
    let result = text.replace ("'"," ") // replace ' to a space " " to fix up the it's
    word_array = result.split(" ");
    console.log(word_array)
    let length_arrary = word_array.length;
    console.log(length_arrary);

    const wordlength = document.getElementById("strResult2");
    wordlength.innerHTML = length_arrary
    

}

function upperCase () {
    const text = document.getElementById("exampleFormControlTextarea1").value;
    let result = text.toLocaleUpperCase();
    const wordlength = document.getElementById("strResult3");
    wordlength.innerHTML = result
}

function number_occurances (key_word) {

    // const key_word = document.getElementById("searchWord").value.toLocaleLowerCase();
    console.log(key_word);

    const searchTerm = document.getElementById("searchTerm");
    searchTerm.innerHTML = key_word

    const text = document.getElementById("exampleFormControlTextarea1").value;
    let result = text.replace ("'"," ") // replace ' to a space " " to fix up the it's
    word_array = result.split(" ");

    let count = 0;
    for (let i = 0; i < word_array.length; i++) {
       if (word_array[i] == key_word) {
            count ++;
       }   
    }
    console.log(count);

    const word_count = document.getElementById("strResult4");
    word_count.innerHTML = count

}


function number_char_first() {

    const text = document.getElementById("exampleFormControlTextarea1").value;
    const num = document.getElementById("numberCharacters").value;
    
    let result = text.substring(0, num)
    let rest = text.substring(num, text.length)

    const first_charact = document.getElementById("strResult5");
    first_charact.innerHTML = result
    first_charact.style.color = "blue";
    first_charact.innerHTML += `<span style="color: black;">${rest}</span>`;

};


function number_char_last() {

    const text = document.getElementById("exampleFormControlTextarea1").value;
    const num = document.getElementById("numberCharacters").value;
    // console.log(`The number is ${num}` );
    
    // Get the last 25 characters from the end
    let last = text.substring(text.length - num, text.length );
    let front = text.substring(0, text.length);

    // Set the first part of the string in the element
    const first_charact = document.getElementById("strResult6");
    first_charact.innerHTML = front;
    // last.style.color = "blue";

    // Append the last 25 characters styled in black
    first_charact.innerHTML += `<span style="color: blue;">${last}</span>`;
}




