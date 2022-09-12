function create() {
    var notes=document.getElementById("notes")
    var ta = document.createElement("textarea");   
    ta.textContent ="new text.";
    ta.setAttribute('rows', '8');
    ta.className="text"
    ta.draggable=("true")
    notes.appendChild(ta);
}


