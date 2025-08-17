console.log("app.js loaded");

// Don’t fetch http://puzzle.mead.io/puzzle from the browser.
//Instead, fetch it from your Express backend, then pass the result to the browser.
fetch("/puzzle")
  .then((res) => res.json())
  .then((data) => {
    console.log("Puzzle:", data);
  })
  .catch((err) => {
    console.error("Fetch failed:", err);
  });

//   older version
// fetch('http://localhost:3000/weather?address=pune').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

//    new version
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')
const search = document.querySelector("input");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
  m1.textContent = 'Loading...'
  fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
        m1.textContent = data.location.Address
        m2.textContent = data.forecast
      console.log(data);
    })
    .catch((error) => {
        m1.textContent = error
        m2.textContent = ''
      console.log("Error:", error);
    });
});
