// Allows the user to navigate from 1 page to the next
function navigateToPage(page) {
    window.location.href = page;
  }

  // Function that allows the Personal User Text Entries to be Saved
  function saveThoughts() {
    
    // getElementById Function
    var thoughtsInput = document.getElementById('thoughts');
  
    var thoughts = thoughtsInput.value;
  
    // Stores it in the Local Storage 
    localStorage.setItem('thoughts', thoughts);
    
  }


// Additional Javascript for the Personal Journal Entries
function saveThoughts() {
  // getElementById Function
  const thoughtsInput = document.getElementById('thoughts');


  const thoughts = thoughtsInput.value;

  // Checks if the input value is not empty
  if (thoughts.trim() !== '') {
    // Retrieves existing saved entries from local storage (could be checked in the console)
    const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];

    // Adds new text entries with the saved entries 
    savedEntries.push(thoughts);

    // Saves the updated entries to local storage - keyvalues
    localStorage.setItem('savedEntries', JSON.stringify(savedEntries));

    // Clears previously written text for a new entry to be written by the user
    thoughtsInput.value = '';

    // Uses Local Data to update the displayed entries
    viewLocalData();
  }
}

// Javascript for the Saved Entries Function
function viewLocalData() {
  // Uses Ionic Card to save the entries in it
  const card = document.getElementById('savedentries');

  // Gets rid of any duplicates that say "Here Are Your Saved Entries"
  card.innerHTML = '';

  // Retrieves local data 
  const savedEntries = localStorage.getItem('savedEntries');

  // Checks if local data is found and uses the local data 
  if (savedEntries) {
     
    const parsedEntries = JSON.parse(savedEntries);

    // Uses an Ionic card element
    const cardItem = document.createElement('ion-item');
    cardItem.setAttribute('color', 'light');

    // Uses an Ionic text element for the ionic card
    const cardText = document.createElement('ion-text');
    cardText.textContent = 'Here Are Your Saved Entries';

    // Makes sure the text element is connected to the ionic card
    cardItem.appendChild(cardText);

    card.appendChild(cardItem);

    // Loops the personal journal text entries and creates an Ionic text/card element for each entry
    parsedEntries.forEach(entry => {
      const entryItem = document.createElement('ion-item');
      entryItem.textContent = entry;

      card.appendChild(entryItem);
    });
  } else {
    // If no local data is found, shows a message
    const noEntriesMessage = document.createElement('p');
    noEntriesMessage.textContent = 'No entries found.';
    card.appendChild(noEntriesMessage);
  }
}

// Uses the Local Data to update the displayed entries
viewLocalData();



// Checkbox Mood Tracker Function
function saveDataAndDisplayCard() {
  // Uses the Ionic Checkbox elements - links it through the ID tags
  const happyCheckbox = document.getElementById('happyCheckbox');
  const averageCheckbox = document.getElementById('averageCheckbox');
  const sadCheckbox = document.getElementById('sadCheckbox');
  const depressedCheckbox = document.getElementById('depressedCheckbox');
  const angryCheckbox = document.getElementById('angryCheckbox');

  // Makes sure the checkbox is actually checked
  const happyChecked = happyCheckbox.checked;
  const averageChecked = averageCheckbox.checked;
  const sadChecked = sadCheckbox.checked;
  const depressedChecked = depressedCheckbox.checked;
  const angryChecked = angryCheckbox.checked;

  // Saves the checkbox data locally 
  localStorage.setItem('happy', happyChecked);
  localStorage.setItem('average', averageChecked);
  localStorage.setItem('sad', sadChecked);
  localStorage.setItem('depressed', depressedChecked);
  localStorage.setItem('angry', angryChecked);

  // Displays the saved data in a card
  const userCard = document.getElementById('userdata');
  userCard.innerHTML = `
  <ion-item>${happyChecked ? 'Today I Felt Happy!' : ''}</ion-item>
    <ion-item>${averageChecked ? 'Today I Felt Average!' : ''}</ion-item>
    <ion-item>${sadChecked ? 'Today I Felt Sad!' : ''}</ion-item>
    <ion-item>${depressedChecked ? 'Today I Felt Depressed!' : ''}</ion-item>
    <ion-item>${angryChecked ? 'Today I Felt Angry!' : ''}</ion-item>
      </ion-list>
    </ion-card-content>
  `;
}



// JOKE API - Used for the Home Page

// Getting the API to connect to my Ionic framework code
var limit = 5
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/jokes?limit=' + limit,
    headers: { 'X-Api-Key': 're7e7qiqobNQN8LEG6jAwA==r4cWmPa7vuJUrC04'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

// Sets a limit of how many jokes will be displayed when pressing the button (the limit is 1 per click)
function fetchJokes() {
  const limit = 1;
  fetch(`https://api.api-ninjas.com/v1/jokes?limit=${limit}`, {
      method: 'GET',
      headers: { 'X-Api-Key': 're7e7qiqobNQN8LEG6jAwA==r4cWmPa7vuJUrC04' },
      contentType: 'application/json'
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(result => {
      // Updates to a different jokes each time through a button click
      const jokesContainer = document.getElementById('jokesContainer');
      jokesContainer.innerHTML = '';
      // Checks for any errors in the API receiving end
      result.forEach(joke => {
          const jokeElement = document.createElement('p');
          jokeElement.textContent = joke.joke;
          jokesContainer.appendChild(jokeElement);
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });
}