(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_model/Card.ts":
/*!********************************!*\
  !*** ./src/app/_model/Card.ts ***!
  \********************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
var Card = /** @class */ (function () {
    function Card() {
    }
    return Card;
}());



/***/ }),

/***/ "./src/app/_model/CardSummary.ts":
/*!***************************************!*\
  !*** ./src/app/_model/CardSummary.ts ***!
  \***************************************/
/*! exports provided: CardSummary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardSummary", function() { return CardSummary; });
var CardSummary = /** @class */ (function () {
    function CardSummary() {
    }
    return CardSummary;
}());



/***/ }),

/***/ "./src/app/_model/Deck.ts":
/*!********************************!*\
  !*** ./src/app/_model/Deck.ts ***!
  \********************************/
/*! exports provided: Deck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deck", function() { return Deck; });
var Deck = /** @class */ (function () {
    function Deck() {
    }
    return Deck;
}());



/***/ }),

/***/ "./src/app/_model/User.ts":
/*!********************************!*\
  !*** ./src/app/_model/User.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());



/***/ }),

/***/ "./src/app/_sevice/admin.service.ts":
/*!******************************************!*\
  !*** ./src/app/_sevice/admin.service.ts ***!
  \******************************************/
/*! exports provided: AdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminService", function() { return AdminService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login.service */ "./src/app/_sevice/login.service.ts");





var rootURL = 'http://localhost:3000/api/v1';
var AdminService = /** @class */ (function () {
    function AdminService(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'X-CSRF': this.loginService.getCSRFToken() })
        };
    }
    AdminService.prototype.createUser = function (adminId, user) {
        return this.http.post(rootURL + '/admin/' + adminId + '/users', user, this.httpOptions);
    };
    AdminService.prototype.getUsers = function (adminId, term) {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([]);
        }
        return this.http.get(rootURL + '/admin/' + adminId + '/users' + '/?keywords=' + term, this.httpOptions);
    };
    AdminService.prototype.updateUser = function (adminId, userId, enabled) {
        return this.http.put(rootURL + '/admin/' + adminId + '/users/' + userId, { enabled: enabled }, this.httpOptions);
    };
    AdminService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"]])
    ], AdminService);
    return AdminService;
}());



/***/ }),

/***/ "./src/app/_sevice/login.service.ts":
/*!******************************************!*\
  !*** ./src/app/_sevice/login.service.ts ***!
  \******************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var rootURL = 'http://localhost:3000/api/v1';
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.login = function (email, password) {
        return this.http.post(rootURL + '/login', { email: email, password: password }, { observe: 'response' });
    };
    LoginService.prototype.logout = function () {
        localStorage.clear();
        return this.http.post(rootURL + '/logout', {});
    };
    LoginService.prototype.setUser = function (user) {
        localStorage.setItem('user', JSON.stringify(user));
    };
    LoginService.prototype.setCSRFToken = function (csrf) {
        localStorage.setItem('csrf-token', csrf);
    };
    LoginService.prototype.getCSRFToken = function () {
        return localStorage.getItem('csrf-token');
    };
    LoginService.prototype.getUser = function () {
        return JSON.parse(localStorage.getItem('user'));
    };
    LoginService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], LoginService);
    return LoginService;
}());



/***/ }),

/***/ "./src/app/_sevice/user.service.ts":
/*!*****************************************!*\
  !*** ./src/app/_sevice/user.service.ts ***!
  \*****************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _model_Deck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_model/Deck */ "./src/app/_model/Deck.ts");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login.service */ "./src/app/_sevice/login.service.ts");





var rootURL = 'http://localhost:3000/api/v1';
var UserService = /** @class */ (function () {
    function UserService(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'X-CSRF': this.loginService.getCSRFToken() })
        };
    }
    UserService.prototype.getCardById = function (userId, id) {
        return this.http.get(rootURL + '/users/' + userId + '/cards/' + id, this.httpOptions);
    };
    UserService.prototype.getCards = function (userId, name, type, set, color, page) {
        if (page === void 0) { page = 1; }
        return this.http.get(rootURL + '/users/' + userId + '/cards?name=' + name + '&type=' + type + '&colors=' + color + '&set=' + set + '&page=' + page, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'X-CSRF': this.loginService.getCSRFToken() }),
            observe: 'response',
        });
    };
    UserService.prototype.getDecks = function (userId) {
        return this.http.get(rootURL + '/users/' + userId + '/decks', this.httpOptions);
    };
    UserService.prototype.createDeck = function (userId, deckName, description) {
        var deck = new _model_Deck__WEBPACK_IMPORTED_MODULE_3__["Deck"]();
        deck.name = deckName;
        deck.description = description;
        return this.http.post(rootURL + '/users/' + userId + '/decks', deck, this.httpOptions);
    };
    UserService.prototype.deleteDeck = function (userId, deckId) {
        return this.http.delete(rootURL + '/users/' + userId + '/decks/' + deckId, this.httpOptions);
    };
    UserService.prototype.getADeck = function (userId, deckId) {
        return this.http.get(rootURL + '/users/' + userId + '/decks/' + deckId, this.httpOptions);
    };
    UserService.prototype.updateDeck = function (userId, deckId, deck) {
        return this.http.put(rootURL + '/users/' + userId + '/decks/' + deckId, { 'deck': deck }, this.httpOptions);
    };
    UserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _component_user_user_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/user/user.component */ "./src/app/component/user/user.component.ts");
/* harmony import */ var _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/admin/admin.component */ "./src/app/component/admin/admin.component.ts");
/* harmony import */ var _component_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/login/login.component */ "./src/app/component/login/login.component.ts");
/* harmony import */ var _component_user_decks_user_decks_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/user-decks/user-decks.component */ "./src/app/component/user-decks/user-decks.component.ts");
/* harmony import */ var _component_user_cards_user_cards_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/user-cards/user-cards.component */ "./src/app/component/user-cards/user-cards.component.ts");
/* harmony import */ var _component_card_detail_card_detail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component/card-detail/card-detail.component */ "./src/app/component/card-detail/card-detail.component.ts");
/* harmony import */ var _component_deck_detail_deck_detail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/deck-detail/deck-detail.component */ "./src/app/component/deck-detail/deck-detail.component.ts");










