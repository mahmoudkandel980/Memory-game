// select the start game button
var startgame = document.querySelector('.control-buttons span');
startgame.onclick = function () {
    //prompt ask for name
    let yourname = prompt('what`s your name')
    //if it empty
    if (yourname == null || yourname == "") {
        document.querySelector('.info-container .name span').textContent = `Gest`
    } else {
        document.querySelector('.info-container .name span').textContent = yourname
    }
    blocks.forEach((block) => {

        block.classList.add('is-flipped');

        setTimeout(() => {
            block.classList.remove('is-flipped')

        }, 1000)

    });

    document.querySelector('.control-buttons').remove();


}
// efect duration
let duration = 1000;

//select blocks container
let blockscontainer = document.querySelector('.memory-game-blocks');

//create array from game blocks
let blocks = Array.from(blockscontainer.children);

// create range of keys
let orderrange = [...Array(blocks.length).keys()]
// let orderrange = Array.from(Array(20).keys())

// shuffle function
shuffle(orderrange);


//add order css property to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderrange[index];

    // add click event
    block.addEventListener('click', function () {
        //trigger the flip block function
        flipblock(block)
    });


});





// flip block function
function flipblock(selectedblock) {
    //add class is-flipped
    selectedblock.classList.add('is-flipped');

    // collect all flipped cards
    let allflippedblocks = blocks.filter(flippedblock => flippedblock.classList.contains('is-flipped'))

    // if theres two selected blocks

    if (allflippedblocks.length === 2) {

        // stop clicking function
        stopclicking();


        // check matched block function
        checkmatchedblocks(allflippedblocks[0], allflippedblocks[1]);

    }
}


// stop clicking function
function stopclicking() {
    //add class no clicking on main container
    blockscontainer.classList.add('no-clicking')

    setInterval(() => {
        // remove class no clicking after the duration
        blockscontainer.classList.remove('no-clicking')
    }, duration);
}

// check matched block
function checkmatchedblocks(firstblock, secondblock) {
    let trieselement = document.querySelector('.info-container .tries span');

    if (firstblock.dataset.anime === secondblock.dataset.anime) {

        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');

        firstblock.classList.add('is-matched');
        secondblock.classList.add('is-matched');

        document.getElementById('sucess').play()



    } else {
        trieselement.innerHTML = `${parseInt(trieselement.innerHTML) + 1} of 10 `;

        setTimeout(() => {
            firstblock.classList.remove('is-flipped');
            secondblock.classList.remove('is-flipped');
        }, duration)

        document.getElementById('fail').play()

        if (parseInt(trieselement.innerHTML) > 9) {
            location.reload();
            startgame.textContent = 'play agine'

        }
    }
}



function shuffle(array) {
    //stting vars
    let current = array.length,
        temp,
        random

    while (current > 0) {
        // get random number
        random = Math.floor(Math.random() * current);

        // decrese length by one
        current--;

        //  1- save current element is stash
        temp = array[current];

        //  2- current element = random element
        array[current] = array[random]

        //  3- random element = get element from stash
        array[random] = temp

    }
    return array
}

// current Array [1, 2 ,3 ,4 ,5, 6 , 7, 8 ,9 ,0]
// new Array [1 ,2 ,3, 4, 5 ,6 ,7 ,8 ,9 ,0]
/*
  1- save current element is stash
  2- current element = random element
  3- random element = get element from stash
*/












const nightmodeBtn = document.querySelector('.night'),
    lightmodeBtn = document.querySelector('.light'),
    text = document.querySelector('.info-container'),
    tries = document.querySelector('.tries'),
    body = document.querySelector('body');


window.onload = () => {
    if (localStorage.getItem('mode') === 'dark') {
        body.style.background = "black"
        nightmodeBtn.style.display = "none"
        text.style.color = "white"
        tries.style.color = "white"
    } else {
        body.style.background = "white"
        lightmodeBtn.style.display = "none"
        text.style.color = "black"
        tries.style.color = "black"
    }
}

nightmodeBtn.addEventListener("click", () => {
    body.style.background = "black"
    nightmodeBtn.style.display = "none"
    lightmodeBtn.style.display = "block"
    text.style.color = "white"
    tries.style.color = "white"


    localStorage.setItem('mode', "dark")
})

lightmodeBtn.addEventListener("click", () => {
    body.style.background = "white"
    lightmodeBtn.style.display = "none"
    nightmodeBtn.style.display = "block"
    text.style.color = "black"
    tries.style.color = "black"

    localStorage.setItem('mode', "light")
})