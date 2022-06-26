const inputBox = document.getElementById('input-box');
const button = document.getElementById('submit-button');
const list = document.getElementById('list');

var hasLoaded = false;
loadNotes();

button.addEventListener('click',e=>{
    
    let hasRepeated = false;
    repetitionCheck();

    if (inputBox.value !== "" && inputBox.value[0] !== " " && hasRepeated === false) {
        createNewItem(inputBox.value);
    }

    function repetitionCheck() {
        if (list.children.length > 0) //checks for repetition
        {
            for (let a = 0; a < list.children.length; a++) {
                if (inputBox.value === list.children[a].innerHTML.replace(list.children[a].children[0].outerHTML, '')) {
                    hasRepeated = true;
                }
            }
        }
    }

});

//functions

function loadNotes(){
    if(localStorage.length === 0)
    {
        resetStorage();
    }
    if(retrieveStorageArray().length > 0)
    {
        for (let i = 0; i < retrieveStorageArray().length; i++) {
            createNewItem(retrieveIndexStorage(i))
        }
    }
    hasLoaded = true;
}

function createNewItem(input) {

    if(hasLoaded === true)//only on new instances
    {
        editStorage(list.children.length, input); 
    }
    
    let li = createNewItem(); //appends list element to unordered list

    createButton(); //appends button to list element

  
    if(hasLoaded === true)//only on new instances
    {
        inputBox.value = "";//resets text input after submit
    }
    
    function createNewItem() {
        let li = document.createElement("li"); //creates new list element
        li.appendChild(document.createTextNode(retrieveIndexStorage(list.children.length))); //appends text to the list element
        list.appendChild(li); //appends list element to unordered list
        return li;
    }

    function createButton() {
        let btn = document.createElement("button"); //creates new button
        btn.className = "list-button"; //gives class to new button
        btn.appendChild(document.createTextNode("delete")); //appends text to new button
        btn.addEventListener('click', e => {
            removeStorage(list.children.length - 1);
            btn.parentElement.remove();
        });
        li.appendChild(btn);
    }

    return;
}

function resetStorage(){
    localStorage.setItem('main','[]');
}

function editStorage(i, value)
{
    let storage = JSON.parse(localStorage.getItem("main"));
    storage[i] = value;
    localStorage.setItem("main", JSON.stringify(storage));
    return;
}

function retrieveIndexStorage(i)
{
    let storage = JSON.parse(localStorage.getItem("main"));
    return storage[i];
}

function retrieveStorageArray()
{
    let storage = JSON.parse(localStorage.getItem("main"));
    return storage;
}

function removeStorage(i)
{
    let storage = JSON.parse(localStorage.getItem("main"));
    storage.splice(i,1);
    localStorage.setItem("main", JSON.stringify(storage));
    return;
}