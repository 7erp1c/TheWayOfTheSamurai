function Slider() {

        this.imagesUrls = [];
        this.currentImageIndex = 0;
        this.showPrevBtn = null;
        this.showNextBtn = null;
        this.slideImage = null;

    this.start = function (elId) {
        var that = this;
        var elSelector = '#' + elId;
        var el = document.querySelector(elSelector);


        this.showPrevBtn = el.querySelector('.show-prev');
        this.showNextBtn = el.querySelector('.show-next');
        this.slideImage = el.querySelector('.slide-ing');

        //subscribe to events
        this.showPrevBtn.addEventListener("click", function (e) {
            that.onShowPrevBtnClick();
        });
        this.showNextBtn.addEventListener("click", function (e) {
            that.onShowNextBtnClick();
        });
        //create image array
        this.imagesUrls = ['https://mcn-images.bauersecure.com/wp-images/3224/1440x960/dingas053-01.jpg?mode=max&quality=90&scale=down',
            'https://buygiroscooter.ru/wp-content/uploads/c/e/9/ce9d9c09238b96fcde713d90086cfcf7.jpeg',
            'https://mf-motors.ru/wp-content/uploads/2022/09/motoczikl-dorozhnyj-hyosung-gt650p-sm_030187_796_3652-3.jpg',
            'https://img.favcars.com/porsche/911-turbo/porsche_911-turbo_2008_photos_3_800x600.jpg'
        ];

        this.slideImage.src = this.imagesUrls[this.currentImageIndex];
        this.showPrevBtn.disabled = true;
    };
    this.onShowPrevBtnClick = function (e) {
        this.currentImageIndex--;
        this.slideImage.src = this.imagesUrls[this.currentImageIndex]
        this.showNextBtn.disabled = false;
        //disable next button if need
        if (this.currentImageIndex === (0)) {
            this.showPrevBtn.disabled = true;
        }
    };
    this.onShowNextBtnClick = function (e) {
        this.currentImageIndex++;
        this.slideImage.src = this.imagesUrls[this.currentImageIndex];
        this.showPrevBtn.disabled = false;
        //disable next button if need
        if (this.currentImageIndex === (this.imagesUrls.length - 1)) {
            this.showNextBtn.disabled = true;
        }
    };
}









