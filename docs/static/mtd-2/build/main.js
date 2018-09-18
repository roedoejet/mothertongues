webpackJsonp([0],{

/***/ 113:
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
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 154:
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
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__about_about__ = __webpack_require__(283);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__about_about__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bookmarks_bookmarks__ = __webpack_require__(284);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__bookmarks_bookmarks__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browse_browse__ = __webpack_require__(285);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__browse_browse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__flashcards_flashcards__ = __webpack_require__(286);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__flashcards_flashcards__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__flashcards_flashcard_modal_component__ = __webpack_require__(201);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__flashcards_flashcard_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__random_random__ = __webpack_require__(287);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__random_random__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(288);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__search_search__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_entry_model__ = __webpack_require__(289);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_entry_list_component__ = __webpack_require__(290);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__shared_entry_list_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_word_modal_component__ = __webpack_require__(202);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_9__shared_word_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__stories_stories__ = __webpack_require__(291);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_10__stories_stories__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__stories_story__ = __webpack_require__(203);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_11__stories_story__["a"]; });












//# sourceMappingURL=index.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flashcard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Flashcard = (function () {
    function Flashcard(navCtrl, navParams, waldayuService, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.waldayuService = waldayuService;
        this.viewCtrl = viewCtrl;
        this.startIndex = 0;
        this.deck = navParams.get('deck');
        this.categories = waldayuService.categories;
        this.card = this.categories[this.deck][this.deck][this.startIndex];
        this.front = true;
        this.image = 'assets/img/' + this.card.img[0];
        this.style = navParams.get('style');
    }
    // Go to previous card in deck
    Flashcard.prototype.prev1 = function () {
        if (this.startIndex - 1 > 0) {
            this.startIndex -= 1;
            this.card = this.categories[this.deck][this.deck][this.startIndex];
            this.image = 'assets/img/' + this.card.img[0];
        }
        else {
            this.startIndex = 0;
            this.card = this.categories[this.deck][this.deck][this.startIndex];
            this.image = 'assets/img/' + this.card.img[0];
        }
    };
    // Go to next card in deck
    Flashcard.prototype.next1 = function () {
        if (this.startIndex + 1 < this.categories[this.deck][this.deck].length) {
            this.startIndex += 1;
            this.card = this.categories[this.deck][this.deck][this.startIndex];
            this.image = 'assets/img/' + this.card.img[0];
        }
        else {
            this.startIndex = this.categories[this.deck][this.deck].length;
            this.card = this.categories[this.deck][this.deck][this.startIndex];
            this.image = 'assets/img/' + this.card.img[0];
        }
    };
    Flashcard.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    Flashcard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'flashcard-modal',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\flashcards\flashcard-modal.component.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-title>\n\n      Word Info\n\n    </ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button (click)="dismiss()">\n\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content ng-switch="style" on-swipe-up="front = !front">\n\n\n\n  <ion-card *ngIf="style === \'Active\'">\n\n\n\n    <img *ngIf="!front" (click)="playAudio(card)" [src]="image" />\n\n\n\n    <ion-card-content *ngIf="front">\n\n      <ion-card-title>\n\n        {{card.definition[0]}}\n\n      </ion-card-title>\n\n\n\n      <!--<p *ngIf="card.optional && optional">\n\n        {{card.optional[0]}}\n\n      </p>-->\n\n    </ion-card-content>\n\n\n\n    <ion-card-content *ngIf="!front">\n\n      <ion-card-title>\n\n        {{card.display_form[0]}}\n\n      </ion-card-title>\n\n      <p>\n\n        {{card.definition[0]}}\n\n      </p>\n\n      <!--<p *ngIf="card.optional && optional">\n\n        {{card.optional[0]}}\n\n      </p>-->\n\n    </ion-card-content>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left>\n\n          <ion-icon name=\'star\'></ion-icon>\n\n          Favorite\n\n        </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left (click)="front = !front">\n\n          <ion-icon name=\'refresh\'></ion-icon>\n\n          Flip card\n\n        </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left (click)="playAudio(card)">\n\n          <ion-icon name=\'musical-notes\'></ion-icon>\n\n          Listen\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n\n\n\n\n  <ion-card *ngIf="style === \'Passive\'">\n\n\n\n    <img *ngIf="!front" (click)="playAudio(card)" [src]="image" />\n\n\n\n    <ion-card-content *ngIf="front">\n\n      <ion-card-title>\n\n        {{card.display_form[0]}}\n\n      </ion-card-title>\n\n      <!--<p *ngIf="card.optional && optional">\n\n        {{card.optional[0]}}\n\n      </p>-->\n\n    </ion-card-content>\n\n\n\n    <ion-card-content *ngIf="!front">\n\n      <ion-card-title>\n\n        {{card.display_form[0]}}\n\n      </ion-card-title>\n\n      <p>\n\n        {{card.definition[0]}}\n\n      </p>\n\n      <!--<p *ngIf="card.optional && optional">\n\n        {{card.optional[0]}}\n\n      </p>-->\n\n    </ion-card-content>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left>\n\n          <ion-icon name=\'star\'></ion-icon>\n\n          Favorite\n\n        </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left (click)="front = !front">\n\n          <ion-icon name=\'refresh\'></ion-icon>\n\n          Flip card\n\n        </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left (click)="playAudio(card)">\n\n          <ion-icon name=\'musical-notes\'></ion-icon>\n\n          Listen\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n\n\n\n\n  <ion-card *ngIf="style === \'Non-Written\'">\n\n\n\n    <img (click)="playAudio(card)" [src]="image" />\n\n\n\n    <ion-card-content *ngIf="!front">\n\n      <ion-card-title>\n\n        {{card.display_form[0]}}\n\n      </ion-card-title>\n\n      <p>\n\n        {{card.definition[0]}}\n\n      </p>\n\n      <!--<p *ngIf="card.optional && optional">\n\n        {{card.optional[0]}}\n\n      </p>-->\n\n    </ion-card-content>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left>\n\n          <ion-icon name=\'star\'></ion-icon>\n\n          Favorite\n\n        </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left (click)="front = !front">\n\n          <ion-icon name=\'refresh\'></ion-icon>\n\n          Flip card\n\n        </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left (click)="playAudio(card)">\n\n          <ion-icon name=\'musical-notes\'></ion-icon>\n\n          Listen\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <ion-buttons left class="bar-buttons bar-buttons-ios">\n\n      <button ion-button icon-only (click)="prev1()">\n\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end class="bar-buttons bar-buttons-ios">\n\n      <button ion-button icon-only (click)="next1()">\n\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\flashcards\flashcard-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__["a" /* WaldayuService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */]])
    ], Flashcard);
    return Flashcard;
}());

