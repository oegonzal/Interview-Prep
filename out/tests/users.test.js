"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = require("supertest");
var app_1 = require("../app");
var users_model_1 = require("../models/users.model");
var users_route_1 = require("../routes/users.route");
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(null); }, 500); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Testing Users', function () {
    describe('[GET] /users', function () {
        it('response statusCode 200 / findAll', function () {
            var findUser = users_model_1.default;
            var usersRoute = new users_route_1.default();
            var app = new app_1.default([usersRoute]);
            return supertest_1.default(app.getServer()).get("" + usersRoute.path).expect(200, { data: findUser, message: 'findAll' });
        });
    });
    describe('[GET] /users/:id', function () {
        it('response statusCode 200 / findOne', function () {
            var userId = 1;
            var findUser = users_model_1.default.find(function (user) { return user.id === userId; });
            var usersRoute = new users_route_1.default();
            var app = new app_1.default([usersRoute]);
            return supertest_1.default(app.getServer()).get(usersRoute.path + "/" + userId).expect(200, { data: findUser, message: 'findOne' });
        });
    });
    describe('[POST] /users', function () {
        it('response statusCode 201 / created', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, usersRoute, app;
            return __generator(this, function (_a) {
                userData = {
                    email: 'oscar1@gmail.com',
                    password: 'q1w2e3r4',
                };
                usersRoute = new users_route_1.default();
                app = new app_1.default([usersRoute]);
                return [2 /*return*/, supertest_1.default(app.getServer()).post("" + usersRoute.path).send(userData).expect(201)];
            });
        }); });
    });
    describe('[PUT] /users/:id', function () {
        it('response statusCode 200 / updated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, userData, usersRoute, app;
            return __generator(this, function (_a) {
                userId = 1;
                userData = {
                    email: 'oegonbar@gmail.com',
                    password: '1q2w3e4r',
                };
                usersRoute = new users_route_1.default();
                app = new app_1.default([usersRoute]);
                return [2 /*return*/, supertest_1.default(app.getServer()).put(usersRoute.path + "/" + userId).send(userData).expect(200)];
            });
        }); });
    });
    describe('[DELETE] /users/:id', function () {
        it('response statusCode 200 / deleted', function () {
            var userId = 1;
            var deleteUser = users_model_1.default.filter(function (user) { return user.id !== userId; });
            var usersRoute = new users_route_1.default();
            var app = new app_1.default([usersRoute]);
            return supertest_1.default(app.getServer()).delete(usersRoute.path + "/" + userId).expect(200, { data: deleteUser, message: 'deleted' });
        });
    });
});
//# sourceMappingURL=users.test.js.map