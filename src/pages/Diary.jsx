import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../hooks/get-stringed-date";

const Diary = () => {
    const params = useParams();
    console.log(params);

    const nav = useNavigate();

    const currentDiaryItem = useDiary(params.id)

    //마운트 되기 전이어서 undefined가 뜰 경우 처리 (useDiaryrk useEffect가 쓰여졌기 때문)
    if(!currentDiaryItem) {return <div>데이터 로딩 중..!</div>}

    const {createdDate, emotionId, content} = currentDiaryItem;
    const title = getStringedDate(new Date(createdDate))

    return (
        <div>
        <Header title={`${title} 기록`} leftChild={<Button onClick={()=> nav(-1)} text={"< 뒤로 가기"} />} rightChild={<Button text={"수정하기"} />} />
        <Viewer emotionId={emotionId} content={content} />
        </div>
    )
}

export default Diary