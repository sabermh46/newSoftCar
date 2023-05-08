document.addEventListener('DOMContentLoaded', () => {

    //NavBar


    const navbar = document.querySelector('.navbar');
    const brand = document.querySelector('.brand');

    const initialPaddingTop = 70;
    const finalPaddingTop = 10;
    const scrollThreshold = 400;
    const initialFontSize = 37;
    const finalFontSize = 30;

    const updateNavbar = () => {
        const scrollTop = window.scrollY;
        const progress = Math.min(scrollTop / scrollThreshold, 1);

        const currentPaddingTop = initialPaddingTop - progress * (initialPaddingTop - finalPaddingTop);
        const currentFontSize = initialFontSize - progress * (initialFontSize - finalFontSize);

        navbar.style.paddingTop = `${currentPaddingTop}px`;
        brand.style.fontSize = `${currentFontSize}px`;
    };

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();


    class ActivateInView {
        constructor(element) {
            this.element = element;
            this.init();
        }
    
        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.onInView(entry.target);
                        } else {
                            this.onOutView(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.5,
                }
            );
    
            observer.observe(this.element);
        }
    
        onInView(element) {
            element.classList.add('active')
        }
    
        onOutView(element) {
            // Default behavior for when the element goes out of view
        }
    }

    class ActivateInView2 {
        constructor(element) {
            this.element = element;
            this.init();
        }
    
        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.onInView(entry.target);
                        } else {
                            this.onOutView(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                }
            );
    
            observer.observe(this.element);
        }
    
        onInView(element) {
            element.classList.add('active')
        }
    
        onOutView(element) {
            element.classList.remove('active')
        }
    }

    class CoolActivateInView extends ActivateInView2 {
        constructor(element, initialTranslateX, finalTranslateX) {
            super(element);
            this.transformElement = false;
            this.initialTranslateX = initialTranslateX;
            this.finalTranslateX = finalTranslateX;
        }
    
        onInView(element) {
            this.transformElement = true;
            this.updateTransformation();
    
            window.addEventListener('scroll', this.updateTransformationBound);
        }
    
        onOutView(element) {
            this.transformElement = false;
            this.updateTransformation();
    
            window.removeEventListener('scroll', this.updateTransformationBound);
        }
    
        updateTransformationBound = () => {
            this.updateTransformation();
        };
    
        updateTransformation() {
            const rect = this.element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top <= viewportHeight) {
                const percentageScrolled = Math.min(1 - rect.top / viewportHeight, 1);
                const translateX = this.initialTranslateX + percentageScrolled * (this.finalTranslateX - this.initialTranslateX);
                this.element.style.transform = `translateY(${translateX}px)`;
            } else {
                this.element.style.transform = `translateY(${this.initialTranslateX}px)`;
            }
            
            
        }
    }

    var fromRightToLeft_s = document.querySelectorAll('.fromRightToLeft')


    fromRightToLeft_s.forEach(item=>{
        new ActivateInView(item)
    })

    var fromLeftToRight_s = document.querySelectorAll('.fromLeftToRight')


    fromLeftToRight_s.forEach(item=>{
        new ActivateInView(item)
    })

    var fromDownToTop_s = document.querySelectorAll('.fromDownToTop')

    fromDownToTop_s.forEach(item=>{
        new ActivateInView(item)
    })



    var toolTips = document.querySelectorAll('.toolTip')

    toolTips.forEach(item=>{
        new ActivateInView(item)
    })



    
    if(window.innerWidth > 600) {
        var im1 = document.querySelector('.image.im1')
        var im2 = document.querySelector('.image.im2')

        new CoolActivateInView(im1, -30, -120)
        new CoolActivateInView(im2, -30, -160)
    }







    var vid = document.getElementById('video');
    var vidc = document.querySelector('.video');
    var icon = document.getElementById('icon');
    var ctrl = document.getElementById('ctrl');

    function playpause() {
        if(icon.innerHTML == 'play_arrow')
        {
            icon.innerHTML = 'pause'
            vid.play();
        }
        else {
            icon.innerHTML = 'play_arrow'
            vid.pause();
        }
    }
    vid.addEventListener('ended', ()=> {
        icon.innerHTML = 'play_arrow'
    });
    ctrl.addEventListener('click', ()=>{
        playpause()
    })


    var up = document.getElementById('up');
    window.addEventListener('scroll',()=>{
        var scY = window.scrollY;
        if(scY > 3000) {
            up.style.visibility = 'visible'
        }
        else {
            up.style.visibility = 'hidden'
        }
    })


});


