// variaveis globais
let nav = 0
let clicked = null
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []

// variavel do modal:
const newEvent = document.getElementById('newEventModal')
const deleteEventModal = document.getElementById('deleteEventModal')
const backDrop = document.getElementById('modalBackDrop')
// --------
const calendar = document.getElementById('calendar') // div calendar:
const weekdays = ['domingo','segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'] //array with weekdays:

//funções de abrir o modal e suas funcionalidades
function openModal(date){
  clicked = date
  const eventDay = events.find((event)=>event.date === clicked)
  const apresentaEvento = document.getElementById('eventText')
  apresentaEvento.innerHTML = ''
// dia com evento
  if (eventDay) {
    const titulo = document.createElement('h2');
    titulo.textContent = eventDay.title;

    const horario = document.createElement('h3');
    horario.textContent = eventDay.horario;

    const descricao = document.createElement('p');
    descricao.textContent = eventDay.text;

    const imagem = document.createElement('img')
    imagem.src = eventDay.image

    apresentaEvento.appendChild(titulo);
    apresentaEvento.appendChild(horario);
    apresentaEvento.appendChild(descricao);
    apresentaEvento.appendChild(imagem)
   deleteEventModal.style.display = 'block'


  } 
  // dia sem evento
  else {
    newEvent.style.display = 'block'

  }
  
  backDrop.style.display = 'block'
}

//função load() será chamada quando a pagina carregar:
function load (){ 
  const date = new Date() 

  //mudar titulo do mês:
  if(nav !== 0){
    date.setMonth(new Date().getMonth() + nav) 
  }
  
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const daysMonth = new Date (year, month + 1 , 0).getDate()
  const firstDayMonth = new Date (year, month, 1)
  const dateString = firstDayMonth.toLocaleDateString('pt-br', {
    weekday: 'long',
    year:    'numeric',
    month:   'numeric',
    day:     'numeric',
  })

  const paddinDays = weekdays.indexOf(dateString.split(', ') [0])
  
  //mostrar mês e ano:
  document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br',{month: 'long'})}, ${year}`
  calendar.innerHTML =''

  // criando uma div com os dias:
  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement('div')
    dayS.classList.add('day')
    const dayString = `${month + 1}/${i - paddinDays}/${year}`

    //condicional para criar os dias de um mês:
    if (i > paddinDays) {
      dayS.innerText = i - paddinDays
      const eventDay = events.find(event=>event.date === dayString)
      
      if(i - paddinDays === day && nav === 0){
        dayS.id = 'currentDay'
      }

      if(eventDay){
        const eventDiv = document.createElement('div')
        eventDiv.classList.add('event')
        eventDiv.innerText = eventDay.title
        dayS.appendChild(eventDiv)
      }
      dayS.addEventListener('click', ()=> openModal(dayString))

    } else {
      dayS.classList.add('padding')
    }
    calendar.appendChild(dayS)
  }
}

//Função para fechar o modal do calendario
function closeModal(){
  newEvent.style.display = 'none'
  backDrop.style.display = 'none'
  deleteEventModal.style.display = 'none'
  clicked = null
  load()
}

function openAdmin() {
  window.location.href = 'file:///C:/Users/ERICK/Documents/WORKSPACE/arquivos%20soltos/tcc/calendario2/Calendario/admin.html'
}

// funções para os botões 
function buttons (){
  document.getElementById('backButton').addEventListener('click', ()=>{
    nav--
    load()
  })
  document.getElementById('nextButton').addEventListener('click',()=>{
    nav++
    load()
  })
  document.getElementById('cancelButton').addEventListener('click',()=>closeModal())
  document.getElementById('closeButton').addEventListener('click', ()=>closeModal())
  document.getElementById('modalBackDrop').addEventListener('click', ()=>closeModal())
  document.getElementById('adminBotao').addEventListener('click', ()=>openAdmin())
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  })
}
buttons()
load()

