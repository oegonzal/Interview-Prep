/**
 * REVIEW:
 * https://www.tutorialspoint.com/design_pattern/design_pattern_interview_questions.htm
 *
 * BTREE in databases
 * -    SQL: EXPLAIN COMMAND
 *      -   https://www.youtube.com/watch?v=NI9wYuVIYcA
 *      -   CHECK which index help more than they harm
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var VisitedState;
(function (VisitedState) {
    VisitedState[VisitedState["Visited"] = 0] = "Visited";
    VisitedState[VisitedState["NotVisited"] = 1] = "NotVisited";
})(VisitedState || (VisitedState = {}));
class GraphNode {
}
class BST {
    constructor() {
        this.graph;
    }
    doNodesConnect(start, end) {
        const queue = [];
        queue.unshift(start);
        start.state = VisitedState.Visited;
        while (queue.length > 0) {
            const curNode = queue.shift();
            if (curNode === end)
                return true;
            for (let n of curNode.edges) {
                if (n.state == VisitedState.NotVisited) {
                    queue.unshift(n);
                    n.state = VisitedState.Visited;
                }
            }
        }
        return false;
    }
}
class DPS {
    constructor() { }
    doNodesConnect(start, end) {
        let stack = [];
        stack.push(start);
        start.state = VisitedState.Visited;
        while (stack.length > 0) {
            const curNode = stack.pop();
            if (curNode === end)
                return true;
            for (let n of curNode.edges) {
                if (n.state == VisitedState.NotVisited) {
                    stack.push(n);
                    n.state = VisitedState.Visited;
                }
            }
        }
    }
}
class LLNode {
    constructor(value, prop) {
        this.value = value;
        this.height = prop.height;
    }
}
class LinkedList {
    addHead(node) {
        node.next = this.head;
        this.head.next = node;
    }
    addTail(node) {
        node.prev = this.tail;
        this.tail = node;
    }
}
class BSTNode {
    constructor({ value, height }) {
        if (value === null || value === undefined)
            throw new Error("BSTNode must have a value");
        this.left = null;
        this.right = null;
        this.value = value;
        this.height = height;
        this.state = VisitedState.NotVisited;
    }
}
//  TODO: make this class generic and pass in a comparator
class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        this.root = this.insertRecurse(this.root, value);
    }
    insertRecurse(parent, value) {
        if (!parent) {
            return new BSTNode({ value });
        }
        if (value < parent.value) {
            parent.left = this.insertRecurse(parent.left, value);
        }
        else if (value > parent.value) {
            parent.right = this.insertRecurse(parent.right, value);
        }
        return parent;
    }
    printInOrder(node = this.root) {
        let logObj = { str: '' };
        function inOrder(node, logObj) {
            if (!node)
                return;
            inOrder(node.left, logObj);
            logObj.str += `${node.value} `;
            inOrder(node.right, logObj);
        }
        inOrder(node, logObj);
        console.log(logObj.str);
    }
    printInOrderStack(node = this.root) {
        var _a, _b;
        const strTokens = [];
        let stack = [];
        if (node)
            stack.push(node);
        while (stack.length > 0) {
            const parent = stack[stack.length - 1];
            parent.state = VisitedState.Visited;
            if (((_a = parent === null || parent === void 0 ? void 0 : parent.left) === null || _a === void 0 ? void 0 : _a.state) === VisitedState.NotVisited)
                stack.push(parent.left);
            else {
                strTokens.push(parent.value);
                stack.pop();
                if (((_b = parent === null || parent === void 0 ? void 0 : parent.right) === null || _b === void 0 ? void 0 : _b.state) === VisitedState.NotVisited) {
                    stack.push(parent.right);
                }
            }
        }
        // while (stack.length > 0) { // left, parent, right
        //     const parent = stack[stack.length-1];
        //     if (!parent)
        //         stack.pop(); // Dead case (null node)
        //     else if (parent.state === VisitedState.NotVisited) {
        //         stack.push(parent.left);
        //         parent.state = VisitedState.Visited;
        //     }
        //     else {
        //         stack.push(parent.right);
        //         strTokens.push(stack.pop().value);
        //     }
        // }
        // let str: string = '';
        // while (stack.length > 0) {
        //     let peek = stack[stack.length - 1];
        //     peek.state = VisitedState.Visited;
        //     if (peek.left?.state == VisitedState.NotVisited) {
        //         stack.push(peek.left);
        //         continue;
        //     }
        //     str += `${peek.value} `;
        //     stack.pop();
        //     if (peek.right?.state == VisitedState.NotVisited) {
        //         stack.push(peek.right);
        //     }
        // }
        let inOrderStr = strTokens.join(" ");
        console.log(inOrderStr);
    }
    printPreOrder(node = this.root) {
        let logObj = { str: '' };
        function preOrder(node, logObj) {
            if (!node)
                return;
            logObj.str += `${node.value} `;
            preOrder(node.left, logObj);
            preOrder(node.right, logObj);
        }
        preOrder(node, logObj);
        console.log(logObj.str);
    }
    /**
     *           4
     *        2     6
     *      1  3   5  7
     */
    //  Parent, Left, Right // Inserted: 4,2,3,1,6,5,7
    printPreOrderStack(node = this.root) {
        const printTokens = [];
        let stack = [{ parent: node, leftVisited: false, rightVisited: false }];
        while (stack.length > 0) {
            let current = stack[stack.length - 1];
            if (!current.parent)
                stack.pop();
            else if (!current.leftVisited) {
                printTokens.push(current.parent.value);
                current.leftVisited = true;
                stack.push({ parent: current.parent.left, leftVisited: false, rightVisited: false });
            }
            else {
                stack.pop();
                current.rightVisited = true;
                stack.push({ parent: current.parent.right, leftVisited: false, rightVisited: false });
            }
        }
        // stack = [node];
        // while (stack.length > 0) {
        //     const parent = stack.pop();;
        //     if (parent)
        //         printTokens.push(parent.value);
        //         stack.push(parent.right);
        //         stack.push(parent.left);
        // }
        const preorderStr = printTokens.join(" ");
        console.log(preorderStr);
    }
    printPostOrder(node = this.root) {
        let logObj = { str: '' };
        function postOrder(node, logObj) {
            if (!node)
                return;
            postOrder(node.left, logObj);
            postOrder(node.right, logObj);
            logObj.str += `${node.value} `;
        }
        postOrder(node, logObj);
        console.log(logObj.str);
    }
    //  Left, Right, Parent
    printPostOrderStack(node = this.root) {
        const strTokens = [];
        const stack = [{ parent: node, leftVisited: false, rightVisited: false }];
        while (stack.length > 0) {
            const context = stack[stack.length - 1];
            if (!context.parent)
                stack.pop();
            else if (!context.leftVisited) {
                context.leftVisited = true;
                stack.push({ parent: context.parent.left, leftVisited: false, rightVisited: false });
            }
            else if (!context.rightVisited) {
                context.rightVisited = true;
                stack.push({ parent: context.parent.right, leftVisited: false, rightVisited: false });
            }
            else {
                stack.pop();
                strTokens.push(context.parent.value);
            }
        }
        // //  left, right, parent
        // const nStack: Array<BSTNode<number>> = []
        // while (nStack.length > 0) {
        //     const parent = nStack[nStack.length-1];
        //     if (!parent)
        //         nStack.pop(); // Dead case (null node)
        //     else if (parent.state === VisitedState.NotVisited) {
        //         nStack.push(parent.right);
        //         nStack.push(parent.left);
        //         parent.state = VisitedState.Visited;
        //     }
        //     else {
        //         strTokens.push( nStack.pop().value ); // Already visited so do post print
        //     }
        // }
        const postOrderStr = strTokens.join(" ");
        console.log(postOrderStr);
    }
    isBST(node) {
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
    }
    printTree(root = this.root) {
        function buildLinkedList(node = this.root, level = 0) {
            if (!node)
                return undefined;
            const curNode = new LLNode(node.value, { height: level });
            if (node.right) {
                //  Get right link to current node & connect list
                let right = buildLinkedList(node.right, level + 1);
                while (right.prev)
                    right = right.prev;
                curNode.next = right;
                right.prev = curNode;
            }
            if (node.left) {
                //  Get left link to current node & connect list
                let left = buildLinkedList(node.left, level + 1);
                while (left.next)
                    left = left.next;
                curNode.prev = left;
                left.next = curNode;
            }
            return curNode;
        }
        let head = buildLinkedList(root, 0);
        while (head.prev)
            head = head.prev; // To get index 0 & iterate to last index & get each node's order
        const levelMap = {};
        let unitSize = 0;
        for (let i = 0; !!head; i++, head = head.next) {
            if (!levelMap[head.height])
                levelMap[head.height] = [];
            levelMap[head.height].push({ i, node: head });
            unitSize = Math.max(unitSize, head.value.toString().length);
        }
        //  Print in order of lowest level to highest
        Object.keys(levelMap).sort().forEach((levelKey) => {
            const levelNodes = levelMap[levelKey];
            const lastInd = levelNodes.length - 1;
            let tokens = [];
            for (let i = 0, nI = 0; i <= levelNodes[lastInd].i; i++) {
                const curNodeData = levelNodes[nI];
                if (curNodeData.i === i && ++nI) {
                    const str = String(curNodeData.node.value);
                    tokens.push(" ".repeat(Math.max(0, unitSize - str.length)) + str);
                }
                else
                    tokens.push(" ".repeat(unitSize));
            }
            console.log(tokens.join(''));
        });
    }
    clear() {
        this.root = null;
    }
}
// Test
/**
 *           4
 *        2     6
 *      1  3   5  7
 */
