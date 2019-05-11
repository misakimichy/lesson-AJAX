/*  
    AJAX lesson
    Lesson material https://www.youtube.com/watch?v=rJesac0_Ftw
    Created JSON file in my GitHub not the URL of the youtube
*/

/*
    When you click the button,
    1st click => you receive 3 lines of data from animals-1.json
    2nd click => you receive 3 more lines of data from animals-2.json
    3rd click => the button disappears and receive 2 more lies of data from animals-3.json && button disappears
*/

//Count how many times the button gets clicked
let buttonCounter = 1;
const animalContainer = document.getElementById('animal-info');

// Add button a click event to fetch data
const btn = document.getElementById('btn');
btn.addEventListener("click", () => {
    const ourRequest = new XMLHttpRequest();
    // Request to get data from the following URL
    ourRequest.open('GET', 'https://raw.githubusercontent.com/misakimichy/json-example/master/animals-' + buttonCounter + '.json' );
    
    // Set what should happens once the data is loaded
    ourRequest.onload = () => {
        
        /* 
        Check if those two lines show the first item of JSON data we received via AJAX

        const ourData = ourRequest.responseText;
        console.log(ourData[0]);
        
        You cannot access the  each item because JSON data response data as text.
        */

        // look for potential error - server error, data didn't come properly
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            // Tell browser to interpret the JSON data into JavaScript data
            const ourData = JSON.parse(ourRequest.responseText);

            // Pass ourData so the function can work with the data
            renderHTML(ourData);
        } else {
            console.log("We connected to the server, but it returned an error.")
        }
    };

    // Error handling
    ourRequest.onerror = () => {
        console.log("Connection error!");
    };

    // Send the request!
    ourRequest.send();
    // Increment the counter so next time button gets clicked, JSON request will go fetch data from next .json file
    buttonCounter++;
    // Add css class to after third button click
    if(buttonCounter > 3) {
        btn.classList.add("hide-me");
    }
});


// Add text to the empty div #animal-info
function renderHTML(data) {
    // Use let because you gonna update the empty string to add elements 
    let htmlString = "";

    // loop through pet object
    for (let i = 0; i < data.length; i++) {
        htmlString += `<p> ${data[i].name} is a ${data[i].species} that likes to eat `
        
        // loop the food they like
        for (let j = 0; j < data[i].food.likes.length; j++) {
            if (j == 0) {
                htmlString += data[i].food.likes[j];
            } else {
                htmlString += ` and ${data[i].food.likes[j]}`;
            }
        }

        htmlString += ' and dislikes ';
        
        // loop the food they don't like
        for (let k = 0; k < data[i].food.dislike.length; k++) {
            if (k == 0) {
                htmlString += data[i].food.dislike[k];
            } else {
                htmlString += ` and ${data[i].food.likes[k]}`;
            }
        }
         
        htmlString += `.</p>`;  
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
};