//# sourceMappingURL=flashcard-modal.component.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_global__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WordModal = (function () {
    function WordModal(navCtrl, navParams, viewCtrl, nativeAudio, alertCtrl, file, transfer, storage, plt, waldayuService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.nativeAudio = nativeAudio;
        this.alertCtrl = alertCtrl;
        this.file = file;
        this.transfer = transfer;
        this.storage = storage;
        this.plt = plt;
        this.waldayuService = waldayuService;
        this.displayImages = true; //default show images, turns to false on 404
        this.optional = false;
        this.fileTransfer = this.transfer.create();
        this.audio_playing = [];
        this.entry = navParams.get('entry');
        if (this.entry.optional) {
            this.optionalSelection = Object.keys(this.entry.optional);
        }
        this.checkedOptions = this.optionalSelection;
        try {
            this.image = 'assets/img/' + this.entry.img[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    WordModal.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'There is no audio for this yet.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ;
    WordModal.prototype.showExpAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'There is no audio for this yet. Are you sure you are connected to the internet?',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ;
    // stopAllAudio() {
    //     for (var i = 0; i < this.audio_playing.length; i++) {
    //         this.audio_playing[i].pause()
    //     }
    //     this.audio_playing = [];
    // }
    WordModal.prototype.playAudio = function (entry) {
        var _this = this;
        // this.stopAllAudio()
        // Create Media object from src
        // if (ionic.Platform.platform() == 'macintel') {
        if (this.plt.is('core') || this.plt.is('mobileweb')) {
            if (entry !== undefined && entry.audio_file !== undefined && entry.audio_url !== undefined) {
                var id = entry.entryID;
                var path = "http://mobile.firstvoices.com/FirstVoices/" + entry.audio_url[0];
                this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
                this.nativeAudio.play(id).then(this.onSuccess, this.onError);
                // var audio = new Audio(srcURL)
                // audio_playing.push(audio)
                // setTimeout(function () {
                //     audio.play();
                // }, 50);
            }
            else {
                this.showAlert();
            }
        }
        else if (this.plt.is('ios')) {
            var id = entry.entryID;
            var path = "assets/audio/" + entry.audio_file[0];
            this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
            this.nativeAudio.play(id).then(this.onSuccess, this.onError);
            // srcFN = src.replace(/\//g, '')
            // srcURL = "audio/" + srcFN
            // var audio = new Audio(srcURL);
            // Play audio
            // audio_playing.push(audio)
            // setTimeout(function () {
            //     audio.play();
            // }, 50);
        }
        else if (this.plt.is('android')) {
            if (entry != undefined) {
                var id_1 = entry.entryID;
                var entry_url_1 = "http://mobile.firstvoices.com/FirstVoices/" + entry.audio_url[0];
                var entry_file_1 = "assets/audio/" + entry.audio_file[0];
                this.file.checkFile(this.file.dataDirectory, entry_file_1)
                    .then(function (_) {
                    _this.nativeAudio.preloadSimple(id_1, entry_file_1);
                    _this.nativeAudio.play(id_1);
                }).catch(function (err) {
                    var targetPath = _this.file.dataDirectory + entry_file_1;
                    var trustHosts = true;
                    var options = {};
                    _this.fileTransfer.download(entry_url_1, targetPath, trustHosts, options);
                })
                    .then(function (entry) {
                    _this.nativeAudio.preloadSimple(id_1, entry_file_1);
                    _this.nativeAudio.play(id_1);
                }, function (error) { console.log(error); });
                ;
            }
        }
        else {
            this.showAlert();
        }
    };
    WordModal.prototype.onSuccess = function (id) {
        console.log(id);
        // console.log('loaded audio ${id} with path of ${path}'); 
    };
    ;
    WordModal.prototype.onError = function (err) {
        console.log(err);
        var alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: "We don't have audio for that entry.",
            buttons: ['OK']
        });
        alert.present();
    };
    ;
    WordModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    WordModal.prototype.showOptions = function () {
        var _this = this;
        // Object with options used to create the alert
        var options = {
            title: 'Optional fields',
            message: 'Choose which optional fields to display',
            inputs: [],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        var checkedOptions = [];
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var item = data_1[_i];
                            for (var key in _this.entry.optional) {
                                if (_this.entry.optional[key] === item) {
                                    checkedOptions.push(key);
                                }
                            }
                        }
                        console.log(checkedOptions);
                        _this.checkedOptions = checkedOptions;
                    }
                }
            ]
        };
        // Now we add the radio buttons
        for (var _i = 0, _a = this.optionalSelection; _i < _a.length; _i++) {
            var option = _a[_i];
            options.inputs.push({ name: 'options', value: this.entry.optional[option], label: option, type: 'checkbox', checked: this.checkChecked(option) });
        }
        var alert = this.alertCtrl.create(options);
        alert.present();
    };
    WordModal.prototype.checkChecked = function (option) {
        if (this.checkedOptions.indexOf(option) >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    WordModal.prototype.imageError = function () {
        this.displayImages = false;
    };
    WordModal.prototype.toggleFav = function (entry) {
        var index = __WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* WaldayuInfo */].dataDict[entry.source_id].data.indexOf(entry);
        if (entry.favourited) {
            __WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* WaldayuInfo */].dataDict[entry.source_id].data[index].favourited = false;
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* WaldayuInfo */].dataDict[entry.source_id].data[index].favourited = true;
        }
        var favs = [];
        for (var _i = 0, _a = Object.keys(__WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* WaldayuInfo */].dataDict); _i < _a.length; _i++) {
            var source = _a[_i];
            favs = favs.concat(__WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* WaldayuInfo */].dataDict[source].data.filter(function (entry) { return entry.favourited; }));
        }
        this.waldayuService.setBookmarks(favs);
    };
    WordModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'word-modal',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\word-modal.component.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button (click)="dismiss()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Word Info\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card>\n\n    <div *ngIf="displayImages">\n\n      <img (click)="playAudio(entry)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="entry.img"/>\n\n    </div>\n\n    <ion-card-content>\n\n      <ion-card-title>\n\n        {{entry.display_form[0]}}\n\n      </ion-card-title>\n\n      <p class="definition">\n\n        {{entry.definition[0]}}\n\n      </p>\n\n      <div *ngIf="entry.optional && optional">\n\n        <p class="option" *ngFor="let option of checkedOptions; let i = index">\n\n          {{option}} - {{entry.optional[option]}}\n\n        </p>\n\n      </div>\n\n    </ion-card-content>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="danger" icon-left (click)="toggleFav(entry)">\n\n          <ion-icon name=\'ios-star\' [class.ion-ios-star-outline]="entry.favourited != true"></ion-icon>\n\n          Favourite\n\n        </button>\n\n      </ion-col>\n\n      <ion-col text-center>\n\n        <button ion-button clear small color="danger" icon-left (click)="playAudio(entry)">\n\n          <ion-icon name=\'musical-notes\'></ion-icon>\n\n          Listen\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="entry.optional">\n\n  <ion-toolbar>\n\n    <ion-item>\n\n      <ion-toggle checked="false" [(ngModel)]="optional"></ion-toggle>\n\n      <ion-label (click)="showOptions()">Show optional information</ion-label>\n\n    </ion-item>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\word-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_7__app_waldayu_service__["a" /* WaldayuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__app_waldayu_service__["a" /* WaldayuService */]) === "function" && _k || Object])
    ], WordModal);
    return WordModal;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=word-modal.component.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StoryPage = (function () {
    function StoryPage(navParams, alertCtrl) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.checkedOptions = [];
        this.index = 0;
        this.storySlides = [];
        this.slides = this.navParams.get('storyPages');
        this.image = this.navParams.get('cover');
        this.title = this.navParams.get('title');
        this.subtitle = this.navParams.get('subtitle');
        this.storyPages = this.navParams.get('storyPages');
        if (this.storyPages[0].optional) {
            this.optionalSelection = Object.keys(this.storyPages[0].optional);
        }
    }
    StoryPage.prototype.showOptions = function () {
        var _this = this;
        // Object with options used to create the alert
        var options = {
            title: 'Optional fields',
            message: 'Choose which optional fields to display',
            inputs: [],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        var checkedOptions = [];
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var item = data_1[_i];
                            for (var key in _this.storyPages[_this.index].optional) {
                                if (_this.storyPages[_this.index].optional[key] === item) {
                                    checkedOptions.push(key);
                                }
                            }
                        }
                        _this.checkedOptions = checkedOptions;
                    }
                }
            ]
        };
        // Now we add the radio buttons
        for (var _i = 0, _a = this.optionalSelection; _i < _a.length; _i++) {
            var option = _a[_i];
            options.inputs.push({ name: 'options', value: this.storyPages[0].optional[option], label: option, type: 'checkbox', checked: this.checkChecked(option) });
        }
        var alert = this.alertCtrl.create(options);
        alert.present();
    };
    StoryPage.prototype.checkChecked = function (option) {
        if (this.checkedOptions.indexOf(option) >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    StoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\stories\story.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title></ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="showOptions()">\n\n        <ion-icon name="ios-settings"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="tutorial-page">\n\n\n\n  <ion-slides pager #storySlider>\n\n    <ion-slide>\n\n      <img [src]="image" class="slide-image" />\n\n      <h2 class="slide-title" [innerHTML]="title"></h2>\n\n      <p [innerHTML]="subtitle"></p>\n\n    </ion-slide>\n\n    <ion-slide *ngFor="let slide of slides">\n\n      <img [src]="slide.image" class="slide-image" />\n\n      <p class="slide-title" [innerHTML]="slide.gitksan"></p>\n\n      <p class="option" *ngFor="let option of checkedOptions">\n\n        {{slide.optional[option]}}\n\n      </p>\n\n      <p [innerHTML]="slide.english"></p>\n\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\stories\story.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], StoryPage);
    return StoryPage;
}());

