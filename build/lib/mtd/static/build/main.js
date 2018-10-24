webpackJsonp([0],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MTDInfo; });
var MTDInfo = Object.freeze({
    allEntries: window['getAllEntries'](),
    allAudioEntries: window['getAllAudioEntries'](),
    config: window['config'],
    build: window['build'],
    dataDict: window['dataDict'],
    dataKeys: Object.keys(window['dataDict']),
    songs: window['songs']
    //... more of your variables
});
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_mtd_service__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WordModal = /** @class */ (function () {
    function WordModal(navCtrl, navParams, viewCtrl, alertCtrl, plt, mtdService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.plt = plt;
        this.mtdService = mtdService;
        this.audio = [];
        this.sentence_audio = [];
        this.displayImages = true; //default show images, turns to false on 404
        this.audioExpandHeight = 200;
        this.default_sentence_i = 0;
        this.audio_playing = [];
    }
    WordModal.prototype.ngOnInit = function () {
        this.entry = this.navParams.get('entry');
        try {
            this.image = 'assets/img/' + this.entry.img[0];
        }
        catch (error) {
            console.log(error);
        }
    };
    WordModal.prototype.stopAllAudio = function () {
        this.audio_playing.forEach(function (element) {
            element.pause();
        });
        this.audio_playing = [];
    };
    WordModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    WordModal.prototype.imageError = function () {
        this.displayImages = false;
    };
    WordModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'word-modal',template:/*ion-inline-start:"C:\Users\pinea\ninjal2018\src\components\word-modal\word-modal.component.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button (click)="dismiss()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Word Info\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card>\n\n\n\n    <div *ngIf="displayImages">\n\n      <img (click)="playAudio(entry)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="entry.img" />\n\n    </div>\n\n    <ion-card-content>\n\n      <ion-card-title>\n\n        {{entry.word}}\n\n      </ion-card-title>\n\n      <p class="definition">\n\n        {{entry.definition}}\n\n      </p>\n\n\n\n    </ion-card-content>\n\n\n\n  </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\ninjal2018\src\components\word-modal\word-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__app_mtd_service__["a" /* MTDService */]])
    ], WordModal);
    return WordModal;
}());

