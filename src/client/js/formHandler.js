// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     Client.checkForName(formText)

//     console.log("::: Form Submitted :::")
//     fetch('http://localhost:8081/test')
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('results').innerHTML = res.message
//     })
// }

const userSentiment = document.querySelector('#name')
const formResults = document.querySelector('#results')

const buildUI = data => {
    formResults.innerHTML = `
        <h2>Your Text Was: ${data.data.text}</h2>
        <p>The Polarity Was: ${data.data.polarity}</p>
        <p>The Subjectivity Was: ${data.data.subjectivity}</p>
    `
}

const handleSubmit = async e => {
    e.preventDefault()
    
    let newSentiment = userSentiment.value

    const newData = {
        newSentiment
    }

    const response = await fetch('http://localhost:8081/getSentiment', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newData
        })
    })

    const body = await response.json()
    console.log(body)
    buildUI(body)

}

export { handleSubmit }
