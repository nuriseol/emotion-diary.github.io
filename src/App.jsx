import './App.css'
import { act, useReducer, useRef, createContext } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import NotFound from './pages/NotFound'
import Edit from './pages/Edit'

import Button from './components/Button'
import Header from './components/Header'
import { getEmotionImage } from './util/get-emotion-image'

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024.07.01").getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date("2024.07.03").getTime(),
    emotionId: 5,
    content: "2번 일기 내용"
  },
  {
    id: 3,
    createdDate: new Date("2024.06.03").getTime(),
    emotionId: 4,
    content: "저번달 일기 내용"
  },
]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE" : 
      return [action.data, ...state]
    case "UPDATE" : 
      return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item )
    case "DELETE" :
      return state.filter((item) => String(item.id) !== String(action.id))
    default: return state;
  }
}

// 일기데이터 공급
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  // 사용한 id 값 저장해놓기 
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id, createdDate, emotionId, content
      }
    })
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    })
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/Diary/:id' element={<Diary />} />
            <Route path='/Edit/:id' element={<Edit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
