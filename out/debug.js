/**
 * REVIEW:
 * https://www.tutorialspoint.com/design_pattern/design_pattern_interview_questions.htm
 *
 * BTREE in databases
 * -    SQL: EXPLAIN COMMAND
 *      -   https://www.youtube.com/watch?v=NI9wYuVIYcA
 *      -   CHECK which index help more than they harm
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NodeState;
(function (NodeState) {
    NodeState[NodeState["Visited"] = 0] = "Visited";
    NodeState[NodeState["NotVisited"] = 1] = "NotVisited";
})(NodeState || (NodeState = {}));
var init = NodeState.NotVisited;
var SearchNode = /** @class */ (function () {
    function SearchNode() {
    }
    return SearchNode;
}());
var BST = /** @class */ (function () {
    function BST() {
        this.graph;
    }
    BST.prototype.doNodesConnect = function (start, end) {
        var queue = [];
        queue.unshift(start);
        start.state = NodeState.Visited;
        while (queue.length > 0) {
            var curNode = queue.shift();
            if (curNode === end)
                return true;
            for (var _i = 0, _a = curNode.edges; _i < _a.length; _i++) {
                var n = _a[_i];
                if (n.state == NodeState.NotVisited) {
                    queue.unshift(n);
                    n.state = NodeState.Visited;
                }
            }
        }
        return false;
    };
    return BST;
}());
var DPS = /** @class */ (function () {
    function DPS() {
    }
    DPS.prototype.doNodesConnect = function (start, end) {
        var stack = [];
        stack.push(start);
        start.state = NodeState.Visited;
        while (stack.length > 0) {
            var curNode = stack.pop();
            if (curNode === end)
                return true;
            for (var _i = 0, _a = curNode.edges; _i < _a.length; _i++) {
                var n = _a[_i];
                if (n.state == NodeState.NotVisited) {
                    stack.push(n);
                    n.state = NodeState.Visited;
                }
            }
        }
    };
    return DPS;
}());
var TreeNode = /** @class */ (function () {
    function TreeNode() {
        this.state = NodeState.NotVisited;
    }
    return TreeNode;
}());
var BSTNode = /** @class */ (function (_super) {
    __extends(BSTNode, _super);
    function BSTNode(value, height) {
        var _this = _super.call(this) || this;
        _this.left = null;
        _this.right = null;
        _this.value = value;
        _this.height = height;
        return _this;
    }
    return BSTNode;
}(TreeNode));
var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        this.root = null;
    }
    BinaryTree.prototype.insert = function (value) {
        this.root = this.insertRecurse(this.root, value);
    };
    BinaryTree.prototype.insertRecurse = function (parent, value) {
        if (!parent) {
            return new BSTNode(value);
        }
        if (value < parent.value) {
            parent.left = this.insertRecurse(parent.left, value);
        }
        else if (value > parent.value) {
            parent.right = this.insertRecurse(parent.right, value);
        }
        return parent;
    };
    BinaryTree.prototype.printInOrder = function () {
        var logObj = { str: '' };
        function inOrder(node, logObj) {
            if (!node)
                return;
            inOrder(node.left, logObj);
            logObj.str += node.value + " ";
            inOrder(node.right, logObj);
        }
        inOrder(this.root, logObj);
        console.log(logObj.str);
    };
    BinaryTree.prototype.printInOrderStack = function () {
        var _a, _b;
        var str = '';
        var stack = [];
        stack.push(this.root);
        while (stack.length > 0) {
            var peek = stack[stack.length - 1];
            peek.state = NodeState.Visited;
            if (((_a = peek.left) === null || _a === void 0 ? void 0 : _a.state) == NodeState.NotVisited) {
                stack.push(peek.left);
                continue;
            }
            str += peek.value + " ";
            stack.pop();
            if (((_b = peek.right) === null || _b === void 0 ? void 0 : _b.state) == NodeState.NotVisited) {
                stack.push(peek.right);
            }
        }
        console.log("STACK In order: ", str);
    };
    BinaryTree.prototype.printPreOrderStack = function () {
    };
    BinaryTree.prototype.printPostOrderStack = function () {
    };
    BinaryTree.prototype.printPreOrder = function () {
        var logObj = { str: '' };
        function preOrder(node, logObj) {
            if (!node)
                return;
            logObj.str += node.value + " ";
            preOrder(node.left, logObj);
            preOrder(node.right, logObj);
        }
        preOrder(this.root, logObj);
        console.log(logObj.str);
    };
    BinaryTree.prototype.printPostOrder = function () {
        var logObj = { str: '' };
        function postOrder(node, logObj) {
            if (!node)
                return;
            postOrder(node.left, logObj);
            postOrder(node.right, logObj);
            logObj.str += node.value + " ";
        }
        postOrder(this.root, logObj);
        console.log(logObj.str);
    };
    BinaryTree.prototype.isBST = function (node) {
        //  Check L smaller than root, right is bigger than root
        function isBST(node) {
            if (!node)
                return true;
            if (node.left && node.left.value >= node.value)
                return false;
            if (node.right && node.right.value <= node.value)
                return false;
            return isBST(node.left) && isBST(node.right);
        }
        return isBST(node);
    };
    return BinaryTree;
}());
/**
 *  Think smallest possible example
 *
 *      o
 *   /     \
 */
