// variaveis globais
let nav = 0
let clicked = null
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []

// variavel do modal:
const newEvent = document.getElementById('newEventModal')
const deleteEventModal = document.getElementById('deleteEventModal')
const backDrop = document.getElementById('modalBackDrop')
const eventTitleInput = document.getElementById('eventTitleInput')
const eventHorarioInput = document.getElementById('eventHorarioInput')
const eventTextInput = document.getElementById('eventTextInput')

// calendario
const calendar = document.getElementById('calendar');
// lista de dias da semana
const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']; //array with weekdays:

//funções

// funçaõ de abrir o modal
function openModal(date) {
  clicked = date
  const eventDay = events.find((event) => event.date === clicked)
  const apresentaEvento = document.getElementById('eventText')
  apresentaEvento.innerHTML = ''

  if (eventDay) {
    const titulo = document.createElement('h2')
    titulo.textContent = eventDay.title;

    const horario = document.createElement('p')
    horario.textContent = eventDay.horario;

    const descricao = document.createElement('p')
    descricao.textContent = eventDay.text;

    const imagem = document.createElement('img')
    imagem.src = eventDay.image

    apresentaEvento.appendChild(titulo)
    apresentaEvento.appendChild(horario)
    apresentaEvento.appendChild(descricao)
    apresentaEvento.appendChild(imagem)

    deleteEventModal.style.display = 'block'
    newEvent.style.display = 'none'
  } else {
    newEvent.style.display = 'block'
  }

  backDrop.style.display = 'block'
}

//mudar titulo do mês:
function load() {
  const date = new Date()


  
  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav)
  }

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()



  const daysMonth = new Date(year, month + 1, 0).getDate()
  const firstDayMonth = new Date(year, month, 1)


  const dateString = firstDayMonth.toLocaleDateString('pt-br', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })


  const paddinDays = weekdays.indexOf(dateString.split(', ')[0])

  //mostrar mês e ano:
  document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`


  calendar.innerHTML = ''

  // criando uma div com os dias:

  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement('div')
    dayS.classList.add('day')

    const dayString = `${month + 1}/${i - paddinDays}/${year}`

    //condicional para criar os dias de um mês:

    if (i > paddinDays) {
      dayS.innerText = i - paddinDays


      const eventDay = events.find(event => event.date === dayString)

      if (i - paddinDays === day && nav === 0) {
        dayS.id = 'currentDay'
      }


      if (eventDay) {
        const eventDiv = document.createElement('div')
        eventDiv.classList.add('event')
        eventDiv.innerText = eventDay.title
        dayS.appendChild(eventDiv)

      }

      dayS.addEventListener('click', () => openModal(dayString))

    } else {
      dayS.classList.add('padding')
    }


    calendar.appendChild(dayS)
  }
}

// funçao para fechar o modal
function closeModal() {
  eventTitleInput.classList.remove('error')
  eventHorarioInput.classList.remove('error')
  eventTextInput.classList.remove('error')
  newEvent.style.display = 'none'
  backDrop.style.display = 'none'
  deleteEventModal.style.display = 'none'

  eventTitleInput.value = ''
  eventHorarioInput.value = ''
  eventTextInput.value = ''
  clicked = null
  load()
}
// salvar os eventos
function saveEvent() {
  if (eventTitleInput.value, eventHorarioInput.value, eventTextInput.value) {
    eventTitleInput.classList.remove('error')
    eventHorarioInput.classList.remove('error')
    eventTextInput.classList.remove('error')

    events.push({
      date: clicked,
      title: eventTitleInput.value,
      horario: eventHorarioInput.value,
      text: eventTextInput.value,
      image: eventImageInput.value
    })

    localStorage.setItem('events', JSON.stringify(events))
    closeModal()

  } else {
    eventTitleInput.classList.add('error')
    eventHorarioInput.classList.add('error')
    eventTextInput.classList.add('error')
  }
}

// deletear o evento
function deleteEvent() {

  events = events.filter(event => event.date !== clicked)
  localStorage.setItem('events', JSON.stringify(events))
  closeModal()
}

// botões 

function buttons() {
  document.getElementById('backButton').addEventListener('click', () => {
    nav--
    load()

  })

  document.getElementById('nextButton').addEventListener('click', () => {
    nav++
    load()

  })

  document.getElementById('saveButton').addEventListener('click', () => saveEvent())

  document.getElementById('cancelButton').addEventListener('click', () => closeModal())

  document.getElementById('deleteButton').addEventListener('click', () => deleteEvent())

  document.getElementById('closeButton').addEventListener('click', () => closeModal())

  document.getElementById('modalBackDrop').addEventListener('click', () => closeModal())
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  })


}
buttons()
load()

