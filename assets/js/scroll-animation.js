
gsap.registerPlugin(ScrollTrigger);

gsap.to(".droplet img", {
    marginTop: "100vh",
    scrollTrigger: {
        trigger: ".droplet",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        onLeave: () => {
            $(".droplet").css("opacity", "0");
        },
        onEnterBack: () => {
            $(".droplet").css("opacity", "1");
        }
    }
});





console.clear();

const canvas = document.querySelector(".video canvas");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 711;
const currentFrame = index => (
  `assets/3/Untitled design(1)_1 ${(index + 1).toString().padStart(3, '0')}.jpg`
);

const images = []
const airpods = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  scrollTrigger: {
    trigger: ".video",
    start: "top top",
    endTrigger: ".end",
    end: "bottom bottom",
    pin: ".video",
    pinSpacing: false,
    markers: false,
    scrub: 0.5,
  },
  markers: true,
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airpods.frame], 0, 0); 
}

