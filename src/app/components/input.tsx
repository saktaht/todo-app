'use client'

import React from 'react'
import { AddTaskProps } from '../types/add'
import { FilterType } from '../types/add'
import {v4 as uuidv4} from 'uuid'
import { Button } from './button'

export const Input = (): React.JSX.Element => {
  const [text, setText] = React.useState<string>('')
  const [todos, setTodos] = React.useState<AddTaskProps[]>([])
  const [filter, setFilter] = React.useState<FilterType>('all')

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.remove;
      case 'checked':
        return todo.checked && !todo.remove;
      case 'unchecked':
        return !todo.checked && !todo.remove;
      case 'removed':
        return todo.remove;
      default:
        return todo;
    }
  });

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
      checked: false,
      remove: false,
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

  const handleCheck = (id: string, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          //分割代入でvalueプロパティを追加
          return {
            ...todo,
            checked
          }
        }
        return todo
      });
      return newTodos;
    })
  }

  const handleRemove = (id: string, remove: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          //分割代入でvalueプロパティを追加
          return {
            ...todo,
            remove
          };
        }
        return todo
      });
    return newTodos;
  });
  };

  const handleFilter = (filter: FilterType) => {
    setFilter(filter);
  }

  return (
    <div className=''>
      {/* e.target.value: string を Filter型にアサーションする */}
      <select 
        defaultValue="all" 
        onChange={(e) => handleFilter(e.target.value as FilterType)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
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
        {filteredTodos.map((todo) => {
          if (!todo) {
            return;
          }
          return (
            
            <li key={todo.id} className='border-2 p-4'>
              <input 
                type="checkbox"
                disabled={ todo.remove || filter === 'checked' || filter === 'removed' }
                checked={todo.checked}
                onChange={(e) => handleCheck(todo.id, !todo.checked)}
              />
              <input 
                type="text"
                disabled={ todo.checked || todo.remove || filter === 'checked' || filter === 'removed' }
                value={todo.value}
                onChange={e => handleEdit(todo.id, e.target.value)}
              />
              <button 
                className='px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-md ml-4'
                onClick={() => handleRemove(todo.id, !todo.remove)}
              >
                {todo.remove ? '復元' : '削除'}
                {/* 削除 */}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  )
}
