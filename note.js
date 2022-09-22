let notPad = document.getElementById("notPad");
displayLoginURL();
display();

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
function getNotes() {
    if (localStorage.getItem("notes") == null)
        return [];
    let notes = JSON.parse(localStorage.getItem("notes"));
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
            console.log(ta.title)
        }
    }
}
//////////////////////////////////

function createNewToDoListElemnt(value, listId) {
    let placeholder = "new list";
    if (value != "") {
        placeholder = "";
    }
    let toDoList = document.createElement("ul");
    notPad.appendChild(toDoList);
    let list = document.createElement("li");
    toDoList.appendChild(list);
    let input = document.createElement("input");
    list.appendChild(input);
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
        if (event.key == "delete") {
            deletelist(listId)
        }
    });
    return toDoList;
}

function createToDoList() {
    let listId = 'id' + (new Date()).getTime();
    let input = createNewToDoListElemnt("", listId);
    let elements = [input.value];

    let userData = getUserDataAuth();
    if (userData != null) {
        // addList(elements, listId, userData);
    }
}
// function addList(elements, listId, userData) {
//     let lists = getLists();

//     let newlist = { listId: listId, userId: userData.id, date: new Date().toString(), content: elements };
//     lists.push(newlist);
//     saveList(lists);
// }


function deletelist(listId) {
    notPad.removeChild(document.getElementById(listId));
}
