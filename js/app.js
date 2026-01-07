gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollSmoother) 
var myEase = Power3.easeOut; 

ScrollSmoother.create({
	smooth: 1,
	effects: true
});

const leftItem = gsap.utils.toArray('.from-left');
        leftItem.forEach((leftyitem, i) => {
          const anim = gsap.fromTo(leftyitem, {autoAlpha: 0, x:-40 }, { duration: 1, autoAlpha: 1, x: 0 });
          ScrollTrigger.create({
            trigger: leftyitem,
            animation: anim,
            start: 'top 70%',
              end: 'top 20%',
            markers: false,
              scrub: true });

        });   
        
        const rightItem = gsap.utils.toArray('.from-right');
        rightItem.forEach((rightyItem, i) => {
          const anim = gsap.fromTo(rightyItem, {autoAlpha: 0, x:80 }, { duration: 1.5, autoAlpha: 1, x: 0, delay:0.25 });
          ScrollTrigger.create({
            trigger: rightyItem,
            animation: anim,
            start: 'top 80%',
              end: 'top 40%',
            markers: false,
              scrub: true });

        }); 

const fadeIn = gsap.utils.toArray('.fadeIn');
        fadeIn.forEach((fadeItem, i) => {
          const anim = gsap.fromTo(fadeItem, {autoAlpha: 0 }, { duration: 1, autoAlpha: 1, delay:0.25});
          ScrollTrigger.create({
            trigger: fadeItem,
            animation: anim,
            start: 'top 90%',
              end: 'top 50%',
            markers: false,
              scrub: true });

        }); 

const scaleIn = gsap.utils.toArray('.scaleIn');
        scaleIn.forEach((scaleItemIn, i) => {
          const anim = gsap.fromTo(scaleItemIn, {scale:0.75, autoAlpha: 0 }, { duration: 4, scale:1, autoAlpha: 1, delay:0.75});
          ScrollTrigger.create({
            trigger: scaleItemIn,
            animation: anim,
            start: 'top 90%',
              end: 'top 50%',
            markers: false,
              scrub: true });

       

        }); 

const baseItem = gsap.utils.toArray('.from-base');
        baseItem.forEach((baseyItem, i) => {
          const anim = gsap.fromTo(baseyItem, {autoAlpha: 0, scale: 0.75, y:40 }, { duration: 1, autoAlpha: 1, scale: 1, y: 0, delay:0.25 });
          ScrollTrigger.create({
            trigger: baseyItem,
            animation: anim,
            start: 'top 90%',
              end: 'top 50%',
            markers: false,
              scrub: true });

        }); 

        

// video fader
gsap.set(".video_contain", { opacity: 0.3, duration: 1, }); // Set initial opacity to 0

gsap.to("html", {
  scrollTrigger: { 
    trigger: ".introt",
    toggleActions: "restart none none reverse"
},
  "--myBlur": 14,
  duration: 0.75,

});

gsap.to (".video_contain", {
  scrollTrigger: { 
    trigger: ".introt",
    toggleActions: "restart none none reverse"
},
  opacity:0.1,
  duration: 1.25,
  
});    

// top nav
gsap.set(".topbar", { opacity: 0, duration: 0.5, }); // Set initial opacity to 0


gsap.to (".topbar", {
  scrollTrigger: { 
    trigger: ".intro",
    toggleActions: "restart none none reverse"
},
  opacity:1,
  duration: 0.25,
  
}); 




PowerGlitch.glitch(
  '.glitch',
  {
      playMode: 'hover',
      hideOverflow: false,
      timing: {
          duration: 1000,
          iterations: 1,
          easing: 'ease-in-out',
      },
      glitchTimeSpan: {
          start: 0.2,
          end:0.5,
      },
      shake: {
          velocity: 16,
          amplitudeX: 0.1,
          amplitudeY: 0.1,
      },
      slice: {
          count: 14,
          velocity: 20,
          minHeight: 0.02,
          maxHeight: 0.40,
          hueRotate: true,
      },
      pulse: false | {
        scale: 1,
    }
  }
)



PowerGlitch.glitch(
  '.glitch2',
  {
      playMode: 'always',
      hideOverflow: false,
      timing: {
          duration: 10000,
          iterations: Infinity,
          easing: 'ease-in-out',
      },
      glitchTimeSpan: {
          start: 0.3,
          end:0.33,
      },
      shake: {
          velocity: 16,
          amplitudeX: 0.1,
          amplitudeY: 0.1,
      },
      slice: {
          count: 14,
          velocity: 20,
          minHeight: 0.02,
          maxHeight: 0.40,
          hueRotate: true,
      },
      pulse: false | {
        scale: 1,
    }
  }
)



// grabber code
/*--------------------
Vars
--------------------*/
const $menu = document.querySelector('.menu')
const $items = document.querySelectorAll('.menu--item')
const $images = document.querySelectorAll('.menu--item img')
let menuWidth = $menu.clientWidth
let itemWidth = $items[0].clientWidth
let wrapWidth = $items.length * itemWidth

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0


