import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { emotionList } from "../util/constatnts";
import { getStringedDate } from "../hooks/get-stringed-date";

const Editor = ({initData, onSubmit}) => {
    const nav = useNavigate();

    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 1,
        content: ""
    });

    useEffect(() => {
        if(initData) {
            setInput({...initData, createdDate: new Date(Number(initData.createdDate))})
        }
    },[initData])

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'createdDate') {
            value = new Date(value)
        }

        setInput({
            ...input, 
            [name] : value
        })
    }

    const onClickSubmitButton = () => {
        // 부모 컴포넌트로부터 받은 onSubmit 함수를 호출, 인수로는 input state를 전달
        onSubmit(input)
    }

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input value={getStringedDate(input.createdDate)} type="date" onChange={onChangeInput} name="createdDate" />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map(
                        (item)=> < EmotionItem 
                        onClick={()=> onChangeInput(
                            {target: {
                                    name: "emotionId",
                                    value: item.emotionId
                                }
                            }
                    )} key={item.emotionId} {...item} isSelected={item.emotionId === input.emotionId} />
                    )}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea value={input.content} onChange={onChangeInput} placeholder="오늘은 어땠나요?" name="content" id=""></textarea>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={() => nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmitButton} />
            </section>
        </div>
    )
}

export default Editor;