// Inserted: 4,2,3,1,6,5,7
let BT = new BinaryTree();
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
BT.printPreOrderStack(); // 4 2 1 3 6 5 7
BT.printPostOrderStack(); // 1 3 2 5 7 6 4
console.log("Is BST: ", BT.isBST(BT.root));
//  Print tree
BT.printTree();
/**
 *
 * Case 1:
 * =======1=======
 * ===2=======3===
 * =4===5===6===7=
 * 8=9=9=9=9=9=9=9
 *
 * Case 2:
 * =======1=======   2^0
 * ===2=======3===   2^1
 * =4===5=======6=   2^2
 * 7=8===9=======10  2^3 + (2^3 - 1) units for last level   //  (2^3 - 1) represents the 1 unit padding in between
 *                                                          //  the last layer with full elements
 *                                                          //  Each blank in-between elements represent a spot
 *                                                          //  for an acestor node above
 *
 * Now we just have to figure out where a node goes in its layer accoring to the possible units in a layer
 *  based on last level
 *
 * Next unit, goes in the midpoint between parent and grandparent of available padding
 *
 * Lastly, calculate how much each unit fills in space (based on max integer with most units in it aka 3892 => 4 units)
 *
 *
 * Lowest level max digits + a padding in between them
 *
 *
 * Once we have top layers
 * -    Start from last layer and move up to root layer
 * -    Then move up to one layer higher & place parents in between (in index) of its child nodes
 * -    When done (hit root layer), pad the inbetween of nodes when printing out from top layer to bottom
 *      -   Padding should max unit (based on integer with most ints in it) per leaf node
 *          & undefined nodes & inbetween them
 *
 *
 * -    Breadth first search per level
 * -    Store each level in a list of lists
 * -    Use 2^n + (2^n - 1) = total # units in printable range where n is index of last level in list of lists
 * -    Start assigning indexes starting with root level (midindex of all possible range)
 * -    Check its left then right child, assign to each midpt between start to root ind (left) vice versa for right
 *          which would be from rootInd to endInd of range (IN GENERAL, any edge node takes edge ind to calc midpt)
 *          -   Think linked list
 * -    Keep track of current grandparent & parent and assign to midpt of the 2 for next node in next level,
 *          as you go through a parent level
 *      when done, make child level the parent level
 *
 * -    Get unit size & do prints for each level of indexes & that index corresponding value
 *
 *
 * EASY WAY:
 * -    Technically this whole probelm can be solved by making a linkedlist of the tree, where
 *          each node in linked list has also the level it was found in (can be done via inorder traversal)
 *
 *
 * General strategy:
 * -    Do not try to solve 2 types of problems in the same logic
 * -    Seperate different problems into different logic spaces (makes much easier - for instance
 *          the distance between nodes & unit padding problem above)
 *
 */
