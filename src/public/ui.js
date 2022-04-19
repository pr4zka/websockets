import { saveNote, deleteNote, getNotebyId, updateNote } from "./sockets.js";

const noteList = document.querySelector("#notes");

const title = document.querySelector("#title");
const description = document.querySelector("#description");

let savedId = "";

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 mb-2 animate__animated animate__swing"> 
  <div class="d-flex justify-content-between">
  <h1>${note.title}</h1>
  <div> 
    <button class="btn btn-danger btn-sm delete" data-id="${note._id}">Delete</button>
    <button class="btn btn-secondary btn-sm update" data-id="${note._id}">Update</button>
  </div>
  </div>
  <P>${note.description}</P>
  </div>
  `;

  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", () => getNotebyId(btnUpdate.dataset.id));
  return div;
};

export const renderNotes = (notes) => {
  noteList.innerHTML = "";
  notes.forEach((note) => noteList.append(noteUI(note)));
};

//rellernar el formulario con los datos para editar
export const fileForm = (note) => {
  (title.value = note.title),
    (description.value = note.description),
    (savedId = note._id);
};


export const onHandleSubmit = (e) => {
  e.preventDefault();
  if (savedId) {
    updateNote(savedId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }
  //limpiar el formulario
  savedId = "";
  title.value = "";
  description.value = "";
};

export const appendNote = (note) => {
  noteList.append(noteUI(note));
};
