var input = document.getElementById("inputBox");
 
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
    event.preventDefault();
    enter();
 
 
  }
});
 
function sendMessage() {
    let input = document.getElementById("inputBox");
    let screen = document.getElementById("screen");
    //this gets the input
    let userText = input.value;
 
 
    if (userText === "") return;
   
    const pat = document.getElementById("tokenInput");
 
    if(!pat.value){
        alert("Please enter a token in the box")
        return;
    }
 
 
    let userMsg = document.createElement("div");
    userMsg.classList.add("message");
    userMsg.innerText = "You: " + userText;
 
    screen.appendChild(userMsg);
 
 
 
    fetch("https://models.github.ai/inference/chat/completions", {
        headers: {
            "Authorization": "Bearer " + pat.value,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
        "messages": [
            {
                "role": "assistant",
                "content": "You are an ai assistant. Your role is to return concise responses simply without extra bloat in messages."
            },
            {
                "role": "user",
                "content": userText
            }
        ],
        "temperature": 0,
        "top_p": 1.0,
        "max_tokens": 1000,
        "model": "openai/gpt-4.1-nano"
    })
}).then((response) => {
    if(!response.ok){
        response.text().then((text) =>{
            alert("The request failed. Please try again or check your token valid. API Error: " + text)
        })
    }
 
    response.json().then((jsonResponse) => {
        const messageResponse = jsonResponse.choices[0].message.content;
        console.log("The response from the AI is : ", messageResponse);
        let botMsg = document.createElement("div");
        botMsg.classList.add("message");
        botMsg.innerText = "Bot:" + messageResponse;
 
         screen.appendChild(botMsg);
 
 
        input.value = "";
        screen.scrollTop = screen.scrollHeight;
 
    })
})
.catch((error) => {
    console.log(error);
})
 
}
