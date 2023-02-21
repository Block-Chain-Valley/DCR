import { useEffect, useState } from "react";

const useDebounce = (value, delay=500) => {
    const [debounceVal,setDebounceval] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceval(value);
        },delay)

        return () => {
            clearTimeout(handler)
        };

    },[value,delay])

    return debounceVal;
};

export default useDebounce;