import React, { createContext, useEffect , useContext, useRef, useMemo} from "react"
import { useState } from "react";

//------------------------------------------------------------------------------------
// call MyButton component
function Mybutton(props) {
    return (
        <div>{props.title} {props.name}</div>
    );
}


function myApp() {
    return (
        <div>
            <h1>My First React App </h1>
            <Mybutton title="click me" name="Siri" />
        </div>
    );
}

//------------------------------------------------------------------------------------
//useState is a hook that allows you to have state variables in functional components 
function ShowCount(props) {
    return (
        <div>Count in passed method: {props.count}</div>
    );

}

function setCount() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>My First React App </h1>
            <p>Count in the main method : {count} </p>
            <button onClick={() => setCount(count + 1)}> Click me</button>
            <ShowCount count={count} />
        </div>
    );
}

//--------------------------------------------------------------------------------------------------
//events - onClick, onMouseOver --- these are user events
//onclick is a user event that is triggered when the user clicks on the element
//onMouseOver is a user event that is triggered when the user moves the mouse over the element
function clickmeEvent() {
    const handleClick = () => { console.log("Button clicked") };
    const onMouseHover = () => { console.log("Mouse Hovered") };

    return <button onClick={handleClick} onMouseOver={onMouseHover}> Click me </button>
}


//--------------------------------------------------------------------------------------

//Use Effect

//useEffect is to fetch data from an API and update the state of the component

function handleUseEffect() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).
            then(data => setUsers(data));
    })

    return (
        <ul>
            {users.map(user => (
                <li>
                    <p>UserId : {user.id} </p>
                    <p>UserName: {user.name}</p>

                </li>
            )
            )}

        </ul>
    );
}


//--------------------------------------------------------------------------------------

//UseContext - it is used to pass the data to the compoennt without passing the props down manually
//It is used to share the data between the components
//It is used to avoid prop drilling
//Context is created using createContext() method
//Context.Provider is used to provide the data to the child components
//Context.Consumer is used to consume the data from the parent component

const UserContext = createContext<string | undefined>(undefined);

const ChildComponent = () => {
    const user = useContext(UserContext);
    return <div> Hello, {user || "Guest"}</div>;
}

const ParentComponent = () => {
    return (
<UserContext.Provider value= "Siri">
    <ChildComponent/>
</UserContext.Provider>

    );
}

//------------------------------------------------------------------------------

//useRef - It is used to reference the DOM elements to the functional components

// first - create ref 
//second - attach that ref to the input element that you want to focus or do some operation
//third - use the ref to focus the input element when some event is triggered or button is clicked
 
const Myref = () => {
    const ref = useRef(null);

    const handleref = () => {
        ref.current?.focus();
    }

    return (
        <div>
        <input type="text" ref={ref} placeholder="Type your name"></input>
        <button onClick={handleref}>Click Me</button>
        </div>
    );
}

//--------------------------------------------------------------------------------------
//UseMemo - it is used to optimize the performance of the application
//It is used to avoid rerendering the application when state or props doesnt change

const ExpensiveCalculation = ({ number }) => {
    const calculate = useMemo(() => {
        return number * number;
    }, [number]);

    return (
        <div>
            Calculation : {calculate}
        </div>
    );
}

const MyMemo = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>count : {count}</h1>
            <h1><ExpensiveCalculation number = {count}/></h1>
            <button onClick={() => setCount(count +1)}>Click Me to increase the count</button>
        </div>
    );
}

export default MyMemo;

