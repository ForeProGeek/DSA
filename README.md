# Structify: React.js Data Structures Lab

Structify is a high-fidelity, interactive React.js portfolio application designed to visualize and demonstrate the practical usage of core data structures (**Queue, Stack, Set, and Map**) in modern web development. 

Built using **Vite + React (Functional Components + Hooks)** and styled with **Tailwind CSS**, Structify features fully animated visualizers that let you peer behind the scenes and inspect the exact memory state of each structure in real time.

---

## 🚀 How to Run the Project Locally

Follow these quick steps to launch the sandbox in your local environment:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 16.x or higher recommended).

### 1. Navigate to the Project Folder
Open your terminal and enter the project directory:
```bash
cd data-structures-react-project
```

### 2. Install Dependencies
Install Vite, React, Tailwind CSS, and Lucide Icons:
```bash
npm install
```

### 3. Start the Development Server
Launch the local server:
```bash
npm run dev
```

### 4. View in Browser
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🛠️ Data Structures Explanations & Application Logic

### 1. Task Scheduler (Queue-Based)
* **Data Structure Core**: **Queue (FIFO - First-In, First-Out)**
* **Real-world Metaphor**: A queue of people waiting in line at a bank. The person who arrives first is served first.

#### The Logic Behind the Structure
A Queue is a linear, sequential collection where elements can only be added at one end (the **Rear**) and removed from the other end (the **Front**). This guarantees that items are processed in the strict order they were received.

#### Operations & Time Complexity
| Operation | Description | JS Array equivalent | Time Complexity |
| :--- | :--- | :--- | :--- |
| **Enqueue** | Add an item to the back of the queue | `array.push(item)` | $O(1)$ |
| **Dequeue** | Remove and return the front item | `array.shift()` | $O(N)$ * |
| **Peek** | Look at the front item without removing it | `array[0]` | $O(1)$ |
| **Size** | Return total number of items in queue | `array.length` | $O(1)$ |

> \* *Note: JS `shift()` takes $O(N)$ because the index of every subsequent element must be updated in memory. A standard double-pointer implementation can optimize this to $O(1)$.*

#### How the Application Works
The **Task Scheduler** simulates a background processing CPU queue.
1. **Enqueue**: Users type a task name and category. Submitting adds this task to the rear of our visual queue timeline.
2. **Visualizer**: A horizontal flowing timeline of tasks. The first card in the queue highlights as the **Front** node.
3. **Dequeue**: Clicking "Process Next Task" launches an active loading progress bar (simulating execution). Upon completion, it automatically calls `dequeue()`, ejecting the front task to the left and sliding all remaining tasks forward in line.

---

### 2. Undo-Redo sticky Notes (Stack-Based)
* **Data Structure Core**: **Stack (LIFO - Last-In, First-Out)**
* **Real-world Metaphor**: A stack of plates. You can only place a new plate on the very top, and you must remove the top plate before accessing the ones underneath.

#### The Logic Behind the Structure
A Stack is a linear collection where insertions and deletions take place at a single end, known as the **Top**. It is ideal for reversing operations because the most recent action is always the first one undone.

#### Operations & Time Complexity
| Operation | Description | JS Array equivalent | Time Complexity |
| :--- | :--- | :--- | :--- |
| **Push** | Place a new element onto the top of the stack | `array.push(item)` | $O(1)$ |
| **Pop** | Remove and return the top-most element | `array.pop()` | $O(1)$ |
| **Peek** | Inspect the top-most element | `array[array.length - 1]` | $O(1)$ |

#### How the Application Works
Structify coordinates **two stacks** (`Undo Stack` and `Redo Stack`) to represent a sticky note board's history:
1. **Making changes**: Adding or deleting notes creates a new state representation. We push this new state onto the `Undo Stack` and clear the `Redo Stack`.
2. **Undo**: We pop the current state from the `Undo Stack`, push it onto the `Redo Stack`, and render the state now resting on the top of the `Undo Stack`.
3. **Redo**: We pop the top state from the `Redo Stack`, push it back onto the `Undo Stack`, and render it.
4. **Keyboard Shortcuts**: Integrated global event listeners allow standard keyboard shortcuts (`Ctrl+Z` for Undo, `Ctrl+Y` for Redo).
5. **Visualizer**: Two vertical translucent cylinders display state snapshots. You can watch snapshots move back and forth between columns.

