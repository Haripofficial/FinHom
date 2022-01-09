function setNotes() {
    console.log(document.getElementById('input-notes').getAttribute('pointer'))
    myMaths = JSON.parse(localStorage.myMaths)
    myMaths.notes[document.getElementById('input-notes').getAttribute('pointer')] = document.getElementById('input-notes').value;
    setLocal(myMaths)
    window.location.reload();
}
function clearNote() {
    if (confirm("Are You Want to delete All data ?")) {
        localStorage.clear()
        window.location.reload()
        alert('cleared !')
    } else {
        alert('canceled !')
    }

}
function setLocal(myMath) {
    localStorage.setItem('myMaths', JSON.stringify(myMath))
}

function newMonth() {
    let balace = Number(prompt("Please Enteter Balance amout you have to pay ! (Negative value acceptable)", 0));
    console.log(balace)
    var myMaths = {
        total: 0,
        month: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0
        ],
        notes: [
            "_", "_", "_", "_", "_", "_", "_", "_", "_", "_",
            "_", "_", "_", "_", "_", "_", "_", "_", "_", "_",
            "_", "_", "_", "_", "_", "_", "_", "_", "_", "_",
            "_"
        ],
        halfDay: 0,
        fullDay: 0,
        payed: balace
    }
    setLocal(myMaths);
}
localStorage.myMaths ? void (0) : newMonth();

myMaths = JSON.parse(localStorage.myMaths)
var total = myMaths.total;
let month = myMaths.month;
let halfDay = myMaths.halfDay;
var fullDay = myMaths.fullDay;
let payed = myMaths.payed;

document.getElementById('total').innerText = total;
document.getElementById('total-half-days').innerText = halfDay
document.getElementById('total-full-days').innerText = fullDay
document.getElementById('Balance').innerText = total - payed;

function setValue(id, bol) {
    myMaths = JSON.parse(localStorage.myMaths)
    month = myMaths.month;
    var incTotal;
    var incHalf = 0;
    var incFull = 0;
    switch (bol) {
        case 0:
            month[id] = 1;
            incTotal = 45
            incHalf = 1;
            break
        case 1:
            month[id] = 2;
            incTotal = 45;
            incFull = 1;
            incHalf = -1;
            break
        default:
            month[id] = 0;
            incTotal = -90;
            incFull = -1;
    }

    total = myMaths.total + incTotal;
    halfDay = myMaths.halfDay + incHalf;
    fullDay = myMaths.fullDay + incFull;

    myMaths.total = total;
    myMaths.halfDay = halfDay;
    myMaths.fullDay = fullDay;

    myMaths.month.id = !bol;
    setLocal(myMaths)
    window.location.reload();
}
function write(item, index) {
    const day = document.createElement('div');
    day.classList.add('day')
    day.setAttribute('id', item)
    if (index % 7 == 1 || index % 7 == 0) {
        day.classList.add('weekend')
    }
    day.addEventListener("click", () => setValue(index, item));
    day.addEventListener("touchstart", () => { tId = setTimeout(console, 1000) })
    day.addEventListener("contextmenu", () => { tId = setTimeout(console, 1000) })


    function console() {
        document.getElementById('input-notes').focus();
        document.getElementById('input-notes').setAttribute('pointer', index);
        let notes = JSON.parse(localStorage.myMaths).notes[index];
        document.getElementById('input-notes').value = (notes == '_') ? "NO Notes added" : notes;
    }
    let note = JSON.parse(localStorage.myMaths).notes[index];
    (note != '_') ? day.classList.add('note-added') : day.classList.remove('note-added');

    switch (item) {
        case 1:
            day.classList.add('half')
            break
        case 2:
            day.classList.add('full')
            break
        default:
        // ['full','half'].forEach(item => elem.classList.remove(item));
    }

    day.innerHTML = `
            ${index + 1}    
            `
    document.getElementById('root').append(day)
}
month.forEach(write);