// Test
/**
 *           4
 *        2     6
 *      1  3   5  7
 */
var BT = new BinaryTree();
BT.insert(4);
BT.insert(2);
BT.insert(3);
BT.insert(1);
BT.insert(6);
BT.insert(5);
BT.insert(7);
BT.printInOrder(); // 1 2 3 4 5 6 7
BT.printPreOrder(); // 4 2 1 3 6 5 7
BT.printPostOrder(); // 1 3 2 5 7 6 4
BT.printInOrderStack(); // 1 2 3 4 5 6 7
console.log("Is BST: ", BT.isBST(BT.root));
/**
 *
 * Create a self balancing tree
 *
 * Create a print function to show tree
 *
 */
var BalanceTree = /** @class */ (function () {
    function BalanceTree() {
        this.root = null;
        this.rebalanceHeight = 2;
    }
    BalanceTree.prototype.insert = function (value) {
        //  First insert node & pass down to location it belongs
        //  Then propogate upwards the new height (nodeHeight = leftNodeHeight - rightNodeHeight)
        //  Then trigger rebalance if needed
        function insert(node, value) {
            var _a, _b;
            if (!node)
                return new BSTNode(value, 0);
            if (value <= node.value)
                node.left = insert(node.left, value);
            else
                node.right = insert(node.right, value);
            //  Update current height
            var rightH = (_a = node === null || node === void 0 ? void 0 : node.right) === null || _a === void 0 ? void 0 : _a.height;
            var leftH = (_b = node === null || node === void 0 ? void 0 : node.left) === null || _b === void 0 ? void 0 : _b.height;
            node.height = Math.abs(rightH ? rightH + 1 : 0) - Math.abs(leftH ? leftH + 1 : 0);
            //  4 cases:
            //  Value smaller than current node.left & left unbalance : right rotate
            //  Value bigger than current node.left & left unbalance : left rotate
            //  Value smaller than current node.right & right unbalance : right rotate
            //  Value bigger than current node.right & right unbalance : left rotate
            //  Rebalance if height crosses threshold
            if (Math.abs(node.height) >= this.rebalanceHeight) {
                if (node.height < 0) {
                    // Rebalance left
                    node.left;
                }
                else {
                    // Rebalance right
                }
            }
            // Node *rightRotate(Node *y)  
            // {  
            //     Node *x = y->left;  
            //     Node *T2 = x->right;  
            //     // Perform rotation  
            //     x->right = y;  
            //     y->left = T2;  
            //     // Update heights  
            //     y->height = max(height(y->left), 
            //                     height(y->right)) + 1;  
            //     x->height = max(height(x->left), 
            //                     height(x->right)) + 1;  
            //     // Return new root  
            //     return x;  
            // }  
            // // A utility function to left  
            // // rotate subtree rooted with x  
            // // See the diagram given above.  
            // Node *leftRotate(Node *x)  
            // {  
            //     Node *y = x->right;  
            //     Node *T2 = y->left;  
            //     // Perform rotation  
            //     y->left = x;  
            //     x->right = T2;  
            //     // Update heights  
            //     x->height = max(height(x->left),     
            //                     height(x->right)) + 1;  
            //     y->height = max(height(y->left),  
            //                     height(y->right)) + 1;  
            //     // Return new root  
            //     return y;  
            // }  
        }
        function rebalance(node, reNode) {
            var _a, _b;
            var rightH = (_a = node === null || node === void 0 ? void 0 : node.right) === null || _a === void 0 ? void 0 : _a.height;
            var leftH = (_b = node === null || node === void 0 ? void 0 : node.left) === null || _b === void 0 ? void 0 : _b.height;
            if ((reNode === null || reNode === void 0 ? void 0 : reNode.value) > node.value) {
            }
            if (leftH < rightH) {
                var tempR = node.right;
                node.right = null;
                tempR.left = node;
                return tempR;
                // return rebalance(tempR, node);
            }
            else {
                var tempL = node.left;
                node.left = null;
                tempL.right = node;
                return tempL;
            }
        }
        this.root = insert(this.root, value);
    };
    return BalanceTree;
}());
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Design Patterns:
 */
