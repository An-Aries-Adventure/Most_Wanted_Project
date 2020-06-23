"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits.
      searchByTraits(people)
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

function searchByTraits(people) {

  //store similar traits to variable based on what the user entered
  let foundPeopleTraits = [];
  let searchPerson;
  let searchByGender;
  let searchByEyeColor;

  let displayOption = parseInt(prompt("Press 1 to search by criteria or press 2 to search by name."));

  if (displayOption === 1) {
    searchByGender = prompt("Enter gender: ");
    searchByEyeColor = prompt("Enter eye color: ");
  } else if (displayOption === 2) {
    searchPerson = prompt("Enter the person's name you are searching for: ");
  }

  //loop through the array and find a match
  for (let i = 0; i < people.length; i++) {

    //search by criteria
    if (displayOption == 1 && searchByGender && searchByEyeColor) {
      if (people[i].gender == searchByGender && people[i].eyeColor == searchByEyeColor) {
        foundPeopleTraits.push(people[i]);
      }
    }

    //search by name
    if (displayOption == 2) {
      if (people[i].firstName === searchPerson || people[i].lastName === searchPerson) {
        foundPeopleTraits.push(people[i]);
      }
    }
  }

  console.log('Total record found: ', foundPeopleTraits)
  let results = JSON.stringify(foundPeopleTraits);

  alert(results);
}


let getDescendants = function (people, person, count = people.length - 1, descendants = "") {

  //get value from the person you are searching
  let userId = person[0].id;

  if (count > 0) {
    if (people[count].parents.includes(userId)) {
      let descendentFound = people[count].firstName + ' ' + people[count].lastName + ', ';
      descendants += descendentFound;
    }

    return getDescendants(people, person, count - 1, descendants);
  } else {
    return descendants;
  }

};

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person || !person[0]) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      console.log(displayPerson(person));
      // TODO: get person's info
      break;
    case "family":
      if (displayOption == "family") {
        //getFamily(people, person)
        console.log(spouseOfFoundPerson(people, person))
        console.log(parentsOfFoundPerson(people,person))
      } // TODO: get person's family
      break;

    case "descendants":
      // TODO: get person's descendants
      console.log(getDescendants(people, person))
      break;

    case "restart":
      if (displayOption == "restart") {
        app(people); // restart
      }
      break;

    case "quit":
      if (displayOption == "quit") {
        return mainMenu(person, people);
      }
    // return; // stop execution
    // default:
    // return mainMenu(person, people); // ask again
  }
}


function spouseOfFoundPerson(people, person) {
  person[0].currentSpouse
  let spouseSearch = prompt("Would you like to see the spouse of this person? Please type Yes or No.")
  let spouseName = 'This person does not have a spouse.';

  if (spouseSearch == "yes" || spouseSearch == "Yes") {
    for (let i = 0; i < people.length; i++) {
      if (people[i].id === person[0].currentSpouse) {
        spouseName = people[i].firstName + " " + people[i].lastName;
      }
    }
  }
  return spouseName;
}
function siblingOfFoundPerson(people, person) {
  person[0].sibling
  let siblingSearch = prompt("Would you like to see the siblings of this person? Please type Yes or No.")
  let siblingName = 'This person has no siblings.';

  if (siblingSearch == "yes" || siblingSearch == "Yes") {
    for (let i = 0; i < people.length; i++) {
      if (people[i].parents === person[0].parents) {
        siblingName = people[i].firstName + " " + people[i].lastName;
      }
    }
  }
  return siblingName;
}

// TODO: find the person using the name they entered
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })

  console.log('foundPerson', foundPerson)
  return foundPerson;
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// height, gender, dob, weight, age, name, occupation, eyecolor
// print all of the information about a person:
// height, weight, age, name, occupation, eye color.
// TODO: finish getting the rest of the information to display

// print all of the information about a person
// height, weight, age, name, occupation, eye color.
// TODO: finish getting the rest of the information to display

function displayPerson(person) {

  person = person[0];

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DoB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n"
  personInfo += "Current Spouse" + person.currentSpouse + "\n"

  console.log('personInfo', personInfo)
}










// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}







function parentsOfFoundPerson(people, person){
  
  person = person[0].parents
  let foundParents = []
  if (person.length > 0){
    let parentSearch = prompt("Would you like to see the parents of this person? Please type Yes or No. ");
     if (parentSearch == "yes" || parentSearch == "Yes"){
      for (let i = 0; i < people.length; i++){

        for(let p = 0; p < person.length; p++){

          if (people[i].id === person[p]){
            let parentsName = people[i].firstName + " " + people[i].lastName;
            foundParents.push(parentsName)
          }

        }    
      } 
    } 
  } else {
    foundParents = ("Sorry, there are no parents to find.");
  }

  return foundParents
} 