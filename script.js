const paper = document.getElementById("paper");
const status = document.getElementById("status");
const sound = document.getElementById("sound");

let folds = 0;
let folding = false;

function fold() {
  if (folding) return;
  folding = true;

  if (folds >= 8) {
    paper.classList.add("fail");
    status.textContent = "FAIL ❌ Physics limit reached!";
    return;
  }

  folds++;
  sound.currentTime = 0;
  sound.play();

  paper.style.transform =
    `scaleY(${1 - folds * 0.07}) rotate(${folds * 2}deg)`;

  paper.style.boxShadow =
    `0 ${20 - folds * 2}px ${40 - folds * 3}px rgba(0,0,0,.7)`;

  status.textContent = `Folds: ${folds} / 8`;

  setTimeout(() => folding = false, 400);
}

/* PC drag */
paper.addEventListener("mousedown", fold);

/* Mobile swipe */
let startY = null;
paper.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});
paper.addEventListener("touchend", e => {
  if (!startY) return;
  let endY = e.changedTouches[0].clientY;
  if (Math.abs(startY - endY) > 30) fold();
  startY = null;
});

/* Console simulation (A button) */
window.addEventListener("keydown", e => {
  if (e.key === "a" || e.key === "ArrowLeft") fold();
});