var routes = [
    { path: 'login', component: _component_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"] },
    {
        path: 'user', component: _component_user_user_component__WEBPACK_IMPORTED_MODULE_3__["UserComponent"], children: [
            {
                path: 'decks',
                component: _component_user_decks_user_decks_component__WEBPACK_IMPORTED_MODULE_6__["UserDecksComponent"],
            },
            {
                path: 'cards',
                component: _component_user_cards_user_cards_component__WEBPACK_IMPORTED_MODULE_7__["UserCardsComponent"],
            }, {
                path: 'decks/:did',
                component: _component_deck_detail_deck_detail_component__WEBPACK_IMPORTED_MODULE_9__["DeckDetailComponent"],
            },
            {
                path: '**',
                redirectTo: 'cards',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'cards/detail',
        component: _component_card_detail_card_detail_component__WEBPACK_IMPORTED_MODULE_8__["CardDetailComponent"]
    },
    { path: 'admin', component: _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".background {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: flex;\n    flex-direction: column;\n    background-image: url('background.jpg');\n    background-color: white;\n    flex: 1 0 auto;\n    overflow: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLE9BQU87SUFDUCxRQUFRO0lBQ1IsU0FBUztJQUNULGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsdUNBQWtEO0lBQ2xELHVCQUF1QjtJQUN2QixjQUFjO0lBQ2QsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFja2dyb3VuZCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdzcmMvYXNzZXRzL2JhY2tncm91bmQuanBnJyk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgZmxleDogMSAwIGF1dG87XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'client';
        this.isBackground = true;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _component_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/login/login.component */ "./src/app/component/login/login.component.ts");
/* harmony import */ var _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/admin/admin.component */ "./src/app/component/admin/admin.component.ts");
/* harmony import */ var _component_user_user_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/user/user.component */ "./src/app/component/user/user.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _component_card_detail_card_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/card-detail/card-detail.component */ "./src/app/component/card-detail/card-detail.component.ts");
/* harmony import */ var _component_user_decks_user_decks_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/user-decks/user-decks.component */ "./src/app/component/user-decks/user-decks.component.ts");
/* harmony import */ var _component_user_cards_user_cards_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component/user-cards/user-cards.component */ "./src/app/component/user-cards/user-cards.component.ts");
/* harmony import */ var _component_deck_detail_deck_detail_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./component/deck-detail/deck-detail.component */ "./src/app/component/deck-detail/deck-detail.component.ts");
/* harmony import */ var _component_deck_list_deck_list_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./component/deck-list/deck-list.component */ "./src/app/component/deck-list/deck-list.component.ts");















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _component_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_6__["AdminComponent"],
                _component_user_user_component__WEBPACK_IMPORTED_MODULE_7__["UserComponent"],
                _component_card_detail_card_detail_component__WEBPACK_IMPORTED_MODULE_10__["CardDetailComponent"],
                _component_user_decks_user_decks_component__WEBPACK_IMPORTED_MODULE_11__["UserDecksComponent"],
                _component_user_cards_user_cards_component__WEBPACK_IMPORTED_MODULE_12__["UserCardsComponent"],
                _component_deck_detail_deck_detail_component__WEBPACK_IMPORTED_MODULE_13__["DeckDetailComponent"],
                _component_deck_list_deck_list_component__WEBPACK_IMPORTED_MODULE_14__["DeckListComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/component/admin/admin.component.css":
/*!*****************************************************!*\
  !*** ./src/app/component/admin/admin.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".userTable{\n    width:100%;\n    margin-top: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2FkbWluL2FkbWluLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2FkbWluL2FkbWluLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXNlclRhYmxle1xuICAgIHdpZHRoOjEwMCU7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/component/admin/admin.component.html":
/*!******************************************************!*\
  !*** ./src/app/component/admin/admin.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light shadow\">\n  <a class=\"navbar-brand\" [routerLink]=\"[ '/admin']\">Magic The Gathering</a>\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n    aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n    <ul class=\"navbar-nav mx-auto btn-group\">\n      <button class=\"nav-link\" class=\"btn btn-lg \">Admin Console</button>\n    </ul>\n    <div class=\"my-lg-0\">\n      <a *ngIf=\"user\">Admin: {{user.firstName}} {{user.lastName}} </a>\n      <button class=\"btn btn-outline-secondary my-2 my-sm-0 ml-2\" (click)=\"logout()\">Logout</button>\n    </div>\n  </div>\n</nav>\n\n<div class=\"container\">\n  <div class=\"\">\n    <div class=\"\">\n        <div class=\"card mt-4 shadow\">\n            <div class=\"card-body\">\n              <div class=\"input-group mt-2\">\n                <div class=\"input-group-prepend\">\n                  <label class=\"input-group-text sameSize\">email</label>\n                </div>\n                <input [(ngModel)]=\"email\" name='email' class=\"form-control\" type=\"email\">\n              </div>\n              <div class=\"input-group mt-2\">\n                <div class=\"input-group-prepend\">\n                  <label class=\"input-group-text sameSize\">password</label>\n                </div>\n                <input [(ngModel)]=\"password\" type=\"password\" name=\"password\" class=\"form-control\">\n              </div>\n    \n              <div class=\"mt-2\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text sameSize\">firstName</span>\n                  </div>\n                  <input [(ngModel)]=\"firstname\" name=\"firstname\" class=\"form-control\" type=\"text\">\n    \n                </div>\n              </div>\n    \n              <div class=\"mt-2\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text sameSize\">lastName</span>\n                  </div>\n                  <input [(ngModel)]=\"lastname\" name=\"lastname\" class=\"form-control\" type=\"text\">\n                </div>\n              </div>\n              <div class=\"input-group mt-2\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text sameSize\">Role</span>\n                </div>\n                <select [(ngModel)]=\"selectedRole\" class=\"custom-select\">\n                  <option>user</option>\n                  <option>admin</option>\n                </select>\n                <span class=\" sameSize btn\">enabled</span>\n                <input type=\"checkbox\" name=\"enabled\" [(ngModel)]=\"enabled\" class=\"form-control\">\n              </div>\n              <button class=\"btn btn-success mt-2 form-control\" (click)=\"createUser()\">create user</button>\n            </div>\n          </div>\n\n      <div class=\"input-group mt-4 shadow\">\n        <div class=\"input-group-prepend\">\n          <label class=\"input-group-text\">Search:</label>\n        </div>\n        <select class=\"custom-select\" [(ngModel)]=\"statusValue\" (ngModelChange)=\"search(searchBox.value)\">\n          <option value=\"true\">Enabled</option>\n          <option value=\"false\">Disabled</option>\n        </select>\n        <select class=\"custom-select\" [(ngModel)]=\"roleValue\" (ngModelChange)=\"search(searchBox.value)\">\n          <option value=\"user\">User</option>\n          <option value=\"admin\">Admin</option>\n        </select>\n        <input #searchBox (input)=\"search(searchBox.value)\" placeholder=\"keywords\" class=\"form-control\" />\n      </div>\n      <table class=\"userTable table shadow\">\n        <tr>\n          <th>Id</th>\n          <th>Email</th>\n          <th>FirstName</th>\n          <th>LastName</th>\n          <th>Role</th>\n          <th>Enabled</th>\n          <th>Action</th>\n        </tr>\n        <tr *ngFor=\"let user of users$ | async\">\n          <td>{{user._id}}</td>\n          <td>{{user.email}}</td>\n          <td>{{user.firstName}}</td>\n          <td>{{user.lastName}}</td>\n          <td>{{user.role}}</td>\n          <td>{{user.enabled}}</td>\n          <td>\n            <button class=\"btn btn-sm btn-secondary\" *ngIf=\"user.enabled\" (click)=\"changeStatus(user,searchBox.value)\">Disabled</button>\n            <button class=\"btn btn-sm btn-success\" *ngIf=\"!user.enabled\" (click)=\"changeStatus(user,searchBox.value)\">Enabled</button>\n          </td>\n        </tr>\n      </table>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/component/admin/admin.component.ts":
/*!****************************************************!*\
  !*** ./src/app/component/admin/admin.component.ts ***!
  \****************************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_sevice/login.service */ "./src/app/_sevice/login.service.ts");
