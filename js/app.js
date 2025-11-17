gsap.registerPlugin(ScrollTrigger);
var myEase = Power3.easeOut; 

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
              end: 'top 20%',
            markers: false,
              scrub: true });

        }); 

const fadeIn = gsap.utils.toArray('.fadeIn');
        fadeIn.forEach((fadeItem, i) => {
          const anim = gsap.fromTo(fadeItem, {autoAlpha: 0 }, { duration: 1, autoAlpha: 1});
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
          const anim = gsap.fromTo(scaleItemIn, {scale:0.5, autoAlpha: 0 }, { duration: 2, scale:1, autoAlpha: 1});
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
gsap.set(".video_contain", { opacity: 0.5, duration: 1, }); // Set initial opacity to 0

gsap.to("html", {
  scrollTrigger: { 
    trigger: ".intro",
    toggleActions: "restart none none reverse"
},
  "--myBlur": 8,
  duration: 0.75,

});

gsap.to (".video_contain", {
  scrollTrigger: { 
    trigger: ".intro",
    toggleActions: "restart none none reverse"
},
  opacity:0.3,
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
