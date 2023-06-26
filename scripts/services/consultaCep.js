async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            throw Error("CEP nao existente!")
        }
        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro


        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP Invalido. Tente novamente</p>`
        console.log(erro)
    }
    
}

function openFormularioCadastrado() {
    window.location.href = 'formularioCadastrado.html'
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))

const formulario = document.getElementById('form').addEventListener("submit", (event) => {
    event.preventDefault()
    openFormularioCadastrado()
})
