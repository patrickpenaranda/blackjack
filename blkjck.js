var blckjck = {
    "YOU": {"score":0, "div":"your-cards", "span":"human-score"},
    "BOT": {"score": 0, "div":"bot-cards", "span": "bot-score"},
    "cards":{2: "2", 3:"3", 4:"4", 5:"5", 6:"6", 7: "7", 8:"8", 9:"9", 10:"10"},
    "card_type":{1:"spades", 2:"clubs", 3:"hearts", 4:"diamonds"},
    "audio":{"hit":"Audio/hit.wav", "loose":"Audio/boo.wav", "win":"Audio/celebrate.mp3"},
    "wins":0,
    "losses":0,
    "draws":0,
    "isStand":false,
    "turnsOver":false,
}

function blckjckGame() {

}

var YOU = blckjck["YOU"];
var BOT = blckjck["BOT"];
var add = document.getElementById("green");
var remove = document.getElementById("red")
var stand = document.getElementById("yellow");
var hit = new Audio(blckjck['audio']['hit']);
var loose = new Audio(blckjck['audio']['loose']);
var win = new Audio(blckjck['audio']['win']);
human(YOU)

deal()
function human(activePlayer) {
    add.addEventListener('click', () => {
        if(blckjck['isStand'] === false) {
            var card_num = randomCard() + 1;
            hit.play();
            activePlayer["score"] += card_num;
    
            if(activePlayer["score"] >= 21) {
                let your_message = document.getElementById(activePlayer['span']);
                your_message.style.color = "red";
                your_message.style.fontSize = "1.75rem"
                your_message.innerText = "BUSTED";
            } else {
                var human_score = document.getElementById(activePlayer["span"]);
                human_score.textContent = activePlayer["score"];
                var image = document.createElement("img");
                image.setAttribute("id","image");
                image.src = `cards/${blckjck['cards'][card_num]}_of_${blckjck['card_type'][card_type()]}.png`;
                document.getElementById(activePlayer["div"]).appendChild(image);
            }
        }
        
        
        
    })
}

function card_type() {
    var rand = Math.floor(Math.random() * 4 + 1);
    return rand;
}
function randomCard() {
    var number = Math.floor((Math.random() * 9) + 1);
    return number;
}

stand.addEventListener('click', ()=> {
    if(blckjck['isStand'] === false) {
        blckjck['turnsOver'] = true;
        botPicking(BOT)
        blckjck['isStand'] = true;
    }
    
})


function deal() {
    remove.addEventListener("click",()=> {
        if(blckjck['turnsOver'] === true) {
            gameScoring();
            blckjck['isStand'] = false;
            YOU['score'] = 0;
            BOT['score'] = 0;

            let your_message = document.getElementById(YOU['span']);
                your_message.style.color = "white";
                your_message.style.fontSize = "1.125rem"
                your_message.innerText = "0";

            let bot_message = document.getElementById(BOT['span']);
            bot_message.style.color = "white";
            bot_message.style.fontSize = "1.125rem"
            bot_message.innerText = "0";    

            document.getElementById(YOU['span']).innerText = 0;
            document.getElementById(BOT['span']).innerText = 0;

            let your_images = document.getElementById(YOU["div"]).querySelectorAll("img");
            for(let i = 0; i < your_images.length; i++){
                your_images[i].remove();
            }
            
            let bot_images = document.getElementById(BOT["div"]).querySelectorAll("img");
            for(let i = 0; i < bot_images.length; i++){
                bot_images[i].remove();
            }
            blckjck['turnsOver'] = false;
        }
        
    
    })
}

function botPicking(activePlayer) {
    while(true) {
        var card_num = randomCard() + 1;
        
        activePlayer["score"] += card_num;

        if(activePlayer["score"] >= 21) {
            let your_message = document.getElementById(activePlayer['span']);
                your_message.style.color = "red";
                your_message.style.fontSize = "1.75rem"
                your_message.innerText = "BUSTED";
        } else {
            var human_score = document.getElementById(activePlayer["span"]);
            human_score.textContent = activePlayer["score"];
            var image = document.createElement("img");
            image.setAttribute("id","image");
            image.src = `cards/${blckjck['cards'][card_num]}_of_${blckjck['card_type'][card_type()]}.png`;
            document.getElementById(activePlayer["div"]).appendChild(image);
        }
        if(activePlayer['score'] >= 21 || activePlayer['score'] >=15) {
            break;
        }

    }
}

function gameScoring() {
    if(BOT['score'] < YOU['score'] && YOU['score'] >= 21) {
        console.log("YOU LOOSE");
        loose.play();
        blckjck['losses']++;
        document.getElementById("losses").textContent = blckjck['losses'];
    }
    else if(BOT['score'] > 21 && YOU['score'] < BOT['score']) {
        console.log("YOU WIN!!");
        win.play();
        blckjck['wins']++;
        document.getElementById("wins").textContent = blckjck['wins'];
    }
    else if(YOU['score'] < BOT['score'] && BOT['score'] < 21) {
        console.log("YOU LOOSE");
        loose.play();
        blckjck['losses']++;
        document.getElementById("losses").textContent = blckjck['losses'];
    }
    else if(YOU['score'] === BOT['score']) {
        console.log("DRAW");
        blckjck['draws']++;
        document.getElementById("draws").textContent = blckjck['draws'];
    } 
    else if(YOU['score']>BOT['score'] && YOU['score'] < 21) {
        console.log("YOU WIN!!");
        win.play();
        blckjck['wins']++;
        document.getElementById("wins").textContent = blckjck['wins'];
    }
    else if(YOU['score'] > 21 && BOT['score'] < 21) {
        console.log("YOU LOOSE!!");
        loose.play();
        blckjck['losses']++;
        document.getElementById("losses").textContent = blckjck['losses'];
    }
    else if(YOU['score'] >= 21 && BOT['score'] >= 21) {
        console.log("DRAW");
        blckjck['draws']++;
        document.getElementById("draws").textContent = blckjck['draws'];
    }
}

