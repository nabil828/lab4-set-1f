const cards = document.querySelectorAll(".card")
let firstCardImg = undefined
let secondCardImg = undefined

let locked = false
const onCardClick = async function (e) {

  if (this.id == firstCardImg?.parentNode.id)
    return

  if (locked == true)
    return


  if (!firstCardImg)
    firstCardImg = this.querySelector("img")
  else
    secondCardImg = this.querySelector("img")

  this.classList.toggle("flip")

  if (firstCardImg && secondCardImg) {
    locked = true
    console.log("locked");
    await new Promise((resolve, reject) => {
      if (firstCardImg.src == secondCardImg.src) {
        console.log("match");
        firstCardImg.parentNode.removeEventListener("click", onCardClick)
        secondCardImg.parentNode.removeEventListener("click", onCardClick)
        resolve()
      }
      else {
        console.log("no match");
        setTimeout((arg) => {
          firstCardImg.parentNode.classList.toggle("flip")
          secondCardImg.parentNode.classList.toggle("flip")
          resolve()
        }, 1000)
      }
    })
    locked = false
    console.log("unlocked");
    firstCardImg = undefined
    secondCardImg = undefined
  }
}
cards.forEach((arg) => {
  arg.addEventListener("click", onCardClick)
})