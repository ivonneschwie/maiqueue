import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAQCsM0sYVqFO2ls7iJhNvvtdfrgilXr6U",
    authDomain: "eevq-1f97b.firebaseapp.com",
    databaseURL: "https://eevq-1f97b-default-rtdb.firebaseio.com",
    projectId: "eevq-1f97b",
    storageBucket: "eevq-1f97b.appspot.com",
    messagingSenderId: "290284705856",
    appId: "1:290284705856:web:c539ab2f44f5248802a7a5",
    measurementId: "G-JZBM731XCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const playerList = document.querySelector('#player-list');
const form = document.querySelector('#add-player-form');

function renderPlayers (docu){
  let li = document.createElement('li');
  let playername = document.createElement('span');
  let timestamp = document.createElement('span');
  let cross = document.createElement('div');
  let diff = document.createElement("img"); 
  let time_border = document.createElement("img"); 
  

  li.setAttribute('data-id', docu.id);
  playername.textContent = docu.data().playername;
  timestamp.textContent = docu.data().time.toDate().toLocaleTimeString('en-GB').substring(0, 8);
  cross.textContent = 'CLEAR!';

  time_border.setAttribute('id', 'time_border');
 
  diff.src = "/images/diff_master.png"; 
  time_border.src = "images/time.png"

  li.appendChild(playername);
  li.appendChild(timestamp);
  li.appendChild(cross);
  li.appendChild(diff);
  li.appendChild(time_border);

  playerList.appendChild(li);

  cross.addEventListener('click', async (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    await deleteDoc(doc(db, "sm-dagupan", id));
    window.location.reload(true);
});
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = form.playername.value;
  if (name.trim().length != 0){
    await addDoc(collection(db, "sm-dagupan"), {
      playername: form.playername.value,
      time: Timestamp.now()
    })
  }

  form.playername.value = '';
  window.location.reload(true);
});

const q = query(collection(db, "sm-dagupan"), orderBy("time")); 

const querySnapshot = await getDocs(q);
querySnapshot.forEach((docu) => {
  renderPlayers(docu);
  console.log(docu.data());
});
