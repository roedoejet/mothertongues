webpackJsonp([0],{

/***/ 117:
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
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 158:
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
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__about_about__ = __webpack_require__(282);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__about_about__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bookmarks_bookmarks__ = __webpack_require__(283);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__bookmarks_bookmarks__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browse_browse__ = __webpack_require__(287);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__browse_browse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__flashcards_flashcards__ = __webpack_require__(288);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__flashcards_flashcards__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__flashcards_flashcard_modal_component__ = __webpack_require__(202);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__flashcards_flashcard_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__random_random__ = __webpack_require__(289);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__random_random__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(290);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__search_search__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_entry_model__ = __webpack_require__(291);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_entry_list_component__ = __webpack_require__(292);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__shared_entry_list_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_word_modal_component__ = __webpack_require__(203);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_9__shared_word_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__songs_songs__ = __webpack_require__(293);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_10__songs_songs__["a"]; });











//# sourceMappingURL=index.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flashcard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(106);
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
    function Flashcard(alertCtrl, navCtrl, navParams, waldayuService, viewCtrl, file, plt, transfer, nativeAudio) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.waldayuService = waldayuService;
        this.viewCtrl = viewCtrl;
        this.file = file;
        this.plt = plt;
        this.transfer = transfer;
        this.nativeAudio = nativeAudio;
        this.displayImages = true; //default show images, turns to false on 404
        this.startIndex = 0;
        this.audio_playing = [];
        this.fileTransfer = this.transfer.create();
        this.deck = navParams.get('deck');
        this.categories = waldayuService.categories;
        this.card = this.categories[this.deck][this.startIndex];
        this.front = true;
        try {
            this.image = 'assets/img/' + this.card.img[0];
        }
        catch (error) {
            this.image = "";
        }
        this.style = navParams.get('style');
    }
    // Go to previous card in deck
    Flashcard.prototype.prev1 = function () {
        if (this.startIndex - 1 > 0) {
            this.startIndex -= 1;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
        else {
            this.startIndex = 0;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
    };
    // Go to next card in deck
    Flashcard.prototype.next1 = function () {
        if (this.startIndex + 1 < this.categories[this.deck].length) {
            this.startIndex += 1;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
        else {
            this.startIndex = this.categories[this.deck].length - 1;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
    };
    Flashcard.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    Flashcard.prototype.onSuccess = function (id) {
        console.log(id);
        // console.log('loaded audio ${id} with path of ${path}'); 
    };
    ;
    Flashcard.prototype.onError = function (err) {
        console.log(err);
        var alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: "We don't have audio for that entry.",
            buttons: ['OK']
        });
        alert.present();
    };
    ;
    Flashcard.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'There is no audio for this yet.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ;
    Flashcard.prototype.stopAllAudio = function () {
        this.audio_playing.forEach(function (element) {
            element.pause();
        });
        this.audio_playing = [];
    };
    Flashcard.prototype.playAudioTrack = function (entry, track) {
        var _this = this;
        console.log(track);
        var audio_file = track.filename + ".mp3";
        var audio_url = track.filename + ".mp3";
        var id = entry.entryID;
        var path = "https://roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + audio_url;
        console.log(path);
        var audio = new Audio(path);
        this.audio_playing.push(audio);
        audio.onended = function () { return _this.audio_playing.pop(); };
        audio.play();
    };
    Flashcard.prototype.playAudioTrack1 = function (entry, track) {
        var _this = this;
        track.audio_file = track.filename + ".mp3";
        track.audio_url = track.filename + ".mp3";
        if (this.plt.is('core') || this.plt.is('mobileweb')) {
            console.log('web ran');
            if (track !== undefined && track.audio_file !== undefined && track.audio_url !== undefined) {
                var id = entry.entryID;
                var path = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url;
                console.log(path);
                var audio = new Audio(path);
                audio.play();
                // this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, (error)=>{console.log(error)});
                // this.nativeAudio.play(id).then(this.onSuccess, (error)=>{ this.onError(error) });
            }
            else {
                console.log('boo');
                this.showAlert();
            }
        }
        else if (this.plt.is('ios')) {
            var id = entry.entryID;
            var path = "assets/audio/" + track.audio_file;
            this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
            this.nativeAudio.play(id).then(this.onSuccess, this.onError);
        }
        else if (this.plt.is('android')) {
            console.log('android ran');
            if (track != undefined) {
                var id_1 = entry.entryID;
                var track_url_1 = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url;
                var track_file_1 = "assets/audio/" + track.audio_file;
                this.file.checkFile(this.file.dataDirectory, track_file_1)
                    .then(function (_) {
                    _this.nativeAudio.preloadSimple(id_1, track_file_1);
                    _this.nativeAudio.play(id_1);
                }).catch(function (err) {
                    var targetPath = _this.file.dataDirectory + track_file_1;
                    var trustHosts = true;
                    var options = {};
                    _this.fileTransfer.download(track_url_1, targetPath, trustHosts, options);
                })
                    .then(function (track) {
                    _this.nativeAudio.preloadSimple(id_1, track_file_1);
                    _this.nativeAudio.play(id_1);
                }, function (error) { _this.onError(error); });
                ;
            }
        }
        else {
            this.showAlert();
        }
    };
    Flashcard.prototype.imageError = function () {
        this.displayImages = false;
    };
    Flashcard.prototype.toggleFav = function (entry) {
        this.waldayuService.toggleBookmark(entry);
        // let index = WaldayuInfo.dataDict[entry.source_id].data.indexOf(entry)
        // if (entry.favourited) {
        //   WaldayuInfo.dataDict[entry.source_id].data[index].favourited = false;
        // } else {
        //   WaldayuInfo.dataDict[entry.source_id].data[index].favourited = true;
        // }
        // let favs = []
        // for (let source of Object.keys(WaldayuInfo.dataDict)) {
        //   favs = favs.concat(WaldayuInfo.dataDict[source].data.filter(entry => entry.favourited))
        // }
        // this.waldayuService.setBookmarks(favs);
    };
    Flashcard.prototype.favourited = function (entry) {
        return this.waldayuService.bookmarks.value.indexOf(entry) > -1;
    };
    Flashcard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'flashcard-modal',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\flashcards\flashcard-modal.component.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button (click)="dismiss()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Flashcard Quiz\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content ng-switch="style" on-swipe-up="front = !front">\n\n\n\n  <ion-card *ngIf="style === \'Active\'">\n\n\n\n    <div *ngIf="displayImages">\n\n      <img (click)="playAudio(card)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="card.img" />\n\n    </div>\n\n    <ion-card-content>\n\n      <ion-card-title *ngIf="!front">\n\n        {{card.display_form[0]}}\n\n      </ion-card-title>\n\n      <ion-card-title class="definition" *ngIf="front">\n\n        {{card.definition[0]}}\n\n      </ion-card-title>\n\n      <div *ngIf="card.optional && optional">\n\n        <p class="option" *ngFor="let option of checkedOptions; let i = index">\n\n          {{option}} - {{card.optional[option]}}\n\n        </p>\n\n      </div>\n\n    </ion-card-content>\n\n\n\n    <ion-row *ngIf="card.audio.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Audio\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n          <button ion-item *ngFor="let track of card.audio" (click)="playAudioTrack(card, track)">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            Speaker: {{ track.speaker }}\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row *ngIf="card.sentence.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Sentences\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n\n\n          <button ion-item *ngFor="let sentence of card.sentence; let i = index" (click)="playAudioTrack(card, card.sentence_audio[i])">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            <h2>{{ sentence }}</h2>\n\n            <h4>{{ card.sentence_definition[i] }}</h4>\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(card)">\n\n          <ion-icon *ngIf="favourited(card)" name="ios-bookmarks"></ion-icon>\n\n          <ion-icon *ngIf="!favourited(card)" name="ios-bookmarks-outline"></ion-icon>\n\n          Bookmark\n\n        </button>\n\n        <button ion-button clear small color="primary" icon-left (click)="front = !front">\n\n          <ion-icon name=\'refresh\'></ion-icon>\n\n          <span *ngIf="front">Flip to back</span><span *ngIf="!front">Flip to front</span>\n\n        </button>\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n\n\n\n\n  <ion-card *ngIf="style === \'Passive\'">\n\n\n\n    <div *ngIf="displayImages">\n\n      <img (click)="playAudio(card)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="card.img" />\n\n    </div>\n\n    <ion-card-content>\n\n      <ion-card-title *ngIf="front">\n\n        {{card.display_form[0]}}\n\n      </ion-card-title>\n\n      <ion-card-title class="definition" *ngIf="!front">\n\n        {{card.definition[0]}}\n\n      </ion-card-title>\n\n      <div *ngIf="card.optional && optional">\n\n        <p class="option" *ngFor="let option of checkedOptions; let i = index">\n\n          {{option}} - {{card.optional[option]}}\n\n        </p>\n\n      </div>\n\n    </ion-card-content>\n\n\n\n    <ion-row *ngIf="card.audio.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Audio\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n          <button ion-item *ngFor="let track of card.audio" (click)="playAudioTrack(card, track)">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            Speaker: {{ track.speaker }}\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row *ngIf="card.sentence.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Sentences\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n\n\n          <button ion-item *ngFor="let sentence of card.sentence; let i = index" (click)="playAudioTrack(card, card.sentence_audio[i])">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            <h2>{{ sentence }}</h2>\n\n            <h4>{{ card.sentence_definition[i] }}</h4>\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(card)">\n\n          <ion-icon *ngIf="favourited(card)" name="ios-bookmarks"></ion-icon>\n\n          <ion-icon *ngIf="!favourited(card)" name="ios-bookmarks-outline"></ion-icon>\n\n          Bookmark\n\n        </button>\n\n        <button ion-button clear small color="primary" icon-left (click)="front = !front">\n\n          <ion-icon name=\'refresh\'></ion-icon>\n\n          <span *ngIf="front">Flip to back</span><span *ngIf="!front">Flip to front</span>\n\n        </button>\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n\n\n\n\n  <ion-card *ngIf="style === \'Non-Written\'">\n\n\n\n    <div *ngIf="displayImages">\n\n      <img (click)="playAudio(card)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="card.img" />\n\n    </div>\n\n    <ion-card-content *ngIf="!front">\n\n      <ion-card-title>\n\n        {{card.display_form[0]}}\n\n      </ion-card-title>\n\n      <p class="definition">\n\n        {{card.definition[0]}}\n\n      </p>\n\n      <div *ngIf="card.optional && optional">\n\n        <p class="option" *ngFor="let option of checkedOptions; let i = index">\n\n          {{option}} - {{card.optional[option]}}\n\n        </p>\n\n      </div>\n\n    </ion-card-content>\n\n\n\n    <ion-row *ngIf="card.audio.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Audio\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n          <button ion-item *ngFor="let track of card.audio" (click)="playAudioTrack(card, track)">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            Speaker: {{ track.speaker }}\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row *ngIf="card.sentence.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Sentences\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n\n\n          <button ion-item *ngFor="let sentence of card.sentence; let i = index" (click)="playAudioTrack(card, card.sentence_audio[i])">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            <h2>{{ sentence }}</h2>\n\n            <h4>{{ card.sentence_definition[i] }}</h4>\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(card)">\n\n          <ion-icon *ngIf="favourited(card)" name="ios-bookmarks"></ion-icon>\n\n          <ion-icon *ngIf="!favourited(card)" name="ios-bookmarks-outline"></ion-icon>\n\n          Bookmark\n\n        </button>\n\n        <button ion-button clear small color="primary" icon-left (click)="front = !front">\n\n          <ion-icon name=\'refresh\'></ion-icon>\n\n          <span *ngIf="front">Flip to back</span><span *ngIf="!front">Flip to front</span>\n\n        </button>\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <ion-buttons left class="bar-buttons bar-buttons-ios">\n\n      <button ion-button icon-only (click)="prev1()">\n\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end class="bar-buttons bar-buttons-ios">\n\n      <button ion-button icon-only (click)="next1()">\n\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\flashcards\flashcard-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__["a" /* WaldayuService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], Flashcard);
    return Flashcard;
}());

