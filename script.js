let completedTasks = 0;
let taskCount = document.querySelectorAll('.task').length;
document.getElementById('incomplete-tasks').innerText = taskCount;
document.getElementById('completed-tasks').innerText = completedTasks;

// Add event listener to existing complete buttons
document.querySelectorAll('.complete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    completedTasks++;
    document.getElementById('completed-tasks').innerText = completedTasks;
    document.getElementById('incomplete-tasks').innerText = taskCount - completedTasks;
    btn.parentNode.classList.add('completed');
    btn.disabled = true; // disable the button after completion
  });
});

// Add event listener to existing delete buttons
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.parentNode.classList.contains('completed')) {
      completedTasks--;
      document.getElementById('completed-tasks').innerText = completedTasks;
    }
    taskCount--;
    document.getElementById('incomplete-tasks').innerText = taskCount - completedTasks + getCompletedCount();
    btn.parentNode.remove();
  });
});

// Function to get the count of completed tasks
function getCompletedCount() {
  let completed = document.querySelectorAll('.completed');
  return completed.length;
}

// Add event listener to add task button
document.querySelector('.admin-panel button').addEventListener('click', () => {
  let taskName = document.querySelector('.admin-panel input[type="text"]').value;
  let dueDate = document.querySelector('.admin-panel input[type="date"]').value;
  let priority = document.querySelector('.admin-panel select').value;

  taskCount++;

  // Create new task element
  let taskHTML = `
    <div class="task">
      <h4>Task ${taskCount}: ${taskName}</h4>
      <p>Due Date: ${dueDate}</p>
      <p>Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
      <button class="complete-btn">Mark as Complete</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // Append new task to tasks container
  document.querySelector('.tasks').insertAdjacentHTML('beforeend', taskHTML);

  // Update incomplete tasks count
  document.getElementById('incomplete-tasks').innerText = taskCount - completedTasks;

  // Add event listener to new complete button
  let newTask = document.querySelectorAll('.task')[document.querySelectorAll('.task').length - 1];
  newTask.querySelector('.complete-btn').addEventListener('click', () => {
    completedTasks++;
    document.getElementById('completed-tasks').innerText = completedTasks;
    document.getElementById('incomplete-tasks').innerText = taskCount - completedTasks;
    newTask.classList.add('completed');
    newTask.querySelector('.complete-btn').disabled = true; // disable the button after completion
  });

  // Add event listener to new delete button
  newTask.querySelector('.delete-btn').addEventListener('click', () => {
    if (newTask.classList.contains('completed')) {
      completedTasks--;
      document.getElementById('completed-tasks').innerText = completedTasks;
    }
    taskCount--;
    document.getElementById('incomplete-tasks').innerText = taskCount - completedTasks + getCompletedCount();
    newTask.remove();
  });

  // Clear input fields
  document.querySelector('.admin-panel input[type="text"]').value = '';
  document.querySelector('.admin-panel input[type="date"]').value = '';
  document.querySelector('.admin-panel select').value = 'low';
});