//# sourceMappingURL=word-modal.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__about_about__ = __webpack_require__(274);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__about_about__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browse_browse__ = __webpack_require__(275);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__browse_browse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__random_random__ = __webpack_require__(278);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__random_random__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(279);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__search_search__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_word_modal_word_modal_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mtd_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_components_module__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MTD */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["a" /* About */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["b" /* Browse */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["c" /* Random */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["d" /* Search */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MTD */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_10__components_components_module__["a" /* ComponentsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MTD */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["a" /* About */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["b" /* Browse */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["c" /* Random */],
                __WEBPACK_IMPORTED_MODULE_7__pages__["d" /* Search */],
                __WEBPACK_IMPORTED_MODULE_8__components_word_modal_word_modal_component__["a" /* WordModal */]
            ],
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */],
                    useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */]
                },
                __WEBPACK_IMPORTED_MODULE_9__mtd_service__["a" /* MTDService */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MTD; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mtd_service__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MTD = /** @class */ (function () {
    function MTD(platform, statusBar, splashScreen, mtdService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.mtdService = mtdService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages__["d" /* Search */];
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Search', component: __WEBPACK_IMPORTED_MODULE_4__pages__["d" /* Search */] },
            { title: 'Browse', component: __WEBPACK_IMPORTED_MODULE_4__pages__["b" /* Browse */] },
            { title: 'Pick a Random Word!', component: __WEBPACK_IMPORTED_MODULE_4__pages__["c" /* Random */] },
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_4__pages__["a" /* About */] }
        ];
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    }
    MTD.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MTD.prototype, "nav", void 0);
    MTD = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\pinea\ninjal2018\src\app\app.html"*/'<!--<ion-split-pane [when]="isiPad">-->\n\n  <ion-menu [content]="content">\n\n    <ion-header>\n\n      <ion-toolbar>\n\n        <ion-title>Menu</ion-title>\n\n      </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content scrollbar-y-auto on-swipe-right="menuOpen">\n\n      <ion-list>\n\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n      </ion-list>\n\n    </ion-content>\n\n\n\n  </ion-menu>\n\n\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<!--</ion-split-pane>-->'/*ion-inline-end:"C:\Users\pinea\ninjal2018\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__mtd_service__["a" /* MTDService */]])
    ], MTD);
    return MTD;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return About; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var About = /** @class */ (function () {
    function About(navCtrl) {
        this.navCtrl = navCtrl;
    }
    About = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\pinea\ninjal2018\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>About</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <div>\n\n    <p>\n\n      Hello World\n\n    </p>\n\n\n\n\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\ninjal2018\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], About);
    return About;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Browse = /** @class */ (function () {
    function Browse(navCtrl, mtdService) {
        this.navCtrl = navCtrl;
        this.mtdService = mtdService;
        this.currentEntries = window['dataDict'];
        this.increment = 7;
        this.currentIncr = this.getX(window['dataDict'], 0);
        this.letters = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config.L1.lettersInLanguage;
        this.startIndex = 0;
        // currentBrowsingLetter: String = this.letters[this.currentBrowsingEntries[0].sorting_form[0]];
        this.letterSelectOptions = { title: "Select a Letter" };
        this.categorySelectOptions = { title: "Select a Category" };
        this.initializeEntries(mtdService);
    }
    Browse.prototype.initializeEntries = function (mtdService) {
        console.log(mtdService.categories);
        this.displayCategories = Object.keys(mtdService.categories);
        // Add letter index to first words of that letter in entries
        this.letterInit();
    };
    // Determine whether letter occurs word-initially
    Browse.prototype.letterInit = function () {
        var letters = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config.L1.lettersInLanguage;
        var newLetters = [];
        for (var _i = 0, letters_1 = letters; _i < letters_1.length; _i++) {
            var letter = letters_1[_i];
            var ind = letters.indexOf(letter);
            for (var _a = 0, _b = this.currentEntries; _a < _b.length; _a++) {
                var entry = _b[_a];
                if (entry.sorting_form[0] === ind) {
                    entry.firstWordIndex = ind;
                    newLetters.push(letter);
                    break;
                }
            }
        }
        this.displayLetters = newLetters;
    };
    Browse.prototype.getX = function (entries, startIndex) {
        return entries.slice(startIndex, startIndex + this.increment);
    };
    // Scroll to previous 10 entries
    Browse.prototype.prevIncr = function () {
        if (this.startIndex - this.increment > 0) {
            this.startIndex -= this.increment;
            this.currentIncr = this.getX(this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = 0;
            this.currentIncr = this.getX(this.currentEntries, this.startIndex);
        }
    };
    // Scroll to next 10 entries
    Browse.prototype.nextIncr = function () {
        if (this.startIndex + this.increment < this.currentEntries.length) {
            this.startIndex += this.increment;
            this.currentIncr = this.getX(this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = this.currentEntries.length - this.increment;
            this.currentIncr = this.getX(this.currentEntries, this.startIndex);
        }
    };
    // Scroll to letter
    // Still needed: change selected letter dynamically
    Browse.prototype.scrollTo = function (letter) {
        var letterIndex = this.letters.indexOf(letter);
        for (var _i = 0, _a = this.currentEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.firstWordIndex === letterIndex) {
                this.startIndex = this.currentEntries.indexOf(entry);
                this.currentIncr = window['get10'](this.currentEntries, this.startIndex);
                break;
            }
        }
    };
    Browse.prototype.selectCategory = function (category) {
        this.currentEntries = this.mtdService.categories[category];
        this.currentIncr = window['get10'](this.currentEntries, 0);
        this.letterInit();
    };
    Browse = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-browse',template:/*ion-inline-start:"C:\Users\pinea\ninjal2018\src\pages\browse\browse.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Browse</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content scrollbar-y-auto>\n\n\n\n  <ion-list mode="ios">\n\n    <ion-item mode="ios">\n\n      <ion-label class="label-left" mode="ios">Select a Category</ion-label>\n\n      <ion-select mode="ios" [(ngModel)]="selectedCategory" (ngModelChange)="selectCategory(selectedCategory)" [selectOptions]="categorySelectOptions">\n\n        <ion-option *ngFor=\'let category of displayCategories\'>{{category}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item mode="ios">\n\n      <ion-label class="label-left" mode="ios">Select a Letter</ion-label>\n\n      <ion-select mode="ios" [(ngModel)]="selectedLetter" (ngModelChange)="scrollTo($event)" [selectOptions]="letterSelectOptions">\n\n        <ion-option *ngFor=\'let letter of displayLetters\'>{{letter}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n  <div class="entry-container">\n\n    <entry-list [entries]=\'currentIncr\'></entry-list>\n\n  </div>\n\n \n\n\n\n</ion-content>\n\n\n\n <ion-footer>\n\n    <ion-toolbar>\n\n      <ion-buttons left class="bar-buttons bar-buttons-ios">\n\n        <button ion-button icon-only (click)="prevIncr()">\n\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      <ion-buttons end class="bar-buttons bar-buttons-ios">\n\n        <button ion-button icon-only (click)="nextIncr()">\n\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n    </ion-toolbar>\n\n  </ion-footer>'/*ion-inline-end:"C:\Users\pinea\ninjal2018\src\pages\browse\browse.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__["a" /* MTDService */]])
    ], Browse);
    return Browse;
}());

