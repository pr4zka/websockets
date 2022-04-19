import { loadNotes, onNewNote, onSelected } from "./sockets.js";
import { onHandleSubmit, renderNotes, appendNote, fileForm } from "./ui.js";

onNewNote(appendNote);
loadNotes(renderNotes);
onSelected(fileForm);


const noteForm = document.querySelector("#noteForm");
noteForm.addEventListener("submit", onHandleSubmit);
