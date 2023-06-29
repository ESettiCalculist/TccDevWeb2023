const newsLetter = document.querySelector('[data-newsletter]')
const dialog = document.getElementById("dialog")
const inputNewsLetter = document.getElementsByClassName('inputNewsLetter')[0]
const buttonModal = document.getElementById('closeWindow')

// abrir o modal
newsLetter.addEventListener('submit', (event) => {
    event.preventDefault()
    dialog.showModal()
    dialog.style.display = "flex"
})

// fechar o modal pelo botao
buttonModal.addEventListener('click', () => {
    dialog.close()
    dialog.style.display = "none"
    limpaCampoInput()
})

// fechar o modal clicando fora dele
dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
        dialog.style.display = "none"
        limpaCampoInput()
    }
})

// fechar o modal pelo botão esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        dialog.close();
        dialog.style.display = "none"
        limpaCampoInput()
    }
})

// limpar o campo do input
function limpaCampoInput() {
    inputNewsLetter.value = ''
}

