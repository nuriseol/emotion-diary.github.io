import { useState, useContext } from "react"
import { DiaryStateContext } from "../App"

import Header from "../components/Header"
import Button from "../components/Button"
import DiaryList from "../components/DiaryList"
import usePageTitle from "../hooks/usePageTilte"

const getMonthlyData = (pivotDate, data) => {
    // 그 달의 1일 0시 0분 0초로 설정
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(),1,0,0,0).getTime();
    // 그 달의 말일 0시 0분 0초로 설정 (일을 0으로 설정하면 전달의 마지막날이 된다)
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1,0,23,59,59).getTime();

    return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime)
}

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());

    const monthlyData = getMonthlyData(pivotDate, data);

    usePageTitle("감정 일기장");

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
    }

    return <div>
        <Header 
            title = {`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`} 
            leftChild={<Button onClick={onDecreaseMonth} text={"<"} />} 
            rightChild={<Button onClick={onIncreaseMonth} text={">"} /> }></Header>
        <DiaryList data={monthlyData} />
    </div>
}

export default Home