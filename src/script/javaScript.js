// lOCAL STORAGE
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] 
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD READ
const readClinet =  () => getLocalStorage()

// CRUD DELETE
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
const fillFields = (client) =>{
    document.getElementById('nome').value = client.nome
    document.getElementById('pet').value = client.pet
    document.getElementById('especie').value = client.especie
    document.getElementById('idade').value = client.idade
    document.getElementById('sexo').value = client.sexo
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) =>{
    const client = readClinet()[index]
    client.index = index
    fillFields(client)
}

const editDelete = (event) =>{
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        if (action == 'edit'){
            editClient(index)
        }else{
            const client = readClinet()[index]
            const response = confirm(`Tem certeza que quer remover o Pet ${client.pet} cadastrado?`)
            if (response){
                deleteClient(index)
                updateTable()
                clearFields()
            }
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
        const index = document.getElementById('nome').dataset.index
        if(index == 'new'){
            createClient(client)
            updateTable()
            clearFields()
        }else{
            updateClient(index, client)
            updateTable()
        }
    }
}
// Events

document.getElementById('salvar')
    .addEventListener('click', saveClient)
    
document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)
