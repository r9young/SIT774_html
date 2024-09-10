// const inputString = document.querySelector("#exampleFormControlTextarea1"); // Use an id selector for the textarea
// const btn = document.querySelector("#btn"); // Use an id selector for the button
// const searchString = ""; // Define searchString, replace this with the actual value or retrieval method

// btn.addEventListener("click", function() {
//     const inputValue = inputString.value; // Get the value of the textarea
//     const numCharacters = inputValue.length; // Calculate the number of characters in the input

//     if (inputValue === "" || searchString === "") {
//         // Handle empty input
//         console.log("Input or search string is empty.");
//     } else if (numCharacters < 10 || numCharacters > 50) {
//         // Handle invalid character length
//         console.log("Input must be between 10 and 50 characters.");
//     } else {
//         // Process the form input and return the result
//         console.log("Form is valid, proceeding...");
//         // Your logic here
//     }
// });



// test text:

// I love wearing a baseball cap on a sunny afternoon at the park made me feel effortlessly cool and shielded from the glaring sun.
// The soft fabric of the cap and it's relaxed fit gave me a sense of casual ease, perfect for a day of laid-back enjoyment. Absolutely love my cap!


// length of string (characters):
function processTextOld() {
    const stringlength = document.getElementById("strResult1");
    const text = document.getElementById("exampleFormControlTextarea1").value;
    const text_length = text.length; 
    stringlength.innerHTML = text_length

    word_string ();
    
}

// length of string (words):

function word_string () {
    const text = document.getElementById("exampleFormControlTextarea1").value;
    const wordlength = document.getElementById("strResult2");
    

}






