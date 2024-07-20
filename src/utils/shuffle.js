// Example shuffleArray function definition (if not imported)
function shuffleArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array for shuffling');
  }

  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Assuming allFlags is an array of all possible flags and is defined or imported
// Example definition (if not imported)
// const allFlags = ['Flag1', 'Flag2', 'Flag3', ...];

// Assuming flagsToDisplay filters allFlags based on some criteria
// This needs to be defined based on your specific logic
// Example:
// const flagsToDisplay = allFlags.filter(flag => someCondition(flag));

// Assuming displayedFlags is a Set to track which flags have been shown
// Initialize it if not already done
const displayedFlags = new Set();

function getNewFlag(flagsToDisplay) {
  if (!Array.isArray(flagsToDisplay)) {
    throw new TypeError('Expected an array of flags to display');
  }

  // Shuffle the filtered array
  const shuffledFlags = shuffleArray(flagsToDisplay);

  // Take the first flag from the shuffled array as the new flag to display
  let newFlag = shuffledFlags[0];

  // Safeguard: Double-check to prevent duplicates
  if (displayedFlags.has(newFlag)) {
    console.error("Duplicate flag detected, selecting another.");
    for (let i = 1; i < shuffledFlags.length; i++) {
      if (!displayedFlags.has(shuffledFlags[i])) {
        newFlag = shuffledFlags[i];
        break;
      }
    }
  }

  // Add the new flag to the set of displayed flags
  displayedFlags.add(newFlag);

  // Return the new flag
  return newFlag;
}

function resetDisplayedFlags() {
  displayedFlags.clear(); // Resets the list of displayed flags
}

// Export the functions to be used in other parts of the application
export { shuffleArray, getNewFlag, resetDisplayedFlags };
