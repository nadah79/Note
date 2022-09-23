let notPad = document.getElementById("notPad");
displayLoginURL();
display();
displayTodoList();


function createNote() {
    let noteId = 'id' + (new Date()).getTime();
    let ta = createNewTextAreaElemnt("", noteId);
    let userData = getUserDataAuth();
    if (userData != null) {
        addNote(ta, noteId, userData);
    }

}

function addNote(ta, noteId, userData) {
    let notes = getNotes();
    let newNote = { noteId: noteId, userId: userData.id, date: new Date().toString(), content: ta.value };
    notes.push(newNote);
    saveNote(notes);
}

function saveNote(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getUserNotes() {
    let userData = getUserDataAuth();
    if (userData == null) {
        return [];
    }
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (notes == null) {
        return [];
    }
    notes = notes.filter(n => n.userId == userData.id);
    return notes;
}

function getUserTodoNotes() {
    let userData = getUserDataAuth();
    if (userData == null) {
        return [];
    }
    let notes = JSON.parse(localStorage.getItem("todoList"));
    if (notes == null) {
        return [];
    }
    notes = notes.filter(n => n.userId == userData.id);
    return notes;
}

function getNotes() {
    if (localStorage.getItem("notes") == null)
        return [];
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (notes == null) {
        return [];
    }
    return notes;
}

function getTodoListNotes() {
    if (localStorage.getItem("todoList") == null)
        return [];
    let notes = JSON.parse(localStorage.getItem("todoList"));
    if (notes == null) {
        return [];
    }
    return notes;
}

function updateNote(id, newContent) {
    let notes = getNotes();
    let userData = getUserDataAuth();
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId == id && note.userId == userData.id) {
            note.content = newContent;
            note.date = new Date().toString();
            saveNote(notes);
            break;
        }
    }
}


function deleteNote(noteId) {
    let notes = getNotes();
    let newNotes = [];
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId != noteId) {
            newNotes.push(note);
        }
    }
    saveNote(newNotes);
    notPad.removeChild(document.getElementById(noteId));
}

function display() {
    let notes = getUserNotes();
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (notes == null) {
            break;
        }
        let ta = createNewTextAreaElemnt(note.content, note.noteId);
        notPad.appendChild(ta);
        lastModifyDate(note.noteId, ta);
    }
}

function displayTodoList() {
    let notes = getUserTodoNotes();
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (notes == null) {
            break;
        }
        createNewToDoListElement(note, note.noteId);
    }
}

function updateTitleTodoNote(id, title) {
    let notes = getTodoListNotes();
    let userData = getUserDataAuth();
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId == id && note.userId == userData.id) {
            note.title = title;
            note.date = new Date().toString();
            saveTodoNote(notes);
            break;
        }
    }
}

function updateContentTodoNote(id, newContent) {
    let notes = getTodoListNotes();
    let userData = getUserDataAuth();
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId == id && note.userId == userData.id) {
            note.content = newContent;
            note.date = new Date().toLocaleString();
            saveTodoNote(notes);
            break;
        }
    }
}

function createNewTextAreaElemnt(value, noteId) {
    let placeholder = "new text";
    if (value != "") {
        placeholder = "";
    }
    let ta = document.createElement("textarea");
    ta.value = value;

    ta.placeholder = placeholder;
    ta.className = "textArea" + " " + noteId;
    ta.draggable = ("true")
    ta.style.fontSize="x-larg";
    ta.id = noteId;
    ta.addEventListener("change", () => {
        updateNote(noteId, ta.value);
        lastModifyDate(noteId, ta);
    });
    ta.addEventListener('keydown', (event) => {
        if (event.key == "Delete") {
            let noteId = event.target.id;
            deleteNote(noteId)
        }
    });
    notPad.appendChild(ta);
    return ta;
}


function logout() {
    event.preventDefault();
    localStorage.removeItem("User");
    location.href = "note.html";
}

function displayLoginURL() {
    let user = JSON.parse(localStorage.getItem("User"));
    if (user == null) {
        document.getElementById("a-login").style.display = 'inline-block';
        document.getElementById("a-register").style.display = 'inline-block';
        document.getElementById("a-logout").style.display = 'none';
        document.getElementById("u-name").style.display = 'none';

    } else {
        document.getElementById("a-login").style.display = 'none';
        document.getElementById("a-register").style.display = 'none';
        document.getElementById("a-logout").style.display = 'inline-block';
        document.getElementById("u-name").style.display = 'inline-block';
        let userName = user.name;
        document.getElementById("u-name").innerHTML ="Welcome "+ userName;

    }
}
function getUserDataAuth() {
    let user = localStorage.getItem("User");
    if (user == null) {
        return null;
    }
    return JSON.parse(user);
}

function lastModifyDate(noteId, ta) {
    let notes = getUserNotes();
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId == noteId) {
            ta.title = "last modify date is: " + note.date;
        }
    }
}
//////////////////////////////////



function createToDoList() {
    // let listId = 'id' + (new Date()).getTime();
    // let input = createNewToDoListElemnt("", listId);
    //let elements = [input.value];
    let noteId = 'todo' + (new Date()).getTime();
    createNewToDoListElement(null, noteId);

    let userData = getUserDataAuth();
    if (userData != null) {
        addTodoToLocalStorage(noteId, userData);
    }
}
// function addList(elements, listId, userData) {
//     let lists = getLists();

