"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const auth_router_1 = __importDefault(require("./router/auth-router"));
const db_1 = __importDefault(require("./database/db"));
const user_router_1 = __importDefault(require("./router/user-router"));
const admin_router_1 = __importDefault(require("./router/admin-router"));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
// ---- adding routes as middleware------------//
app.use("/api/auth", auth_router_1.default);
app.use("/api/user", user_router_1.default);
app.use("/api/admin", admin_router_1.default);
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World");
});
db_1.default.sync({ alter: true }).then(() => {
    console.log("synced Db");
}).catch(err => {
    console.log(err);
});
app.listen(port, () => {
    console.log(`Server Started Listening On ${port}`);
});
