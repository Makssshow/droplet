
const video = document.querySelector(".video");
let src = video.currentSrc || video.src;

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

gsap.to(".droplet img", {
    marginTop: "100vh",
    scrollTrigger: {
        trigger: ".droplet",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        markers: true,
        scrub: true,
        onLeave: () => {
            $(".droplet").css("opacity", "0");
        },
        onEnterBack: () => {
            $(".droplet").css("opacity", "1");
        }
    }
});



let tl = gsap.timeline({
  defaults: { duration: 1, ease: Linear.easeNone, },
  scrollTrigger: {
    trigger: ".video",
    start: "top top",
    endTrigger: ".end",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false,
    scrub: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);

/* ---------------------------------- */
