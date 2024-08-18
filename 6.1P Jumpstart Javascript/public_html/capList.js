// Function to add list items
function addListItem() {
    const capTypes = [
        "Baseball Cap",
        "Beanie",
        "Trucker Hat",
        "Flat Cap",
        "Snapback",
        "Dad Hat",
        "Bucket Hat",
        "Visor",
        "Boater Hat",
        "Newsboy Cap"
    ];

    const list = document.getElementById("capList");
    const emptymessage = document.getElementById("emptyMessage");

    emptymessage.style.display = 'none';
    list.innerHTML = "";

    capTypes.forEach(function(capType) {

        const listItem = document.createElement("li") // create A new <li> element (the function will ilterate the rest)
        listItem.textContent=capType;
        list.appendChild(listItem)
    })

    // the parent list (<ul>) now contains a single list item <li> with the content "Baseball Cap".

}

function removeListItem() {
    const list = document.getElementById("capList");
    const emptyMessage = document.getElementById("emptyMessage");

    list.innerHTML = '';

    emptyMessage.style.display = 'block';

     // Re-enable the "Create and Display Top 10 Cap List" button
     document.querySelector("button.btn-primary").disabled = false;
    
}