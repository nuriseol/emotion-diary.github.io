import './App.css'
import { act, useReducer, useRef, createContext, useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import NotFound from './pages/NotFound'
import Edit from './pages/Edit'

import Button from './components/Button'
import Header from './components/Header'
import { getEmotionImage } from './util/get-emotion-image'

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE" : {
      nextState =  [action.data, ...state];
      break;
    }
    case "UPDATE" : {
      nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item );
      break;
    }
    case "DELETE" : {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default: return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));

  return nextState;
}

// 일기데이터 공급
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  // 사용한 id 값 저장해놓기 
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
  
    if (!storedData) {
      setIsLoading(false);
      return;
    }
  
    // 문자열 형태의 데이터를 배열 형태로 파싱
    const parsedData = JSON.parse(storedData);

    console.log(parsedData);

  
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }
  
    let maxId = 0;

    console.log(parsedData)
  
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
  
    console.log("가장 높은 수의 아이디:", maxId);
  
    idRef.current = maxId + 1;
  
    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

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
        id: Number(id), createdDate, emotionId, content
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

  if (isLoading) {return <div>데이터 로딩중입니다</div>}

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