/**
 * Decorator
 *
 *
 * Decorators solve the problems of being able to extend functionality WITHOUT SUBCLASSING!!
 * -    BY WRAPPING COMPONENTS
 * -    Decorator class mirror the type of the components they decorate. In fact they are the same type
 *      as the components they decorate, either through |inheritance| or |interface implementation| **** IMPORTANT!
 *
 * -    REMEMBER: A decorator decorating a concrete class, MAINTAINS its properties, including its type
 *      -   It only keeps a reference to what its decorating & adds to it before, during or after its corresponding
 *          behavior it wants to decorate
 *      -   In react this would be like decorating a Route component, like turning it into a PrivateRoute
 *          that checks for authentication before (if good, gives protected route, else redirect to Login component returned)
 *          -   But either way returns a Route component, so its type remains the SAME!
 *          -   Reusability + DECLARITIVE (allowing object to be more specific & meaningful about what it does)
 */
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.getDescription = function () {
        return this.description;
    };
    return Car;
}());
// NOTE: abstract class cannot be instantiated
// const car = new Car();
//  Specific concrete subclass of Car
var ModelS = /** @class */ (function (_super) {
    __extends(ModelS, _super);
    function ModelS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = "Model S";
        return _this;
    }
    ModelS.prototype.cost = function () {
        return 73000;
    };
    return ModelS;
}(Car));
//  Specific concrete subclass of Car
var ModelX = /** @class */ (function (_super) {
    __extends(ModelX, _super);
    function ModelX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = "Model X";
        return _this;
    }
    ModelX.prototype.cost = function () {
        return 77000;
    };
    return ModelX;
}(Car));
//  abstract class cannot be instanticated
//  Extends car bc we will be using polymorphism (important for decorator pattern)
var CarOptions = /** @class */ (function (_super) {
    __extends(CarOptions, _super);
    function CarOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CarOptions;
}(Car));
var EnhancedAutoPilot = /** @class */ (function (_super) {
    __extends(EnhancedAutoPilot, _super);
    function EnhancedAutoPilot(car) {
        var _this = _super.call(this) || this;
        _this.decoratedCar = car;
        return _this;
    }
    EnhancedAutoPilot.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + ', Enhanced AutoPilot';
    };
    EnhancedAutoPilot.prototype.cost = function () {
        return this.decoratedCar.cost() + 5000;
    };
    return EnhancedAutoPilot;
}(CarOptions));
var RearFacingSeats = /** @class */ (function (_super) {
    __extends(RearFacingSeats, _super);
    function RearFacingSeats(car) {
        var _this = _super.call(this) || this;
        _this.decoratedCar = car;
        return _this;
    }
    RearFacingSeats.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + ', Rear facing seats';
    };
    RearFacingSeats.prototype.cost = function () {
        return this.decoratedCar.cost() + 4000;
    };
    return RearFacingSeats;
}(CarOptions));
var myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla);
myTesla = new EnhancedAutoPilot(myTesla);
console.log(myTesla.cost());
console.log(myTesla.getDescription());
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.setTemperature = function (temp) {
        console.log("WeatherStation: new temperature measurement " + temp);
        this.temperature = temp;
        this.notifyObservers();
    };
    WeatherStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observers = _a[_i];
            observers.update(this.temperature);
        }
    };
    return WeatherStation;
}());
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    TemperatureDisplay.prototype.update = function (temperature) {
        console.log("TemperatureDisplay: I need to update my temperature display ", temperature);
    };
    return TemperatureDisplay;
}());
var Fan = /** @class */ (function () {
    function Fan(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    Fan.prototype.update = function (temperature) {
        if (temperature > 25) {
            console.log('Fan: its hot here, turning myself on...');
        }
        else {
            console.log('Fan: its nice and cool, tunring myself off...');
        }
    };
    return Fan;
}());
var weatherStation = new WeatherStation();
var tempDisplay = new TemperatureDisplay(weatherStation);
var fan = new Fan(weatherStation);
weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
/**
 * Exercise:
 *  -   What are the requirements of a Subject?
 *      -   list of observers, registerObserver, updateObservers, deleteObserver
 *  -   What does an observer need?
 *      -   Reference to Subject
 *      -   update function to do something when Subject has an update
 *      -   To register itself using reference to Subject and its registerObserver method
 */
/**
 * Facade
 */
var BlurayPlayer = /** @class */ (function () {
    function BlurayPlayer() {
    }
    BlurayPlayer.prototype.on = function () {
        console.log('Bluray player turning on...');
    };
    BlurayPlayer.prototype.turnOff = function () {
        console.log("blueray turning off...");
    };
    BlurayPlayer.prototype.play = function () {
        console.log('Playing bluray disc...');
    };
    return BlurayPlayer;
}());
var Amplifier = /** @class */ (function () {
    function Amplifier() {
    }
    Amplifier.prototype.on = function () {
        console.log('Amp is turning on...');
    };
    Amplifier.prototype.turnOff = function () {
        console.log('Amplifier turning off...');
    };
    Amplifier.prototype.setSource = function (source) {
        console.log('Setting source to ' + source);
    };
    Amplifier.prototype.setVolume = function (volumeLevel) {
        console.log('Setting volume to ' + volumeLevel);
    };
    return Amplifier;
}());
var Lights = /** @class */ (function () {
    function Lights() {
    }
    Lights.prototype.dim = function () {
        console.log('Lights are dimming...');
    };
    return Lights;
}());
var TV = /** @class */ (function () {
    function TV() {
    }
    TV.prototype.turnOn = function () {
        console.log('TV turning on...');
    };
    TV.prototype.turnOff = function () {
        console.log("TV turning off...");
    };
    return TV;
}());
var PopcornMaker = /** @class */ (function () {
    function PopcornMaker() {
    }
    PopcornMaker.prototype.turnOn = function () {
        console.log("Popcorn maker turning on...");
    };
    PopcornMaker.prototype.turnOff = function () {
        console.log("Popcorn maker turning off...");
    };
    PopcornMaker.prototype.pop = function () {
        console.log("Popping corn!");
    };
    return PopcornMaker;
}());
var HomeTheaterFacade = /** @class */ (function () {
    function HomeTheaterFacade(amp, bluray, lights, tv, popcornMaker) {
        this.amp = amp;
        this.bluray = bluray;
        this.lights = lights;
        this.tv = tv;
        this.popcornMaker = popcornMaker;
    }
    HomeTheaterFacade.prototype.watchMovie = function () {
        this.popcornMaker.turnOn();
        this.popcornMaker.pop();
        this.lights.dim();
        this.tv.turnOn();
        this.amp.on();
        this.amp.setSource('bluray');
        this.amp.setVolume(11);
        this.bluray.on();
        this.bluray.play();
    };
    HomeTheaterFacade.prototype.endMovie = function () {
        this.popcornMaker.turnOff();
        this.amp.turnOff();
        this.tv.turnOff();
        this.bluray.turnOff();
    };
    return HomeTheaterFacade;
}());
var bluray = new BlurayPlayer();
var amp = new Amplifier();
var lights = new Lights();
var tv = new TV();
var popcornMaker = new PopcornMaker();
var hometheater = new HomeTheaterFacade(amp, bluray, lights, tv, popcornMaker);
hometheater.watchMovie();
var iPhone7 = /** @class */ (function () {
    function iPhone7() {
    }
    iPhone7.prototype.useLightning = function () {
        console.log('Using lightning port..');
    };
    return iPhone7;
}());
var GooglePixel = /** @class */ (function () {
    function GooglePixel() {
    }
    GooglePixel.prototype.useMicroUSB = function () {
        console.log('Using micro USB...');
    };
    return GooglePixel;
}());
var LightningToMicroUSBAdapter = /** @class */ (function () {
    function LightningToMicroUSBAdapter(iphone) {
        this.iphoneDevice = iphone;
    }
    LightningToMicroUSBAdapter.prototype.useMicroUSB = function () {
        console.log('Want to use micro USB, converting to Lightning.....');
        this.iphoneDevice.useLightning();
    };
    return LightningToMicroUSBAdapter;
}());
var iphone = new iPhone7();
var chargeAdapter = new LightningToMicroUSBAdapter(iphone);
chargeAdapter.useMicroUSB();
var Order = /** @class */ (function () {
    function Order() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);
        this.setState(this.paymentPendingState);
    }
    Order.prototype.setState = function (state) {
        this.currentState = state;
    };
    Order.prototype.getState = function () {
        return this.currentState;
    };
    return Order;
}());
var PaymentPendingState = /** @class */ (function () {
    function PaymentPendingState(order) {
        this.order = order;
    }
    PaymentPendingState.prototype.cancelOrder = function () {
        console.log("Cancelling your unpaid order...");
        this.order.setState(this.order.cancelledOrderState);
    };
    PaymentPendingState.prototype.verifyPayment = function () {
        console.log('Payment verified! Shipping soon.');
        this.order.setState(this.order.orderBeingPreparedState);
    };
    PaymentPendingState.prototype.shipOrder = function () {
        console.log('Cannot ship the order wehn payment is pending');
    };
    return PaymentPendingState;
}());
var CancelledOrderState = /** @class */ (function () {
    function CancelledOrderState(order) {
        this.order = order;
    }
    CancelledOrderState.prototype.cancelOrder = function () {
        console.log('Your order has already been cancelled');
    };
    CancelledOrderState.prototype.verifyPayment = function () {
        console.log('Order cancelled, you cannot verify payment');
    };
    CancelledOrderState.prototype.shipOrder = function () {
        console.log('Order cannot ship, it was cancelled');
    };
    return CancelledOrderState;
}());
var OrderBeingPreparedState = /** @class */ (function () {
    function OrderBeingPreparedState(order) {
        this.order = order;
    }
    OrderBeingPreparedState.prototype.cancelOrder = function () {
        console.log("Cancelling your order...");
        this.order.setState(this.order.cancelledOrderState);
    };
    OrderBeingPreparedState.prototype.verifyPayment = function () {
        console.log('Already verified your payment');
    };
    OrderBeingPreparedState.prototype.shipOrder = function () {
        console.log('Shipping your order now!');
        this.order.setState(this.order.orderShippedState);
    };
    return OrderBeingPreparedState;
}());
var OrderShippedState = /** @class */ (function () {
    function OrderShippedState(order) {
        this.order = order;
    }
    OrderShippedState.prototype.cancelOrder = function () {
        console.log('You cannot cancel, already shipped...');
    };
    OrderShippedState.prototype.verifyPayment = function () {
        console.log('You cannot verify payment, already shipped...');
    };
    OrderShippedState.prototype.shipOrder = function () {
        console.log('You cannot ship it again, already shipped...');
    };
    return OrderShippedState;
}());
var order = new Order();
// order.getState().shipOrder()
// order.getState().verifyPayment();
// order.getState().verifyPayment();
order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();
console.log('Order state: ' + order.getState().constructor.name);
var TinderBot = /** @class */ (function () {
    function TinderBot() {
        this.MatchScreen = new MatchScreen(this);
        this.ErrorScreen = new ErrorScreen(this);
        this.PhotoScreen = new PhotoScreen(this);
        this.setState(this.PhotoScreen);
        // while (each second) this(TinderBot).getState.doDefaultAction()
    }
    TinderBot.prototype.setState = function (state) {
        this.currentState = state;
        console.log('Just entered: ' + state.constructor.name, ' state');
    };
    TinderBot.prototype.getState = function () {
        return this.currentState;
    };
    return TinderBot;
}());
var MatchScreen = /** @class */ (function () {
    function MatchScreen(TinderBot) {
        this.bot = TinderBot;
    }
    MatchScreen.prototype.closeModal = function () {
    };
    MatchScreen.prototype.swipeRight = function () {
    };
    MatchScreen.prototype.restart = function () {
    };
    return MatchScreen;
}());
var ErrorScreen = /** @class */ (function () {
    function ErrorScreen(TinderBot) {
        this.bot = TinderBot;
    }
    ErrorScreen.prototype.closeModal = function () {
    };
    ErrorScreen.prototype.swipeRight = function () {
    };
    ErrorScreen.prototype.restart = function () {
    };
    return ErrorScreen;
}());
var PhotoScreen = /** @class */ (function () {
    function PhotoScreen(TinderBot) {
        this.bot = TinderBot;
    }
    PhotoScreen.prototype.closeModal = function () {
    };
    PhotoScreen.prototype.swipeRight = function () {
    };
    PhotoScreen.prototype.restart = function () {
    };
    return PhotoScreen;
}());
/**
 * Object Oriented Design;
 *
 * IMPORTANT:
 * - Change in software is CONSTANT
 * - Already tested code, should NOT BE CHANGED
 *
 *
 * When doing OOP
 * - Look at what all object have in common
 * - Then create a new class which will be a superclasss
 *
 * - Never make logic that is shared for everyone where each object may need different logic
 *     bc then that common place will need to have conditions to check for all different possibilities
 *
 * -   Also bad idea to make a class/module for every object bc that becomes unmaintainable when
 *     a common feature changes and you have to change ALL CLASSES
 *
 * -   Instead make super classes, have subclasses inherit
 *     and override for objects that need a differing implementation
 *
 * -   All objects have a state they know about themselves (instance variables)
 *     They also have action they can perform (methods)
 *
 *
 * -   What's the difference between a class and an object?
 *     -   Class is not an object. But it can be used to construct an object
 *     -   In typescript a class is a blueprint for an object
 *
 */