//     let newlist = { listId: listId, userId: userData.id, date: new Date().toString(), content: elements };
//     lists.push(newlist);
//     saveList(lists);
// }

function createNewToDoListElemnt(value, listId) {
    let placeholder = "new item";
    let toDoList = document.createElement("ul");
    let list = document.createElement("li");
    let input = document.createElement("input");
    input.value = value;
    input.placeholder = placeholder;
    toDoList.className = "toDoList" + " " + listId;
    toDoList.draggable = ("true")
    toDoList.id = listId;
    toDoList.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let list = document.createElement("li");
            toDoList.appendChild(list);
            let input = document.createElement("input");
            list.appendChild(input);
            input.value = value;
            input.placeholder = placeholder;
        }
    });
    toDoList.addEventListener('keydown', (event) => {
        if (event.key == "Delete") {
            deleteTodoNote(listId)
        }
    });
    notPad.appendChild(toDoList);
    toDoList.appendChild(list);
    list.appendChild(input);

    return toDoList;
}


function deleteTodoNote(noteId) {
    let notes = getTodoListNotes();
    let newNotes = [];
    for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId != noteId) {
            newNotes.push(note);
        }
    }
    saveTodoNote(newNotes);
    notPad.removeChild(document.getElementById(noteId));
}


function addTodoToLocalStorage(noteId, userData) {
    let content = [];
    let todoListNotes = getTodoListNotes();
    let newTodoNote = 
    { 
        noteId: noteId, 
        userId: userData.id, 
        date: new Date().toLocaleString(), 
        title: "", 
        content: content 
    };
    todoListNotes.push(newTodoNote);
    saveTodoNote(todoListNotes);
}

function saveTodoNote(notes) {
    localStorage.setItem("todoList", JSON.stringify(notes));
}

function createNewToDoListElement(value, listId) {
    let noteTitle = "";
    if(value != undefined || value != null){
        noteTitle = value.title;
    }
    let card = document.createElement("ul");
    let cardList = document.createElement("ul");
    let cardTitle = createCardTitleTodoElement(noteTitle, listId);
    if(value != null && value.content.length > 0){
        for (let index = 0; index < value.content.length; index++) {
            const element = value.content[index];
            createListItemTodoListElement(cardList, listId, element);
            
        }
    }else{
        createListItemTodoListElement(cardList, listId, "");
    }
    cardList.className = "toDoList todo";
    card.id = listId;
    card.className = "card-todo";
    if(value != null)
        card.title = `Last Edit: ${value.date}`;
    card.appendChild(cardTitle);
    card.appendChild(cardList);

    notPad.appendChild(card);
}

function createCardTitleTodoElement(title, noteId){
    let cardTitle = document.createElement("ul");
    let cardTitleInput = document.createElement("input");
    cardTitleInput.className = "input-todo todo-title";
    cardTitleInput.placeholder = "title";
    cardTitleInput.value = title;
    cardTitleInput.addEventListener("change", (event) => {
        if(event.target.value != undefined || ent.target.value != ""){
            updateTitleTodoNote(noteId, event.target.value);
        }
    });
    cardTitleInput.addEventListener('keydown', (event) => {
        if (event.key == "Delete") {
            deleteTodoNote(noteId)
        }
    });
    cardTitle.className = "todo";
    cardTitle.appendChild(cardTitleInput);
    return cardTitle;
}

function createListItemTodoListElement(parentElemnt, noteId, value){
    let listElement = document.createElement("li");
    let listInputElement = document.createElement("input");
    listInputElement.className = "input-todo";
    listInputElement.placeholder = "new item";
    listInputElement.value = value;
    listInputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            createListItemTodoListElement(parentElemnt, noteId, "");
            let todoValues = getContentTodoList(noteId);
            updateContentTodoNote(noteId, todoValues);
        }
    });
    listInputElement.addEventListener("change", (event) => {
        if(event.target.value != undefined || ent.target.value != ""){
            let todoValues = getContentTodoList(noteId);
            updateContentTodoNote(noteId, todoValues);
        }
    });
    listInputElement.addEventListener('keydown', (event) => {
        if (event.key == "Delete") {
            deleteTodoNote(noteId)
        }
    });
    listElement.appendChild(listInputElement);
    parentElemnt.appendChild(listElement);
    listInputElement.focus();
}

function getContentTodoList(noteId){
    let values = [];
    let todoList = document.getElementById(noteId).getElementsByTagName("li");
    for (let index = 0; index < todoList.length; index++) {
        const element = todoList[index];
        values.push(element.children[0].value);
    }
    return values;
}

function createListTodoElements(){
    let ulElement = document.createElement("ul");
    ulElement.className = "toDoList todo";
}

// /////////////////////////////////
function changeFont(selectTag) {
    var listValue = selectTag.options[selectTag.selectedIndex].text;  
    var textarea=document.querySelectorAll(".textArea")
    for (let i = 0; i< textarea.length; i++) {
        textarea[i].style.fontSize = listValue
}
    
}