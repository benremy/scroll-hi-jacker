// els
const pinContainer = document.getElementById('c')
const pinElement = pinContainer.querySelector('.pin-element')
const box = pinElement.querySelector('.box')

// vars
let startPosition = 0
const pinDuration = 400; // px
let isListening = false;

// spacer
const spacer = document.createElement('div');
spacer.style.height = `${pinDuration}px`;
pinContainer.appendChild(spacer);

// observer callback
const observerCallback = entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        // Container is visible - start pinning!
        console.log('Starting to watch scroll');
        startListening();
    } else {
        // Container not visible - stop pinning
        console.log('Stopped watching scroll');
        stopListening();
    }
}

// create observer
const observer = new IntersectionObserver(observerCallback);
observer.observe(pinContainer);

// start listening function
function startListening() {
    if (isListening) return; // Already listening
    
    startPosition = pinContainer.offsetTop;
    isListening = true;
    window.addEventListener('scroll', handleScroll);
    
    console.log('Pin will start at:', startPosition);
}

// stop listening function
function stopListening() {
    if (!isListening) return; // Not listening
    
    isListening = false;
    window.removeEventListener('scroll', handleScroll);
    
    // Reset the element
    pinElement.classList.remove('pinned');
    pinElement.style.transform = '';
    if (box) box.style.transform = '';
}

// scroll handler (THE MAIN LOGIC!)
function handleScroll() {
    const currentScroll = window.pageYOffset;
    const pinStart = startPosition;
    const pinEnd = startPosition + pinDuration;
    
    if (currentScroll >= pinStart && currentScroll <= pinEnd) {
        // PHASE 1: PINNING
        console.log('PINNING!');
        pinElement.classList.add('pinned');
        
        // Calculate progress (0 to 1)
        const progress = (currentScroll - pinStart) / pinDuration;
        
        // Animate the box
        if (box) {
            box.style.transform = `rotate(${progress * 180}deg)`;
        }
        
    } else if (currentScroll > pinEnd) {
        // PHASE 2: AFTER PINNING
        console.log('UNPINNING!');
        pinElement.classList.remove('pinned');
        pinElement.style.transform = `translateY(${pinDuration}px)`;
        
    } else {
        // PHASE 3: BEFORE PINNING
        pinElement.classList.remove('pinned');
        pinElement.style.transform = '';
        if (box) box.style.transform = '';
    }
}

console.log('Pinning script loaded!');