/**
 * Eg) Lets create a video game
 */
var Player = /** @class */ (function () {
    function Player() {
    }
    Player.prototype.greet = function () {
        console.log("Hello, my name is " + this.name);
    };
    return Player;
}());
var mario = new Player();
//  These are pointer to different primitive values
mario.health = 10;
mario.speed = 1;
mario.isInvincible = true;
//  Breaking encapsulation
mario.greet();
//  Here there is a "mario2" pointing to an object in memory (specifically heap)
var peach = new Player();
peach.health = 10;
peach.speed = 1;
peach.isInvincible = true;
//  bc both mario & peach point to true (this 'true' is the same in memory so they point to same value)
/**
 * Getters and setters are meant to be able to add logic between setting/getting a value
 * eg) to check if a set is appropriate like setting a player's health to negative should not be allowed
 */
var Player2 = /** @class */ (function () {
    function Player2() {
    }
    Player2.prototype.getHealth = function () {
        return this.health;
    };
    Player2.prototype.setHealth = function (health) {
        if (health < 0) {
            console.log("You cannot set health below 0");
            return;
        }
        this.health = health;
    };
    return Player2;
}());
var p2 = new Player2();
p2.setHealth(-1);
/**
 * This private instance types are important to maintain encapsulation!
 * - It is important so clients cannot hurt the object & give it inconsistent state not meant to be done
 *     (like negative health)
 *
 *
 * An object that inherits a class cannot see its private instances BUT
 *     IT CAN SEE its protected instanses
 *     So it is good to use protected for inheriting and to prevent public scope for security &
 *         preventing inconsistent states that can be modified by client
 *
 *     Inheritance good for removing code duplication AND for making code more maintainable
 *
 *     Use IS-A and HAS-A relationship to be able to tell inheritance OR specific instance type classification
 *     Dog IS-A animal, Dog HAS-A owner
 */
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.makeNoise = function () {
        console.log("Make a noise");
    };
    Animal.prototype.move = function () {
        console.log("Moving right now...");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeNoise = function () {
        console.log("Bark bark bark...");
    };
    Dog.prototype.move = function () {
        console.log("getting up on all four paws...");
        _super.prototype.move.call(this);
    };
    return Dog;
}(Animal));
var dog = new Dog();
dog.makeNoise();
dog.move();
/**
 * Polymorphism
 *
 * - It is a contract between an object and its type
 *  -   We're saying that the object we are instanticating is a subclass of a certain type
 *      therefore we are guaranteed to have certain properties and behaviors from that that superclass
 *
 *
 * - abstract class Hero {} => Is an abstract class, you cannot instantiate it eg) let h = new Hero(); // its abstract
 *      You can only instantiate concrete classes
 *      -   Basically allow for behavior & state to still be shared AND allows for polymorphym AND allows
 *          for forcing subconcrete classes to implement behavior using abstract method
 *          (that didn't get ijmplemented in abstract bc it wouldn't make sense)
 *
 * -    abstract methods are meant to force subclasses to implement its implementation.
 *      -   abastract methods can only be within abstract classes* / interfaces not concreate classes
 *
 *      -   Also only concrete classes have to override the abstract methods they inherited NOT other abstract
 *          classes
 *
 * Interfaces just server as a contract for an object and work for polymorphism. THEY DON'T help with inheritance.
 *  an interface can however, extend a class
 *
 * -    cannot extend 2 classes but you can implement 2 or more interfaces with key 'implements'
 *
 */
