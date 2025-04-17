const apiUrl = 'http://localhost:3000/notes';

const token = localStorage.getItem("token"); 

const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

async function fetchNotes() {
  try {
    const res = await axios.get(`${apiUrl}/getNotes`, headers);
    const container = document.getElementById('notesContainer');
    container.innerHTML = '';

    res.data.forEach(note => {
      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <textarea class="form-control mb-2" id="note-${note.id}">${note.note}</textarea>
            <button class="btn btn-success btn-sm" onclick="updateNote(${note.id})">Update</button>
            <button class="btn btn-danger btn-sm" onclick="deleteNote(${note.id})">Delete</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

async function createNote() {
  const note = document.getElementById("newNote").value;
  if (!note.trim()) return;

  try {
    await axios.post(`${apiUrl}/createNote`, { note }, headers);
    document.getElementById("newNote").value = '';
    fetchNotes();
  } catch (err) {
    console.error(err);
  }
}

async function updateNote(id) {
  const noteText = document.getElementById(`note-${id}`).value;

  try {
    await axios.put(`${apiUrl}/updateNote/${id}`, { note: noteText }, headers);
    fetchNotes();
  } catch (err) {
    console.error(err);
  }
}

async function deleteNote(id) {
  try {
    await axios.delete(`${apiUrl}/deleteNote/${id}`, headers);
    fetchNotes();
  } catch (err) {
    console.error(err);
  }
}

window.onload = fetchNotes;
