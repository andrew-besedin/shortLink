const input = document.querySelector("input"); 
const paragraph = document.querySelector("p"); 
let previousValue; //previous value of input to compare with present

document.querySelector("button").addEventListener("click", async () => {
    if (previousValue == input.value) return paragraph.innerText = "Не следует создавать много коротких ссылок на один URL";  
    paragraph.innerText = '';
    const newLink = await fetch('/generateLink', {
        method: 'POST', 
        body: JSON.stringify({
          input: input.value
        }), 
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json());
    paragraph.innerText = newLink.link;
    previousValue = input.value;
});