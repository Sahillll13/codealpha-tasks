// Selecting Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage (if any)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
    <span>${task.text}</span>
    <div class="task-actions">
        <button class="done-btn">✔️</button>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
    </div>
 `;

    // Mark Done
    li.querySelector(".done-btn").addEventListener("click", () =>
      toggleComplete(index)
    );

    // Edit Task
    li.querySelector(".edit-btn").addEventListener("click", () =>
      editTask(index)
    );

    // Delete Task
    li.querySelector(".delete-btn").addEventListener("click", () =>
      deleteTask(index)
    );

    taskList.appendChild(li);
  });
}

// Add Task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  saveAndRender();
});
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});

// Toggle Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();

  if (tasks[index].completed) {
    confetti({
      particleCount: 200,
      spread: 160,
      startVelocity: 50,
      origin: { y: 0.2 }, // slight offset from top
      colors: [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#f9bec7",
        "#ffd6e0",
        "#dcffcc",
        "#aaff8b",
        "#80ff72",
      ],
    });
  }
}

// Edit Task
function editTask(index) {
  Swal.fire({
    title: "Edit Task",
    input: "text",
    inputValue: tasks[index].text,
    showCancelButton: true,
    confirmButtonText: "Save",
    confirmButtonColor: "#16a085",
    cancelButtonColor: "#e74c3c",
    inputValidator: (value) => {
      if (!value.trim()) {
        return "Task cannot be empty!";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      tasks[index].text = result.value.trim();
      saveAndRender();
      Swal.fire({
        title: "Updated!",
        text: "Task updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

// Delete Task
function deleteTask(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#3498db",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      tasks.splice(index, 1);
      saveAndRender();
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  });
}

// Save to localStorage and render again
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}


// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Search Tasks
function searchTasks() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.querySelectorAll("li");
    tasks.forEach(task => {
        if (task.textContent.toLowerCase().includes(input)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}