/* harmony import */ var src_app_model_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_model/User */ "./src/app/_model/User.ts");
/* harmony import */ var _sevice_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_sevice/admin.service */ "./src/app/_sevice/admin.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");








var AdminComponent = /** @class */ (function () {
    function AdminComponent(loginService, router, adminService) {
        this.loginService = loginService;
        this.router = router;
        this.adminService = adminService;
        this.searchTerms = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this.enabled = false;
        this.statusValue = 'true';
        this.roleValue = 'user';
        var user = this.loginService.getUser();
        if (user && user.role == 'admin') {
            this.user = user;
        }
        else {
            this.router.navigate(['/login']);
            return;
        }
    }
    // Push a search term into the observable stream.
    AdminComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.users$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["debounceTime"])(300), 
        // // ignore new term if same as previous term
        // distinctUntilChanged(),
        // switch to new search observable each time the term changes
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(function (term) { return _this.adminService.getUsers(_this.user._id, term).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (arr) {
            return arr.filter(function (user) {
                return user.role == _this.roleValue && user.enabled == (_this.statusValue == 'true');
            });
        })); }));
    };
    AdminComponent.prototype.logout = function () {
        var _this = this;
        this.loginService.logout().subscribe(function (_) {
            _this.router.navigate(['/login']);
        });
    };
    AdminComponent.prototype.createUser = function () {
        var _this = this;
        if (this.email && this.firstname && this.lastname && this.password && this.selectedRole) {
            console.log('email ' + this.email + ',name: ' + this.firstname + this.lastname + ", password: " + this.password + ", role:" + this.selectedRole + ", enabled: " + this.enabled);
            var user = new src_app_model_User__WEBPACK_IMPORTED_MODULE_4__["User"]();
            user.email = this.email;
            user.password = this.password;
            user.enabled = this.enabled;
            user.firstName = this.firstname;
            user.lastName = this.lastname;
            user.role = this.selectedRole;
            console.log(user);
            this.adminService.createUser(this.user._id, user).subscribe(function (data) {
                if (data) {
                    alert('create successfully');
                    _this.router.navigate(['/admin']);
                }
            }, function (err) {
                if (err) {
                    alert(err.error.msg);
                }
            });
        }
        else {
            alert('Please complete the form.');
        }
    };
    AdminComponent.prototype.changeStatus = function (user, searchValue) {
        var _this = this;
        var newStatus = !user.enabled;
        this.adminService.updateUser(this.user._id, user._id, newStatus).subscribe(function (user) {
            _this.search(searchValue);
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], AdminComponent.prototype, "email", void 0);
    AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/component/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.css */ "./src/app/component/admin/admin.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _sevice_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/component/card-detail/card-detail.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/component/card-detail/card-detail.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2NhcmQtZGV0YWlsL2NhcmQtZGV0YWlsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw0RUFBNEU7QUFDaEYiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvY2FyZC1kZXRhaWwvY2FyZC1kZXRhaWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkIHtcbiAgICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/component/card-detail/card-detail.component.html":
/*!******************************************************************!*\
  !*** ./src/app/component/card-detail/card-detail.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card mt-4\" style=\"width: 18rem;\" *ngIf=\"card && visible\">\n    <img [src]=\"card.imageUrl\">\n    <div class=\"card-body\">\n        <h4 class=\"card-title\">{{card.name}}</h4>\n        <p>multiverseid: {{card.multiverseid}}</p>\n        <small>\n            <strong>colors:</strong> {{card.colors}}\n            <br> <strong>type:</strong> {{card.type}}\n            <br> <strong>rarity:</strong> {{card.rarity}}\n            <br> <strong>power:</strong> {{card.power}}\n            <br> <strong>toughness:</strong> {{card.toughness}}\n            <br> <strong>legalities:</strong>\n            <div *ngFor=\"let one of card.legalities\">\n                format:{{one.format}}, legality: {{one.legality}}\n                <br>\n            </div>\n            <br>\n            <strong>rulings:</strong>\n            <div *ngFor=\"let one of card.rulings\">\n                date:{{one.date}}, text: {{one.text}}\n                <br>\n            </div>\n            <br> <strong>set:</strong> {{card.set}}\n        </small>\n        <p class=\"card-text mt-2\">\n            <strong>text:</strong>\n            <br>\n            {{card.text}}\n        </p>\n    </div>\n</div>\n\n<div *ngIf=\"selectedCardId &&!visible\" class=\"text-center mt-4\">\n    <div class=\"spinner-grow text-info\" role=\"status\" style=\"width: 3rem; height: 3rem;\">\n        <span class=\"sr-only\">Loading...</span>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/component/card-detail/card-detail.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/component/card-detail/card-detail.component.ts ***!
  \****************************************************************/
/*! exports provided: CardDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardDetailComponent", function() { return CardDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_sevice/user.service */ "./src/app/_sevice/user.service.ts");
/* harmony import */ var src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_sevice/login.service */ "./src/app/_sevice/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var CardDetailComponent = /** @class */ (function () {
    function CardDetailComponent(userService, loginService, router) {
        this.userService = userService;
        this.loginService = loginService;
        this.router = router;
        this.card = null;
        this.user = null;
        this.visible = true;
        var user = this.loginService.getUser();
        if (user && user.role == 'user') {
            this.user = user;
        }
        else {
            this.router.navigate(['/login']);
            return;
        }
    }
    CardDetailComponent.prototype.ngOnInit = function () {
    };
    CardDetailComponent.prototype.ngOnChanges = function (changes) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        this.visible = false;
        this.refreshCard();
    };
    CardDetailComponent.prototype.refreshCard = function () {
        var _this = this;
        // console.log(this.user);
        this.userService.getCardById(this.user._id, this.selectedCardId).subscribe(function (card) {
            _this.card = card;
            _this.visible = true;
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], CardDetailComponent.prototype, "selectedCardId", void 0);
    CardDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-card-detail',
            template: __webpack_require__(/*! ./card-detail.component.html */ "./src/app/component/card-detail/card-detail.component.html"),
            styles: [__webpack_require__(/*! ./card-detail.component.css */ "./src/app/component/card-detail/card-detail.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], CardDetailComponent);
    return CardDetailComponent;
}());



/***/ }),

