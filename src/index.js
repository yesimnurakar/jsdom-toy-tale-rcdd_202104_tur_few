let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch ("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => addToys(json));

  const toyCollection = document.getElementById('toy-collection');
  function addToys(toyInfo){
    for(let i = 0; i < toyInfo.length; i++){
      let h2 = document.createElement('h2');
      let img = document.createElement('img');
      let p = document.createElement('p');
      let button = document.createElement('button');

      h2.innerText = toyInfo[i].name;
      img.setAttribute("src", `${toyInfo[i].image}`);
      img.setAttribute("class", "toy-avatar");
      p.innerText = toyInfo[i].likes + " Likes";
      button.setAttribute("class", "like-btn");

      toyCollection.append(h2);
      toyCollection.append(img);
      toyCollection.append(p);
      toyCollection.append(button);

      console.log(toyInfo[i]);    // To check the called Data
    }
  }

  // Problems in Here: :(
  const formSubmit = document.querySelector('.submit');
  let txtInput = document.getElementById('nameText');
  let imgInput = document.getElementById('imageText');

  console.log(txtInput.innerHTML);
  console.log(imgInput.innerHTML);

  formSubmit.addEventListener("click", function(e){
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: txtInput.innerText,
        image: imgInput.innerText,
        likes: 0
      })
    })
    .then(response => response.json())
    .then(json => addToys(json));
    e.preventDefault();
  });

  // addBtn.addEventListener("click", function(e){
  //   const nameInput = document.getElementById('name');
  //   const imageInput = document.getElementById('image');
  //   postRequest(nameInput, imageInput, 0);
  //   e.preventDefault();
  // })
});