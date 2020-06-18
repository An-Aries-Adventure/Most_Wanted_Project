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
<<<<<<< HEAD

=======
      // TODO: search by traits
      searchByTraits(people)
      break;
    default:
      app(people); // restart app
      break;
>>>>>>> 0e5978991026d28a26dbc312aaa7bf21c21359cc
  }
    default:
  app(people); // restart app
  break;
}

// Call the mainMenu function ONLY after you find the SINGLE person you are looking for
mainMenu(searchResults, people);
}

function searchByTraits(people){

  //store similar traits to variable based on what the user entered
  let foundPeopleTraits = [];
  let searchPerson;
  let searchByGender;
  let searchByEyeColor;
  
  let displayOption = parseInt(prompt("Press 1 to search by criteria or press 2 to search by name."));

  if(displayOption === 1){
    searchByGender = prompt("Enter gender: ");
    searchByEyeColor = prompt("Enter eye color: ");
  }else if(displayOption === 2){
    searchPerson = prompt("Enter the person's name you are searching for: ");
  }

  //loop through the array and find a match
  for(let i = 0; i < people.length; i++){

    //search by criteria
    if(displayOption == 1 && searchByGender && searchByEyeColor){
      if( people[i].gender == searchByGender && people[i].eyeColor == searchByEyeColor){
        foundPeopleTraits.push(people[i]);
      }
    }

    //search by name
    if(displayOption == 2){
      if(people[i].firstName === searchPerson || people[i].lastName === searchPerson){
        foundPeopleTraits.push(people[i]);
      }
    }
  }

  console.log('Total record found: ', foundPeopleTraits.length)
  let results = JSON.stringify(foundPeopleTraits);
  
  alert(results);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
<<<<<<< HEAD
      // TODO: get person's info
      break;
=======
      if (dispayOption == "info"){
      console.log(displayPerson(person));
      } // TODO: get person's info
    break;

>>>>>>> 0e5978991026d28a26dbc312aaa7bf21c21359cc
    case "family":
      if (displayOption == "family"){
        console.log(person.parents);
      } // TODO: get person's family
    break;

    case "descendants":
    // TODO: get person's descendants
    break;

    case "restart":
      if (displayOption == "restart"){
        app(people); // restart
      }
    break;

    case "quit":
      if (displayOption == "quit"){
        return mainMenu(person, people);
      }
    // return; // stop execution
    // default:
    // return mainMenu(person, people); // ask again
  }
}

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
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

<<<<<<< HEAD


// height, gender, dob, weight, age, name, occupation, eyecolor
// print all of the information about a person:
// height, weight, age, name, occupation, eye color.
// TODO: finish getting the rest of the information to display


function displayPerson(person) {
  let attributes = personInfo;

=======
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  // TODO: finish getting the rest of the information to display


function displayPerson(person){
>>>>>>> 0e5978991026d28a26dbc312aaa7bf21c21359cc
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DoB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n"
  personInfo += "Current Spouse" + person.currentSpouse + "\n"

  let attributes = personInfo;
  console.log(attributes)
}
  // alert(personInfo)

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