/**
 *
 * Create a self balancing tree
 *
 * Create a print function to show tree
 *
 */
//  TODO: make this class generic and pass in a comparator
class BalanceTree extends BinaryTree {
    constructor() {
        super();
        this.rebalanceHeight = 2;
    }
    getHeight(node) {
        var _a, _b;
        const rightH = ((_a = node === null || node === void 0 ? void 0 : node.right) === null || _a === void 0 ? void 0 : _a.height) || 0;
        const leftH = ((_b = node === null || node === void 0 ? void 0 : node.left) === null || _b === void 0 ? void 0 : _b.height) || 0;
        return { height: Math.max(rightH, leftH) + 1, leftH, rightH };
    }
    rotateRight(node) {
        const newParent = node.left;
        node.left = node.left.right; // Guaranteed to exist otherwise inbalance would not have occured
        newParent.right = node;
        let { height: nodeHeight } = this.getHeight(node);
        node.height = nodeHeight;
        let { height: newParentHeight } = this.getHeight(newParent);
        newParent.height = newParentHeight; // root goes last bc new child needs height update first
        return newParent;
    }
    rotateLeft(node) {
        const newParent = node.right;
        node.right = node.right.left; // Guaranteed to exist otherwise inbalance would not have occured
        newParent.left = node;
        let { height: nodeHeight } = this.getHeight(node);
        node.height = nodeHeight;
        let { height: newParentHeight } = this.getHeight(newParent);
        newParent.height = newParentHeight; // root goes last bc new child needs height update first
        return newParent;
    }
    //  11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5,6
    insert(value, printInsert = false) {
        const insert = (node, value) => {
            //  First insert node & pass down to location it belongs
            if (!node)
                return new BSTNode({ value, height: 1 });
            else if (node.value === value) {
                throw new Error("No duplicate inserts allowed");
            }
            else if (value <= node.value)
                node.left = insert(node.left, value);
            else
                node.right = insert(node.right, value);
            //  Update current node's height (negative if shifts to left, postive if shifts to right)
            const { height, leftH, rightH } = this.getHeight(node);
            node.height = height;
            //  Then trigger rebalance if node is unbalanced
            if (this.rebalanceHeight <= Math.abs(leftH - rightH)) {
                //  Inserted value is smaller than current node
                if (node.value > value) {
                    if (value < node.left.value) {
                        node = this.rotateRight(node);
                    }
                    else {
                        node.left = this.rotateLeft(node.left);
                        node = this.rotateRight(node);
                    }
                }
                //  Inserted value is bigger than current node
                else {
                    if (value < node.right.value) {
                        node.right = this.rotateRight(node.right);
                        node = this.rotateLeft(node);
                    }
                    else {
                        node = this.rotateLeft(node);
                    }
                }
            }
            return node;
        };
        this.root = insert(this.root, value);
        if (printInsert) {
            console.log(`______ INSERTING : (${value}) _____`);
            this.printTree(this.root);
        }
    }
}
let testArray = [11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 60, 50, 7];
const balanceTree = new BalanceTree();
for (let num of testArray) {
    balanceTree.insert(num, false);
}
console.log('TESTING MY BALANCE BST!!!!');
balanceTree.printInOrder();
balanceTree.printTree();
balanceTree.clear();
//  Non-balance Tree
BT = new BinaryTree();
for (let num of testArray) {
    BT.insert(num);
}
console.log('TESTING MY NONE Balance BST!!!!');
BT.printInOrder();
BT.printTree();
BT.clear();
console.log("Printed first balance tree than unbalanced tree");
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
class Car {
    getDescription() {
        return this.description;
    }
}
// NOTE: abstract class cannot be instantiated
// const car = new Car();
//  Specific concrete subclass of Car
class ModelS extends Car {
    constructor() {
        super(...arguments);
        this.description = "Model S";
    }
    cost() {
        return 73000;
    }
}
//  Specific concrete subclass of Car
class ModelX extends Car {
    constructor() {
        super(...arguments);
        this.description = "Model X";
    }
    cost() {
        return 77000;
    }
}
//  abstract class cannot be instanticated
//  Extends car bc we will be using polymorphism (important for decorator pattern)
class CarOptions extends Car {
}
class EnhancedAutoPilot extends CarOptions {
    constructor(car) {
        super();
        this.decoratedCar = car;
    }
    getDescription() {
        return this.decoratedCar.getDescription() + ', Enhanced AutoPilot';
    }
    cost() {
        return this.decoratedCar.cost() + 5000;
    }
}
class RearFacingSeats extends CarOptions {
    constructor(car) {
        super();
        this.decoratedCar = car;
    }
    getDescription() {
        return this.decoratedCar.getDescription() + ', Rear facing seats';
    }
    cost() {
        return this.decoratedCar.cost() + 4000;
    }
}
let myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla);
myTesla = new EnhancedAutoPilot(myTesla);
console.log(myTesla.cost());
console.log(myTesla.getDescription());
class WeatherStation {
    constructor() {
        this.observers = [];
    }
    setTemperature(temp) {
        console.log("WeatherStation: new temperature measurement " + temp);
        this.temperature = temp;
        this.notifyObservers();
    }
    registerObserver(o) {
        this.observers.push(o);
    }
    removeObserver(o) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }
    notifyObservers() {
        for (let observers of this.observers) {
            observers.update(this.temperature);
        }
    }
}
class TemperatureDisplay {
    constructor(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    update(temperature) {
        console.log("TemperatureDisplay: I need to update my temperature display ", temperature);
    }
}
class Fan {
    constructor(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    update(temperature) {
        if (temperature > 25) {
            console.log('Fan: its hot here, turning myself on...');
        }
        else {
            console.log('Fan: its nice and cool, tunring myself off...');
        }
    }
}
let weatherStation = new WeatherStation();
let tempDisplay = new TemperatureDisplay(weatherStation);
let fan = new Fan(weatherStation);
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
class BlurayPlayer {
    on() {
        console.log('Bluray player turning on...');
    }
    turnOff() {
        console.log("blueray turning off...");
    }
    play() {
        console.log('Playing bluray disc...');
    }
}
class Amplifier {
    on() {
        console.log('Amp is turning on...');
    }
    turnOff() {
        console.log('Amplifier turning off...');
    }
    setSource(source) {
        console.log('Setting source to ' + source);
    }
    setVolume(volumeLevel) {
        console.log('Setting volume to ' + volumeLevel);
    }
}
class Lights {
    dim() {
        console.log('Lights are dimming...');
    }
}
class TV {
    turnOn() {
        console.log('TV turning on...');
    }
    turnOff() {
        console.log("TV turning off...");
    }
}
class PopcornMaker {
    turnOn() {
        console.log("Popcorn maker turning on...");
    }
    turnOff() {
        console.log("Popcorn maker turning off...");
    }
    pop() {
        console.log("Popping corn!");
    }
}
class HomeTheaterFacade {
    constructor(amp, bluray, lights, tv, popcornMaker) {
        this.amp = amp;
        this.bluray = bluray;
        this.lights = lights;
        this.tv = tv;
        this.popcornMaker = popcornMaker;
    }
    watchMovie() {
        this.popcornMaker.turnOn();
        this.popcornMaker.pop();
        this.lights.dim();
        this.tv.turnOn();
        this.amp.on();
        this.amp.setSource('bluray');
        this.amp.setVolume(11);
        this.bluray.on();
        this.bluray.play();
    }
    endMovie() {
        this.popcornMaker.turnOff();
        this.amp.turnOff();
        this.tv.turnOff();
        this.bluray.turnOff();
    }
}
let bluray = new BlurayPlayer();
let amp = new Amplifier();
let lights = new Lights();
let tv = new TV();
let popcornMaker = new PopcornMaker();
let hometheater = new HomeTheaterFacade(amp, bluray, lights, tv, popcornMaker);
hometheater.watchMovie();
class iPhone7 {
    useLightning() {
        console.log('Using lightning port..');
    }
}
class GooglePixel {
    useMicroUSB() {
        console.log('Using micro USB...');
    }
}
class LightningToMicroUSBAdapter {
    constructor(iphone) {
        this.iphoneDevice = iphone;
    }
    useMicroUSB() {
        console.log('Want to use micro USB, converting to Lightning.....');
        this.iphoneDevice.useLightning();
    }
}
let iphone = new iPhone7();
let chargeAdapter = new LightningToMicroUSBAdapter(iphone);
chargeAdapter.useMicroUSB();
class Order {
    constructor() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);
        this.setState(this.paymentPendingState);
    }
    setState(state) {
        this.currentState = state;
    }
    getState() {
        return this.currentState;
    }
}
class PaymentPendingState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log("Cancelling your unpaid order...");
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('Payment verified! Shipping soon.');
        this.order.setState(this.order.orderBeingPreparedState);
    }
    shipOrder() {
        console.log('Cannot ship the order wehn payment is pending');
    }
}
class CancelledOrderState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log('Your order has already been cancelled');
    }
    verifyPayment() {
        console.log('Order cancelled, you cannot verify payment');
    }
    shipOrder() {
        console.log('Order cannot ship, it was cancelled');
    }
}
class OrderBeingPreparedState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log("Cancelling your order...");
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('Already verified your payment');
    }
    shipOrder() {
        console.log('Shipping your order now!');
        this.order.setState(this.order.orderShippedState);
    }
}
class OrderShippedState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log('You cannot cancel, already shipped...');
    }
    verifyPayment() {
        console.log('You cannot verify payment, already shipped...');
    }
    shipOrder() {
        console.log('You cannot ship it again, already shipped...');
    }
}
let order = new Order();
// order.getState().shipOrder()
// order.getState().verifyPayment();
// order.getState().verifyPayment();
order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();
console.log('Order state: ' + order.getState().constructor.name);
class TinderBot {
    constructor() {
        this.MatchScreen = new MatchScreen(this);
        this.ErrorScreen = new ErrorScreen(this);
        this.PhotoScreen = new PhotoScreen(this);
        this.setState(this.PhotoScreen);
        // while (each second) this(TinderBot).getState.doDefaultAction()
    }
    setState(state) {
        this.currentState = state;
        console.log('Just entered: ' + state.constructor.name, ' state');
    }
    getState() {
        return this.currentState;
    }
}
class MatchScreen {
    constructor(TinderBot) {
        this.bot = TinderBot;
    }
    closeModal() {
    }
    swipeRight() {
    }
    restart() {
    }
}
class ErrorScreen {
    constructor(TinderBot) {
        this.bot = TinderBot;
    }
    closeModal() {
    }
    swipeRight() {
    }
    restart() {
    }
}
class PhotoScreen {
    constructor(TinderBot) {
        this.bot = TinderBot;
    }
    closeModal() {
    }
    swipeRight() {
    }
    restart() {
    }
}
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
class Player {
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
const mario = new Player();
//  These are pointer to different primitive values
mario.health = 10;
mario.speed = 1;
mario.isInvincible = true;
//  Breaking encapsulation
mario.greet();
//  Here there is a "mario2" pointing to an object in memory (specifically heap)
const peach = new Player();
peach.health = 10;
peach.speed = 1;
peach.isInvincible = true;
//  bc both mario & peach point to true (this 'true' is the same in memory so they point to same value)
/**
 * Getters and setters are meant to be able to add logic between setting/getting a value
 * eg) to check if a set is appropriate like setting a player's health to negative should not be allowed
 */
class Player2 {
    getHealth() {
        return this.health;
    }
    setHealth(health) {
        if (health < 0) {
            console.log("You cannot set health below 0");
            return;
        }
        this.health = health;
    }
}
const p2 = new Player2();
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
class Animal {
    makeNoise() {
        console.log("Make a noise");
    }
    move() {
        console.log("Moving right now...");
    }
}
class Dog extends Animal {
    makeNoise() {
        console.log("Bark bark bark...");
    }
    move() {
        console.log("getting up on all four paws...");
        super.move();
    }
}
const dog = new Dog();
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
class Animal1 {
}
class Dog1 extends Animal1 {
    move() { }
    ;
}
class Cat {
    run() { }
    move() { }
}
class Character {
    constructor() {
        this.weight = 10;
    }
    displayWeight() {
        console.log("My weight is ", this.weight);
    }
    move() {
        console.log("I am moving");
    }
}
class Spy extends Character {
    save() {
        console.log("I am a spy saving my national gov't", "I can also access my weight", this.weight);
    }
    destroy() {
        console.log("I am a spy destroying my countries political adversaries");
    }
}
class SpyDeciple extends Spy {
    displayWeight() {
        super.displayWeight();
        console.log("I am the deciple spy and I can access my inherited weight if protected or public: ", this.weight);
    }
}
class Knight extends Character {
}
class Archer extends Character {
}
class Mage extends Character {
} // we don't want Mage to be instantiated so mark as abstract **
class Wizard extends Mage {
    createMagic() {
        console.log("I am creating Wizard magic!");
    }
}
class Witch extends Mage {
    createMagic() {
        console.log("I am creating witch magic!");
    }
}
const usSpy = new Spy();
usSpy.displayWeight();
const disSpy = new SpyDeciple();
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
class SingletonPerson {
    constructor(value) {
        this.instance = null;
        this.name = value;
    }
    getInstance() {
        if (this.instance == null) {
            this.instance = new SingletonPerson("Singleton");
        }
        return this.instance;
    }
}
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
class DirectedNode {
}
class Graph {
    constructor(root) {
        this.root = root;
    }
    areNodesReachable(startNode, endNode) {
        if (!startNode || !endNode) {
            return false;
        }
    }
}
class DataStructure {
    constructor() {
        this.list = [];
    }
    Insert(key, value) {
        const store = {
            time: Date.now(),
            key,
            value,
        };
        this.list.push(store);
    }
    Get(key) {
        //  Gets most recent key's value
        for (let i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i].key === key) {
                return this.list[i].value;
            }
        }
        return undefined;
    }
    GetTime(time, key) {
        //  Return most recent key's value that is at or before time
        //  Use BST for efficiency
        for (let i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i].key === key && this.list[i].time <= time) {
                return this.list[i].value;
            }
        }
        return undefined;
    }
    clear() {
        this.list = [];
    }
    InsertTestElement(time, key, value) {
        const store = {
            time,
            key,
            value,
        };
        this.list.push(store);
    }
}
// Now build testing interface:
/**
 * Account for:
 * -    Unreliability & instability of system time & async nature of it
 * -    Must maintain testing interface closed in original implementation from client
 */
