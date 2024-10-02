const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const deleteChatButton = document.querySelector("#delete-chat-button");
let userMessage = null;

// Api Configuration
const API_KEY = "AIzaSyAPtXfG10yiBxM7m3q45CTzHk3ohVQFbnw";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;


const loadLocalstorageData = () => {
const savedChats =localStorage.getItem("savedChats");
   const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

   document.body.classList.toggle("light_mode", isLightMode );
   toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";


   chatList.innerHTML = savedChats || "";
   document.body.classList.toggle("hide-header", savedChats);

   chatList.scrollTo(0, chatList.scrollHeight);
}

loadLocalstorageData();
// create a new message element and return it 
const createMessageElement = (content, ...classes) => {
   const div = document.createElement("div");
   div.classList.add("message", ...classes);
   div.innerHTML = content;
   return div;
}
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
   const words = text.split(` `);
let currentWordIndex = 0;

   const typingInterval = setInterval(() =>{
   textElement.innerText += (currentWordIndex === 0 ?` ` : ` `) + words[currentWordIndex++];
   incomingMessageDiv.querySelector(".icon").classList.add("hide");

   if(currentWordIndex === words.length){
      clearInterval(typingInterval);
      incomingMessageDiv.querySelector(".icon").classList.remove("hide");
      localStorage.setItem("savedChats", chatList.innerHTML);
   }
      chatList.scrollTo(0, chatList.scrollHeight);
   
   }, 90);
}
const generateAPIResponse = async (incomingMessageDiv) => {

   const textElement = incomingMessageDiv.querySelector(".text");  //get text element 

 try{
   const response = await fetch(API_URL, {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
         contents:[{
            role: "user",
            parts: [{text: userMessage}]
         }]
      })
   });

   const data = await response.json();

   const apiResponse = data?.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, `$1`);
 showTypingEffect(apiResponse, textElement, incomingMessageDiv);
 }catch (error){
   console.log(error);
 } finally{
   incomingMessageDiv.classList.remove("loading");
 }
}

// Show a loading animation while waiting for the API response 
const showLoadingAnimation = () => {
   const html = ` <div class="message-content">
           <img src="google-gemini-icon.png" alt="Gemini-Image"  class="avatar">
           <p class="text"></p>
            <div class="loading-indicator">
                 <div class="loading-bar"></div>
                 <div class="loading-bar"></div>
                 <div class="loading-bar"></div>
            </div>
      </div>
      <span  onclick="copyMessage(this)"class="icon material-symbols-rounded">content_copy</span>`;


const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
chatList.appendChild(incomingMessageDiv);

chatList.scrollTo(0, chatList.scrollHeight);
generateAPIResponse(incomingMessageDiv);

}

const copyMessage = (copyIcon) => {
   const messageText =copyIcon.parentElement.querySelector(".text").innerText;
   navigator .clipboard.writeText(messageText);
   copyIcon.innerText = "done";
   setTimeout(() =>  copyIcon.innerText = content_copy, 1000);
}


// Handle sending outgoing chat message 
const handleOutgoingChat = () => {
   userMessage =  typingForm.querySelector(".typing-input").value.trim();
   if(!userMessage) return; 


   // console.log(userMessage);
   const html = ` <div class="message-content">
           <img src="Picsart_23-10-21_17-58-23-514_1.jpg" alt="User-Image"  class="avatar">
           <p class="text"></p>
      </div>`;


      const outgoingMessageDiv = createMessageElement(html, "outgoing");
      outgoingMessageDiv.querySelector(".text").innerText = userMessage;
      chatList.appendChild(outgoingMessageDiv);


      typingForm.reset(); //Clear Input field
      chatList.scrollTo(0, chatList.scrollHeight);//scroll to the bottom 
      document.body.classList.add("hide-header");
  setTimeout(showLoadingAnimation, 500); //show loading animation after a  deley 

}


//toggle buttons light and dark theme
toggleThemeButton.addEventListener("click", () => {
 const isLightMode =  document.body.classList.toggle("light_mode");
 localStorage.setItem("themeColor",  isLightMode ? "light_mode" : "dark_mode" )
   toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});


//delete all chats 
deleteChatButton.addEventListener("click", () => {
   if(confirm("Are you want to delete all Chats ?")){
      localStorage.removeItem("savedChats");
      loadLocalstorageData();
   }
});

//prevent default from submission and handle outgoing chat 
typingForm.addEventListener("submit", (e) => {
e.preventDefault();

handleOutgoingChat();
});
