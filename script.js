const input = document.querySelector('#input');
const imgDigi = document.querySelector('#img-digi');
const digiTitle = document.querySelector('.card-title');
const digiText = document.querySelector('.card-text');

const FetchAPI = async () => {
    try{
        const url = 'https://digimon-api.vercel.app/api/digimon'; // api do digimon
        const response = await fetch(url); //
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('Erro ao obter dados da API:', error);
        throw error; // Rejeitar a promisse com o erro
    }
}

async function digiCard({ target }) { // event.target (desestruturado)
    try{
        const digiArr = await FetchAPI();
    
        const find = digiArr.find(({ name })=> name.toLowerCase() === target.value.toLowerCase()) // objeto do digimon OU undefined.
                                    //digimon.name (desestruturado)

        localStorage.setItem('digimon', JSON.stringify(find));

        if (!find) return alert('Digimon não encontrado');

        const { name, img, level} = find; // para não ser necessario usar find.name ou img ou level.

        const storageDigimon = JSON.parse(localStorage.getItem('digimon'));

        digiText.innerText = `${name} é um digimon do tipo ${level}`;
        digiTitle.innerHTML = name;
        imgDigi.src = img;
        input.value = '';
    } catch (error) {
        console.log('Erro ao processar os dados:', error);
    }
}

window.onload= () => {
    input.addEventListener('change', digiCard);
    setTimeout(() => {
        const storageDigimon = JSON.parse(localStorage.getItem('digimon'));
        if (storageDigimon) {
            const { name, img, level } = storageDigimon;
            imgDigi.src = img;
            digiTitle.innerText = name;
            digiText.innerText = `o ${name} é um digimon do tipo ${level}`
        }
    }, 1500)
}