// 1. basic classes
// 2. subclasses
// 3. abstract classes
// 4. interfaces
var Animal1 = /** @class */ (function () {
    function Animal1() {
    }
    return Animal1;
}());
var Dog1 = /** @class */ (function (_super) {
    __extends(Dog1, _super);
    function Dog1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog1.prototype.move = function () { };
    ;
    return Dog1;
}(Animal1));
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.run = function () { };
    Cat.prototype.move = function () { };
    return Cat;
}());
var Character = /** @class */ (function () {
    function Character() {
        this.weight = 10;
    }
    Character.prototype.displayWeight = function () {
        console.log("My weight is ", this.weight);
    };
    Character.prototype.move = function () {
        console.log("I am moving");
    };
    return Character;
}());
var Spy = /** @class */ (function (_super) {
    __extends(Spy, _super);
    function Spy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spy.prototype.save = function () {
        console.log("I am a spy saving my national gov't", "I can also access my weight", this.weight);
    };
    Spy.prototype.destroy = function () {
        console.log("I am a spy destroying my countries political adversaries");
    };
    return Spy;
}(Character));
var SpyDeciple = /** @class */ (function (_super) {
    __extends(SpyDeciple, _super);
    function SpyDeciple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpyDeciple.prototype.displayWeight = function () {
        _super.prototype.displayWeight.call(this);
        console.log("I am the deciple spy and I can access my inherited weight if protected or public: ", this.weight);
    };
    return SpyDeciple;
}(Spy));
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Knight;
}(Character));
var Archer = /** @class */ (function (_super) {
    __extends(Archer, _super);
    function Archer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Archer;
}(Character));
var Mage = /** @class */ (function (_super) {
    __extends(Mage, _super);
    function Mage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mage;
}(Character)); // we don't want Mage to be instantiated so mark as abstract **
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wizard.prototype.createMagic = function () {
        console.log("I am creating Wizard magic!");
    };
    return Wizard;
}(Mage));
var Witch = /** @class */ (function (_super) {
    __extends(Witch, _super);
    function Witch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Witch.prototype.createMagic = function () {
        console.log("I am creating witch magic!");
    };
    return Witch;
}(Mage));
var usSpy = new Spy();
usSpy.displayWeight();
var disSpy = new SpyDeciple();
disSpy.displayWeight();
/**
 * use constructor to initialize instances
 * 'static' kewword can be used in instantiation area for static values
 *  -   Static variables live the the Class level. All objects of same class have access to this memory
 * 'readonly' can only be set one
 *
 * class Character {
 *  static characterCount = 0;
 *  private health: number;
 *  readonly iCanOnlyBeSetOnce: number;
 *
 *  constructor(health: number, public hunger: number;) {
 *      super() // pass in any params to super if parent class does something on instantiation
 *      this.iCanOnlyBeSetOnce = 1
 *  }
 *
 *  triggerParent() {
 *      super.trigger();
 *  }
 *
 * }
 */
