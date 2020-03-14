const zipForm = document.getElementById('zip-form')
const input = document.querySelector('.input')
const output = document.getElementById('output')

zipForm.addEventListener('submit', e => {
  e.preventDefault();

  const zip = input.value.trim()

  fetch(`https://zippopotam.us/us/${zip}`)
    .then(res => {
      if (res.status !== 200) {
        showIcon('remove')

        output.innerHTML = `
          <article class="message is-danger">
            <div class="message-body">
              Invalid Zipcode, try again
            </div>
          </article>
        `

        throw Error(res.statusText)
      } else {
        showIcon('check')
        return res.json()
      }
    })
      .then(data => {
        const place = data.places[0]
        
        output.innerHTML = `
          <article class="message is-primary">
            <div class="message-header">
              <p>Location Info</p>
              <button class="delete"></button>
            </div>
            <div class="message-body">
              <ul>
                <li><b>City: </b>${place["place name"]}</li>
                <li><b>State: </b>${place['state']}</li>
                <li><b>Longitude: </b>${place['longitude']}</li>
                <li><b>Latitude: </b>${place['latitude']}</li>
              </ul>
            </div>
          </article>
        `
      })
        .catch(err => console.error(err))
});

function showIcon(icon) {
  document.querySelector('.icon-remove').style.display = 'none'
  document.querySelector('.icon-check').style.display = 'none'

  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex'
}

document.querySelector('body').addEventListener('click', e => {
  if (e.target.className === 'delete') {
    document.querySelector('.message').remove()
    input.value = ''
    document.querySelector('.icon-check').style.display = 'none'
  }
})