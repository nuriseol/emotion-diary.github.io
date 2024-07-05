import Button from "./Button"
import './DiaryList.css'
import DiaryItem from "./DiaryItem"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"

const DiaryList = ({data}) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        console.log(e.target.value)
        setSortType(e.target.value);
    }

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType === 'oldest') {
                return Number(b.createdDate) - Number(a.createdDate)
            } else {
                return Number(a.createdDate) - Number(b.createdDate)
            }
        })
    }

    const sortedData = getSortedData();

    return <div className="DiaryList">
        <div className="menu_bar">
            <select name="" id="" onChange={onChangeSortType}>
                <option value={"latest"}>최신순</option>
                <option value={"oldest"}>오래된 순</option>
            </select>
            <Button onClick={() => nav("/new")} text={"새 일기 쓰기"} type={"POSITIVE"} />
        </div>
        <div className="LIst_wrapper">
            {/* 리액트에서는 이렇게 리스트 형태로 어떤 컴포넌트나 ui를 렌더링 할 때 각각의 요소에 모두 key 값이 필요함  */}
            {sortedData.map((item) => <DiaryItem key={item.id} {...item} />)}
        </div>
    </div>
}

export default DiaryList