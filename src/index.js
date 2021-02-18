let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const toysIndexUrl = "http://localhost:3000/toys"

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  // 'GET' request to fetch all the toy objects
    fetch(toysIndexUrl)
    .then(response => response.json())
    .then(toys => {
      let toysHTML = toys.map(function(toy){
        return `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
      </div> 
        `
      })
      // `+=` adds the new HTML to the already existing HTML
      // `.join("")` gets rid of the commas between each card
      toyCollection.innerHTML += toysHTML.join("")
    })
  // 'GET' request to fetch all the toy objects



  // POST request is sent to toysIndexUrl
    toyFormContainer.addEventListener("submit", function(event){
      // Prevent submit button from sending to new page
      event.preventDefault()
      // Grab inputs from form
      const toyName = event.target.name.value
      const toyImage = event.target.image.value

      // POST request fetch

      fetch(toysIndexUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: 0
        })
      })
      .then(response => response.json())
      .then(newToy => {
        // fetch updated the DB
        // now DOM needs to be updated
        // convert the `newToy` from JSON to HTML in ORDER TO ADD TO DOM
        let newToyHTML = `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        </div> 
        `
        toyCollection.innerHTML += newToyHTML
      })

    })
  // POST request is sent to toysIndexUrl

  // Likes Counter

  toyCollection.addEventListener("click", (event) => {
    if (event.target.className === "like-btn") {
      // console.log(event.target.previousElementSibling)
      let currentLikes = parseInt(event.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      event.target.previousElementSibling.innerText = newLikes + " Likes"

      fetch(`http:localhost:3000/toys/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }
  })

  // Likes Counter

// DOM Content Loaded
});