//# sourceMappingURL=flashcard-modal.component.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_waldayu_service__ = __webpack_require__(25);
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
        this.default_sentence_i = 0;
        this.audio_playing = [];
        this.fileTransfer = this.transfer.create();
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
    WordModal.prototype.stopAllAudio = function () {
        this.audio_playing.forEach(function (element) {
            element.pause();
        });
        this.audio_playing = [];
    };
    WordModal.prototype.playAudioTrack = function (entry, track) {
        var _this = this;
        console.log(track);
        var audio_file = track.filename + ".mp3";
        var audio_url = track.filename + ".mp3";
        var id = entry.entryID;
        var path = "https://roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + audio_url;
        console.log(path);
        var audio = new Audio(path);
        this.audio_playing.push(audio);
        audio.onended = function () { return _this.audio_playing.pop(); };
        audio.play();
    };
    // on hold while other audio figured out
    WordModal.prototype.playAudioTrack1 = function (entry, track) {
        var _this = this;
        track.audio_file = track.filename + ".mp3";
        track.audio_url = track.filename + ".mp3";
        if (this.plt.is('core') || this.plt.is('mobileweb')) {
            console.log('web ran');
            if (track !== undefined && track.audio_file !== undefined && track.audio_url !== undefined) {
                var id = entry.entryID;
                var path = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url;
                console.log(path);
                var audio = new Audio(path);
                audio.play();
                // this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, (error)=>{console.log(error)});
                // this.nativeAudio.play(id).then(this.onSuccess, (error)=>{ this.onError(error) });
            }
            else {
                console.log('boo');
                this.showAlert();
            }
        }
        else if (this.plt.is('ios')) {
            var id = entry.entryID;
            var path = "assets/audio/" + track.audio_file;
            this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
            this.nativeAudio.play(id).then(this.onSuccess, this.onError);
        }
        else if (this.plt.is('android')) {
            console.log('android ran');
            if (track != undefined) {
                var id_1 = entry.entryID;
                var track_url_1 = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url;
                var track_file_1 = "assets/audio/" + track.audio_file;
                console.log('checking ' + track_file_1);
                this.file.checkFile(this.file.dataDirectory, track_file_1)
                    .then(function (track) {
                    console.log('trying to play');
                    _this.nativeAudio.preloadSimple(id_1, track_file_1);
                    _this.nativeAudio.play(id_1);
                }).catch(function (err) {
                    console.log('couldnot play');
                    var targetPath = _this.file.dataDirectory + track_file_1;
                    var trustHosts = true;
                    var options = {};
                    console.log('dowloading from ' + track_url_1);
                    console.log(targetPath);
                    _this.fileTransfer.download(track_url_1, targetPath, trustHosts, options)
                        .then(function (track) {
                        console.log('trying to play');
                        _this.nativeAudio.preloadSimple(id_1, track_file_1);
                        _this.nativeAudio.play(id_1);
                    }, function (error) { _this.onError(error); });
                });
            }
        }
        else {
            this.showAlert();
        }
    };
    WordModal.prototype.playAudio = function (entry) {
        var _this = this;
        // this.stopAllAudio()
        // Create Media object from src
        // if (ionic.Platform.platform() == 'macintel') {
        if (this.plt.is('core') || this.plt.is('mobileweb')) {
            if (entry !== undefined && entry.audio_file !== undefined && entry.audio_url !== undefined) {
                var id = entry.entryID;
                var path = "http://mobile.firstvoices.com/FirstVoices/" + entry.audio_url;
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
            var path = "assets/audio/" + entry.audio_file;
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
                var id_2 = entry.entryID;
                var entry_url_1 = "http://mobile.firstvoices.com/FirstVoices/" + entry.audio_url;
                var entry_file_1 = "assets/audio/" + entry.audio_file[0];
                this.file.checkFile(this.file.dataDirectory, entry_file_1)
                    .then(function (_) {
                    _this.nativeAudio.preloadSimple(id_2, entry_file_1);
                    _this.nativeAudio.play(id_2);
                }).catch(function (err) {
                    var targetPath = _this.file.dataDirectory + entry_file_1;
                    var trustHosts = true;
                    var options = {};
                    _this.fileTransfer.download(entry_url_1, targetPath, trustHosts, options);
                })
                    .then(function (entry) {
                    _this.nativeAudio.preloadSimple(id_2, entry_file_1);
                    _this.nativeAudio.play(id_2);
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
        this.waldayuService.toggleBookmark(entry);
    };
    WordModal.prototype.favourited = function (entry) {
        return this.waldayuService.bookmarks.value.indexOf(entry) > -1;
    };
    WordModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'word-modal',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\word-modal.component.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button (click)="dismiss()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Word Info\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card>\n\n    <div *ngIf="displayImages">\n\n      <img (click)="playAudio(entry)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="entry.img" />\n\n    </div>\n\n    <ion-card-content>\n\n      <ion-card-title>\n\n        {{entry.display_form[0]}}\n\n      </ion-card-title>\n\n      <p class="definition">\n\n        {{entry.definition[0]}}\n\n      </p>\n\n      <div *ngIf="entry.optional && optional">\n\n        <p class="option" *ngFor="let option of checkedOptions; let i = index">\n\n          {{option}} - {{entry.optional[option]}}\n\n        </p>\n\n      </div>\n\n    </ion-card-content>\n\n\n\n    <ion-row *ngIf="entry.audio.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Audio\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n          <button ion-item *ngIf="audio_playing.length > 0" (click)="stopAllAudio()">\n\n            Stop all audio\n\n            <ion-icon name="hand" item-start></ion-icon>\n\n          </button>\n\n          <button ion-item *ngFor="let track of entry.audio" (click)="playAudioTrack(entry, track)">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            Speaker: {{ track.speaker }}\n\n          </button>\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row *ngIf="entry.sentence.length > 0">\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Sentences\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n\n\n          <button ion-item *ngFor="let sentence of entry.sentence; let i = index" (click)="playAudioTrack(entry, entry.sentence_audio[i][0])">\n\n            <ion-icon name="musical-notes" item-start></ion-icon>\n\n            <h2>{{ sentence }}</h2>\n\n            <h4>{{ entry.sentence_definition[i] }}</h4>\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(entry)">\n\n          <ion-icon *ngIf="favourited(entry)" name="ios-bookmarks"></ion-icon>\n\n          <ion-icon *ngIf="!favourited(entry)" name="ios-bookmarks-outline"></ion-icon>\n\n          Bookmark\n\n        </button>\n\n      </ion-col>\n\n      <!-- <ion-col text-center>\n\n        <button ion-button clear small color="primary" icon-left (click)="playAudio(entry)">\n\n          <ion-icon name=\'musical-notes\'></ion-icon>\n\n          Listen\n\n        </button>\n\n      </ion-col> -->\n\n    </ion-row>\n\n\n\n  </ion-card>\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="entry.optional">\n\n  <ion-toolbar>\n\n    <ion-item>\n\n      <ion-toggle checked="false" [(ngModel)]="optional"></ion-toggle>\n\n      <ion-label (click)="showOptions()">Show optional information</ion-label>\n\n    </ion-item>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\word-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__app_waldayu_service__["a" /* WaldayuService */]])
    ], WordModal);
    return WordModal;
}());

