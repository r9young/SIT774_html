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
    const emptyMessage = document.getElementById("emptyMessage");

    // Hide the "List is empty" message
    emptyMessage.style.display = 'none';

    // Clear any existing list items to avoid duplication
    list.innerHTML = '';

    capTypes.forEach(function(capType) {
        const listItem = document.createElement("li");
        listItem.textContent = capType;
        list.appendChild(listItem);
    });

    // Disable the button after adding the list
    document.querySelector("button.btn-primary").disabled = true;
}

// Function to remove all list items and show the "List is empty" message
function removeListItem() {
    const list = document.getElementById("capList");
    const emptyMessage = document.getElementById("emptyMessage");

    // Clear all items from the list
    list.innerHTML = '';

    // Show the "List is empty" message
    emptyMessage.style.display = 'block';

    // Re-enable the "Create and Display Top 10 Cap List" button
    document.querySelector("button.btn-primary").disabled = false;
}