class TestDataStructure extends DataStructure {
    constructor() {
        super();
    }
    addTestCase(time, key, value) {
        super.InsertTestElement(time, key, value);
    }
}
class TestSuiteDataStructure {
    constructor() {
        this.testDS = new TestDataStructure();
        this.runSuite();
        console.log('Finished running test suite for datastructure...');
    }
    runSuite() {
        this.testCase1();
        this.testDS.clear();
        this.testCase2();
        this.testDS.clear();
        this.testCase3();
    }
    testCase1() {
        this.testDS.addTestCase(1, 'key1', 'val1');
        this.testDS.addTestCase(2, 'key2', 'val2');
        this.testDS.addTestCase(3, 'key1', 'val3');
        console.log("TEST CASE 1:");
        console.log(this.testDS.GetTime(1, 'key1') === 'val1');
        console.log(this.testDS.GetTime(2, 'key1') === 'val1');
        console.log(this.testDS.GetTime(3, 'key1') === 'val3');
    }
    testCase2() {
        this.testDS.addTestCase(1, 'key1', 'val1');
        this.testDS.addTestCase(2, 'key1', 'val2');
        this.testDS.addTestCase(3, 'key1', 'val3');
        console.log("TEST CASE 2:");
        console.log(this.testDS.GetTime(1, 'key1') === 'val1');
        console.log(this.testDS.GetTime(2, 'key1') === 'val2');
        console.log(this.testDS.GetTime(3, 'key1') === 'val3');
    }
    testCase3() {
        console.log("TEST CASE 3:");
        console.log(this.testDS.GetTime(1, 'key1') === undefined);
    }
}
const testDS = new TestSuiteDataStructure();
//  https://blog.rsuter.com/how-to-instantiate-a-generic-type-in-typescript/
class Person {
    constructor() {
        this.firstName = 'John';
        this.lastName = 'Doe';
    }
}
class Factory {
    create(type) {
        return new type();
    }
}
let factory = new Factory();
let person = factory.create(Person);
console.log(JSON.stringify(person));
class LRU {
    constructor(capacity) {
        this.map = {};
        this.deque = new LinkedList(); // LLNode
        this.capacity = capacity;
        this.size = 0;
    }
    //  O(logn)
    Insert(key, value) {
        let node = this.map[key];
        if (node) {
            node.value = value; // replace prev value to new if node already in struct
        }
        else {
            node = new LLNode(value);
            this.map[key] = node;
        }
        this.UpdateToLatest(node);
        //  Remove oldest node if capacity is full
        if (this.size === this.capacity) {
            this.deque.tail = this.deque.tail.next;
            this.deque.tail.prev = null;
        }
        //  If capacity not full yet, then just increment size bc we added new node
        else {
            this.size = Math.min(this.capacity, ++this.size);
        }
    }
    //  O(1)
    Get(key) {
        const node = this.map[key];
        this.UpdateToLatest(node);
        return node.value;
    }
    UpdateToLatest(node) {
        //  If updating exisiting node from its current position, detach from neighbors & attach them together
        if (node.prev)
            node.prev = node.next;
        if (node.next)
            node.next = node.prev;
        //  Make node latest & update head pointer
        if (this.deque.head)
            this.deque.head.next = node;
        node.prev = this.deque.head;
        node.next = null;
        this.deque.head = node;
    }
}
/**
* Write a function which takes array of arrays and returns all possible combinations
*
*  Input: [["www", "abc"], ["frequence", "frequencerocks"], ["com", "in"]]
*
*  Output: ["www.frequence.com", "www.frequence.in", "www.frequencerocks.com", "www.frequencerocks.in", "abc.frequence.com", "abc.frequence.in",
*  "abc.frequencerocks.com", "abc.frequencerocks.in"]
*
    Tips:
        -   Understand specification extremely well. No ones wants someone that does incorrect work
        -   Solve a problem at a time per subspace & don't mix (will lead to confusion & excessive mental computation)
        -   Test your code when done (no one wants to hire someone with buggy code)

*/
//  Post solution, recursively now
function getCombinationsR(result, array, arrayInd, str) {
    if (array.length == 0)
        return;
    if (arrayInd == array.length) {
        result.push(str);
        return;
    }
    const subarray = array[arrayInd];
    subarray.forEach((strToken) => {
        const passString = (arrayInd === 0) ? strToken : str + "." + strToken;
        getCombinationsR(result, array, arrayInd + 1, passString);
    });
}
//  Post solution after some thinking
function getCombinations(array) {
    const result = [];
    const stack = [];
    stack.push(0);
    while (stack.length > 0) {
        const lastInd = stack.length - 1;
        if (array.length < stack.length || array[lastInd].length - 1 < stack[lastInd]) {
            stack.pop();
            if (stack.length > 0)
                stack[stack.length - 1]++;
        }
        else {
            if (array.length === stack.length) {
                const strTokens = [];
                stack.forEach((subInd, ind) => strTokens.push(array[ind][subInd]));
                const str = strTokens.join(".");
                result.push(str);
            }
            stack.push(0);
        }
    }
    return result;
}
const input = [["www", "abc"], ["frequence", "frequencerocks"], ["com", "in"]];
const result1 = getCombinations(input);
console.log(result1, result1.length);
const result2 = [];
getCombinationsR(result2, input, 0, "");
console.log(result2, result2.length);
/*  Remove duplicates

    [1,2,3,7,6,1,3,9,4] =>
    [1,2,3,7,6,9,4]

    //  Maintain order
*/
function remDups(input) {
    const map = {};
    const dupIndexes = [];
    for (let i = 0; i < input.length; i++) {
        //  Record first time occuring values in map
        if (!map[input[i]]) {
            map[input[i]] = true;
        }
        //  Duplicate (has already occured earlier in the list)
        else {
            dupIndexes.push(i);
        }
    }
    let result = [...input]; // Or input if we want to modify inplace
    for (let i = dupIndexes.length - 1; i >= 0; i--) {
        result.splice(dupIndexes[i], 1);
    }
    return result;
} //  Splice remove INPLACE****
const dupsInput = [1, 2, 3, 7, 6, 1, 3, 9, 4];
console.log(remDups(dupsInput)); // == [1,2,3,7,6,9,4]
//  This will NOT give expected output:
(function (dupsInput) {
    const copyinput = [...dupsInput]; // [1,2,3,7,6,1,3,9,4]
    const dupsindexes = [5, 6];
    for (let i = 0; i < dupsindexes.length; i++) {
        copyinput.splice(dupsindexes[i], 1);
    }
    console.log(copyinput); // Expected [1,2,3,7,6,9,4] but will get: [1,2,3,7,6,3,4] which is wrong
    //  Bc we're removing an adjusted array when we remove elements from boundary
    //  below where we already modified
    //  NOTE: this is very inefficient to have to wait for engine to adjust array
    //  AND SHIFT all els by one bc you are removing an element
})(dupsInput);
/**
 * 4.3. Produce a binary search tree of an in-order array with minimal height (unq integer vals)
 *
 * Strategy:
 * -    minimal height means tree should be balanced
 * -    inorder array means midpoints of sections will be the parents
 * -    DFS: we want to do one path at a time
 *
 * -    Iteratively
 *      -   Make a wrapper that holds extra state around node
 *
 *
 */
