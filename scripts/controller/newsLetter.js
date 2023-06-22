const newsLetter = document.querySelector('[data-newsletter]')
const dialog = document.getElementById("dialog")
const inputNewsLetter = document.getElementsByClassName('inputNewsLetter')


newsLetter.addEventListener("submit", () => {
    dialog.style.display = "flex"
    dialog.showModal()
})

const cancelButton = document.getElementById("closeWindow").addEventListener("click", () => {
    dialog.style.display = "none"
    dialog.close()
    inputNewsLetter.value =""
  })

inputNewsLetter.addEventListener("submit", () =>
inputNewsLetter.value = ""
)