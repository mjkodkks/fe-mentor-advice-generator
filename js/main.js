const adviceId = document.getElementById("adviceId")
const preview = document.getElementById("preview")
const btnDice = document.getElementById("btnDice")

async function fetchAdvice() {
  try {
    const res = await fetch('https://api.adviceslip.com/advice')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error);
    return null
  }
}

function setPreview(advice = '', id = '') {
  adviceId.style.display = 'none'
  preview.classList.add('text-focus-in')
  adviceId.innerText = `#${id}`
  preview.innerText = `“${advice}”`
  adviceId.style.display = 'inline-block'
}

btnDice.addEventListener('click', (e)=> {
  e.preventDefault()
  preview.classList.remove('text-focus-in')
  init()
})

async function init() {
  btnDice.disabled = true
  const data = await fetchAdvice()
  if (data) {
    const { slip: { advice, id } } = data 
    setPreview(advice, id)
  }
  setTimeout(()=> {
    btnDice.disabled = false
  }, 1200)
}

init()