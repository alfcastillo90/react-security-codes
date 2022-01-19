import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState ({ name }) {
    const [ error, setError ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ value, setValue ] = React.useState('');

    console.log(value);

    React.useEffect(() => {
        console.log('Empezando el efecto');

        if (!!loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');
                 if (value !== SECURITY_CODE){
                     setLoading(false);
                 } else {
                     setError(true);
                     setLoading(false);

                 }
                setLoading(false);

                console.log('Terminando la validación')
            }, 3000)
        }

        console.log('Terminando el efecto');
    },[ loading ])

    return  (
        <div>
            <h2>Eliminar { name }</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {(error && !loading) && (
                <p>Error: el código es incorrecto</p>
            )}
            {loading && (
                <p>Cargando</p>
            )}
            <input
                onChange={(event) => {
                    // setError(false);
                    setValue(event.target.value);
                }}
                placeholder = 'Código de seguridad'
                value = { value }/>
            <button onClick={() => {
                // setError(false);
                setLoading(true);
            }} >Comprobar</button>
        </div>
    )
}

export { UseState }