---

### 3. Unique Visitor Tracker (Set-Based)
* **Data Structure Core**: **Set (Unique Unordered Collection)**
* **Real-world Metaphor**: A guest list at a VIP event. You can only register your name once. Subsequent attempts to write your name on the list are ignored.

#### The Logic Behind the Structure
A Set is an abstract data collection that contains only **unique, unordered values**. Rather than scanning linear arrays ($O(N)$ time), sets use internal hashing algorithms to perform operations in instantaneous constant time ($O(1)$).

#### Operations & Time Complexity
| Operation | Description | Set Method | Time Complexity |
| :--- | :--- | :--- | :--- |
| **Add** | Insert an element into the Set | `set.add(value)` | $O(1)$ average |
| **Has (Lookup)**| Check if an element already exists | `set.has(value)` | $O(1)$ average |
| **Delete** | Remove an element | `set.delete(value)` | $O(1)$ average |
| **Size** | Retrieve total unique count | `set.size` | $O(1)$ |

#### How the Application Works
The **Visitor Tracker** allows registration of unique emails.
1. **Set Check**: When you submit a visitor email, the app queries `set.has(email)`.
2. **Duplicate Handling**: If the Set already contains that email, a custom modal warning appears and the registered profile bubble in the visualizer shakes violently in red.
3. **Set Bubbles Visualizer**: All visitors are plotted as floating orbital nodes. The Set guarantees that no two bubbles represent the same email.
4. **JSON Export**: A button compiles the Set's elements into a downloadable JSON file.

---

### 4. Contacts Manager (Map-Based)
* **Data Structure Core**: **Map (Key-Value Direct Access)**
* **Real-world Metaphor**: A school locker bank. Each student name (Unique Key) maps directly to a specific locker number containing their belongings (Value).

#### The Logic Behind the Structure
A Map holds **key-value pairs**, where each unique key is mapped to exactly one value. This permits incredibly efficient CRUD operations because you don't need to search through lists; you query the key and get direct memory access to its value.

#### Operations & Time Complexity
| Operation | Description | Map Method | Time Complexity |
| :--- | :--- | :--- | :--- |
| **Set (Insert/Update)** | Map a key to a value | `map.set(key, value)` | $O(1)$ average |
| **Get (Read)** | Retrieve value mapped to a key | `map.get(key)` | $O(1)$ average |
| **Has (Check)** | Verify if key exists in Map | `map.has(key)` | $O(1)$ average |
| **Delete (Remove)** | Delete key and its mapped value | `map.delete(key)` | $O(1)$ average |

#### How the Application Works
The **Contacts Directory** maps a **Contact Name** (Key) directly to an object containing their `{ phone, email, color }` details (Value).
1. **CRUD Controls**: Built-in forms allow setting, reading, and deleting directory mappings.
2. **Auto-Override Form**: If you type an existing contact's name into the "Name" input field, the app detects the key mapping via `map.has(name)` and automatically switches to "Edit Mode," letting you overwrite phone/email details in place.
3. **Dynamic Initials Gradient**: The app hashes the letters of the contact's name to generate a unique, gorgeous HSL gradient avatar for that specific person.
4. **Search Filter**: A search bar filters the keys instantly.

---

## 🎨 Premium UI & Design Tokens

Structify incorporates modern premium UX guidelines:
- **Dark Mode First**: Enabled with a beautiful, rich dark slate palette (`bg-slate-950` to `bg-slate-900`) and a smooth, class-based toggle system.
- **Glassmorphism**: Standard cards use a blurred background overlay (`glass` utility) to provide depth.
- **Micro-Animations**: Shaking errors for duplicate Sets, horizontal sliding transitions for Queue changes, and LIFO bounce entries for Stack additions.
- **No Heavy Libraries**: Tailwind utility classes keep the final build bundle extremely fast and lightweight.
- **Responsive Layout**: Fluid CSS grids automatically adapt panels from single-column mobile alignments to multi-column desktop dashboards.