// Recursively
function buildBSTR(inorderArray, start = 0, end = inorderArray.length - 1) {
    if (end < start)
        return null;
    let mid = Math.floor((start + end) / 2);
    let node = new BSTNode({ value: inorderArray[mid] });
    node.left = buildBSTR(inorderArray, start, mid - 1);
    node.right = buildBSTR(inorderArray, mid + 1, end);
    return node;
}
//  Traversal (pre-order): parent, left, right
//  Good exercise on how to use recursive return on iterative implementation ***
//  And getting node at end
function buildBST(inorderArray) {
    let root = null;
    let stack = [{
            node: root, start: 0, end: inorderArray.length - 1, visited: false, leftChildOf: null, rightChildOf: null
        }];
    while (stack.length > 0) {
        let context = stack[stack.length - 1];
        const { start, end, leftChildOf, rightChildOf } = context;
        if (end < start) {
            stack.pop(); //  Dead case
        }
        else if (context.visited) {
            root = stack.pop().node; //  last to pop should be root
        }
        else {
            let mid = Math.floor((start + end) / 2);
            context.node = new BSTNode({ value: inorderArray[mid] });
            if (leftChildOf)
                leftChildOf.left = context.node;
            else if (rightChildOf)
                rightChildOf.right = context.node;
            stack.push({
                node: null, start: mid + 1, end, visited: false, leftChildOf: null, rightChildOf: context.node,
            }); // Right child push
            stack.push({
                node: null, start, end: mid - 1, visited: false, leftChildOf: context.node, rightChildOf: null,
            }); // Left child push (second to be more recent in stack)
        }
        context.visited = true;
    }
    return root;
}
const inordertree = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
//  Recursively
let inorderBuiltTree = buildBSTR(inordertree);
BT.printTree(inorderBuiltTree);
//  Iteratively
inorderBuiltTree = buildBST(inordertree);
BT.printTree(inorderBuiltTree);
console.log("Array to tree ^");
function chunkString(str, len) {
    let chunkArray = [];
    let tokens = [];
    //  First split by spaces (bc that is what we mainly care about)
    let spaceSepTokens = str.split(" ");
    //  Then split words that are bigger than the max limit (so each can go in its own chunk/test msg)
    spaceSepTokens.forEach(token => {
        if (token.length > len) {
            for (let i = 0; i < token.length; i += len) {
                tokens.push(token.slice(i, i + len));
            }
        }
        else {
            tokens.push(token);
        }
    });
    //  No go through all possible tokens from beginning to end & chunk them into groups at most len big
    let curChunk = [];
    let prvStr = "";
    for (let i = 0; i < tokens.length; i++) {
        let curToken = tokens[i];
        curChunk.push(curToken);
        let curStr = curChunk.join(" ");
        if (len < curStr.length && prvStr) {
            chunkArray.push(prvStr);
            curChunk = [];
            curChunk.push(curToken);
        }
        prvStr = curChunk.join(" ");
        if (i == tokens.length - 1 && prvStr) {
            chunkArray.push(prvStr);
        }
    }
    return chunkArray;
}
console.log(chunkString('123456789', 2));
// ['12','34','56','78','9']
console.log(chunkString("Here is a somewhat realistic example of this method being executed", 9));
// [ 'Here is a','somewhat','realistic','example','of this','method','being','executed' ]
console.log(chunkString("a a a a a a a a a a a", 20));
// [ 'a a a a a a a a a a', 'a' ]
console.log(chunkString("Gracias por su visita a CMC. ¿Quieres ver los laboratorios o enviar un mensaje a tu médico? Regìstrese en nuestro Portal de Pacientes hoy! Llame al 111-222-3333 ", 160));
// [ 'Gracias por su visita a CMC. ¿Quieres ver los laboratorios o enviar un mensaje a tu médico? Regìstrese en nuestro Portal de Pacientes hoy! Llame al 111-222-3333' ]
console.log('DONE!');
/***
 *
 * 2 PROBS from Omniex:
 * -    LRU
 * -    rate problem
 *
 * DrayAlliance:
 * -    Testing interface
 *
 * Veritone:
 * -    Hashproblem
 * -    Double stack problem
 *
 * OOP from Headfirst & Generics & extensibility like comparators & colocation & generatlization of logic
 *  within an encapsulated logic
 *
 *
 * Algos + Sorting + Search
 *
 *
 * Read old notes on UI & security & processes/onboarding & scaling
 *
 *
 * Do write up on AWS services I've used to scale TS, microservice, grpahql, & ICS design
 *  & Datadog/Newrelic/Sentry & CI / CD process
 *
 *
 *
 * Testing
 *
 *
 *
 * Build BST problem (recursively and iteratively)
 *
 * Eaasier way to code Frequence probelm
 *
 *
 *
 * Comparator on BST Tree
 *
 * Iterative traversals implementation in BST tree
 *
 *
 *
    REPLY TO EMAILS

    MASTER:
    Recursions, graphs, searching, sorting, linkedLists, strings

    REVIEW GRAPHQL



    -   Testing a wrapper
    -   Creating a quick currency converter
 *
 *
 */
