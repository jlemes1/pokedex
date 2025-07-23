// const $spinner = document.document.querySelector('#spinner');
const $pokemonLista = document.querySelector('#pokemon-lista');
const $searchBtn = document.querySelector('#search-btn');
const $searchInput = document.querySelector('#search-input');
const $previousBtn = document.querySelector('#previous-btn');
const $nextBtn = document.querySelector('#next-btn');
const $pokemonError = document.querySelector('#pokemon-error');

let offset = 1;
let limit = 19;

function mostrarListaPokemones(pokemones) {
    const { stats, types } = pokemones;

    const $flipCard = document.createElement('div');
    $flipCard.classList.add('flip-card');

    const $cartaContenedor = document.createElement('div');
    $cartaContenedor.classList.add('carta-contenedor');

    $flipCard.appendChild($cartaContenedor);

    // CARTA DELANTERA

    const $carta = document.createElement('div');
    $carta.classList.add('pokemon-carta');

    const $pokemonImagen = document.createElement('div');
    $pokemonImagen.classList.add('pokemon-imagen');

    const $imagen = document.createElement('img');
    $imagen.classList.add('imagen')
    $imagen.src = pokemones.sprites.other['official-artwork'].front_default;
    $imagen.alt = pokemones.name;

    $pokemonImagen.appendChild($imagen);

    const $pokemonInfo = document.createElement('div');
    $pokemonInfo.classList.add('pokemon-info');

    const $id = document.createElement('p');
    $id.classList.add('pokemon-id');
    $id.textContent = `N°${pokemones.id}`;

    const $nombre = document.createElement('h2');
    $nombre.classList.add('pokemon-nombre');
    $nombre.textContent = pokemones.name;

    $pokemonInfo.appendChild($id);
    $pokemonInfo.appendChild($nombre);

    $carta.appendChild($pokemonImagen);
    $carta.appendChild($pokemonInfo)

    // CARTA TRASERA

    const $cartaAtras = document.createElement('div');
    $cartaAtras.classList.add('pokemon-carta-atras');
    const $pokemonTipo = document.createElement('div');
    $pokemonTipo.classList.add('pokemon-tipo');
    const $pokemonEstadistica = document.createElement('div');
    $pokemonEstadistica.classList.add('pokemon-estadistica');
    configurarColor(types);

    types.forEach(type => {
        const $tipoTexto = document.createElement('p');
        $tipoTexto.classList.add('tipo-p')
        $tipoTexto.style.background = tipoColores[type.type.name];
        $tipoTexto.style.color = '#404040';
        $tipoTexto.textContent = type.type.name;
        $pokemonTipo.appendChild($tipoTexto);
    });

    stats.forEach(stat => {
        const $statTexto = document.createElement('div');
        $statTexto.classList.add('stat-texto');
        const $statTextoNombre = document.createElement('p');
        const $statTextoValor = document.createElement('p');
        $statTextoNombre.textContent = stat.stat.name;
        $statTextoValor.textContent = stat.base_stat;
        $statTexto.appendChild($statTextoNombre);
        $statTexto.appendChild($statTextoValor);
        $pokemonEstadistica.appendChild($statTexto);
    });

    $cartaAtras.appendChild($pokemonTipo);
    $cartaAtras.appendChild($pokemonEstadistica);
    $cartaContenedor.appendChild($carta);
    $cartaContenedor.appendChild($cartaAtras);
    $pokemonLista.appendChild($flipCard);
}

function configurarColor(types) {
    const colorUno = tipoColores[types[0].type.name];
    const colorDos = types[1] ? tipoColores[types[1].type.name] : tipoColores.default;
}

const tipoColores = {
    electric: '#FFDF20',
    normal: '#FEF3C6',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#78C850',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A8B820',
    poison: '#A040A0',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#62748E',
    fairy: '#F0B6BC',
    default: '#2A1A1F',
}

async function cargarPokemon(pokemon) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    const data = await respuesta.json();
    return data;
}

async function cargarPokemones(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        try {
            const data = await cargarPokemon(i);
            mostrarListaPokemones(data);
        } catch (error) {
            mostrarError();
        }
    }
}

$searchBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    const inputValue = $searchInput.value.trim();
    $pokemonLista.innerHTML = "";
    try {
        const data = await cargarPokemon(inputValue);
        mostrarListaPokemones(data);
    } catch (error) {
        mostrarError();
    }
})

$previousBtn.addEventListener('click', () => {
    if (offset != 1) {
        offset -= 20;
        $pokemonLista.innerHTML = "";
        cargarPokemones(offset, limit);
    }
});

$nextBtn.addEventListener('click', () => {
    offset += 20;
    $pokemonLista.innerHTML = "";
    cargarPokemones(offset, limit);
});

function mostrarError() {
    $pokemonError.style.display = 'block';
}

function inicializar() {
    cargarPokemones(offset, limit);
}

inicializar();