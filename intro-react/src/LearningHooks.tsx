import { useCallback, useEffect, useMemo, useState } from "react";

function sortMyArray(arr: number[]){
    checkRender("Sorting array");
    return arr.sort();
}

export const LearningHooks = () => {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [myArray, setMyArray] = useState([5,4,1,2]);

    const sortedArray = () => {
        sortMyArray(myArray);
        console.log("Sorted Array: ", myArray);
        return myArray;
    };

    
    //checkRender("-");

    // useEffect(() => {
    //     checkRender("useEffect for counter");
    // }, [counter]);

    const reset = () => {
        checkRender("useCallback for counter");
        setCounter(0);
        setCounter2(0);
    };

    const updatedCounter = useMemo(() => {
        checkRender("useMemo for counter" + counter);
        return counter * 4;
    }, [counter]);

    useEffect(() => {
        checkRender("useEffect for counter2" + counter2);
    }, [counter2]);


    const checking = (a: number) => {
        checkRender("checking function " + a);
        return a >= 3;
    }
    if(checking(counter2) && checking(counter)){
        checkRender("useeffect reset condition");
        reset();
    }

    return <div>
        <h2>Learning Hooks Component</h2>
        <button onClick={() => setCounter(counter+1)}>counter {counter}</button>
        <button onClick={() => setCounter2(counter2+1)}>counter2 {counter2}</button>
        <button onClick={reset}>Reset Counters</button>
        counter*4 = {updatedCounter}
        <p>This is a placeholder for the LearningHooks component.</p>
    </div>
}

export default LearningHooks;

function checkRender(label: string){
    console.log(`Rendering: `, Math.random(), label);
}