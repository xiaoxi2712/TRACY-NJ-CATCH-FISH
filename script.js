const rewards = [
  { value: 2500, img: "fish_2500.png", chance: 1 },
  { value: 1500, img: "fish_1500.png", chance: 15 },
  { value: 1200, img: "fish_1200.png", chance: 20 },
  { value: 1000, img: "fish_1000.png", chance: 40 },
  { value: 500,  img: "fish_500.png",  chance: 24 }
];

function randomReward() {
  let rand = Math.random() * 100;
  let sum = 0;
  for (let r of rewards) {
    sum += r.chance;
    if (rand <= sum) return r;
  }
}

const btn = document.getElementById("btnCatch");
const btnReplay = document.getElementById("btnReplay");
const net = document.getElementById("net");
const rewardBox = document.getElementById("reward");
const rewardImg = document.getElementById("rewardImg");
const castSound = document.getElementById("soundCast");
const winSound = document.getElementById("soundWin");
const rewardSound = document.getElementById("soundReward");

btn.onclick = () => {
  btn.disabled = true;
  rewardBox.style.display = "none";

  castSound.currentTime = 0;
  castSound.play();

  // Hiện net ở giữa
  net.style.display = "block";
  net.style.top = "-250px";

  // Tính vị trí dừng: ngay trên cụm nút
  const buttons = document.getElementById("buttons");
  const stopY = buttons.offsetTop - net.offsetHeight + 10;

  // Animate bằng JS (mượt và chính xác)
  let currentY = -250;
  const speed = 15;

  const dropInterval = setInterval(() => {
    currentY += speed;
    net.style.top = currentY + "px";

    if (currentY >= stopY) {
      clearInterval(dropInterval);

      // Sau khi dừng 0.3s thì hiện kết quả
      setTimeout(() => {
        net.style.display = "none";
        const reward = randomReward();
        rewardImg.src = reward.img;
        rewardBox.style.display = "block";
     // Sound khi hiện thưởng
        rewardSound.currentTime = 0;
        rewardSound.play();
        if (reward.value === 2500) {
          winSound.currentTime = 0;
          winSound.play();
          } else {
            rewardSound.currentTime = 0;
            rewardSound.play();
        }

        btn.disabled = false;
      }, 300);
    }
  }, 16); // ~60fps
};


// Re-play = reload page
btnReplay.onclick = () => {
  location.reload();
};