/***/ "./src/app/component/deck-detail/deck-detail.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/component/deck-detail/deck-detail.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kZWNrLWRldGFpbC9kZWNrLWRldGFpbC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/component/deck-detail/deck-detail.component.html":
/*!******************************************************************!*\
  !*** ./src/app/component/deck-detail/deck-detail.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\" *ngIf=\"deck\">\n  <div class=\"row mt-3\">\n    <div class=\"col-8\">\n      <button [routerLink]=\"[ '/user/decks']\" class=\"btn btn-info btn-sm\">Back</button>\n      <div class=\"input-group input-group-lg mt-3\" style=\"width:50%\">\n        <div class=\"input-group-prepend\">\n          <div class=\"input-group-text\">Deck Name: </div>\n        </div>\n        <input [(ngModel)]=\"deckName\" type=\"text\" class=\"form-control\" (ngModelChange)='changeDeck()'>\n      </div>\n      <h5 class=\"mt-2\">Description</h5>\n      <input [(ngModel)]=\"deckDescription\" type=\"text\" class=\"form-control\" style=\"height:100px;\"\n        (ngModelChange)='changeDeck()' />\n\n      <button class=\"btn btn-primary mt-2\" [disabled]='!changed' (click)=\"updateDeck()\">Save Changes</button>\n      <br>\n      <small *ngIf=\"nameError\" class=\"text-danger\">{{nameError}}</small>\n      <hr>\n      <h5 class=\"mt-2\">Cards</h5>\n      <p *ngIf=\"!cardSummary\">no card in this deck, you can add cards from <a [routerLink]=\"[ '/user/cards']\">cards\n          page</a>\n      </p>\n\n      <table class=\"table table-striped mt-2\" *ngIf=\"cardSummary\">\n        <thead class=\"table-secondary\">\n          <tr>\n            <th>Name</th>\n            <th>Quantity</th>\n            <th>Action</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let card of cardSummary\">\n            <td (click)=\"selectedCardId = card.multiverseid\">{{card.name}}</td>\n            <td>{{card.qty}}</td>\n            <td>\n              <div class=\"btn-group\">\n                <button class=\"btn btn-sm btn-primary\" (click)=\"changeQty(card)\">Change Qty</button>\n                <button class=\"btn btn-sm btn-danger\" (click)=\"deleteCard(card)\">Delete</button>\n              </div>\n\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"col\">\n      <app-card-detail *ngIf=\"selectedCardId\" [selectedCardId]=\"selectedCardId\"></app-card-detail>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/component/deck-detail/deck-detail.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/component/deck-detail/deck-detail.component.ts ***!
  \****************************************************************/
/*! exports provided: DeckDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeckDetailComponent", function() { return DeckDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_sevice/user.service */ "./src/app/_sevice/user.service.ts");
/* harmony import */ var src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_sevice/login.service */ "./src/app/_sevice/login.service.ts");





