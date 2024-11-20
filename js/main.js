/*************************************************
 * MAIN APPLICATION LOGIC
 * Handles todo list functionality and animations
 *************************************************/

/**
 * Adds a new item to the todo list
 * Includes input validation, element creation,
 * styling application, and animation handling
 */
function addItem() {
    const input = document.getElementById('itemInput');
    const list = document.getElementById('itemList');
    
    if (input.value.trim() !== '') {
        // Create list item
        const li = createTodoItem(input.value);
        
        // Add to list with animation
        list.insertBefore(li, list.firstChild);
        
        // Trigger entrance animation
        requestAnimationFrame(() => {
            li.classList.remove('todo-item-enter');
            li.classList.add('todo-item-enter-active');
        });
        
        // Reset input
        input.value = '';
        input.focus();
    }
}

/**
 * Creates a new todo item element
 * @param {string} text - The todo item text
 * @returns {HTMLElement} The created list item
 */
function createTodoItem(text) {
    const li = document.createElement('li');
    li.classList.add(
        'glassy-dark',
        'px-4',
        'py-3',
        'rounded-xl',
        'text-blue-800',
        'transition',
        'duration-300',
        'cursor-pointer',
        'shadow-md',
        'text-lg',
        'font-medium',
        'todo-item-enter'
    );
    
    // Create item content
    const itemContent = document.createElement('div');
    itemContent.className = 'flex justify-between items-center';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    
    const deleteBtn = createDeleteButton(li);
    
    // Assemble item
    itemContent.appendChild(textSpan);
    itemContent.appendChild(deleteBtn);
    li.appendChild(itemContent);
    
    return li;
}

/**
 * Creates a delete button for a todo item
 * @param {HTMLElement} li - The parent list item
 * @returns {HTMLElement} The created delete button
 */
function createDeleteButton(li) {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    deleteBtn.className = 'ml-2 text-blue-600 hover:text-red-500 text-xl font-bold transition duration-300';
    
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.classList.add('todo-item-exit');
        setTimeout(() => li.remove(), 300);
    };
    
    return deleteBtn;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard support
    document.getElementById('itemInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });
});