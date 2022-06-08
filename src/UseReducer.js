import React from "react";

const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
};

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');
                if (state.value === SECURITY_CODE) {
                    dispatch({
                        type: 'CONFIRM'
                    });
                } else {
                    dispatch({
                        type: 'ERROR'
                    });
                }
            }, 3000)
        }

        console.log('Terminando el efecto');
    }, [state])

    console.log(JSON.stringify(state));

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando</p>
                )}
                <input
                    onChange={(event) => {
                        dispatch({
                            type: 'WRITE',
                            payload: event.target.value
                        });
                    }}
                    placeholder='Código de seguridad'
                    value={state.value} />
                <button onClick={() => {
                    dispatch({
                        type: 'CHECK'
                    });
                }} >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'DELETE'
                        });
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET'
                        });
                    }}
                >No, me arrepentí</button>
            </React.Fragment>
        );

    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET'
                        });
                    }}
                >Reiniciar, volver atrás</button>
            </React.Fragment>
        );
    }
}

export { UseReducer }

const reducerObject = (action, state) => ({
    'CHECK': {
        ...state,
        loading: true
    },
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    'DELETE': {
        ...state,
        deleted: true
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    'WRITE': {
        ...state,
        value: action.payload
    }
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(action.payload, state)[action.type]
    } else {
        return state;
    }
}
