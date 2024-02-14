// Array of special characters to be included in password
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  //input multipe functions to run program 
  function getPasswordOptions () {
    // Step 3: Use a prompt box to ask the user for the desired password length.
    var passwordLength = parseInt(prompt("Enter the length of the password (between 1 and 10 characters):"));
    
    while (isNaN(passwordLength) || passwordLength < 1 || passwordLength > 20) {
    passwordLength = parseInt(prompt("Please enter a number between 1 and 20:"));
  }

    // Step 4: Use confirm boxes to ask the user about their preferences for the password.
  // Prompt for character types
  var includeLowercase = confirm("Include lowercase characters");
  var includeUppercase = confirm("Include uppercase characters");
  var includeNumeric = confirm("Include numeric characters");
  var includeSpecial = confirm("Include special characters");

   // Validate that at least one character type is selected
   while (!(includeLowercase || includeUppercase || includeNumeric || includeSpecial)) {
    alert("Please select at least one character type.");
    // Re-prompt for character types
    includeLowercase = confirm("Include lowercase characters");
    includeUppercase = confirm("Include uppercase characters");
    includeNumeric = confirm("Include numeric characters");
    includeSpecial = confirm("Include special characters");
  }

   // Return an object with user input
   return {
    length: passwordLength,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}
// Function for getting a random element from an array
  function getRandom(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  // Function to generate password with user input
  function generatePassword () {
    var options = getPasswordOptions ();
    var result = [];
    var allChars = [];
    var guaranteedChars = [];

    if (options.includeUppercase) {
        allChars = allChars.concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        guaranteedChars.push(getRandom('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
      }
    
      if (options.includeLowercase) {
        allChars = allChars.concat('abcdefghijklmnopqrstuvwxyz');
        guaranteedChars.push(getRandom('abcdefghijklmnopqrstuvwxyz'));
      }
    
      if (options.includeNumeric) {
        allChars = allChars.concat('0123456789');
        guaranteedChars.push(getRandom('0123456789'));
      }
    
      if (options.includeSpecial) {
        allChars = allChars.concat(specialCharacters);
        guaranteedChars.push(getRandom(specialCharacters));
      }    

      // Ensure at least one character type is included in the password
    if (guaranteedChars.length === 0) {
        alert("Please include at least one character type.");
        return generatePassword();
     }

     // Generate the remaining characters randomly
  for (var i = guaranteedChars.length; i < options.length; i++) {
    result.push(getRandom(allChars));
  }

  // Combine the guaranteed characters and the randomly generated characters
  result = result.concat(guaranteedChars);

  // Shuffle the result array to mix characters randomly
  result = result.sort(() => Math.random() - 0.5);

  // Convert the array to a string
  return result.join('');
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
    console.log('writePassword function is executed');
    var password = generatePassword();
    console.log('Generated password:', password);
  
    var passwordText = document.querySelector('#password');
    console.log('Selected passwordText element:', passwordText);
  
    passwordText.value = password;
  }  

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);