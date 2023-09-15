let favrecipe = [
  {
    id: "1694415809280",
    title: "burger",
    time: "1998",
    steps: "img",
    image: "url",
  },
];
function updaterecipeListUI() {
  clearApp();
  for (let i = 0; i < favrecipe.length; i++) {
    const recipeDiv = makerecipeDiv(favrecipe[i]);
    const app = document.querySelector("#app");
    app.appendChild(recipeDiv);
  }
  changeColor(favrecipe.length);
}
function makerecipeDiv(recipe) {
  const div = document.createElement("div");
  div.setAttribute("class", "recipe-card");

  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", "imageBox");

  const textdiv = document.createElement("div");
  textdiv.setAttribute("class", "text-div");

  const flexDiv = document.createElement("div");
  flexDiv.setAttribute("class", "flex-div");

  const id = `recipe-${recipe["id"]}`;
  div.setAttribute("id", id);
  const h2 = document.createElement("h2");
  h2.innerText = recipe["title"];
  const h3 = document.createElement("h3");
  h3.innerText = changeTimeFormat(recipe["time"]);
  const p = document.createElement("p");
  p.innerText = recipe["steps"];
  const image = document.createElement("img");
  image.src = recipe["image"];
  image.setAttribute("class", "picture");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "delete";
  deleteBtn.addEventListener("click", function () {
    removerecipe(recipe["id"]);
  });
  flexDiv.appendChild(h2);
  flexDiv.appendChild(h3);
  textdiv.appendChild(flexDiv);
  textdiv.appendChild(p);
  textdiv.appendChild(deleteBtn);
  div.appendChild(imageDiv);
  imageDiv.appendChild(image);
  div.appendChild(textdiv);
  return div;
}

function changeColor(lenght) {
  const total = document.querySelector("#number");

  total.innerHTML = "Total No: " + favrecipe.length;
  if (lenght != 0) {
    total.setAttribute("class", "green");
  } else {
    total.setAttribute("class", "red");
  }
}
function removerecipe(recipeId) {
  const filteredArray = favrecipe.filter((recipe) => recipe.id != recipeId);
  favrecipe = filteredArray;
  saveToLocalStorage();
  updaterecipeListUI();
}
function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}
function hookForm() {
  const form = document.querySelector("#add-recipe-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#recipe-title").value;
    const recipetime = document.querySelector("#recipe-time").value;
    const steps = document.querySelector("#recipe-step").value;
    const image = document.querySelector("#recipe-image").value;
    const recipe = {
      id: new Date().getTime(),
      title: name,
      time: recipetime,
      steps: steps,
      image: image,
    };
    addrecipe(recipe);
    updaterecipeListUI();
    clearValue();
  });
}
function clearValue() {
  const name = document.querySelector("#recipe-title");
  const recipetime = document.querySelector("#recipe-time");
  const steps = document.querySelector("#recipe-step");
  const image = document.querySelector("#recipe-image");

  name.value = "";
  recipetime.value = "";
  steps.value = "";
  image.value = "";
}

function addrecipe(recipe) {
  favrecipe.push(recipe);
  sortTime();
  saveToLocalStorage();
}
function saveToLocalStorage() {
  const str = JSON.stringify(favrecipe);
  localStorage.setItem("recipe list", str);
}
function getFromLocalStorage() {
  const str = localStorage.getItem("recipe list");
  if (!str) {
    favrecipe = [];
  } else {
    favrecipe = JSON.parse(str);
  }
}

function changeTimeFormat(time) {
 
  const changeTime = time.split(":");
  const hr = changeTime[0];
  const mn = changeTime[1];
  let timeFormat = "";
  if (hr!=0) {
    timeFormat += `${hr} Hours`;
  }
  if (mn !=0) {
    timeFormat += ` ${mn} Minutes`;
  }
  return timeFormat.trim();
 
}

// const timeFormat = (hr, mn) => {
//   let time = "";
//   if (hr!=0) {
//     time += `${hr} Hours`;
//   }
//   if (mn !=0) {
//     time += ` ${mn} Minutes`;
//   }
//   return time.trim();
// };

function sortTime() {
  favrecipe.sort(function(a,b){
    let atime = a['time'].split(":");
    let btime = b['time'].split(":");
    console.log(atime[1]);
    return new Date(2023,8,15,atime[0],atime[1])-new Date(2023,8,15,btime[0],btime[1]);
});
}
getFromLocalStorage();
updaterecipeListUI();
hookForm();