/**
 * OOP Recipe:
 * -    First consider the objects
 * -    Build them with state (instance types & behavior)
 * -    Upon noticing similar props & behavior create super classes to be able to extend & factor out commonalities
 *          & be able to manage it all from one place
 * -    At some point though you don't want everything to be concrete classes bc then you have to check
 *          everything's type & build custom logic for each class (a lot of conditional noodles that is unmaintainable)
 *      -   Sometimes all you need to know is that an object has certain props OR that it has a certain behavior
 *      -   Example ordercart process:
 *          -   Generic payment processor, for checkout step we only need paymentProcessor object & we only need
 *              to know that it has the ability to "charge" customer
 *              -   This is what polymorphism is good for *****
 *                  it provides the ability to assume an object has certain properties & behavior rather than
 *                  having to check for it's type & write conditional logic for every new concrete class which
 *                  can be limitless
 *
 * -    Also very important to understand process & isolated/reusable logic
 *      -   Should be closed and unchanged
 *      -   Important to not touch tested code. bc it can break again
 *      -   Understanding how generic behavior is important in order to prevent writing extra logic or cases
 *          on a process that is straight forward.
 *          -   It's important to build modules that encapsulate different logic, NOT TO MIX LOGIC WITHIN
 *              THE PIPELINE & add more degrees of freedom & complication*****
 *              -   Know exactly what the steps to a process are
 *              -   If custom logic is needed, see how to encapsulate & where that capsule can be passed in
 *                  in the current pipeline (w/ inversion of control - design patterns eg) Adapter pattern)
 *
 *          -   Design patterns help with this
 *
 *
 *
 * -    **Inversion of Control
 *
 *
 *  Design Patterns try to take what VARIES in a system and ENCAPSULATES IT *****
 *  -   They are meant to deal with CHANGE in software
 *  -   They are to allow reusablility(can use everywhere, write once use again elsewhere),
 *      extensibleness (can allow addition of new capabilites & functionality)
 *      & maintainability (Can modify from a central area don't need to update everything!)
 *
 *
 *
 *  Factory method:
 *  Benefits:
 *  -   Implementation can be changed without impacting API or user
 *
 */