/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * ( 1 - t ) + v1 * t
}


/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  gsap.set($items, {
    x: (i) => {
      return i * itemWidth + scroll
    },
    modifiers: {
      x: (x, target) => {
        const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
        return `${s}px`
      }
    }
  })
} 
dispose(0)

/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9
}

/*--------------------
Touch
--------------------*/
let touchStart = 0
let touchX = 0
let isDragging = false
const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX
  isDragging = true
  $menu.classList.add('is-dragging')
}
const handleTouchMove = (e) => {
  if (!isDragging) return
  touchX = e.clientX || e.touches[0].clientX
  scrollY += (touchX - touchStart) * 2.5
  touchStart = touchX
}
const handleTouchEnd = () => {
  isDragging = false
  $menu.classList.remove('is-dragging')
}

/*--------------------
Listeners
--------------------*/
$menu.addEventListener('mousewheel', handleMouseWheel)

$menu.addEventListener('touchstart', handleTouchStart)
$menu.addEventListener('touchmove', handleTouchMove)
$menu.addEventListener('touchend', handleTouchEnd)

$menu.addEventListener('mousedown', handleTouchStart)
$menu.addEventListener('mousemove', handleTouchMove)
$menu.addEventListener('mouseleave', handleTouchEnd)
$menu.addEventListener('mouseup', handleTouchEnd)

$menu.addEventListener('selectstart', () => { return false })

/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  menuWidth = $menu.clientWidth
  itemWidth = $items[0].clientWidth
  wrapWidth = $items.length * itemWidth
})


/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render)
  y = lerp(y, scrollY, .1)
  dispose(y)
  
  scrollSpeed = y - oldScrollY
  oldScrollY = y
  
  gsap.to($items, {
    skewX: -scrollSpeed * .2,
    rotate: scrollSpeed * .01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
  })
}
render()


// BALL FOLLOWER

gsap.set(".ball", {xPercent: -50, yPercent: -50});

var ball = document.querySelector(".ball");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var fpms = 60 / 1000;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});


gsap.ticker.add((time, deltaTime) => {
  
  var delta = deltaTime * fpms;
  var dt = 1.0 - Math.pow(1.0 - speed, delta); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

// showreel controller

var vid = document.getElementById("showreel-vid"); 

function playVid() { 
vid.play(); 
} 

function pauseVid() { 
vid.pause(); 
}


// Get the showreel modal ---------------
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  gsap.set("#myModal", { opacity: 0, duration: 0, }); // Set initial opacity to 0
  modal.style.display = "block";
  gsap.to ("#myModal", {  opacity:1, duration: 0.5,});  
  playVid();
  document.body.classList.add("noscroll"); // Disable scrolling
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  gsap.to ("#myModal", {  opacity:0, duration: 0.5,  onComplete: () => {
  modal.style.display = "none";
  pauseVid();
  }});  
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
  gsap.to ("#myModal", {  opacity:0, duration: 0.5,  onComplete: () => {
  modal.style.display = "none";
  pauseVid();
  }});  
  }
}


// Casestudy 1 modal ---------------
var caseOne = document.getElementById("csOne");

// Get the button that opens the modal
var caseOneBtn = document.getElementById("caseOneBtn");

// Get the <span> element that closes the modal
var caseOneClose = document.getElementsByClassName("csCloseOne")[0];

// When the user clicks on the button, open the modal
caseOneBtn.onclick = function() {
  gsap.set(caseOne, { opacity: 0, duration: 0, }); // Set initial opacity to 0
  caseOne.style.display = "block";
  gsap.to (caseOne, {  opacity:1, duration: 0.5,});  
  document.body.classList.add("noscroll"); // Disable scrolling
}

// When the user clicks on <span> (x), close the modal
caseOneClose.onclick = function() {
  gsap.to (caseOne, {  opacity:0, duration: 0.25,  onComplete: () => {
  caseOne.style.display = "none";
  document.body.classList.remove("noscroll"); // Enable scrolling
  }});  
}


// Casestudy 2 modal ---------------
var caseTwo = document.getElementById("csTwo");

// Get the button that opens the modal
var caseTwoBtn = document.getElementById("caseTwoBtn");

// Get the <span> element that closes the modal
var caseTwoClose = document.getElementsByClassName("csCloseTwo")[0];

// When the user clicks on the button, open the modal
caseTwoBtn.onclick = function() {
  gsap.set(caseTwo, { opacity: 0, duration: 0, }); // Set initial opacity to 0
  caseTwo.style.display = "block";
  gsap.to (caseTwo, {  opacity:1, duration: 0.5,});  
  document.body.classList.add("noscroll"); // Disable scrolling
}

// When the user clicks on <span> (x), close the modal
caseTwoClose.onclick = function() {
  gsap.to (caseTwo, {  opacity:0, duration: 0.25,  onComplete: () => {
  caseTwo.style.display = "none";
  document.body.classList.remove("noscroll"); // Enable scrolling
  }});  
}


// Casestudy 3 modal ---------------
var caseThree = document.getElementById("csThree");

