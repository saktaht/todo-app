'use client'

import React from 'react'
import { useEffect, useState } from 'react';
import { AddTaskProps } from '../@types/add'
import { FilterType } from '../@types/add'
import {v4 as uuidv4} from 'uuid'
import localforage from 'localforage'
import { todo } from 'node:test'
import { isTodos } from '../lib/isTodo';
import { OpenContext } from './openContext';

export const Input = (): React.JSX.Element => {
  const [text, setText] = React.useState<string>('')
  const [todos, setTodos] = React.useState<AddTaskProps[]>([])
  const [filter, setFilter] = React.useState<FilterType>('all')
  const [hour, setHour] = React.useState<number>(0)
  const { isOpen } = React.useContext(OpenContext);

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
    // 
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
      hour: hour,
    };
    setTodos((todos) => [newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText('');
    setHour(0);
  }

  // handleTodoを呼び出すには、id、key、valueの3つの引数が必要
  //keyは分割代入で配列に入るもの || valueはtextを入れたり、checkedやremoveのtrue or falseを入れる
  const handleTodo = <K extends keyof AddTaskProps>(
    id: string,
    key: K,
    value: AddTaskProps[K]
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          //分割代入でvalueプロパティを追加
          return {
            ...todo,
            [key]: value
          }
        }
        return todo
      });
      return newTodos;
    })
  }

  //削除ボタンを押すと、removeプロパティがtrueになる
  const handleFilter = (filter: FilterType) => {
    setFilter(filter);
  }

  const handleRemoveAll = () => {
    setTodos((todos) => todos.filter((todo) => !todo.remove));
  };

  const handleHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(Number(e.target.value));
  };

//mapと同じコールバック関数だから配列の要素の数だけこの行動を繰り返す
// (初期値, 現在の値) => 初期値 + todo.hour | 初期値は最後に書いてある0
  const totalHours = todos.reduce((accumulator, todo) => {
    return accumulator + todo.hour;
  }, 0);

  useEffect(() => {
    localforage
      .getItem<AddTaskProps[]>('todos')
      .then((value) => isTodos(value) && setTodos(value || []))
      .catch((err) => console.error('Error saving todos:', err));
  }, []);

  useEffect(() => {
    localforage.setItem('todos', todos)
  }, [todos]);

  return (
    <div className='md:mx-10'>
      {filter === 'removed' ? (
        <button 
          className='px-3 py-1 bg-rose-500 hover:bg-rose-400 text-white rounded-md ml-4 mb-4'  
          onClick={handleRemoveAll}
          disabled={todos.filter((todo) => todo.remove).length === 0}
        >
          ごみ箱を空にする
        </button>
        ) :
        (undefined)
      }
      {!isOpen ? (
        <div>
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
            className='grid grid-cols-8 gap-1'
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input 
              type="text" 
              className="border-2 border-blue-500 rounded-md w-full grid col-span-5 md:col-span-6 p-4" 
              //ここをvalueを追加したら、入力した文字が消えた・ インプットフィールドの値が常にtextステートと同期してる
              value={text}
              placeholder='ここにやることを書いてください'
              onChange={(e) => handleChange(e)}
            />
            <div className='col-span-1'>
              <span>学習時間</span>
              <select 
                name="学習時間" 
                className='border-2 border-blue-500 rounded-md w-full grid py-2'
                onChange={(e) => handleHour(e)}
                value={hour}
              >
                <option value="0" className='hover:bg-cyan-300'>0</option>
                <option value="0.5" className='hover:bg-cyan-300'>0.5</option>
                <option value="1" className='hover:bg-cyan-300'>1</option>
                <option value="1.5" className='hover:bg-cyan-300'>1.5</option>
                <option value="2" className='hover:bg-cyan-300'>2</option>
                <option value="2.5" className='hover:bg-cyan-300'>2.5</option>
                <option value="3" className='hover:bg-cyan-300'>3</option>
                <option value="3.5" className='hover:bg-cyan-300'>3.5</option>
                <option value="4" className='hover:bg-cyan-300'>4</option>
                <option value="4.45" className='hover:bg-cyan-300'>4.45</option>
                <option value="5" className='hover:bg-cyan-300'>5</option>
                <option value="6" className='hover:bg-cyan-300'>6</option>
                <option value="7" className='hover:bg-cyan-300'>7</option>
                <option value="8" className='hover:bg-cyan-300'>8</option>
                <option value="9" className='hover:bg-cyan-300'>9</option>
                <option value="10">10</option>
              </select>
            </div>
            <input
              type="submit"
              value="追加"
              className="border-2 bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 col-span-2 md:col-span-1 text-white font-bold"
              onClick={handleSubmit}
            />
          </form>
        <ul >
          {filteredTodos.map((todo) => {
            if (!todo) {
              return;
            }
            return (
              
              <li key={todo.id} className='mt-4'>
                <input 
                  type="checkbox"
                  disabled={ todo.remove || filter === 'checked' || filter === 'removed' }
                  checked={todo.checked}
                  onChange={(e) => handleTodo(todo.id, 'checked', !todo.checked)}
                />
                <input 
                  type="text"
                  disabled={ todo.checked || todo.remove || filter === 'checked' || filter === 'removed' }
                  value={todo.value}
                  onChange={e => handleTodo(todo.id, 'value', e.target.value)}
                />
                <span
                  className='pl-4 hover:text-yellow-500'
                >
                  {todo.hour}時間
                </span>
                <button 
                  className='px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-md ml-4'
                  onClick={() => handleTodo(todo.id, 'remove', !todo.remove)}
                >
                  {todo.remove ? '復元' : '削除'}
                </button>
              </li>
            );
            })}
        </ul>
      </div>
      ) : (
        undefined
      )}
    <h1>
      合計学習時間: {totalHours}
    </h1>

    </div>
  )
}