/**
 * Singleton
 */
var SingletonPerson = /** @class */ (function () {
    function SingletonPerson(value) {
        this.instance = null;
        this.name = value;
    }
    SingletonPerson.prototype.getInstance = function () {
        if (this.instance == null) {
            this.instance = new SingletonPerson("Singleton");
        }
        return this.instance;
    };
    return SingletonPerson;
}());
/**
 *
 * Cracking the coding interview:
   4.2. Given a directed graph, design an algorithm to find out whether there is a route
       between 2 nodes


    //  Finish vid tutorial lessons about interfaces & incorporate some design patterns ***
    //  Queues/Stacks/Trees/recursion
    //  Helper functions
    //  https://www.bigocheatsheet.com/
*/
var DirectedNode = /** @class */ (function () {
    function DirectedNode() {
    }
    return DirectedNode;
}());
var Graph = /** @class */ (function () {
    function Graph(root) {
        this.root = root;
    }
    Graph.prototype.areNodesReachable = function (startNode, endNode) {
        if (!startNode || !endNode) {
            return false;
        }
    };
    return Graph;
}());
var DataStructure = /** @class */ (function () {
    function DataStructure() {
        this.list = [];
    }
    DataStructure.prototype.Insert = function (key, value) {
        var store = {
            time: Date.now(),
            key: key,
            value: value,
        };
        this.list.push(store);
    };
    DataStructure.prototype.Get = function (key) {
        //  Gets most recent key's value
        for (var i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i].key === key) {
                return this.list[i].value;
            }
        }
        return undefined;
    };
    DataStructure.prototype.GetTime = function (time, key) {
        //  Return most recent key's value that is at or before time
        //  Use BST for efficiency
        for (var i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i].key === key && this.list[i].time <= time) {
                return this.list[i].value;
            }
        }
        return undefined;
    };
    DataStructure.prototype.clear = function () {
        this.list = [];
    };
    DataStructure.prototype.InsertTestElement = function (time, key, value) {
        var store = {
            time: time,
            key: key,
            value: value,
        };
        this.list.push(store);
    };
    return DataStructure;
}());
// Now build testing interface:
/**
 * Account for:
 * -    Unreliability & instability of system time & async nature of it
 * -    Must maintain testing interface closed in original implementation from client
 */