//# sourceMappingURL=browse.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Random = /** @class */ (function () {
    function Random(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Random.prototype.getRandom = function () {
        this.entries = window['getRandom10']();
    };
    Random = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-random',template:/*ion-inline-start:"C:\Users\pinea\ninjal2018\src\pages\random\random.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Random</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <div class="center">\n\n    <button ion-button class="random" (click)=\'getRandom()\'><span class="randomtitle">Click here for 10 Random words</span></button>\n\n  </div>\n\n  <div class="entry-container" *ngIf="entries">\n\n    <entry-list [entries]="entries"></entry-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\ninjal2018\src\pages\random\random.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Random);
    return Random;
}());

//# sourceMappingURL=random.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Search = /** @class */ (function () {
    function Search(navCtrl) {
        this.navCtrl = navCtrl;
        this.entries = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].allEntries;
        this.searchQuery = '';
    }
    Search.prototype.getEnglish = function () {
        var results = [];
        var re = new RegExp(this.searchQuery, 'i');
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            console.log(entry.definition);
            if (re.test(entry.definition)) {
                results.push(entry);
            }
        }
        var sorted_answers = results.sort(function (a, b) {
            return a["definition"].length - b["definition"].length;
        });
        return (sorted_answers.slice(0, 9));
    };
    ;
    // Get English and target results
    Search.prototype.getResults = function () {
        if (this.searchQuery.length > 1) {
            var english_1 = this.getEnglish();
            var target_1 = window["searchGit"](this.searchQuery);
            var matches_1 = [];
            var partMatches_1 = [];
            var maybeMatches_1 = [];
            var populateEng = function () {
                for (var _i = 0, english_2 = english_1; _i < english_2.length; _i++) {
                    var result = english_2[_i];
                    var entry = result;
                    entry.type = "eng";
                    matches_1.push(entry);
                }
            };
            var populateTarget = function () {
                for (var _i = 0, target_2 = target_1; _i < target_2.length; _i++) {
                    var result = target_2[_i];
                    var entry = result[1];
                    if (entry.distance === 0) {
                        entry.type = "git";
                        matches_1.push(entry);
                    }
                    if (entry.distance <= 1 && entry.distance > 0) {
                        entry.type = "git";
                        partMatches_1.push(entry);
                    }
                    if (entry.distance <= 2 && entry.distance > 1) {
                        entry.type = "git";
                        maybeMatches_1.push(entry);
                    }
                }
            };
            populateEng();
            populateTarget();
            this.matches = matches_1;
            this.partMatches = partMatches_1;
            this.maybeMatches = maybeMatches_1;
        }
    };
    ;
    Search = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"C:\Users\pinea\ninjal2018\src\pages\search\search.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Search</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <ion-searchbar (ionInput)="getResults()" [(ngModel)]="searchQuery" autocapitalize="none" type="url"></ion-searchbar>\n\n  <div *ngIf="searchQuery?.length > 1">\n\n    <div class="result-container" *ngIf="matches?.length > 0">\n\n      <h4>Matches</h4>\n\n      <entry-list [entries]="matches" [searchterm]="searchQuery"></entry-list>\n\n    </div>\n\n    <div class="result-container" *ngIf="partMatches?.length > 0">\n\n      <h4>Partial Matches</h4>\n\n      <entry-list [entries]="partMatches" [searchterm]="searchQuery"></entry-list>\n\n    </div>\n\n    <div class="result-container" *ngIf="maybeMatches?.length > 0">\n\n      <h4>Maybe you meant this?</h4>\n\n      <entry-list [entries]="maybeMatches" [searchterm]="searchQuery"></entry-list>\n\n    </div>\n\n    <div class="result-container" *ngIf="matches?.length === 0 && partMatches?.length === 0 && maybeMatches?.length === 0">\n\n      <h4>Sorry we couldn\'t find any words that match "{{ searchQuery }}"</h4>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\ninjal2018\src\pages\search\search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entry_list_entry_list_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__word_modal_word_modal_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__entry_list_entry_list_component__["a" /* EntryList */], __WEBPACK_IMPORTED_MODULE_2__word_modal_word_modal_component__["a" /* WordModal */]],
            imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__entry_list_entry_list_component__["a" /* EntryList */], __WEBPACK_IMPORTED_MODULE_2__word_modal_word_modal_component__["a" /* WordModal */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__word_modal_word_modal_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EntryList = /** @class */ (function () {
    function EntryList(navCtrl, viewCtrl, modalCtrl, mtdService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.mtdService = mtdService;
        this.edit = false;
        this.pageName = viewCtrl.name;
    }
    EntryList.prototype.showModal = function (clicked_entry) {
        var wordModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__word_modal_word_modal_component__["a" /* WordModal */], { entry: clicked_entry });
        wordModal.present();
    };
    EntryList.prototype.highlight = function (text) {
        if (!this.searchterm) {
            return text;
        }
        return text.replace(new RegExp(this.searchterm, 'gi'), '<span class="langMatched">$&</span>');
    };
    EntryList.prototype.ngOnChanges = function () {
        this.edit = this.parentEdit;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], EntryList.prototype, "parentEdit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], EntryList.prototype, "entries", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], EntryList.prototype, "searchterm", void 0);
    EntryList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'entry-list',template:/*ion-inline-start:"C:\Users\pinea\ninjal2018\src\components\entry-list\entry-list.component.html"*/'<!--<ion-list>\n\n  <div>\n\n    <ion-item *ngFor="let entry of entries">\n\n      {{ entry.word[0] }} - {{ entry.definition[0]}}\n\n    </ion-item>\n\n  </div>\n\n</ion-list>-->\n\n<div id="browseEntries" class="browseElements">\n\n  <ion-list>\n\n    <div>\n\n      <ion-item class="matchContainer" (click)="showModal(entry)" *ngFor="let entry of entries" text-wrap>\n\n        <ion-checkbox color="danger" checked="false" *ngIf="edit" [(ngModel)]="entry.checked"></ion-checkbox>\n\n        <ion-label>\n\n          <div class="matchLeftContainer">\n\n            <span class="response matchLeftDiv" [ngClass]="{\'langMatched\': entry.type === \'git\' && pageName === \'Search\'}">{{entry.word}}</span>\n\n          </div>\n\n          <div class="matchRightContainer">\n\n            <span class="response matchRightDiv" [innerHTML]="highlight(entry.definition)"></span>\n\n          </div>\n\n        </ion-label>\n\n      </ion-item>\n\n    </div>\n\n  </ion-list>\n\n</div>\n\n\n\n<!--<div class="list">\n\n  <label class="item item-input item-select" ng-show="categoryNames.length > 1">\n\n                <div class="input-label wrapword">\n\n                    Select a Category\n\n                </div>\n\n                <select data-ng-model="selectedCategory" ng-change="categorySelect()">\n\n                    <option data-ng-repeat="category in displayCategories" value="{{$index}}">{{category}}\n\n                    </option>\n\n                </select>\n\n            </label>\n\n  <label class="item item-input item-select">\n\n                <div class="input-label">\n\n                    Select a Letter\n\n                </div>\n\n                <select data-ng-init="letterScroll" ng-model="selectedLetter" ng-change="letterSelect()">\n\n                    <option data-ng-repeat="letter in scroll" value="{{$index}}" ng-if="letterInit($index)">{{letter}}\n\n                    </option>\n\n                </select>\n\n            </label>\n\n</div>-->'/*ion-inline-end:"C:\Users\pinea\ninjal2018\src\components\entry-list\entry-list.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__["a" /* MTDService */]])
    ], EntryList);
    return EntryList;
}());

//# sourceMappingURL=entry-list.component.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MTDService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MTDService = /** @class */ (function () {
    function MTDService() {
        this.categories = {};
        if (__WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allAudioEntries.length > 0) {
            this.categories["audio"] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allAudioEntries;
        }
        for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].dataKeys; _i < _a.length; _i++) {
            var key = _a[_i];
            this.categories[key] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].dataDict[key].data;
        }
        var semantic_categories = __WEBPACK_IMPORTED_MODULE_2_lodash__["uniq"](__WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allEntries.map(function (entry) {
            if (entry["theme"]) {
                entry.theme[0].toLowerCase();
            }
        })).sort();
        var _loop_1 = function (cat) {
            if (cat != null) {
                this_1.categories[cat] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allEntries.filter(function (entry) {
                    if (entry["theme"]) {
                        entry.theme[0] === cat;
                    }
                });
            }
        };
        var this_1 = this;
        for (var _b = 0, semantic_categories_1 = semantic_categories; _b < semantic_categories_1.length; _b++) {
            var cat = semantic_categories_1[_b];
            _loop_1(cat);
        }
    }
    MTDService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], MTDService);
    return MTDService;
}());

//# sourceMappingURL=mtd.service.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map