import React, {useState, useEffect, Component} from 'react';
import ReactDOM from 'react-dom';

const App = () => {

    const [value, setValue] = useState(1)
    const [visible, setVisible] = useState(true)

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setValue((v) => v - 1)}>-</button>
                <button onClick={() => setVisible(false)}>Hide</button>
                {/*<ClassCounter value={value}/>*/}
                {/*<HookCounter value={value}/>*/}
                {/*<Notification/>*/}
                <PlanetInfo id={value}/>
            </div>
        )
    } else {
        return <button onClick={() => setVisible(true)}>Show</button>
    }
}

const HookCounter = ({value}) => {

    useEffect(() => {
        console.log('useEffect()');
        return () => console.log('clear')
    }, [])

    return <p>{value}</p>
}

class ClassCounter extends Component {
    componentDidMount() {
        console.log('class: mount')
    }

    componentDidUpdate(props) {
        console.log('class: update')
    }

    componentWillUnmount() {
        console.log('class: unmount')
    }

    render() {
        return <p>{this.props.value}</p>
    }
}

const Notification = () => {
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 3000)
        return () => clearTimeout(timeout)
    })
    return (
        <div>
            {visible && <p>Hello</p>}
        </div>
    )
}

const PlanetInfo = ({id})=>{
    const [name, setName] = useState(null)

    useEffect(()=>{
        let cancelled = false
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then(res=>res.json())
            .then(data=>!cancelled && setName(data.name))
        return()=> cancelled=true;
    }, [id])

    return(
        <div>
            {id} - {name}
        </div>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));


