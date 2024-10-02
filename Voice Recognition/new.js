let element = document.getElementById("text");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); 

recognition.lang = "en-GB";
recognition.continuous = true;

let isRecognizing = false; // Add a flag to track recognition state

document.onclick = () => {
  if (!isRecognizing) { // Check if recognition is not already active
    recognition.start();
    isRecognizing = true; // Set the flag to indicate recognition is active
  }
};

recognition.onresult = (event) => {
  for(const result of event.results) {
    element.innerText = result[0].transcript;
  }
};

recognition.onend = () => {
  isRecognizing = false; // Reset the flag when recognition ends
};