//# sourceMappingURL=story.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["a" /* About */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["b" /* Bookmarks */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["c" /* Browse */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["f" /* Flashcards */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["g" /* Random */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["h" /* Search */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["d" /* EntryList */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["k" /* WordModal */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* Flashcard */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["i" /* StoriesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["j" /* StoryPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["a" /* About */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["b" /* Bookmarks */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["c" /* Browse */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["f" /* Flashcards */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["g" /* Random */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["h" /* Search */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["d" /* EntryList */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["k" /* WordModal */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* Flashcard */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["i" /* StoriesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["j" /* StoryPage */]
            ],
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_11__waldayu_service__["a" /* WaldayuService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["b" /* FileTransferObject */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaldayuService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WaldayuService = (function () {
    function WaldayuService(storage) {
        this.storage = storage;
        this.bookmarks = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.categories = {};
        if (__WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].allAudioEntries.length > 0) {
            this.categories["audio"] = {};
            this.categories["audio"]["audio"] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].allAudioEntries;
        }
        for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].dataKeys; _i < _a.length; _i++) {
            var key = _a[_i];
            this.categories[key] = {};
            this.categories[key][key] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].dataDict[key].data;
        }
    }
    WaldayuService.prototype.setBookmarks = function (val) {
        this.bookmarks.next(val);
        this.storage.set(__WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].config.L1.name + __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].config.build, JSON.stringify(val));
    };
    WaldayuService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _a || Object])
    ], WaldayuService);
    return WaldayuService;
    var _a;
}());

