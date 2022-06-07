import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState ({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });

    console.log(state.value);

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');
                 if (state.value === SECURITY_CODE){
                     setState({ 
                        ...state,
                        error: false,
                        loading: false,
                        confirmed: true
                     });
                 } else {
                    setState({ 
                        ...state,
                        error: true,
                        loading: false
                    });
                 }
            }, 3000)
        }

        console.log('Terminando el efecto');
    },[ state.loading ])

    console.log(JSON.stringify(state));

    if (!state.deleted && !state.confirmed) {
        return  (
            <div>
                <h2>Eliminar { name }</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando</p>
                )}
                <input
                    onChange={(event) => {
                        setState({
                            ...state, 
                            value: event.target.value 
                        })
                    }}
                    placeholder = 'Código de seguridad'
                    value = { state.value }/>
                <button onClick={() => {
                    setState({
                        ...state,
                        loading: true
                    })
                }} >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true
                        })
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: true
                        })
                    }}
                >No, me arrepentí</button>
            </React.Fragment>
        );
        
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
            </React.Fragment>
        );
    }
}

export { UseState }