//# sourceMappingURL=word-modal.component.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages__ = __webpack_require__(201);
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
                __WEBPACK_IMPORTED_MODULE_10__pages__["j" /* WordModal */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* Flashcard */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["i" /* SongsPage */]
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
                __WEBPACK_IMPORTED_MODULE_10__pages__["j" /* WordModal */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* Flashcard */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["i" /* SongsPage */]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
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
            // this.categories["audio"] = {};
            // this.categories["audio"]["audio"] = WaldayuInfo.allAudioEntries;
        }
        for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].dataKeys; _i < _a.length; _i++) {
            var key = _a[_i];
            this.categories[key] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].dataDict[key].data;
        }
        var semantic_categories = __WEBPACK_IMPORTED_MODULE_4_lodash__["uniq"](__WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].allEntries.map(function (entry) { return entry.theme[0].toLowerCase(); })).sort();
        var _loop_1 = function (cat) {
            this_1.categories[cat] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].allEntries.filter(function (entry) { return entry.theme[0] === cat; });
        };
        var this_1 = this;
        for (var _b = 0, semantic_categories_1 = semantic_categories; _b < semantic_categories_1.length; _b++) {
            var cat = semantic_categories_1[_b];
            _loop_1(cat);
        }
    }
    WaldayuService.prototype.setBookmarks = function (val) {
        this.bookmarks.next(val);
        this.storage.set(__WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].config.L1.name + __WEBPACK_IMPORTED_MODULE_1__global__["a" /* WaldayuInfo */].config.build, JSON.stringify(val));
    };
    WaldayuService.prototype.toggleBookmark = function (entry) {
        var i = this.bookmarks.value.indexOf(entry);
        var bookmarks;
        if (i > -1) {
            bookmarks = this.bookmarks.value;
            bookmarks.splice(i, 1);
        }
        else if (i < 0) {
            bookmarks = this.bookmarks.value.concat([entry]);
        }
        this.setBookmarks(bookmarks);
    };
    WaldayuService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], WaldayuService);
    return WaldayuService;
}());

