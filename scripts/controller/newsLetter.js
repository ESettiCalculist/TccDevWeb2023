const newsLetter = document.querySelector('[data-newsletter]')
const dialog = document.getElementById("dialog")
const inputNewsLetter = document.getElementsByClassName('inputNewsLetter')[0]
const buttonModal = document.getElementById('closeWindow')


console.log(inputNewsLetter.value)

newsLetter.addEventListener('submit', (event) => {
    event.preventDefault()
    dialog.showModal()
    dialog.style.display = "flex"
})

buttonModal.addEventListener('click', () => {
    dialog.close()
    dialog.style.display = "none"
    limpaCampoInput()
})

dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
        dialog.style.display = "none"
        limpaCampoInput()
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        dialog.close();
        dialog.style.display = "none"
        limpaCampoInput()
    }
})

function limpaCampoInput() {
    inputNewsLetter.value = ''
}