var DeckDetailComponent = /** @class */ (function () {
    function DeckDetailComponent(activatedRouter, userService, loginService, router) {
        var _this = this;
        this.activatedRouter = activatedRouter;
        this.userService = userService;
        this.loginService = loginService;
        this.router = router;
        this.deck = null;
        this.deckId = null;
        this.changed = false;
        this.nameError = null;
        this.cardSummary = null;
        var user = this.loginService.getUser();
        if (user && user.role == 'user') {
            this.user = user;
        }
        else {
            this.router.navigate(['/login']);
            return;
        }
        this.activatedRouter.params.subscribe(function (params) {
            _this.deckId = params['did'];
            _this.getDeck();
        });
    }
    DeckDetailComponent.prototype.ngOnInit = function () {
    };
    DeckDetailComponent.prototype.changeDeck = function () {
        var _this = this;
        this.nameError = null;
        if (this.deckName === '') {
            this.changed = false;
            this.nameError = '* empty name is not accepted';
            return;
        }
        if (this.deck.name !== this.deckName || this.deck.description !== this.deckDescription) {
            this.changed = true;
            this.userService.getDecks(this.user._id).subscribe(function (decks) {
                for (var i = 0; i < decks.length; i++) {
                    if (decks[i].id != _this.deckId && decks[i].name === _this.deckName) {
                        _this.nameError = '* the name you created already exists';
                        _this.changed = false;
                        return;
                    }
                    _this.nameError = null;
                }
            });
        }
        else {
            this.changed = false;
        }
    };
    DeckDetailComponent.prototype.getDeck = function () {
        var _this = this;
        this.userService.getADeck(this.user._id, this.deckId).subscribe(function (deck) {
            _this.deck = deck;
            _this.deckName = deck.name;
            _this.deckDescription = deck.description;
            _this.cardSummary = deck.cards;
        });
    };
    DeckDetailComponent.prototype.deleteCard = function (card) {
        var _this = this;
        var r = confirm("Are you sure to delete this card from that deck?");
        if (r == true) {
            //remove this element.
            var index = this.cardSummary.indexOf(card);
            this.cardSummary.splice(index, 1);
            this.userService.updateDeck(this.user._id, this.deck.id, this.deck).subscribe(function (deck) {
                _this.getDeck();
                _this.changed = false;
            });
        }
    };
    DeckDetailComponent.prototype.changeQty = function (card) {
        var _this = this;
        var newQtyPro = prompt("Please enter your new quantity", '');
        var newQty = parseInt(newQtyPro);
        if (!newQty || newQty <= 0) {
        }
        else {
            card.qty = newQty;
            //save this change
            this.userService.updateDeck(this.user._id, this.deck.id, this.deck).subscribe(function (deck) {
                _this.getDeck();
                _this.changed = false;
            });
        }
    };
    DeckDetailComponent.prototype.updateDeck = function () {
        var _this = this;
        //get current deck
        this.deck.name = this.deckName;
        this.deck.description = this.deckDescription;
        this.userService.updateDeck(this.user._id, this.deck.id, this.deck).subscribe(function (deck) {
            _this.getDeck();
            _this.changed = false;
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], DeckDetailComponent.prototype, "deckName", void 0);
    DeckDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-deck-detail',
            template: __webpack_require__(/*! ./deck-detail.component.html */ "./src/app/component/deck-detail/deck-detail.component.html"),
            styles: [__webpack_require__(/*! ./deck-detail.component.css */ "./src/app/component/deck-detail/deck-detail.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], DeckDetailComponent);
    return DeckDetailComponent;
}());



/***/ }),

/***/ "./src/app/component/deck-list/deck-list.component.css":
/*!*************************************************************!*\
  !*** ./src/app/component/deck-list/deck-list.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n\n.sameSize{\n    width:80px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2RlY2stbGlzdC9kZWNrLWxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDRFQUE0RTtBQUNoRjs7QUFFQTtJQUNJLFVBQVU7QUFDZCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kZWNrLWxpc3QvZGVjay1saXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZCB7XG4gICAgYm94LXNoYWRvdzogMCA0cHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDZweCAyMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjE5KTtcbn1cblxuLnNhbWVTaXple1xuICAgIHdpZHRoOjgwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/component/deck-list/deck-list.component.html":
/*!**************************************************************!*\
  !*** ./src/app/component/deck-list/deck-list.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mt-2 card\">\n  <div class=\" card-body\">\n    <h5 *ngIf=\"selectedCard\">Add {{selectedCard.name}} to: </h5>\n    <div class=\"input-group mt-2\">\n      <div class=\"input-group-prepend\">\n        <label class=\"input-group-text sameSize\">Deck</label>\n      </div>\n      <select placeholder=\"Decks\" [(ngModel)]=\"selectedDeckId\" name=\"deck\" class=\"custom-select\"\n        (ngModelChange)='updateStatus()'>\n        <option *ngFor=\"let deck of decks\" [value]=\"deck.id\">\n          {{deck.name}}\n        </option>\n      </select>\n    </div>\n    <div class=\"input-group mt-2\">\n      <div class=\"input-group-prepend\">\n        <label class=\"input-group-text sameSize\">Quantity</label>\n      </div>\n      <input type=\"number\" class=\"form-control\" [(ngModel)]=\"quantity\"\n        [disabled]='!validAdd' />\n    </div>\n    <button class=\"btn btn-sm btn-success form-control mt-2\" (click)=\"addCardToDeck()\"\n      [disabled]='!validAdd'>Add</button>\n    <small class=\"text-danger\" *ngIf=\"validError\">{{validError}}</small>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/component/deck-list/deck-list.component.ts":
/*!************************************************************!*\
  !*** ./src/app/component/deck-list/deck-list.component.ts ***!
  \************************************************************/
/*! exports provided: DeckListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeckListComponent", function() { return DeckListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_sevice/user.service */ "./src/app/_sevice/user.service.ts");
/* harmony import */ var src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_sevice/login.service */ "./src/app/_sevice/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_model_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_model/Card */ "./src/app/_model/Card.ts");
/* harmony import */ var src_app_model_CardSummary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_model/CardSummary */ "./src/app/_model/CardSummary.ts");