//# sourceMappingURL=waldayu.service.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages__ = __webpack_require__(201);
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
            { title: "Songs", component: __WEBPACK_IMPORTED_MODULE_5__pages__["i" /* SongsPage */] },
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

/***/ 282:
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
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>About</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <p>The ʔayʔaǰuθəm speaking people live among four communities: ɬəʔamɛn, k̓ómoks, χʷɛmaɬkʷu, & ƛohos. Our people are considered\n\n    to be the most Northern Coast Salish group. The Salish sea has been our highway to connecting to each other since time\n\n    immemorial. We are all interconnected, related, and share the same stories and taʔow.\n\n  </p>\n\n  <p>\n\n    Our four communities agreed to work together to produce a resource that can be used by all of our people. We are indebted\n\n    to our elders who are now gone, and the present elders we are working with. They have been very generous to give their\n\n    knowledge and time. We raise our hands to all of them for their dedication, knowledge, and patience. Our people want\n\n    to honor the memory of our ƛaχƛaχay (elders) that previously held vast tracks of knowledge throughout the traditional\n\n    territory, and lived according to our taʔow.\n\n  </p>\n\n  <p>\n\n    This ʔayʔaǰuθəm dictionary is a work in progress and is being developed in partnership with Dr. Henry Davis, of UBC.\n\n  </p>\n\n  <p>\n\n    We will continue to work to breath life into ʔayʔaǰuθəm, as language and culture brings healing and pride back to our people.\n\n  </p>\n\n  <p>\n\n    č̓ɛč̓ɛhaθɛšt!\n\n  </p>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], About);
    return About;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 283:
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_waldayu_service__["a" /* WaldayuService */]])
    ], Bookmarks);
    return Bookmarks;
}());

