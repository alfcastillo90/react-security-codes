import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        }
    }

    componentDidMount() {
        console.log("componentDidMount")
    }

    UNSAFE_componentWillMount() {
        console.log("componentWillMount")
    }

    componentDidUpdate() {
        console.log('Actualización');

        if(!!this.state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');

                if (SECURITY_CODE === this.state.value) {
                    this.setState({ error: false, loading: false })
                } else {
                    this.setState({ error: true, loading: false })
                }

                console.log('Terminando la validación')
            }, 3000)
        }
    }

    render() {
        const { error, loading, value } = this.state;
        return (
            <div>
                <h2>Eliminar { this.props.name }</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(error && !loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {loading && (
                    <Loading />
                )}
                <input onChange={(event) => {
                    this.setState({ value: event.target.value });
                }}
                    placeholder='Código de seguridad'
                    value = { value }/>
                <button onClick={
                    () => this.setState( () => this.setState({ loading: true }) )
                }>Comprobar</button>
            </div>
        )
    }
}

export { ClassState }
