import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    // $title인 이유: dom요소가 들어갈 때에 관례상 짓는 변수명
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  },[title])
}

export default usePageTitle;