//# sourceMappingURL=waldayu.service.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, storage, waldayuService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.waldayuService = waldayuService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages__["h" /* Search */];
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Search', component: __WEBPACK_IMPORTED_MODULE_5__pages__["h" /* Search */] },
            { title: 'Browse', component: __WEBPACK_IMPORTED_MODULE_5__pages__["c" /* Browse */] },
            { title: 'Pick a Random Word!', component: __WEBPACK_IMPORTED_MODULE_5__pages__["g" /* Random */] },
            { title: 'Bookmarks', component: __WEBPACK_IMPORTED_MODULE_5__pages__["b" /* Bookmarks */] },
            { title: 'Flashcards', component: __WEBPACK_IMPORTED_MODULE_5__pages__["f" /* Flashcards */] },
            { title: 'Stories', component: __WEBPACK_IMPORTED_MODULE_5__pages__["i" /* StoriesPage */] },
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_5__pages__["a" /* About */] }
        ];
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.storage.ready().then(function () {
                var language_name = __WEBPACK_IMPORTED_MODULE_6__global__["a" /* WaldayuInfo */].config.L1.name;
                var build_no = __WEBPACK_IMPORTED_MODULE_6__global__["a" /* WaldayuInfo */].config.build;
                var id = language_name + build_no;
                // retrieve favourited entries from storage and tag favourited entries
                _this.storage.get(id).then(function (val) {
                    if (val) {
                        val = JSON.parse(val);
                        var favs = [];
                        for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                            var fav = val_1[_i];
                            for (var _a = 0, _b = __WEBPACK_IMPORTED_MODULE_6__global__["a" /* WaldayuInfo */].dataDict[fav.source_id].data; _a < _b.length; _a++) {
                                var entry = _b[_a];
                                if (entry.entryID[0] === fav.entryID[0]) {
                                    entry.favourited = true;
                                    favs.push(entry);
                                    break;
                                }
                            }
                        }
                        _this.waldayuService.setBookmarks(favs);
                    }
                });
            });
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.isiPad = function () {
        return this.platform.is('iPad');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\app\app.html"*/'<!--<ion-split-pane [when]="isiPad">-->\n\n  <ion-menu [content]="content">\n\n    <ion-header>\n\n      <ion-toolbar>\n\n        <ion-title>Menu</ion-title>\n\n      </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content scrollbar-y-auto on-swipe-right="menuOpen">\n\n      <ion-list>\n\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n      </ion-list>\n\n    </ion-content>\n\n\n\n  </ion-menu>\n\n\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<!--</ion-split-pane>-->'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__waldayu_service__["a" /* WaldayuService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return About; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var About = (function () {
    function About(navCtrl) {
        this.navCtrl = navCtrl;
    }
    About = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>About</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <h3>About page</h3>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], About);
    return About;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bookmarks; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Bookmarks = (function () {
    function Bookmarks(navCtrl, waldayuService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.waldayuService = waldayuService;
        this.edit = false;
        this.waldayuService.bookmarks.subscribe(function (bookmarks) { _this.bookmarks = bookmarks; });
    }
    Bookmarks.prototype.removeEntries = function (bookmarks) {
        this.waldayuService.setBookmarks(bookmarks.filter(function (bookmark) { return !bookmark.checked; }));
        this.toggleEdit();
    };
    Bookmarks.prototype.toggleEdit = function () {
        this.edit = !this.edit;
    };
    Bookmarks = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bookmarks',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\bookmarks\bookmarks.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Bookmarks</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button (click)="edit = !edit">\n\n      <ion-icon name="trash" *ngIf="!edit"></ion-icon>\n\n      <span *ngIf="edit">cancel</span>\n\n    </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <entry-list [entries]=\'bookmarks\' [parentEdit]="edit"></entry-list>\n\n  <div class=\'center\'>\n\n    <button ion-button color="danger" class="remove" *ngIf="edit" (click)="removeEntries(bookmarks)">Remove selected bookmarks</button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\bookmarks\bookmarks.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__["a" /* WaldayuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__["a" /* WaldayuService */]) === "function" && _b || Object])
    ], Bookmarks);
    return Bookmarks;
    var _a, _b;
}());

