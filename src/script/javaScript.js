// CRUD - CREATE READ UPDATE DELETE

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] 
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))
// CRUD READ
const readClinet =  () => getLocalStorage()

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

// CRUD CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

// Interaçao com o layout

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.pet}</td>
        <td>${client.especie}</td>
        <td>${client.idade}</td>
        <td>${client.sexo}</td>
        <td>
            <button type ="button" id="edit-${index}">Editar Pet</button>
            <button type ="button"id="delete-${index}">Excluir Pet</button>
        </td>
    ` 
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () =>{
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () =>{
    const dbClient = readClinet()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()
updateClient()

const isValueFields = () => {
    return document.getElementById('form').reportValidity()
}

// Botões editar excluir
const editDelete = (event) =>{
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        console.log(action, index)
        if (action == 'edit'){
            console.log ('Editando Pet')
        }else{
            console.log('Excluindo Pet')
        }
    }
}

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
        updateTable()
        clearFields()
        console.log("cadastrando cliente")
    }
}
// Events

document.getElementById('salvar')
    .addEventListener('click', saveClient)
    
document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)


