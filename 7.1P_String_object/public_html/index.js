
// test text:

// I love wearing a baseball cap on a sunny afternoon at the park made me feel effortlessly cool and shielded from the glaring sun.
// The soft fabric of the cap and it's relaxed fit gave me a sense of casual ease, perfect for a day of laid-back enjoyment. Absolutely love my cap!



function processTextOld() {

    character_string ();
    word_string ();
    upperCase ();
    
}

// length of string (characters):
function character_string () {
    const stringlength = document.getElementById("strResult1");
    const text = document.getElementById("exampleFormControlTextarea1").value;
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
    // ['I', 'love', 'wearing', 'a', 'baseball', 'cap', 'on', 'a', 'sunny', 'afternoon', 'at', 'the', 'park', 'made', 'me', 'feel', 'effortlessly', 'cool', 'and', 'shielded', 'from', 'the', 'glaring', 'sun.\nThe', 'soft', 'fabric', 'of', 'the', 'cap', 'and', "it's", 'relaxed', 'fit', 'gave', 'me', 'a', 'sense', 'of', 'casual', 'ease,', 'perfect', 'for', 'a', 'day', 'of', 'laid-back', 'enjoyment.', 'Absolutely', 'love', 'my', 'cap!']0: "I"1: "love"2: "wearing"3: "a"4: "baseball"5: "cap"6: "on"7: "a"8: "sunny"9: "afternoon"10: "at"11: "the"12: "park"13: "made"14: "me"15: "feel"16: "effortlessly"17: "cool"18: "and"19: "shielded"20: "from"21: "the"22: "glaring"23: "sun.\nThe"24: "soft"25: "fabric"26: "of"27: "the"28: "cap"29: "and"30: "it's"31: "relaxed"32: "fit"33: "gave"34: "me"35: "a"36: "sense"37: "of"38: "casual"39: "ease,"40: "perfect"41: "for"42: "a"43: "day"44: "of"45: "laid-back"46: "enjoyment."47: "Absolutely"48: "love"49: "my"50: "cap!"length: 51[[Prototype]]: Array(0)
    const wordlength = document.getElementById("strResult2");
    wordlength.innerHTML = length_arrary
    

}

function upperCase () {
    const text = document.getElementById("exampleFormControlTextarea1").value;
    let result = text.toLocaleUpperCase();
    const wordlength = document.getElementById("strResult3");
    wordlength.innerHTML = result
}