//# sourceMappingURL=bookmarks.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Browse = (function () {
    function Browse(navCtrl, waldayuService) {
        this.navCtrl = navCtrl;
        this.waldayuService = waldayuService;
        this.currentEntries = window['dataDict']["Hindle & Rigsby"].data;
        this.currentTen = window['get10'](window['dataDict']["Hindle & Rigsby"].data, 0);
        this.letters = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].config.L1.lettersInLanguage;
        this.selectedCategory = "Hindle & Rigsby";
        this.startIndex = 0;
        // currentBrowsingLetter: String = this.letters[this.currentBrowsingEntries[0].sorting_form[0]];
        this.letterSelectOptions = { title: "Select a Letter" };
        this.categorySelectOptions = { title: "Select a Category" };
        this.initializeEntries(waldayuService);
    }
    Browse.prototype.initializeEntries = function (waldayuService) {
        this.displayCategories = Object.keys(waldayuService.categories);
        // Add letter index to first words of that letter in entries
        this.letterInit();
    };
    // Determine whether letter occurs word-initially
    Browse.prototype.letterInit = function () {
        var letters = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].config.L1.lettersInLanguage;
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
    // Scroll to previous 10 entries
    Browse.prototype.prev10 = function () {
        if (this.startIndex - 10 > 0) {
            this.startIndex -= 10;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = 0;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
        }
    };
    // Scroll to next 10 entries
    Browse.prototype.next10 = function () {
        if (this.startIndex + 10 < this.currentEntries.length) {
            this.startIndex += 10;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = this.currentEntries.length - 10;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
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
                this.currentTen = window['get10'](this.currentEntries, this.startIndex);
                break;
            }
        }
    };
    Browse.prototype.selectCategory = function (category) {
        this.currentEntries = this.waldayuService.categories[category][category];
        this.currentTen = window['get10'](this.currentEntries, 0);
        this.letterInit();
    };
    Browse = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-browse',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\browse\browse.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Browse</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content scrollbar-y-auto>\n\n\n\n  <ion-list mode="ios">\n\n    <ion-item mode="ios">\n\n      <ion-label class="label-left" mode="ios">Select a Category</ion-label>\n\n      <ion-select mode="ios" [(ngModel)]="selectedCategory" (ngModelChange)="selectCategory(selectedCategory)" [selectOptions]="categorySelectOptions">\n\n        <ion-option *ngFor=\'let category of displayCategories\'>{{category}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item mode="ios">\n\n      <ion-label class="label-left" mode="ios">Select a Letter</ion-label>\n\n      <ion-select mode="ios" [(ngModel)]="selectedLetter" (ngModelChange)="scrollTo($event)" [selectOptions]="letterSelectOptions">\n\n        <ion-option *ngFor=\'let letter of displayLetters\'>{{letter}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n  <div class="entry-container">\n\n    <entry-list [entries]=\'currentTen\'></entry-list>\n\n  </div>\n\n \n\n\n\n</ion-content>\n\n\n\n <ion-footer>\n\n    <ion-toolbar>\n\n      <ion-buttons left class="bar-buttons bar-buttons-ios">\n\n        <button ion-button icon-only (click)="prev10()">\n\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      <ion-buttons end class="bar-buttons bar-buttons-ios">\n\n        <button ion-button icon-only (click)="next10()">\n\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n    </ion-toolbar>\n\n  </ion-footer>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\browse\browse.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__["a" /* WaldayuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__["a" /* WaldayuService */]) === "function" && _b || Object])
    ], Browse);
    return Browse;
    var _a, _b;
}());

