import { useReducer, useEffect } from 'react';

// https://it.reactjs.org/docs/hooks-reference.html#usereducer

// stato iniziale
const initState = {
    facts: []
};

// modificatore dello stato
const reducer = (state, action) => {
    switch (action.type) {
        // creo una copia dell'array facts al quale aggiungo il nuovo oggetto e aggiorno lo stato
        case 'add':
            const updatedFacts = [...state.facts, action.payload];
            return { ...state, facts: updatedFacts };
        // svuoto l'array dei facts e aggiorno lo stato
        case 'reset':
            return { ...state, facts: [] };
        default:
            return state;
    }
}

const RandomFacts = () => {
    const endpoint = 'https://uselessfacts.jsph.pl/random.json?language=en';
    const [state, dispatch] = useReducer(reducer, initState);

    // dopo aver caricato un nuovo fact dall'API avvio l'evento per aggiungerlo allo stato
    const fetchData = () => fetch(endpoint)
        .then(response => response.json())
        .then(data => dispatch({ type: 'add', payload: data }));

    // primo caricamento quando il componente è inizialiazzato
    useEffect(
        () => fetchData()
        , []);

    return (
        <section>
            { /* ripeto il caricamento da API + aggiornamento stato */}
            <button onClick={() => fetchData()}>Add a new fact!</button>
            { /* avvio l'evento per svuotare l'array nello stato */}
            <button onClick={() => dispatch({ type: 'reset' })}>Reset facts</button>

            <ul>
                { /* renderizzo i dai presenti nello stato */}
                {state.facts
                    .map((fact, index) =>
                        <li key={index}>"{fact.text}" - <a
                            href={fact.source_url}
                            rel="noreferrer noopener"
                            target="_blank">source
                        </a></li>
                    )
                    .reverse()
                }
            </ul>
        </section>
    )
}

export {
    RandomFacts
}