//# sourceMappingURL=bookmarks.js.map

/***/ }),

/***/ 287:
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
        this.currentEntries = window['dataDict']["words"].data;
        this.currentTen = window['get10'](window['dataDict']["words"].data, 0);
        this.letters = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].config.L1.lettersInLanguage;
        this.selectedCategory = "words";
        this.startIndex = 0;
        // currentBrowsingLetter: String = this.letters[this.currentBrowsingEntries[0].sorting_form[0]];
        this.letterSelectOptions = { title: "Select a Letter" };
        this.categorySelectOptions = { title: "Select a Category" };
        this.initializeEntries(waldayuService);
    }
    Browse.prototype.initializeEntries = function (waldayuService) {
        console.log(waldayuService.categories);
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
        this.currentEntries = this.waldayuService.categories[category];
        this.currentTen = window['get10'](this.currentEntries, 0);
        this.letterInit();
    };
    Browse = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-browse',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\browse\browse.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Browse</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content scrollbar-y-auto>\n\n\n\n  <ion-list mode="ios">\n\n    <ion-item mode="ios">\n\n      <ion-label class="label-left" mode="ios">Select a Category</ion-label>\n\n      <ion-select mode="ios" [(ngModel)]="selectedCategory" (ngModelChange)="selectCategory(selectedCategory)" [selectOptions]="categorySelectOptions">\n\n        <ion-option *ngFor=\'let category of displayCategories\'>{{category}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item mode="ios">\n\n      <ion-label class="label-left" mode="ios">Select a Letter</ion-label>\n\n      <ion-select mode="ios" [(ngModel)]="selectedLetter" (ngModelChange)="scrollTo($event)" [selectOptions]="letterSelectOptions">\n\n        <ion-option *ngFor=\'let letter of displayLetters\'>{{letter}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n  <div class="entry-container">\n\n    <entry-list [entries]=\'currentTen\'></entry-list>\n\n  </div>\n\n \n\n\n\n</ion-content>\n\n\n\n <ion-footer>\n\n    <ion-toolbar>\n\n      <ion-buttons left class="bar-buttons bar-buttons-ios">\n\n        <button ion-button icon-only (click)="prev10()">\n\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      <ion-buttons end class="bar-buttons bar-buttons-ios">\n\n        <button ion-button icon-only (click)="next10()">\n\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n    </ion-toolbar>\n\n  </ion-footer>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\browse\browse.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__["a" /* WaldayuService */]])
    ], Browse);
    return Browse;
}());

