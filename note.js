var notPad = document.getElementById("notPad");
displayLoginURL();

function createNote() {
    var noteId = 'id' + (new Date()).getTime();
    var ta = createNewTextAreaElemnt("", noteId);
    var userData = getUserDataAuth();
    if(userData != null){
      addNote(ta, noteId, userData);
    }

}

function addNote(ta, noteId, userData) {
    var notes = getNotes();
    var newNote = { noteId: noteId, userId: userData.id, date: new Date(), content: ta.value };
    notes.push(newNote);
    saveNote(notes);
}

function saveNote(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
    var userData = getUserDataAuth();
    if (userData == null) {
        return [];
    }
    var notes = JSON.parse(localStorage.getItem("notes"));
    if (notes == null) {
        return [];
    }
    notes = notes.filter(n => n.userId == userData.id);
    return notes;
}

function updateNote(id, newContent) {
    var notes = getNotes();
    for (var index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId == id) {
            note.content = newContent;
            note.date = new Date();
            saveNote(notes);
            break;
        }
    }
}

function deleteNote(noteId) {
    var notes = getNotes();
    var newNotes = [];
    for (var index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note.noteId != noteId) {
            newNotes.push(note);
        }
    }
    saveNote(newNotes);
    notPad.removeChild(document.getElementById(noteId));
}

function display() {
    var notes = getNotes();
    for (var index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (notes == null) {
            break;
        }

        var ta = createNewTextAreaElemnt(note.content, note.noteId);
        notPad.appendChild(ta);
    }
}

function createNewTextAreaElemnt(value, noteId){
    var placeholder = "new text";
    if(value != ""){
        placeholder = "";
    }
    var ta = document.createElement("textarea");
    ta.value = value;
    ta.placeholder = placeholder;
    ta.className = "textArea" + " " + noteId;
    ta.draggable = ("true")
    ta.id = noteId;
    ta.addEventListener("change", () => {
        updateNote(noteId, ta.value);
    });
    ta.addEventListener('keydown', (event) => {
        if(event.key == "Delete"){
            var noteId = event.target.id;
            deleteNote(noteId)
        }
    });
    notPad.appendChild(ta);
    return ta;
}

display();

function logout(){
    event.preventDefault();
    localStorage.removeItem("User");
    location.href = "file:///D:/iti/JS/proj_note/rar/Note/note.html";
}

function displayLoginURL(){
    document.getElementById("a-logout").style.display = 'none';
    let user = localStorage.getItem("User");
    if(user == null){
        document.getElementById("a-login").style.display = 'inline-block';
        document.getElementById("a-register").style.display = 'inline-block';
        document.getElementById("a-logout").style.display = 'none';
    }else{
        document.getElementById("a-login").style.display = 'none';
        document.getElementById("a-register").style.display = 'none';
        document.getElementById("a-logout").style.display = 'inline-block';
    }
}

function getUserDataAuth(){
    let user = localStorage.getItem("User");
    if(user == null){
        return null;
    }

    return JSON.parse(user);
}