var DeckListComponent = /** @class */ (function () {
    function DeckListComponent(userService, loginService, router) {
        var _this = this;
        this.userService = userService;
        this.loginService = loginService;
        this.router = router;
        this.validAdd = false;
        this.validError = '* choose a deck to add';
        var user = this.loginService.getUser();
        if (user && user.role == 'user') {
            this.user = user;
        }
        else {
            this.router.navigate(['/login']);
            return;
        }
        this.userService.getDecks(this.user._id).subscribe(function (decks) { return _this.decks = decks; });
    }
    DeckListComponent.prototype.ngOnInit = function () {
    };
    DeckListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        // this.validAdd = false;
        // this.validError = '* choose a deck to add';
        this.userService.getDecks(this.user._id).subscribe(function (decks) {
            _this.decks = decks;
            _this.updateStatus();
        });
    };
    DeckListComponent.prototype.addCardToDeck = function () {
        var _this = this;
        if (!this.quantity || this.quantity <= 0) {
            alert('please give a positive quantity number!');
            return;
        }
        var cardSummary = new src_app_model_CardSummary__WEBPACK_IMPORTED_MODULE_6__["CardSummary"]();
        cardSummary.name = this.selectedCard.name;
        cardSummary.id = this.selectedCard.id;
        cardSummary.multiverseid = this.selectedCard.multiverseid;
        cardSummary.qty = this.quantity;
        //find deck
        var currentDeck = null;
        for (var i = 0; i < this.decks.length; i++) {
            if (this.decks[i].id === this.selectedDeckId) {
                currentDeck = this.decks[i];
            }
        }
        //push data into this deck and update.
        currentDeck.cards.push(cardSummary);
        this.userService.updateDeck(this.user._id, this.selectedDeckId, currentDeck).subscribe(function (deck) {
            _this.userService.getDecks(_this.user._id).subscribe(function (decks) { return _this.decks = decks; });
            _this.updateStatus();
            alert('Add to the deck successfully!');
        });
    };
    DeckListComponent.prototype.updateStatus = function () {
        // this.selectedDeckId;
        // this.selectedCard;
        if (!this.selectedDeckId || !this.selectedCard) {
            return;
        }
        var selectedDeckCards = null;
        for (var i = 0; i < this.decks.length; i++) {
            if (this.decks[i].id == this.selectedDeckId) {
                selectedDeckCards = this.decks[i].cards;
            }
        }
        // find the card in this deck and check the validation
        for (var i = 0; i < selectedDeckCards.length; i++) {
            if (selectedDeckCards[i].id == this.selectedCard.id) {
                this.validAdd = false;
                this.validError = '* the card is already in this deck';
                return;
            }
        }
        this.validAdd = true;
        this.validError = null;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", src_app_model_Card__WEBPACK_IMPORTED_MODULE_5__["Card"])
    ], DeckListComponent.prototype, "selectedCard", void 0);
    DeckListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-deck-list',
            template: __webpack_require__(/*! ./deck-list.component.html */ "./src/app/component/deck-list/deck-list.component.html"),
            styles: [__webpack_require__(/*! ./deck-list.component.css */ "./src/app/component/deck-list/deck-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], DeckListComponent);
    return DeckListComponent;
}());



/***/ }),

/***/ "./src/app/component/login/login.component.css":
/*!*****************************************************!*\
  !*** ./src/app/component/login/login.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#loginForm {\n    height: 220px;\n    width: 30%;\n}\n\n.loginBg{\n    margin-top: 200px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsVUFBVTtBQUNkOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbG9naW5Gb3JtIHtcbiAgICBoZWlnaHQ6IDIyMHB4O1xuICAgIHdpZHRoOiAzMCU7XG59XG5cbi5sb2dpbkJne1xuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/component/login/login.component.html":
/*!******************************************************!*\
  !*** ./src/app/component/login/login.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loginBg\">\n    <div class=\"container\">\n        <div class=\"mx-auto\">\n            <div class=\"mx-auto\" id=\"login_info\">\n                <h4 class=\"mx-auto text-center\">Magic The Gathering</h4>\n                <form class=\"form-control mt-4 mx-auto\" id=\"loginForm\">\n                    <div class=\"form-group\">\n                        <label for=\"email\">Email</label>\n                        <input type=\"email\" class=\"form-control\" [(ngModel)]=\"email\" name=\"email\" aria-describedby=\"emailHelp\"\n                            placeholder=\"Enter email\" (focus)=hideMSG()>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"password\">Password</label>\n                        <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\" placeholder=\"Password\" (focus)=hideMSG()>\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-primary\" (click)=\"login()\">Login</button>\n                    <span *ngIf=\"msg\" id=\"login_msg\" class=\"text-danger\">{{msg}}</span>\n                </form>\n            </div>\n        </div>\n    </div>      \n</div>"

/***/ }),

/***/ "./src/app/component/login/login.component.ts":
/*!****************************************************!*\
  !*** ./src/app/component/login/login.component.ts ***!
  \****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sevice_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_sevice/login.service */ "./src/app/_sevice/login.service.ts");