//# sourceMappingURL=browse.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flashcards; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flashcard_modal_component__ = __webpack_require__(202);
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
        this.flashcardStyles = [
            { "title": "Passive", "info": "This is the easiest method. It involves seeing the {{name}} word and guessing English." },
            { "title": "Active", "info": "This method is designed to test your spelling of the {{ name }} word. You are provided with the English, and have to guess the {{ name } } word." },
            { "title": "Non-Written", "info": "This method is entirely without any written prompt. Try and guess the word in both English and {{ name }}!" }
        ];
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

/***/ 289:
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
            selector: 'page-random',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\random\random.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Random</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <div class="center"><button ion-button color="ternary" (click)=\'getRandom()\'>Click here for 10 Random words</button></div>\n\n  <div class="entry-container" *ngIf="entries">\n\n    <entry-list [entries]="entries"></entry-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\random\random.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Random);
    return Random;
}());

//# sourceMappingURL=random.js.map

/***/ }),

/***/ 290:
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
            return a["displayDefinition"][0].length - b["displayDefinition"][0].length;
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
            selector: 'page-search',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\search\search.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Search</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding scrollbar-y-auto>\n\n  <ion-searchbar (ionInput)="getResults()" [(ngModel)]="searchQuery" autocapitalize="none"></ion-searchbar>\n\n  <div *ngIf="searchQuery?.length > 1">\n\n    <div class="result-container" *ngIf="matches?.length > 0">\n\n      <h4>Matches</h4>\n\n      <entry-list [entries]="matches" [searchterm]="searchQuery"></entry-list>\n\n    </div>\n\n    <div class="result-container" *ngIf="partMatches?.length > 0">\n\n      <h4>Partial Matches</h4>\n\n      <entry-list [entries]="partMatches" [searchterm]="searchQuery"></entry-list>\n\n    </div>\n\n    <div class="result-container" *ngIf="maybeMatches?.length > 0">\n\n      <h4>Maybe you meant this?</h4>\n\n      <entry-list [entries]="maybeMatches" [searchterm]="searchQuery"></entry-list>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\search\search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 291:
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

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__word_modal_component__ = __webpack_require__(203);
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
            selector: 'entry-list',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\entry-list.component.html"*/'<!--<ion-list>\n\n  <div>\n\n    <ion-item *ngFor="let entry of entries">\n\n      {{ entry.word[0] }} - {{ entry.definition[0]}}\n\n    </ion-item>\n\n  </div>\n\n</ion-list>-->\n\n<div id="browseEntries" class="browseElements">\n\n  <ion-list>\n\n    <div>\n\n      <ion-item class="matchContainer" (click)="showModal(entry)" *ngFor="let entry of entries" text-wrap>\n\n        <ion-checkbox color="danger" checked="false" *ngIf="edit" [(ngModel)]="entry.checked"></ion-checkbox>\n\n        <ion-label>\n\n          <div class="matchLeftContainer">\n\n            <span class="response matchLeftDiv" [ngClass]="{\'langMatched\': entry.type === \'git\' && pageName === \'Search\'}">{{entry.word[0]}}</span>\n\n          </div>\n\n          <div class="matchRightContainer">\n\n            <span class="response matchRightDiv" [innerHTML]="highlight(entry.displayDefinition[0])"></span>\n\n          </div>\n\n        </ion-label>\n\n      </ion-item>\n\n    </div>\n\n  </ion-list>\n\n</div>\n\n\n\n<!--<div class="list">\n\n  <label class="item item-input item-select" ng-show="categoryNames.length > 1">\n\n                <div class="input-label wrapword">\n\n                    Select a Category\n\n                </div>\n\n                <select data-ng-model="selectedCategory" ng-change="categorySelect()">\n\n                    <option data-ng-repeat="category in displayCategories" value="{{$index}}">{{category}}\n\n                    </option>\n\n                </select>\n\n            </label>\n\n  <label class="item item-input item-select">\n\n                <div class="input-label">\n\n                    Select a Letter\n\n                </div>\n\n                <select data-ng-init="letterScroll" ng-model="selectedLetter" ng-change="letterSelect()">\n\n                    <option data-ng-repeat="letter in scroll" value="{{$index}}" ng-if="letterInit($index)">{{letter}}\n\n                    </option>\n\n                </select>\n\n            </label>\n\n</div>-->'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\shared\entry-list.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__app_waldayu_service__["a" /* WaldayuService */]])
    ], EntryList);
    return EntryList;
}());

