'use client'

import React from 'react'
import { AddTaskProps } from '../types/add'
import {v4 as uuidv4} from 'uuid'

export const Input = (): React.JSX.Element => {
  const [text, setText] = React.useState<string>('')
  const [todos, setTodos] = React.useState<AddTaskProps[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setText(e.target.value)
  }

  // React.FormEvent<HTMLFormElement>じゃダメだった
  const handleSubmit = () => {
    //trimメソッドは文字列の両端の空白を削除する
    if (!text.trim()) return;
    
    const newTodo: AddTaskProps = {
      // text ステートの値を value プロパティへ
      value: text,
      id: uuidv4(),
    };
    setTodos((todos) => [newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText('')
  }

  const handleEdit = (id: string, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          //分割代入でvalueプロパティを追加
          return {
            ...todo,
            value
          }
        }
        return todo
      });
      return newTodos;
    })
  }

  return (
    <div className=''>
      <form 
        autoComplete="on"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input 
          type="text" 
          size={70}
          className="border-2 border-blue-500 rounded-md p-4" 
          placeholder='ここにやることを書いてください'
          onChange={(e) => handleChange(e)}
        />
        <input
          type="submit"
          value="追加"
          className="border-2 bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 ml-4 text-white font-bold"
          onClick={handleSubmit}
        />
      </form>
      <ul>
        {todos.map((todo) => {
          if (!todo) {
            return;
          }
          return (
            
            <li key={todo.id} className='border-2 p-4'>
              <input 
                type="text"
                value={todo.value}
                onChange={e => handleEdit(todo.id, e.target.value)}
              />
              {/* {todo.value} */}
            </li>
          );
        })}
      </ul>
    </div>
  )
}
