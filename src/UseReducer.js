import React from "react";

const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
};

const actionTypes = {
    check: 'CHECK',
    confirm: 'CONFIRM',
    delete: 'DELETE',
    error: 'ERROR',
    reset: 'RESET',
    write: 'WRITE'
};

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onCheck = () => dispatch({ type: actionTypes.check });
    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onError = () => dispatch({ type: actionTypes.error });
    const onReset = () => dispatch({ type: actionTypes.reset });

    const onWrite = (newValue) => {
        dispatch({ 
            type: actionTypes.write,
            payload: newValue
         })
    };

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');
                if (state.value === SECURITY_CODE) {
                   onConfirm();
                } else {
                    onError();
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
                        onWrite(event.target.value);
                    }}
                    placeholder='Código de seguridad'
                    value={state.value} />
                <button onClick={onCheck} >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button
                    onClick={onDelete}
                >Sí, eliminar</button>
                <button
                    onClick={onReset}
                >No, me arrepentí</button>
            </React.Fragment>
        );

    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={onReset}
                >Reiniciar, volver atrás</button>
            </React.Fragment>
        );
    }
}

export { UseReducer }

const reducerObject = (action, state) => ({
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.confirm] : {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    [actionTypes.write]: {
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