var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.msg = null;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.email, this.password).subscribe(function (res) {
            var user = res.body;
            _this.loginService.setCSRFToken(res.headers.get('X-CSRF'));
            if (user) {
                _this.loginService.setUser(user);
                if (user.role == 'admin') {
                    _this.router.navigate(['/admin']);
                }
                else if (user.role == 'user') {
                    _this.router.navigate(['/user']);
                }
                else {
                    _this.msg = 'incorrect email or password';
                }
            }
            _this.msg = 'incorrect email or password';
        }, function (err) {
            _this.msg = 'Incorrect user credencials';
        });
    };
    LoginComponent.prototype.hideMSG = function () {
        this.msg = null;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], LoginComponent.prototype, "email", void 0);
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/component/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/component/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _sevice_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/component/user-cards/user-cards.component.css":
/*!***************************************************************!*\
  !*** ./src/app/component/user-cards/user-cards.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC91c2VyLWNhcmRzL3VzZXItY2FyZHMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/component/user-cards/user-cards.component.html":
/*!****************************************************************!*\
  !*** ./src/app/component/user-cards/user-cards.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <!-- cards -->\n  <div class=\"form-inline mt-5\">\n    <div class=\"input-group\">\n      <div class=\"input-group-prepend\">\n        <label class=\"input-group-text\">Name</label>\n      </div>\n      <input [(ngModel)]=\"name\" placeholder=\"name\" class=\"form-control\" />\n    </div>\n    <div class=\"input-group ml-1\">\n      <div class=\"input-group-prepend\">\n        <label class=\"input-group-text\">Color</label>\n      </div>\n      <input [(ngModel)]=\"colors\" placeholder=\"color\" class=\"form-control\" />\n    </div>\n    <div class=\"input-group ml-1\">\n      <div class=\"input-group-prepend\">\n        <label class=\"input-group-text\">Type</label>\n      </div>\n      <input [(ngModel)]=\"type\" placeholder=\"type\" class=\"form-control\" />\n    </div>\n    <div class=\"input-group ml-1\">\n      <div class=\"input-group-prepend\">\n        <label class=\"input-group-text\">Set</label>\n      </div>\n      <input [(ngModel)]=\"set\" placeholder=\"set\" class=\"form-control\" />\n    </div>\n    <button class=\"btn btn-primary ml-3\" (click)=\"searchCards()\">Search</button>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-8\">\n      <table class=\"table table-striped mt-2 shadow\" *ngIf=\"visible\">\n        <thead class=\"table-secondary\">\n          <tr>\n            <th>Action</th>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Colors</th>\n            <th>Set</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let card of cards\">\n            <td class=\"text-center\"><button class=\"btn btn-sm btn-secondary\" title=\"add to deck\"\n                (click)=\"toAdd = true;selectedCard = card ;selectedCardId = card.multiverseid \"> +\n              </button></td>\n            <td (click)=\"selectedCardId = card.multiverseid; toAdd = false\">{{card.name}}</td>\n            <td (click)=\"selectedCardId = card.multiverseid; toAdd = false\">{{card.type}}</td>\n            <td (click)=\"selectedCardId = card.multiverseid; toAdd = false\">{{card.colors[0]}}</td>\n            <td (click)=\"selectedCardId = card.multiverseid; toAdd = false\">{{card.set}}</td>\n          </tr>\n        </tbody>\n      </table>\n      <div *ngIf=\"!visible\" class=\"text-center mt-4\">\n        <div class=\"spinner-grow text-info\" role=\"status\" style=\"width: 3rem; height: 3rem;\">\n          <span class=\"sr-only\">Loading...</span>\n        </div>\n      </div>\n      <div class=\" mt-2\" *ngIf=\"cards\">\n        <p class=\"float-left\">Page: {{page}} of {{totalPage}}</p>\n        <div class=\"float-right\">\n          <button class=\"btn btn-sm btn-info\" *ngIf=\"page>1\" (click)=\"searchCards(page-1)\">Prev</button>\n          <button class=\"btn btn-sm btn-info ml-2\" (click)=\"searchCards(page+1)\">Next</button>\n          <div class=\"btn-group ml-2\">\n            <div class=\"btn-group-prepend\">\n              <input class=\"form-control\" type=\"number\" style=\"width:80px\" #pageNum />\n            </div>\n            <button class=\"btn-sm btn-info btn\" (click)=\"searchCards(pageNum.value)\">Go</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col\">\n      <app-deck-list *ngIf=\"toAdd\" [selectedCard]=\"selectedCard\"></app-deck-list>\n      <app-card-detail *ngIf=\"selectedCardId\" [selectedCardId]=\"selectedCardId\"></app-card-detail>\n    </div>\n  </div>\n</div>\n<div style=\"height:200px;\"></div>"

/***/ }),

/***/ "./src/app/component/user-cards/user-cards.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/component/user-cards/user-cards.component.ts ***!
  \**************************************************************/
/*! exports provided: UserCardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCardsComponent", function() { return UserCardsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_sevice/user.service */ "./src/app/_sevice/user.service.ts");
/* harmony import */ var src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_sevice/login.service */ "./src/app/_sevice/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var UserCardsComponent = /** @class */ (function () {
    function UserCardsComponent(userService, loginService, router) {
        this.userService = userService;
        this.loginService = loginService;
        this.router = router;
        this.cards = null;
        this.name = '';
        this.type = '';
        this.set = '';
        this.colors = '';
        this.page = 1;
        this.selectedCardId = null;
        this.user = null;
        this.visible = false;
        this.toAdd = false;
        this.selectedCard = null;
        this.totalPage = null;
    }
    UserCardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = this.loginService.getUser();
        if (user && user.role == 'user') {
            this.user = user;
        }
        else {
            this.router.navigate(['/login']);
            return;
        }
        if (this.user) {
            this.userService.getCards(this.user._id, this.name, this.type, this.set, this.colors).subscribe(function (res) {
                _this.cards = res.body;
                _this.totalPage = res.headers.get('total-page');
                _this.visible = true;
            });
        }
    };
    UserCardsComponent.prototype.searchCards = function (page) {
        var _this = this;
        if (page) {
            page = parseInt(page + '');
            if (page < 1 || page > this.totalPage) {
                alert('invalid page number!' + this.totalPage);
                return;
            }
            this.page = page;
        }
        this.visible = false;
        this.userService.getCards(this.user._id, this.name, this.type, this.set, this.colors, this.page).subscribe(function (res) {
            _this.cards = res.body;
            _this.totalPage = res.headers.get('total-page');
            _this.visible = true;
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], UserCardsComponent.prototype, "name", void 0);
    UserCardsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-cards',
            template: __webpack_require__(/*! ./user-cards.component.html */ "./src/app/component/user-cards/user-cards.component.html"),
            styles: [__webpack_require__(/*! ./user-cards.component.css */ "./src/app/component/user-cards/user-cards.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], UserCardsComponent);
    return UserCardsComponent;
}());



/***/ }),