//# sourceMappingURL=browse.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flashcards; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flashcard_modal_component__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Flashcards = (function () {
    function Flashcards(navCtrl, modalCtrl, waldayuService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.waldayuService = waldayuService;
        this.alertCtrl = alertCtrl;
        this.deckSelectOptions = { title: "Select a Deck" };
        this.decks = Object.keys(waldayuService.categories);
        this.flashcardStyles = [{ "title": "Passive", "info": "This is the easiest method. It involves seeing the {{name}} word and guessing English." },
            { "title": "Active", "info": "This method is designed to test your spelling of the {{ name }} word. You are provided with the English, and have to guess the {{ name } } word." },
            { "title": "Non-Written", "info": "This method is entirely without any written prompt.Try and guess the word in both English and {{ name }}!" }];
    }
    Flashcards.prototype.startFlashcards = function () {
        if (this.deck === undefined) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'Did you select a deck?',
                buttons: ['Try again']
            });
            alert_1.present();
        }
        else if (this.selectedFlashcardStyle === undefined) {
            var alert_2 = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'Did you select a flashcard style?',
                buttons: ['Try again']
            });
            alert_2.present();
        }
        else {
            var flashcardModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__flashcard_modal_component__["a" /* Flashcard */], { deck: this.deck, style: this.selectedFlashcardStyle });
            flashcardModal.present();
        }
    };
    Flashcards = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-flashcards',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\flashcards\flashcards.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Flashcards</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n\n\n  <ion-list class="deck-select">\n\n    <ion-list-header>\n\n      First, select a flashcard deck:\n\n    </ion-list-header>\n\n    <ion-item mode="ios">\n\n      <ion-label class="label-left" mode="ios">Select a Deck</ion-label>\n\n      <ion-select mode="ios" [(ngModel)]="deck" [selectOptions]="deckSelectOptions">\n\n        <ion-option *ngFor=\'let deck of decks\'>{{deck}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-list radio-group [(ngModel)]="selectedFlashcardStyle">\n\n    <ion-list-header text-wrap>\n\n      Then, select a style of learning between the following options:\n\n    </ion-list-header>\n\n    <ion-item *ngFor="let style of flashcardStyles">\n\n      <ion-label>{{style.title}}</ion-label>\n\n      <p>{{style.info}}</p>\n\n      <ion-radio value="{{style.title}}"></ion-radio>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <div class="center"><button ion-button secondary (click)=\'startFlashcards()\'>Click here to start!</button></div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\flashcards\flashcards.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__["a" /* WaldayuService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], Flashcards);
    return Flashcards;
}());

//# sourceMappingURL=flashcards.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Random = (function () {
    function Random(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Random.prototype.getRandom = function () {
        this.entries = window['getRandom10']();
    };
    Random = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-random',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\random\random.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Random</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <div class="center"><button ion-button secondary (click)=\'getRandom()\'>Click here for 10 Random words</button></div>\n\n  <div class="entry-container" *ngIf="entries">\n\n    <entry-list [entries]="entries"></entry-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\random\random.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Random);
    return Random;
}());