//# sourceMappingURL=entry-list.component.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SongsPage; });
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



/**
 * Generated class for the SongsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SongsPage = (function () {
    function SongsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.song_filter = 'all';
        this.audio_playing = [];
        this.songs = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].songs;
        this.all_songs = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].songs;
        this.trad_songs = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].songs.filter(function (song) { return song.category[0] === "Traditional"; });
        this.nurs_songs = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* WaldayuInfo */].songs.filter(function (song) { return song.category[0] === "Nursery rhyme"; });
    }
    SongsPage.prototype.stopAllAudio = function () {
        this.audio_playing.forEach(function (element) {
            element.pause();
        });
        this.audio_playing = [];
    };
    SongsPage.prototype.playAudioTrack = function (track) {
        var _this = this;
        track.audio_file = track.audio[0] + ".mp3";
        track.audio_url = track.audio[0] + ".mp3";
        var path = "https://roedoejet.github.io/wmrc-ayajuthem/resources/audio/songs/" + track.audio_url;
        var audio = new Audio(path);
        this.audio_playing.push(audio);
        audio.onended = function () { return _this.audio_playing.pop(); };
        audio.play();
    };
    SongsPage.prototype.changeSongs = function (filter) {
        if (filter === 'trad') {
            this.songs = this.trad_songs;
        }
        else if (filter === 'nurs') {
            this.songs = this.nurs_songs;
        }
        else {
            this.songs = this.all_songs;
        }
    };
    SongsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SongsPage');
    };
    SongsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-songs',template:/*ion-inline-start:"C:\Users\pinea\wmrc-mobile-3\src\pages\songs\songs.html"*/'<!--\n  Generated template for the SongsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Songs</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="card-background-page">\n\n  <div padding>\n    <ion-segment [(ngModel)]="song_filter" (ngModelChange)="changeSongs(song_filter)">\n      <ion-segment-button value="all" checked>\n        All\n      </ion-segment-button>\n      <ion-segment-button value="trad">\n        Traditional\n      </ion-segment-button>\n      <ion-segment-button value="nurs">\n        Nursery Rhymes\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n  <ion-card *ngFor="let songInput of songs; let i = index">\n    <ion-card-header>\n      {{songInput.title}}\n    </ion-card-header>\n    <ion-card-content>\n      <div *ngIf="songInput.lyrics">\n        <ion-card-title>ʔayʔaǰuθəm</ion-card-title>\n        <p>\n          {{ songInput.ayajuthem }}\n        </p>\n        <ion-card-title>English</ion-card-title>\n        <p>\n          {{ songInput.translation }}\n        </p>\n      </div>\n      <div *ngIf="songInput.more">\n        <ion-card-title>Singers</ion-card-title>\n        <p>\n          {{ songInput.singers }}\n        </p>\n        <ion-card-title *ngIf="songInput.protocol[0]">Protocol</ion-card-title>\n        <p>\n          {{ songInput.protocol }}\n        </p>\n      </div>\n    </ion-card-content>\n    <ion-list>\n      <button ion-item *ngIf="audio_playing.length > 0" (click)="stopAllAudio()">\n        Stop Audio\n        <ion-icon name="hand" item-start></ion-icon>\n      </button>\n      <button ion-item *ngIf="audio_playing.length <= 0" (click)="playAudioTrack(songInput)">\n        <ion-icon name="musical-notes" item-start></ion-icon>\n        Play Audio\n      </button>\n      <button ion-item (click)="songInput.lyrics = !songInput.lyrics">\n        <ion-icon name="clipboard" item-start></ion-icon>\n        <span *ngIf="songInput.lyrics">Hide</span>\n        <span *ngIf="!songInput.lyrics">Show</span> Lyrics\n      </button>\n      <button ion-item (click)="songInput.more = !songInput.more">\n        <ion-icon name="more" item-start></ion-icon>\n        <span *ngIf="songInput.more">Less</span>\n        <span *ngIf="!songInput.more">More</span> Info\n      </button>\n    </ion-list>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\pinea\wmrc-mobile-3\src\pages\songs\songs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], SongsPage);
    return SongsPage;
}());

//# sourceMappingURL=songs.js.map

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
    songs: window['songs']
    //... more of your variables
});
//# sourceMappingURL=global.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map