// Promises
function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            //  fetch api resolves as soon as response headers are
            //  received and after calling resp.json() it waits for full body to load and now the second promise is resolved
            .then((data) => {
            resolve(data);
        });
    });
}
function loadUsers() {
    let requests = [];
    let userUrls = ['www.user.com/fetch/1', 'www.user.com/fetch/2', 'www.user.com/fetch/3'];
    userUrls.forEach((userUrl) => {
        requests.push(getData(userUrl));
    });
    Promise.all(requests).then((allUserData) => {
        render(allUserData);
    });
}
//  Runs only when all async code needed is resolved
function render(allUserData) {
    // ... Example function for when all async code is retrieved
}
//http://numbersapi.com/${number}
let nodefetch = require("node-fetch");
function callNumberApi(num) {
    return __awaiter(this, void 0, void 0, function* () {
        const prms = [];
        for (let i = 0; i < 5; i++) {
            let resp = nodefetch(`http://numbersapi.com/${i}?json`).then((res) => res.json());
            let wait = new Promise((resolve) => {
                setTimeout(resolve, 5000);
            });
            prms.push(resp, wait);
        }
        Promise.all(prms).then(prms => {
            prms.forEach(p => {
                console.log(p);
            });
        });
    });
}
callNumberApi(0);
console.log("Number api");
//# sourceMappingURL=debug.js.map