//# sourceMappingURL=random.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { WaldayuService } from '../../app/waldayu.service'
var Search = (function () {
    function Search(navCtrl) {
        this.navCtrl = navCtrl;
        this.entries = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].allEntries;
        this.searchQuery = '';
    }
    Search.prototype.getEnglish = function () {
        var results = [];
        var re = new RegExp(this.searchQuery, 'i');
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (re.test(entry.definition[0])) {
                results.push(entry);
            }
        }
        var sorted_answers = results.sort(function (a, b) {
            console.log(a["displayDefinition"][0].length - b["displayDefinition"][0].length);
            return a["displayDefinition"][0].length - b["displayDefinition"][0].length;
        });
        return (sorted_answers.slice(0, 9));
    };
    ;
    // Get English and target results
    Search.prototype.getResults = function () {
        console.log(this.searchQuery.length);
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
            selector: 'page-search',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\search\search.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Search</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <ion-searchbar (ionInput)="getResults()" [(ngModel)]="searchQuery"></ion-searchbar>\n\n  <div *ngIf="searchQuery?.length > 1">\n\n    <div class="result-container" *ngIf="matches?.length > 0">\n\n      <h4>Matches</h4>\n\n      <entry-list [entries]="matches"></entry-list>\n\n    </div>\n\n    <div class="result-container" *ngIf="partMatches?.length > 0">\n\n      <h4>Partial Matches</h4>\n\n      <entry-list [entries]="partMatches"></entry-list>\n\n    </div>\n\n    <div class="result-container" *ngIf="maybeMatches?.length > 0">\n\n      <h4>Maybe you meant this?</h4>\n\n      <entry-list [entries]="maybeMatches"></entry-list>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\search\search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Entry */
var Entry = (function () {
    function Entry() {
    }
    return Entry;
}());

//# sourceMappingURL=entry.model.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__word_modal_component__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EntryList = (function () {
    function EntryList(navCtrl, viewCtrl, modalCtrl, waldayuService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.waldayuService = waldayuService;
        this.edit = false;
        this.pageName = viewCtrl.name;
    }
    EntryList.prototype.showModal = function (clicked_entry) {
        var wordModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__word_modal_component__["a" /* WordModal */], { entry: clicked_entry });
        wordModal.present();
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
    EntryList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'entry-list',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\entry-list.component.html"*/'<!--<ion-list>\n\n  <div>\n\n    <ion-item *ngFor="let entry of entries">\n\n      {{ entry.word[0] }} - {{ entry.definition[0]}}\n\n    </ion-item>\n\n  </div>\n\n</ion-list>-->\n\n<div id="browseEntries" class="browseElements">\n\n  <ion-list>\n\n    <div>\n\n      <ion-item class="matchContainer" (click)="showModal(entry)" *ngFor="let entry of entries" text-wrap>\n\n        <ion-checkbox color="danger" checked="false" *ngIf="edit" [(ngModel)]="entry.checked"></ion-checkbox>\n\n        <ion-label>\n\n          <div class="matchLeftContainer">\n\n            <span class="response matchLeftDiv" [ngClass]="{\'langMatched\': entry.type === \'git\' && pageName === \'Search\'}">{{entry.word[0]}}</span>\n\n          </div>\n\n          <div class="matchRightContainer">\n\n            <span class="response matchRightDiv" [ngClass]="{\'langMatched\': entry.type === \'eng\' && pageName === \'Search\'}">{{entry.definition[0]}}</span>\n\n          </div>\n\n        </ion-label>\n\n      </ion-item>\n\n    </div>\n\n  </ion-list>\n\n</div>\n\n\n\n<!--<div class="list">\n\n  <label class="item item-input item-select" ng-show="categoryNames.length > 1">\n\n                <div class="input-label wrapword">\n\n                    Select a Category\n\n                </div>\n\n                <select data-ng-model="selectedCategory" ng-change="categorySelect()">\n\n                    <option data-ng-repeat="category in displayCategories" value="{{$index}}">{{category}}\n\n                    </option>\n\n                </select>\n\n            </label>\n\n  <label class="item item-input item-select">\n\n                <div class="input-label">\n\n                    Select a Letter\n\n                </div>\n\n                <select data-ng-init="letterScroll" ng-model="selectedLetter" ng-change="letterSelect()">\n\n                    <option data-ng-repeat="letter in scroll" value="{{$index}}" ng-if="letterInit($index)">{{letter}}\n\n                    </option>\n\n                </select>\n\n            </label>\n\n</div>-->'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\entry-list.component.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__["a" /* WaldayuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__["a" /* WaldayuService */]) === "function" && _d || Object])
    ], EntryList);
    return EntryList;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=entry-list.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__story__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StoriesPage = (function () {
    function StoriesPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.storyPage = __WEBPACK_IMPORTED_MODULE_2__story__["a" /* StoryPage */];
        this.stories = [
            {
                title: "Mr. Alayst",
                subtitle: "Written by Dr. M. Jane Smith & Illustrated by Michelle Stoney",
                cover: "assets/img/stories/titlemrlazy.jpg",
                storyPages: [{
                        'english': "Mr. Alayst resided in Lax Alayst, this was the name of the village. All they did was sleep in this village. Even the trees were lazy. Little flowers, hung their heads and slept. The grass didn’t grow, all they did was sleep. The bird songs were funny, one would start singing and fall asleep.",
                        'gitksan': "Jok’t Mr. Alayst go’ohl Lax Alayst, nit wahl gal ts’ap diit’. Xsa wowax jap’t diit go’ohl anjok’ diit’. Ts’ahl gangan, ii ap hoti alilayst diit’. Guba majagelee, ii hoti dip his lislisxw aw t’imges diit’, wowax diit. Nee dii ’wihl limxshl habasxw, sa wowax jap diit’. Am asgii hl he’hl limx guba ts’uuts’, wo sit’aa’maahl hli k’yulit, ii gwo wok’t.",
                        'image': "assets/img/stories/p1mrlazy.jpg",
                        'optional': {
                            'breakdown': "nit=hl gwi=hl jab-i-si'm",
                            'gloss': "3sg.iii=cn what=cn make-tr-2pl.ii"
                        }
                    }, {
                        'english': 'Mr. Alayst didn’t get up until after lunch because he was lazy. Finally he would get up and sit and eat. This took awhile because he would sleep. After he finished eating he would sit on the porch and sleep. He did nothing. He did not chop wood. He did not go fishing. Perhaps the fish were lazy.',
                        'gitksan': "’Wagayt galanhl silxwsa  wil  dii  gyuksxwhl  Mr.  Alayst. Wil guu alaysit’. Ii gas ligi gwinitxw’t ii t’aa wo ga yookxwt’, nakw ’wihl wilt, wil wo ga wok’t. Ii hlaa hleekxw’t ii wo t’aat’ lax tawnt’ ii wo ga wok’t. Nee dii gwi ji jabit. Nee dii yats lakxw’t. Nee dii ixw’t. Hoti alalys’t dim mahl hon.",
                        'image': "assets/img/stories/p2mrlazy.jpg",
                        'optional': {
                            'breakdown': "hothii nit=hl gwi=hl jab-i-si'm",
                            'gloss': "again 3sg.iii=cn what=cn make-tr-2pl.ii"
                        }
                    }, {
                        'english': 'Once when he was sleeping he dreamt that someone came to give him big money he had won. They couldn’t wake him up.That was the end of his laziness. He got up early after his dream. He was afraid to sleep in.',
                        'gitksan': "Ii k’i’yhl ho wok’t, ii xsiwogihl ’witxwhl ant ginamhl wii tisim daala  xsdaa’t. Ii gos jiit gyuksin diit nit.  Ii nit wil ha’xw wihl alaysit. Gan wila ’wihl hlook galanhl xsiwok’t.  Xpts’axw nit dim gina wok’t.",
                        'image': "assets/img/stories/p3mrlazy.jpg",
                        'optional': {
                            'breakdown': "nit=hl gwi=hl jab-i-si'm",
                            'gloss': "3sg.iii=cn what=cn make-tr-2pl.ii"
                        }
                    }, {
                        'english': 'He was energetic. He was no longer called Mr. Alayst. He did good for as long as he lived.',
                        'gitksan': "Ii ’wihl hlgu galx’t. Ii nee diit hoti sa wa diit’ nit as Mr. Alays’t. Ii amhl laa ’wihl wilt’ ga’nakw didilst’t.",
                        'image': "assets/img/stories/p4mrlazy.jpg",
                        'optional': {
                            'breakdown': "hothii nit=hl gwi=hl jab-i-si'm",
                            'gloss': "again 3sg.iii=cn what=cn make-tr-2pl.ii"
                        }
                    }]
            },
            {
                title: "Ts'onny G̲o'ohl Wilp Sihon",
                subtitle: "Written by Dr. M. Jane Smith & Illustrated by Michelle Stoney",
                cover: "assets/img/stories/titlesmokehouse.jpg",
                storyPages: [{
                        'english': 'Johnny went to the smokehouse. He washed the poles. Johnny washed the filleting table. Johnny hung the fish. Johnny let it smoke overnight.',
                        'gitksan': "Yee’t Ts’onny go’ohl wilpsihon. Saksin’thl ’wit. Saksin’thl ha nii ts’al. Lixswis Ts’onnyhl hon’txw’t. K’i’yhl axxw’t mi’indins Ts’onnyhl hontxw’t.",
                        'image': "assets/img/stories/p1smokehouse.jpg",
                        'optional': {
                            'breakdown': "nit=hl gwi=hl jab-i-si'm",
                            'gloss': "3sg.iii=cn what=cn make-tr-2pl.ii"
                        }
                    }, {
                        'english': 'Johnny let the fire go out. He was going to fillet. Johnny cut off the tails of the fish. Johnny cut off the belly. Johnny filleted the fish. Johnny cut off strips. Johnny hung his filleted fish, strips and bellies.',
                        'gitksan': "Ts’akdis Ts’onnyhl mi’in. Wil hlaa yukw dim ts’al’t. Saa k’otsdis Ts’onny hlatsx. Saa k’otsdis Ts’onnyhl ts’ok’. Ts’al’t Ts’onny. Si huxws’t Ts’onny. Liswis Ts’onnyhl ts’al’t, huxws ganhl ts’ok’.",
                        'image': "assets/img/stories/p2smokehouse.jpg",
                        'optional': {
                            'breakdown': "hothii nit=hl gwi=hl jab-i-si'm",
                            'gloss': "again 3sg.iii=cn what=cn make-tr-2pl.ii"
                        }
                    }, {
                        'english': 'Johnny again built a fire.  Johnny guarded the smokehouse. He did not want the fish to burn. He did not want the bear to steal his fish. Nice smokehouse.',
                        'gitksan': "hIi hatsim hoo si lakxws Ts’onny. Lihlxis Ts’onny wilpsihon. Nee dii hasak’t dim mihl hontxw’t. Nee dii hasak’t dim’t liluxws hl smaxhl hontxw’t. Amhl wilp sihons Ts’onny.",
                        'image': "assets/img/stories/p3smokehouse.jpg",
                        'optional': {
                            'breakdown': "hothii nit=hl gwi=hl jab-i-si'm",
                            'gloss': "again 3sg.iii=cn what=cn make-tr-2pl.ii"
                        }
                    }]
            }
        ];
    }
    StoriesPage.prototype.push = function (story) {
        this.navCtrl.push(this.storyPage, story);
    };
    StoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stories',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\stories\stories.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Stories</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="card-background-page">\n\n\n\n  <ion-card *ngFor="let story of stories" (click)="push(story)">\n\n    <img [src]="story.cover"/>\n\n    <div class="card-title">{{story.title}}</div>\n\n    <!--<div class="card-subtitle">{{story.subtitle}}</div>-->\n\n  </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\stories\stories.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], StoriesPage);
    return StoriesPage;
}());

//# sourceMappingURL=stories.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaldayuInfo; });
var WaldayuInfo = Object.freeze({
    allEntries: window['getAllEntries'](),
    allAudioEntries: window['getAllAudioEntries'](),
    config: window['config'],
    dataDict: window['dataDict'],
    dataKeys: Object.keys(window['dataDict']),
});
//# sourceMappingURL=global.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map