// Get the button that opens the modal
var caseThreeBtn = document.getElementById("caseThreeBtn");

// Get the <span> element that closes the modal
var caseThreeClose = document.getElementsByClassName("csCloseThree")[0];

// When the user clicks on the button, open the modal
caseThreeBtn.onclick = function() {
  gsap.set(caseThree, { opacity: 0, duration: 0, }); // Set initial opacity to 0
  caseThree.style.display = "block";
  gsap.to (caseThree, {  opacity:1, duration: 0.5,});  
  document.body.classList.add("noscroll"); // Disable scrolling
}

// When the user clicks on <span> (x), close the modal
caseThreeClose.onclick = function() {
  gsap.to (caseThree, {  opacity:0, duration: 0.25,  onComplete: () => {
  caseThree.style.display = "none";
  document.body.classList.remove("noscroll"); // Enable scrolling
  }});  
}


// Casestudy 4 modal ---------------
var caseFour = document.getElementById("csFour");

// Get the button that opens the modal
var caseFourBtn = document.getElementById("caseFourBtn");

// Get the <span> element that closes the modal
var caseFourClose = document.getElementsByClassName("csCloseFour")[0];

// When the user clicks on the button, open the modal
caseFourBtn.onclick = function() {
  gsap.set(caseFour, { opacity: 0, duration: 0, }); // Set initial opacity to 0
  caseFour.style.display = "block";
  gsap.to (caseFour, {  opacity:1, duration: 0.5,});  
  document.body.classList.add("noscroll"); // Disable scrolling
}

// When the user clicks on <span> (x), close the modal
caseFourClose.onclick = function() {
  gsap.to (caseFour, {  opacity:0, duration: 0.25,  onComplete: () => {
  caseFour.style.display = "none";
  document.body.classList.remove("noscroll"); // Enable scrolling
  }});  
}

// TURN CASE ON FOR EDIT ---------------
//gsap.set(caseThree, { opacity: 1, duration: 0, }); // Set initial opacity to 0
//caseThree.style.display = "block";





document.addEventListener('DOMContentLoaded', function() {
console.log('Page fully loaded');

// SPLIT TEXT CONTACT TEXT

// Select the text section and the title element
var textSection = document.querySelector('.textsec');
var title = document.querySelector(".titlechr");

// Create a SplitText instance to split the title into words and characters
var h1SplitText = new SplitText(title, 
    { 
        type: "words,chars" 
    }
);
// Get an array of all the characters in the splitted element
var spliTextChars = h1SplitText.chars;

// Set a perspective on the title for a 3D effect
//gsap.set(title, { perspective: 400 });

// Create a timeline for the animation
var splitTextTimeline = gsap.timeline({
    defaults: { 
        duration: 5, // Duration of the animation in seconds
        ease: "sine.out", // Type of easing
    },
});

// Add a "from" animation to the timeline to make the characters appear
splitTextTimeline.from(spliTextChars, 
    { 
        opacity:0,    // Initial opacity: 0 (invisible)
        y: 20,      // Initial vertical offset: 180px upwards
        stagger: 0.1, // Delay between each character's animation
    }
);

// Create a ScrollTrigger instance to trigger the animation on scroll
ScrollTrigger.create({
    trigger: textSection,         // Element that triggers the animation
    start: '0% 60%',            // Animation start position 
    end: '90% 80%',               // Animation end position 
    scrub: true,                  // Enable scrubbing for a smoother effect
    animation: splitTextTimeline, // Link the timeline to ScrollTrigger
    //markers:true,                 // Show ScrollTrigger markers for debugging
}); 



//--------- SECOND

// Select the text section and the title element
var textSectionT = document.querySelector('.textsecT');
var titleT = document.querySelector(".titlechrT");

// Create a SplitText instance to split the title into words and characters
var h1SplitTextT = new SplitText(titleT, 
    { 
        type: "words,chars" 
    }
);
// Get an array of all the characters in the splitted element
var spliTextCharsT = h1SplitTextT.chars;

// Set a perspective on the title for a 3D effect
//gsap.set(title, { perspective: 400 });

// Create a timeline for the animation
var splitTextTimelineT = gsap.timeline({
    defaults: { 
        duration: 5, // Duration of the animation in seconds
        ease: "sine.out", // Type of easing
    },
});

// Add a "from" animation to the timeline to make the characters appear
splitTextTimelineT.from(spliTextCharsT, 
    { 
        opacity:0,    // Initial opacity: 0 (invisible)
        y: 0,      // Initial vertical offset: 180px upwards
        stagger: 0.5, // Delay between each character's animation
    }
);

// Create a ScrollTrigger instance to trigger the animation on scroll
ScrollTrigger.create({
    trigger: textSectionT,         // Element that triggers the animation
    start: '-30% 70%',            // Animation start position 
    end: '260% 90%',                // Animation end position 
    scrub: true,                  // Enable scrubbing for a smoother effect
    animation: splitTextTimelineT, // Link the timeline to ScrollTrigger
    //markers:true,                 // Show ScrollTrigger markers for debugging
}); 

});