var TestDataStructure = /** @class */ (function (_super) {
    __extends(TestDataStructure, _super);
    function TestDataStructure() {
        return _super.call(this) || this;
    }
    TestDataStructure.prototype.addTestCase = function (time, key, value) {
        _super.prototype.InsertTestElement.call(this, time, key, value);
    };
    return TestDataStructure;
}(DataStructure));
var TestSuiteDataStructure = /** @class */ (function () {
    function TestSuiteDataStructure() {
        this.testDS = new TestDataStructure();
        this.runSuite();
        console.log('Finished running test suite for datastructure...');
    }
    TestSuiteDataStructure.prototype.runSuite = function () {
        this.testCase1();
        this.testDS.clear();
        this.testCase2();
        this.testDS.clear();
        this.testCase3();
    };
    TestSuiteDataStructure.prototype.testCase1 = function () {
        this.testDS.addTestCase(1, 'key1', 'val1');
        this.testDS.addTestCase(2, 'key2', 'val2');
        this.testDS.addTestCase(3, 'key1', 'val3');
        console.log("TEST CASE 1:");
        console.log(this.testDS.GetTime(1, 'key1') === 'val1');
        console.log(this.testDS.GetTime(2, 'key1') === 'val1');
        console.log(this.testDS.GetTime(3, 'key1') === 'val3');
    };
    TestSuiteDataStructure.prototype.testCase2 = function () {
        this.testDS.addTestCase(1, 'key1', 'val1');
        this.testDS.addTestCase(2, 'key1', 'val2');
        this.testDS.addTestCase(3, 'key1', 'val3');
        console.log("TEST CASE 2:");
        console.log(this.testDS.GetTime(1, 'key1') === 'val1');
        console.log(this.testDS.GetTime(2, 'key1') === 'val2');
        console.log(this.testDS.GetTime(3, 'key1') === 'val3');
    };
    TestSuiteDataStructure.prototype.testCase3 = function () {
        console.log("TEST CASE 3:");
        console.log(this.testDS.GetTime(1, 'key1') === undefined);
    };
    return TestSuiteDataStructure;
}());
var testDS = new TestSuiteDataStructure();
//  https://blog.rsuter.com/how-to-instantiate-a-generic-type-in-typescript/
var Person = /** @class */ (function () {
    function Person() {
        this.firstName = 'John';
        this.lastName = 'Doe';
    }
    return Person;
}());
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.create = function (type) {
        return new type();
    };
    return Factory;
}());
var factory = new Factory();
var person = factory.create(Person);
console.log(JSON.stringify(person));
//# sourceMappingURL=debug.js.map