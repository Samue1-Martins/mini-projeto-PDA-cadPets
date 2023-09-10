// CRUD - CREATE READ UPDATE DELETE
const tempClient = {
    nome: "fernanda",
    pet: "mumu",
    especie: "pato",
    idade: "2 anos",
    sexo: "M"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] 
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

const deleteClient = (index) => {
    const dbClient = readClinet()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// CRUD UPDATE
const updateClient = (index, client) => {
    const dbClient = readClinet()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// CRUD READ
const readClinet =  () => getLocalStorage()

// CRUD CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

// Events
const isValueFields = () => {
    return document.getElementById('form').reportValidity()
}

// Interaçao com o layout

// Limpar campos input

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

// Botao salvar

const saveClient = () => {
    if (isValueFields()){
        const client = {
            nome: document.getElementById('nome').value,
            pet: document.getElementById('pet').value,
            especie: document.getElementById('especie').value,
            idade: document.getElementById('idade').value,
            sexo: document.getElementById('sexo').value
        }
        createClient(client)
        clearFields()
        console.log("cadastrando cliente")
    }
}

document.getElementById('salvar')
    .addEventListener('click', saveClient)

