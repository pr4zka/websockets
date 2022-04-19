import Note from "./models/Note";


// Socket.io is a library that allows us to connect to a server and emit and receive events
export default (io) => {
  io.on("connection", (socket) => {
    const emitNote = async () => {
      const notes = await Note.find();
      io.emit("server:loadNotes", notes);
    };
    emitNote();
    socket.on("client:newnote", async (data) => {
      const newNotes = new Note(data);
      const saveNotes = await newNotes.save();
      io.emit("server:newnote", saveNotes);
    });

    //borramos la nota
    socket.on("client:deletenote", async (id) => {
      await Note.findByIdAndDelete(id);
      emitNote();
    });

    //busacamos la nota por id
    socket.on("client:getnote", async (id) => {
      const note = await Note.findById(id);
      io.emit("server:seletecnote", note);
    });

    //emitimos el socket para actualizar la nota
    socket.on("client:updatenote", async (updateNote) => {
      await Note.findByIdAndUpdate(updateNote._id, {
        title: updateNote.title,
        description: updateNote.description,
      });
      emitNote();
    });
  });
};
