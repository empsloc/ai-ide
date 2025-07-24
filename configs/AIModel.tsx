// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';


  
 
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    export async function chatSession(userPrompt:string) {
    const config = {
      responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.0-flash';
    const contents = [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ];
   
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    // for await (const chunk of response) {
    //   console.log(chunk.text);
    // }

    let fullText = '';

  for await (const chunk of response) {
    fullText += chunk.text || '';
  }

  return fullText; // return full reply

}

export async function GenAICode(userPrompt:string) {
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `generate todo app:
Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, 
without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
also you can use date-fns for date format and react-chartjs-2 chart, graph library

Return the response in JSON format with the following schema:
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}

Here’s the reformatted and improved version of your prompt:

Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.

Return the response in JSON format with the following schema:

json
Copy code
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}
Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
files:{
  "/App.js": {
    "code": "import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}"
  }
}
  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.
  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required
  
  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
  -Add Emoji icons whenever needed to give good user experinence
  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
   `,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "projectTitle": "React Todo App with Tailwind CSS",
  "explanation": "This project is a fully-featured React Todo application built with Tailwind CSS for styling, Lucide React for icons, and date-fns for date formatting. It's structured with separate components for different functionalities (e.g., TodoInput, TodoList, TodoItem) and is designed to be user-friendly and visually appealing. The application allows users to add, edit, complete, and delete tasks, with clear visual feedback.",
  "files": {
    "/App.js": {
      "code": "import React, { useState, useEffect } from 'react';\\nimport TodoInput from './components/TodoInput';\\nimport TodoList from './components/TodoList';\\nimport { Home } from 'lucide-react';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState(() => {\\n    const savedTodos = localStorage.getItem('todos');\\n    return savedTodos ? JSON.parse(savedTodos) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('todos', JSON.stringify(todos));\\n  }, [todos]);\\n\\n  const addTodo = (text) => {\\n    setTodos([...todos, { id: Date.now(), text, completed: false, createdAt: new Date() }]);\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTodos(\\n      todos.map((todo) =>\\n        todo.id === id ? { ...todo, completed: !todo.completed } : todo\\n      )\\n    );\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter((todo) => todo.id !== id));\\n  };\\n\\n  const editTodo = (id, newText) => {\\n    setTodos(\\n      todos.map((todo) =>\\n        todo.id === id ? { ...todo, text: newText } : todo\\n      )\\n    );\\n  };\\n\\n  return (\\n    <div className=\\"min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8\\">\\n      <div className=\\"max-w-md w-full space-y-8\\">\\n        <div>\\n          <div className=\\"flex items-center justify-center\\">\\n            <Home className=\\"h-12 w-12 text-blue-500\\" />\\n            <h2 className=\\"mt-6 text-center text-3xl font-extrabold text-gray-900\\">\\n              Todo App 📝\\n            </h2>\\n          </div>\\n        </div>\\n        <TodoInput onAddTodo={addTodo} />\\n        <TodoList\\n          todos={todos}\\n          onToggleComplete={toggleComplete}\\n          onDeleteTodo={deleteTodo}\\n          onEditTodo={editTodo}\\n        />\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n"
    },
    "/components/TodoInput.js": {
      "code": "import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction TodoInput({ onAddTodo }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim()) {\\n      onAddTodo(text);\\n      setText('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"mt-8\\">\\n      <div className=\\"mt-1\\">\\n        <input\\n          type=\\"text\\"\\n          value={text}\\n          onChange={(e) => setText(e.target.value)}\\n          placeholder=\\"Add a todo...\\"\\n          className=\\"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2 placeholder-gray-400\\"\\n        />\\n      </div>\\n      <button\\n        type=\\"submit\\"\\n        className=\\"mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\\"\\n      >\\n        <Plus className=\\"h-5 w-5 mr-2\\" />\\n        Add Todo\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default TodoInput;\\n"
    },
    "/components/TodoList.js": {
      "code": "import React from 'react';\\nimport TodoItem from './TodoItem';\\n\\nfunction TodoList({ todos, onToggleComplete, onDeleteTodo, onEditTodo }) {\\n  return (\\n    <ul className=\\"mt-4 space-y-3\\">\\n      {todos.map((todo) => (\\n        <TodoItem\\n          key={todo.id}\\n          todo={todo}\\n          onToggleComplete={onToggleComplete}\\n          onDeleteTodo={onDeleteTodo}\\n          onEditTodo={onEditTodo}\\n        />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;\\n"
    },
    "/components/TodoItem.js": {
      "code": "import React, { useState } from 'react';\\nimport { Check, Trash, Edit, Clock } from 'lucide-react';\\nimport { formatDistanceToNow } from 'date-fns';\\n\\nfunction TodoItem({ todo, onToggleComplete, onDeleteTodo, onEditTodo }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [editText, setEditText] = useState(todo.text);\\n\\n  const handleEditSubmit = (e) => {\\n    e.preventDefault();\\n    if (editText.trim()) {\\n      onEditTodo(todo.id, editText);\\n      setIsEditing(false);\\n    }\\n  };\\n\\n  return (\\n    <li className=\\"bg-white shadow-sm rounded-md p-3 flex items-center justify-between\\">\\n      {isEditing ? (\\n        <form onSubmit={handleEditSubmit} className=\\"flex-grow mr-2\\">\\n          <input\\n            type=\\"text\\"\\n            value={editText}\\n            onChange={(e) => setEditText(e.target.value)}\\n            className=\\"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-2 py-1\\"\\n          />\\n        </form>\\n      ) : (\\n        <div className=\\"flex items-center\\">\\n          <span className={\`mr-2 {todo.completed ? 'line-through text-gray-500' : ''}\`}>{todo.text}</span>\\n        </div>\\n      )}\\n      <div className=\\"flex items-center space-x-2\\">\\n        {!isEditing && (\\n          <button\\n            onClick={() => onToggleComplete(todo.id)}\\n            className=\\"p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500\\"\\n          >\\n            {todo.completed ? <Check className=\\"h-5 w-5 text-green-500\\" /> : <Clock className=\\"h-5 w-5 text-gray-500\\" />}\\n          </button>\\n        )}\\n        {!isEditing && (\\n          <button\\n            onClick={() => setIsEditing(true)}\\n            className=\\"p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500\\"\\n          >\\n            <Edit className=\\"h-5 w-5 text-gray-500\\" />\\n          </button>\\n        )}\\n        <button\\n          onClick={() => onDeleteTodo(todo.id)}\\n          className=\\"p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500\\"\\n        >\\n          <Trash className=\\"h-5 w-5 text-red-500\\" />\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;\\n"
    }
  },
  "generatedFiles": [
    "/App.js",
    "/components/TodoInput.js",
    "/components/TodoList.js",
    "/components/TodoItem.js"
  ]
}
\`\`\``,
        },
      ],
    },
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ];
 
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  // for await (const chunk of response) {
  //   console.log(chunk.text);
  // }

  let fullText = '';

for await (const chunk of response) {
  fullText += chunk.text || '';
}

return fullText; // return full reply

}
