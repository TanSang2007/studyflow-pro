let tasks = [];

/* OPEN LOGIN */

function openLogin(){

    document.getElementById("landingPage")
    .style.display = "none";

    document.getElementById("loginPage")
    .style.display = "flex";
}

/* LOGIN */

function login(){

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if(username === "admin"
        && password === "123456"){

        document.getElementById("loginPage")
        .style.display = "none";

        document.getElementById("app")
        .style.display = "block";
    }
    else{

        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

/* LOGOUT */

function logout(){

    document.getElementById("app")
    .style.display = "none";

    document.getElementById("landingPage")
    .style.display = "block";
}

/* PAGE */

function showPage(pageId,element){

    let pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active-page");

    });

    document
    .getElementById(pageId)
    .classList.add("active-page");

    let items =
        document.querySelectorAll(".sidebar li");

    items.forEach(item => {

        item.classList.remove("active");

    });

    element.classList.add("active");
}

/* ADD TASK */

function addTask(){

    let title =
        document.getElementById("title").value;

    let subject =
        document.getElementById("subject").value;

    let deadline =
        document.getElementById("deadline").value;

    let priority =
        document.getElementById("priority").value;

    if(title === ""
        || subject === ""
        || deadline === ""){

        alert("Vui lòng nhập đầy đủ!");

        return;
    }

    let task = {

        id:Date.now(),
        title,
        subject,
        deadline,
        priority,
        completed:false
    };

    tasks.push(task);

    saveLocal();

    displayTasks();

    updateStats();

    clearInputs();
}

/* DISPLAY */

function displayTasks(){

    let taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        let div =
            document.createElement("div");

        div.className = "task";

        div.innerHTML = `

            <h3>${task.title}</h3>

            <p>📘 ${task.subject}</p>

            <p>📅 ${task.deadline}</p>

            <p>${task.priority}</p>

            <div class="task-buttons">

                <button class="complete-btn"
                    onclick="completeTask(${task.id})">

                    ✔ Hoàn Thành

                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    🗑 Xóa

                </button>

            </div>

        `;

        taskList.appendChild(div);
    });
}

/* COMPLETE */

function completeTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            task.completed = !task.completed;
        }

        return task;
    });

    saveLocal();

    displayTasks();

    updateStats();
}

/* DELETE */

function deleteTask(id){

    tasks =
        tasks.filter(task => task.id !== id);

    saveLocal();

    displayTasks();

    updateStats();
}

/* SEARCH */

function searchTask(){

    let keyword =
        document.getElementById("searchTask")
        .value.toLowerCase();

    let taskDivs =
        document.querySelectorAll(".task");

    taskDivs.forEach(task => {

        let text =
            task.innerText.toLowerCase();

        if(text.includes(keyword)){

            task.style.display = "block";
        }
        else{

            task.style.display = "none";
        }
    });
}

/* FILTER */

function filterTask(){

    let value =
        document.getElementById("filterPriority")
        .value;

    let taskDivs =
        document.querySelectorAll(".task");

    taskDivs.forEach(task => {

        if(value === "all"){

            task.style.display = "block";
        }
        else if(task.innerText.includes(value)){

            task.style.display = "block";
        }
        else{

            task.style.display = "none";
        }
    });
}

/* STATS */

function updateStats(){

    document.getElementById("totalTask")
    .innerText = tasks.length;

    let completed =
        tasks.filter(task =>
            task.completed).length;

    document.getElementById("completedTask")
    .innerText = completed;

    document.getElementById("pendingTask")
    .innerText =
        tasks.length - completed;
}

/* CLEAR INPUT */

function clearInputs(){

    document.getElementById("title").value = "";

    document.getElementById("subject").value = "";

    document.getElementById("deadline").value = "";
}

/* DARK MODE */

function toggleDarkMode(){

    document.body.classList.toggle("dark");
}

/* SAVE */

function saveLocal(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* LOAD */

function loadLocal(){

    let data =
        localStorage.getItem("tasks");

    if(data){

        tasks = JSON.parse(data);

        displayTasks();

        updateStats();
    }
}

loadLocal();
/* NOTES */

let notes = [];

/* ADD NOTE */

function addNote(){

    let input =
        document.getElementById("noteInput");

    let time =
        document.getElementById("noteTime");

    if(input.value === ""){

        alert("Nhập ghi chú!");

        return;
    }

    let note = {

        id:Date.now(),
        text:input.value,
        time:time.value
    };

    notes.push(note);

    saveNotes();

    displayNotes();

    input.value = "";
    time.value = "";
}

/* DISPLAY NOTE */

function displayNotes(){

    let notesGrid =
        document.getElementById("notesGrid");

    notesGrid.innerHTML = "";

    notes.forEach(note => {

        let div =
            document.createElement("div");

        let colors = [
            "yellow",
            "pink",
            "blue"
        ];

        let randomColor =
            colors[Math.floor(
                Math.random()*colors.length
            )];

        div.className =
            `note ${randomColor}`;

        div.innerHTML = `

            <button class="delete-note"
                onclick="deleteNote(${note.id})">

                ✖

            </button>

            <h3>${note.text}</h3>

            <span class="note-time">

                ⏰ ${formatDate(note.time)}

            </span>

            <div class="note-remind">

                🔔 Có nhắc hẹn

            </div>

        `;

        notesGrid.appendChild(div);
    });
}

/* DELETE NOTE */

function deleteNote(id){

    notes =
        notes.filter(note =>
            note.id !== id);

    saveNotes();

    displayNotes();
}

/* FORMAT DATE */

function formatDate(dateString){

    if(dateString === ""){

        return "Không có thời gian";
    }

    let date =
        new Date(dateString);

    return date.toLocaleString("vi-VN");
}

/* SAVE NOTE */

function saveNotes(){

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );
}

/* LOAD NOTE */

function loadNotes(){

    let data =
        localStorage.getItem("notes");

    if(data){

        notes = JSON.parse(data);

        displayNotes();
    }
}

/* REMINDER */

setInterval(() => {

    let now =
        new Date().getTime();

    notes.forEach(note => {

        if(note.time){

            let noteTime =
                new Date(note.time).getTime();

            let diff =
                noteTime - now;

            if(diff > 0
                && diff < 60000){

                alert(
                    "🔔 Nhắc nhở: "
                    + note.text
                );
            }
        }
    });

},10000);

/* LOAD */

loadNotes();
/* CLEAR */

function clearAll(){

    if(confirm(
        "Bạn muốn xóa toàn bộ deadline?"
    )){

        tasks = [];

        saveLocal();

        displayTasks();

        updateStats();
    }
}

/* DARK MODE */

function toggleDarkMode(){

    document.body.classList.toggle("dark");
}