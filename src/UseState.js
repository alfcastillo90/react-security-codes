import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });

    const onCheck = () => setState({
        ...state,
        loading: true
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        });
    };

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        })
    };

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    };

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
        })
    }

    const onWrite = (value) => {
        setState({
            ...state,
            value
        })
    }

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
    }, [state.loading])

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
                <button onClick={() => {
                    onCheck();
                }} >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button
                    onClick={() => {
                        onDelete();
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        onReset()
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
                        onReset()
                    }}
                >Reiniciar, volver atrás</button>
            </React.Fragment>
        );
    }
}

export { UseState }