/***/ "./src/app/component/user-decks/user-decks.component.css":
/*!***************************************************************!*\
  !*** ./src/app/component/user-decks/user-decks.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC91c2VyLWRlY2tzL3VzZXItZGVja3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/component/user-decks/user-decks.component.html":
/*!****************************************************************!*\
  !*** ./src/app/component/user-decks/user-decks.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"form-inline mt-5\">\n        <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n                <label class=\"input-group-text\">Name</label>\n            </div>\n            <input [(ngModel)]=\"deckName\" name=\"deckName\" placeholder=\"name\" type=\"text\" class=\"form-control\">\n        </div>\n\n        <div class=\"input-group ml-2\">\n            <div class=\"input-group-prepend\">\n                <label class=\"input-group-text\">Description</label>\n            </div>\n            <input [(ngModel)]=\"description\" class=\"form-control\" name=\"description\" placeholder=\"description\"\n                type=\"text\" style=\"width:500px;\">\n        </div>\n        <button class=\"btn btn-primary ml-3\" (click)=\"createDeck()\">Create Deck</button>\n    </div>\n\n    <table class=\"table table-striped mt-2 shadow\">\n        <thead class=\"table-secondary\">\n            <tr>\n                <th>Name</th>\n                <th>Description</th>\n                <th>number of cards</th>\n                <th>Action</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let deck of decks\">\n                <td (click)=\"showDeck(deck.id)\">{{deck.name}}</td>\n                <td (click)=\"showDeck(deck.id)\">{{deck.description}}</td>\n                <td (click)=\"showDeck(deck.id)\">{{deck.cards.length}}</td>\n                <td>\n                    <div class=\"btn-group\">\n                        <button class=\"btn btn-sm btn-danger\" (click)=\"deleteDeck(deck.id)\">Delete</button>\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>"

/***/ }),

/***/ "./src/app/component/user-decks/user-decks.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/component/user-decks/user-decks.component.ts ***!
  \**************************************************************/
/*! exports provided: UserDecksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDecksComponent", function() { return UserDecksComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_sevice/user.service */ "./src/app/_sevice/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_sevice/login.service */ "./src/app/_sevice/login.service.ts");





var UserDecksComponent = /** @class */ (function () {
    function UserDecksComponent(userService, router, loginService) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.loginService = loginService;
        this.description = '';
        var user = this.loginService.getUser();
        if (user && user.role == 'user') {
            this.user = user;
        }
        else {
            this.router.navigate(['/login']);
            return;
        }
        this.userService.getDecks(this.user._id).subscribe(function (decks) {
            _this.decks = decks;
        });
    }
    UserDecksComponent.prototype.ngOnInit = function () {
    };
    UserDecksComponent.prototype.createDeck = function () {
        var _this = this;
        if (!this.deckName || this.deckName === '') {
            alert('Empty name is not accepted');
            return;
        }
        for (var i = 0; i < this.decks.length; i++) {
            if (this.deckName == this.decks[i].name) {
                alert('you cannot create two decks which have same name: \'' + this.deckName + "\'");
                return;
            }
        }
        this.userService.createDeck(this.user._id, this.deckName, this.description).subscribe(function (deck) {
            _this.refreshDecks();
        });
    };
    UserDecksComponent.prototype.refreshDecks = function () {
        var _this = this;
        this.userService.getDecks(this.user._id).subscribe(function (decks) {
            _this.decks = decks;
        });
    };
    UserDecksComponent.prototype.deleteDeck = function (deckId) {
        var _this = this;
        var r = confirm("Are you sure to delete this deck?");
        if (r == true) {
            this.userService.deleteDeck(this.user._id, deckId).subscribe(function (_) {
                _this.refreshDecks();
            });
        }
        else {
        }
    };
    UserDecksComponent.prototype.showDeck = function (dickId) {
        this.router.navigate(['/user/decks/' + dickId]);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], UserDecksComponent.prototype, "deckName", void 0);
    UserDecksComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-decks',
            template: __webpack_require__(/*! ./user-decks.component.html */ "./src/app/component/user-decks/user-decks.component.html"),
            styles: [__webpack_require__(/*! ./user-decks.component.css */ "./src/app/component/user-decks/user-decks.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_sevice_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"]])
    ], UserDecksComponent);
    return UserDecksComponent;
}());



/***/ }),

/***/ "./src/app/component/user/user.component.css":
/*!***************************************************!*\
  !*** ./src/app/component/user/user.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC91c2VyL3VzZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/component/user/user.component.html":
/*!****************************************************!*\
  !*** ./src/app/component/user/user.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light shadow\">\n    <a class=\"navbar-brand\"[routerLink]=\"[ '/user/cards']\" >Magic The Gathering</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n        aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mx-auto btn-group\">\n            <button class=\"nav-link\" [routerLink]=\"['cards']\" class=\"btn btn-lg \">Cards</button>\n            <button class=\"nav-link\" [routerLink]=\"['decks']\" class=\"btn btn-lg\">Decks</button>\n        </ul>\n        <div class=\"my-lg-0\">\n            <a *ngIf=\"user\">User: {{user.firstName}} {{user.lastName}} </a>\n            <button class=\"btn btn-outline-secondary my-2 my-sm-0 ml-2\" (click)=\"logout()\">Logout</button>\n        </div>\n    </div>\n</nav>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/component/user/user.component.ts":
/*!**************************************************!*\
  !*** ./src/app/component/user/user.component.ts ***!
  \**************************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_sevice/login.service */ "./src/app/_sevice/login.service.ts");




var UserComponent = /** @class */ (function () {
    function UserComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.user = null;
        var user = this.loginService.getUser();
        if (user && user.role == 'user') {
            this.user = user;
        }
        else {
            this.router.navigate(['/login']);
            return;
        }
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.logout = function () {
        var _this = this;
        this.loginService.logout().subscribe(function (_) {
            _this.router.navigate(['/login']);
        });
    };
    UserComponent.prototype.getUser = function () {
        // this.globals.setUser(new User());
        // this.globals.user$.subscribe(user => {
        //   this.user = user;
        //   console.log(user);
        // });
        console.log(this.user);
    };
    UserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/component/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.css */ "./src/app/component/user/user.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_sevice_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kong.zeya/IdeaProjects/cs402/hw4/client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map