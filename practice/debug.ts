/**
 * REVIEW:
 * https://www.tutorialspoint.com/design_pattern/design_pattern_interview_questions.htm
 * 
 * BTREE in databases
 * -    SQL: EXPLAIN COMMAND
 *      -   https://www.youtube.com/watch?v=NI9wYuVIYcA
 *      -   CHECK which index help more than they harm
*/


interface INode<V> {
    value: V;
}

enum VisitedState {
    Visited,
    NotVisited,
}

class GraphNode<V> implements INode<V> {
    value: V;
    state: VisitedState;
    edges: Array<GraphNode<V>>;
}


class BST {
    graph: Graph;
    constructor() {
        this.graph;
    }

    doNodesConnect(start: GraphNode<number>, end: GraphNode<number>): boolean {
        const queue: Array<GraphNode<number>> = [];

        queue.unshift(start);
        start.state = VisitedState.Visited;

        while (queue.length > 0) {
            const curNode = queue.shift();
            if (curNode === end) return true;

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

    doNodesConnect(start: GraphNode<number>, end: GraphNode<number>) {
        let stack: Array<GraphNode<number>> = [];

        stack.push(start);
        start.state = VisitedState.Visited;

        while (stack.length > 0) {
            const curNode = stack.pop()
            if (curNode === end) return true;

            for (let n of curNode.edges) {
                if (n.state == VisitedState.NotVisited) {
                    stack.push(n);
                    n.state = VisitedState.Visited;
                }
            }
        }

    }
}






/**
 * 4.5
 * Implement a function to check if a binary tree is a binary search tree
 * 
 * 
 * Q's: What is a binary search tree (left is less than parent & right is more)
 */

type logObj = {
    str: string;
}

type LLNodeProps = {
    height?: number;
}

class LLNode<V> implements INode<V> {
    height: number; // if representing height from a tree
    next: LLNode<V>;
    prev: LLNode<V>;
    value: V;

    constructor(value: V, prop?: LLNodeProps) {
        this.value = value;
        this.height = prop.height;
    }
}

class LinkedList<V> {
    head: LLNode<V>;
    tail: LLNode<V>;

    addHead(node: LLNode<V>) {
        node.next = this.head;
        this.head.next = node;
    }

    addTail(node: LLNode<V>) {
        node.prev = this.tail;
        this.tail = node;
    }
}


type BSTNodeProps<V> = {
    value?: V;
    height?: number;
}

class BSTNode<V> implements INode<V> {
    left: BSTNode<V> | null;
    right: BSTNode<V> | null;
    value: V;
    height: number;
    state: VisitedState;

    constructor({ value, height }: BSTNodeProps<V>) {
        if (value === null || value === undefined) throw new Error("BSTNode must have a value");
        this.left = null;
        this.right = null;
        this.value = value;
        this.height = height;
        this.state = VisitedState.NotVisited;
    }
}

//  TODO: make this class generic and pass in a comparator
class BinaryTree {
    root: BSTNode<number>;

    constructor() {
        this.root = null;
    }

    insert(value) {
        this.root = this.insertRecurse(this.root, value);
    }

    insertRecurse(parent: BSTNode<number>, value) {
        if (!parent) {
            return new BSTNode<number>({ value });
        }

        if (value < parent.value) {
            parent.left = this.insertRecurse(parent.left, value);
        } else if (value > parent.value) {
            parent.right = this.insertRecurse(parent.right, value);
        }

        return parent;
    }

    printInOrder(node: BSTNode<number> = this.root) { // Left, Root, Right
        let logObj: logObj = { str: '' };

        function inOrder(node: BSTNode<number>, logObj) {
            if (!node) return;

            inOrder(node.left, logObj)
            logObj.str += `${node.value} `;
            inOrder(node.right, logObj);
        }

        inOrder(node, logObj);
        console.log(logObj.str);
    }

    printInOrderStack(node: BSTNode<number> = this.root) { // left, parent, right
        const strTokens = [];

        let stack: Array<BSTNode<number>> = [];
        if (node) stack.push(node);

        while (stack.length > 0) {
            const parent = stack[stack.length - 1];
            parent.state = VisitedState.Visited;

            if (parent?.left?.state === VisitedState.NotVisited)
                stack.push(parent.left);
            else {
                strTokens.push(parent.value);
                stack.pop();

                if (parent?.right?.state === VisitedState.NotVisited) {
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

    printPreOrder(node: BSTNode<number> = this.root) { // Root, Left, Right
        let logObj: logObj = { str: '' };

        function preOrder(node: BSTNode<number>, logObj) {
            if (!node) return;

            logObj.str += `${node.value} `;
            preOrder(node.left, logObj)
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
    printPreOrderStack(node: BSTNode<number> = this.root) {
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

    printPostOrder(node: BSTNode<number> = this.root) { // Left, Right, Root
        let logObj: logObj = { str: '' };

        function postOrder(node: BSTNode<number>, logObj) {
            if (!node) return;

            postOrder(node.left, logObj)
            postOrder(node.right, logObj);
            logObj.str += `${node.value} `;
        }

        postOrder(node, logObj);
        console.log(logObj.str);
    }

    //  Left, Right, Parent
    printPostOrderStack(node: BSTNode<number> = this.root) {
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
            if (!node) return true;

            if (node.left && node.left.value >= node.value)
                return false;
            if (node.right && node.right.value <= node.value)
                return false;

            return isBST(node.left) && isBST(node.right);
        }


        return isBST(node);
    }

    printTree(root: BSTNode<number> = this.root) {
        function buildLinkedList(node: BSTNode<number> = this.root, level: number = 0) {
            if (!node) return undefined;

            const curNode = new LLNode(node.value, { height: level });

            if (node.right) {
                //  Get right link to current node & connect list
                let right = buildLinkedList(node.right, level + 1);
                while (right.prev) right = right.prev;
                curNode.next = right;
                right.prev = curNode;
            }

            if (node.left) {
                //  Get left link to current node & connect list
                let left = buildLinkedList(node.left, level + 1);
                while (left.next) left = left.next;
                curNode.prev = left;
                left.next = curNode;
            }

            return curNode;
        }

        let head: LLNode<number> = buildLinkedList(root, 0);
        while (head.prev) head = head.prev; // To get index 0 & iterate to last index & get each node's order


        const levelMap = {};
        let unitSize = 0;
        for (let i = 0; !!head; i++, head = head.next) {
            if (!levelMap[head.height]) levelMap[head.height] = [];

            levelMap[head.height].push({ i, node: head })
            unitSize = Math.max(unitSize, head.value.toString().length)
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
                    tokens.push(" ".repeat(Math.max(0, unitSize - str.length)) + str)
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

BT.printInOrder();      // 1 2 3 4 5 6 7
BT.printPreOrder();     // 4 2 1 3 6 5 7
BT.printPostOrder();    // 1 3 2 5 7 6 4


BT.printInOrderStack()  // 1 2 3 4 5 6 7
BT.printPreOrderStack();// 4 2 1 3 6 5 7
BT.printPostOrderStack()// 1 3 2 5 7 6 4
console.log("Is BST: ", BT.isBST(BT.root))

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
    root: BSTNode<number>;
    rebalanceHeight: number;

    constructor() {
        super();
        this.rebalanceHeight = 2;
    }

    getHeight(node: BSTNode<number>) {
        const rightH = node?.right?.height || 0;
        const leftH = node?.left?.height || 0;
        return { height: Math.max(rightH, leftH) + 1, leftH, rightH };
    }

    rotateRight(node: BSTNode<number>) {
        const newParent = node.left;
        node.left = node.left.right; // Guaranteed to exist otherwise inbalance would not have occured
        newParent.right = node;

        let { height: nodeHeight } = this.getHeight(node);
        node.height = nodeHeight;

        let { height: newParentHeight } = this.getHeight(newParent);
        newParent.height = newParentHeight; // root goes last bc new child needs height update first
        return newParent;
    }

    rotateLeft(node: BSTNode<number>) {
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
    insert(value: number, printInsert: boolean = false) {
        const insert = (node, value) => {
            //  First insert node & pass down to location it belongs
            if (!node)
                return new BSTNode({ value, height: 1 });
            else if (node.value === value) {
                throw new Error("No duplicate inserts allowed")
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
        }

        this.root = insert(this.root, value);

        if (printInsert) {
            console.log(`______ INSERTING : (${value}) _____`)
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
balanceTree.printInOrder()
balanceTree.printTree();
balanceTree.clear();



//  Non-balance Tree
BT = new BinaryTree();
for (let num of testArray) {
    BT.insert(num);
}

console.log('TESTING MY NONE Balance BST!!!!');
BT.printInOrder()
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


abstract class Car {
    public description: string;

    public getDescription(): string {
        return this.description;
    }

    public abstract cost(): number;
}

// NOTE: abstract class cannot be instantiated
// const car = new Car();


//  Specific concrete subclass of Car
class ModelS extends Car {
    public description = "Model S";

    public cost(): number {
        return 73000;
    }
}


//  Specific concrete subclass of Car
class ModelX extends Car {
    public description = "Model X";

    public cost(): number {
        return 77000;
    }
}

//  abstract class cannot be instanticated
//  Extends car bc we will be using polymorphism (important for decorator pattern)
abstract class CarOptions extends Car {
    //public description: string; //inherited from Car
    decoratedCar: Car;

    public abstract getDescription(): string; //In base class too but including as abstract to force implementation
    public abstract cost(): number; //In base class too but including as abstract to force implementation
}


class EnhancedAutoPilot extends CarOptions {
    decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    public getDescription(): string {
        return this.decoratedCar.getDescription() + ', Enhanced AutoPilot';
    }

    public cost(): number {
        return this.decoratedCar.cost() + 5000;
    }
}


class RearFacingSeats extends CarOptions {
    decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    public getDescription(): string {
        return this.decoratedCar.getDescription() + ', Rear facing seats';
    }

    public cost(): number {
        return this.decoratedCar.cost() + 4000;
    }
}


let myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla);
myTesla = new EnhancedAutoPilot(myTesla);


console.log(myTesla.cost());
console.log(myTesla.getDescription());


/**
 * Exercise:
 * -    Think about what is happening here. 
 *      Why did CarOptions need to implement Car? 
 *      -   BC Decorators maintain Type of object they are decorating.
 *      -   They must also maintain a an instance to the object they are decorating so when their 
 *              behaviors are called we can use reference to summon behavior & logic we want added to it 
 *              where we want
 *      -   Remember that abstract classes OR interfaces are contracts that allow for polymorphism &
 *              gaurantee we are getting an object with certain implementation & behaviors. Such a contracts allows us 
 *              to code like a good software engineer and use all these good design principles that minimize code
 *              and logic and complexity 
 * 
 */



/**
 * Observer:
 * 
 *  REMEMBER:
 *  AN Interface is a CONTRACT that tells us what an object is and does! & what behaviors it must implement
 *      Allowing us to assume the obect will behave or expect certain things
 *      In this case a SUBJECT will provide info to OBSERVERS in observer pattern. Which allows 
 *      to make generic code.
 *      -   It doesn't matter who the SUBJECT OR OBSERVER IS they only need to understand certain actions from 
 *          eachother and they will work together! without implementing extra logic or conditions!!
 *          -   Specific and custom logic can be encapsulated in specific observer/subject concrete class
 *              encapsulated away from process/system which will lead to cleaner & more modulated code
 */



interface Subject {
    registerObserver(o: Observer);
    removeObserver(o: Observer);
    notifyObservers();
}


interface Observer {
    update(temperature: number);
}


class WeatherStation implements Subject {
    private temperature: number;
    private observers: Observer[] = [];

    setTemperature(temp: number) {
        console.log("WeatherStation: new temperature measurement " + temp);
        this.temperature = temp;
        this.notifyObservers();
    }

    public registerObserver(o: Observer) {
        this.observers.push(o);
    }

    public removeObserver(o: Observer) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }

    public notifyObservers() {
        for (let observers of this.observers) {
            observers.update(this.temperature);
        }
    }
}

class TemperatureDisplay implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }

    public update(temperature: number) {
        console.log("TemperatureDisplay: I need to update my temperature display ", temperature);
    }
}


class Fan implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }

    public update(temperature: number) {
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
        console.log('Amplifier turning off...')
    }

    setSource(source: string) {
        console.log('Setting source to ' + source);
    }

    setVolume(volumeLevel: number) {
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
    private bluray: BlurayPlayer;
    private amp: Amplifier;
    private lights: Lights;
    private tv: TV;
    private popcornMaker: PopcornMaker;

    constructor(amp: Amplifier, bluray: BlurayPlayer, lights: Lights, tv: TV, popcornMaker: PopcornMaker) {
        this.amp = amp;
        this.bluray = bluray;
        this.lights = lights;
        this.tv = tv;
        this.popcornMaker = popcornMaker;
    }

    public watchMovie() {
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

    public endMovie() {
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



/**
 * Exercise:
 * 
 * What is a Facade?
 *  -   Its hiding implemtation details
 *  -   It's being able to make logic changes without affecting client bc it won't affect their API
 *      IN THE FORM of the Facade
 *  -   Think of a facade as a Service
 *      -   It takes in other modules of logic (components or services)
 *      -   And it uses them to make its own API
 *      -   Use mediator services to prevent circular refs or noodles code
 *      -   Use Inversion of Control and polymorphism to maintain extensible Service MODULES
 * 
 * 
 * 
 * 
 */





/**
 * Adapter Pattern
 * 
 * 
 * 
 */

interface IPhone {
    useLightning();
}

interface Android {
    useMicroUSB();
}

class iPhone7 implements IPhone {
    useLightning() {
        console.log('Using lightning port..');
    }
}

class GooglePixel implements Android {
    useMicroUSB() {
        console.log('Using micro USB...');
    }
}

class LightningToMicroUSBAdapter implements Android {
    iphoneDevice: IPhone;

    constructor(iphone: IPhone) {
        this.iphoneDevice = iphone;
    }

    public useMicroUSB() {
        console.log('Want to use micro USB, converting to Lightning.....');
        this.iphoneDevice.useLightning();
    }
}

let iphone = new iPhone7();
let chargeAdapter = new LightningToMicroUSBAdapter(iphone);

chargeAdapter.useMicroUSB();


/**
 * Adapter class makes it so that you don't have to change the iPhone class to be combatible 
 *  with microUSB. So in this case Adapter class handles all the translations.
 *  Here is handles translating microUSB into lightning.
 * - Prevents changing any of the other classes that do not need to change
 * 
 * 
 * IMPORTANT:
 * -    Basically, an adapter pattern is used to prevent mixing logic or adding logic to a component that
 *      already serves a specific task (Helps keep it modular & singular in design) ****
 * -    Essentially this is somewhat like the mediator pattern ****


    A mediator is used to avoid coupling several components together. Instead of each component 
        "talking" with each other directly (and thus having to know each other and to know how 
        to communicate all with each other), each component talks to a single object: the mediator. 
        The name is chosen on purpose: when you're fighting with your neighbor and can't communicate with him, 
        you go see a mediator and instead of talking to each other, you both talk with the mediator, who tries 
        fixing the issue.

    An adapter is used to "transform" an object with an interface into an object with an other interface. 
        Just like, for example, an electrical adapter which transforms a european power outlet into an american one, 
        so that you can use your American shaver in Europe. Simple example: you need to store a Runnable into a list of 
        Callables. Runnable has a method run(). Callable has a method call(). You thus create an Adapter:

    public class RunnableAdapter implements Callable {
        private Runnable runnable;

        public RunnableAdapter(Runnable runnable) {
            this.runnable = runnable;
        }

        public void call() {
            runnable.run();
        }
    }

 * 
 */




/**
 * State pattern
 * 
 * - State pattern is trying to describe a process
 * 
 * 
 */

interface State {
    order: Order;

    cancelOrder();
    verifyPayment();
    shipOrder();
}

class Order {
    public paymentPendingState: State;
    public orderBeingPreparedState: State;
    public orderShippedState: State;
    public cancelledOrderState: State;

    public currentState: State;

    constructor() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);

        this.setState(this.paymentPendingState);
    }

    public setState(state: State) {
        this.currentState = state;
    }

    public getState(): State {
        return this.currentState;
    }
}

class PaymentPendingState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder() {
        console.log("Cancelling your unpaid order...");
        this.order.setState(this.order.cancelledOrderState);
    }

    public verifyPayment() {
        console.log('Payment verified! Shipping soon.');
        this.order.setState(this.order.orderBeingPreparedState);
    }

    public shipOrder() {
        console.log('Cannot ship the order wehn payment is pending');
    }
}

class CancelledOrderState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder() {
        console.log('Your order has already been cancelled');
    }

    public verifyPayment() {
        console.log('Order cancelled, you cannot verify payment');
    }

    public shipOrder() {
        console.log('Order cannot ship, it was cancelled');
    }
}

class OrderBeingPreparedState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder() {
        console.log("Cancelling your order...");
        this.order.setState(this.order.cancelledOrderState);
    }

    public verifyPayment() {
        console.log('Already verified your payment');
    }

    public shipOrder() {
        console.log('Shipping your order now!');
        this.order.setState(this.order.orderShippedState);
    }
}

class OrderShippedState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder() {
        console.log('You cannot cancel, already shipped...');
    }

    public verifyPayment() {
        console.log('You cannot verify payment, already shipped...');
    }

    public shipOrder() {
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

console.log('Order state: ' + (<any>order.getState()).constructor.name);

/**
 *
 *     o  =>  [payment pending] => verify payment => [order being prepared] => ship => [orderShipped]
 *                  |                                       |
 *                  |                                       |
 *                Cancel                                  Cancel
 *                  |                                       |
 *                  |                                       V
 *                  -------------------------------> [Cancelled order]
 *
 * State pattern is ideal for keeping track of a specific process (in this case  shipping an order to a customer)
 * Also very flexible bc at any time we can add more states to the system
 * All that has to be done is add methods to the states
 * It's also very secure bc we can define what is possible & what is not possibe at each given state
 * In this example there is a rule that says, once an order has shipped you cannot cancel anymore
 *
 *
 *
 * Exercise:
 * See if you could have done Roman numeral problem using State design pattern
 * I am noticing that the beautfy of this design pattern, is that encapsulates all different states
 * & colocates them appropriately
 * It prevents mixing unrelated logic in a related place like a single function.
 *  -   Which will turn code into noodle & undesirable code! Like Anups code!
 * 
 * 
 * 
 * Implement Tinderbot:
 * 
 *  states: matchScreen, photosScreen, errorScreen
 *  Actions: swipeRight, closeModal, restart
 * 
 * 
 *           --------------------closeModal----------------------
 *           |                     ---                          |
 *           V                     V  |                         |
 *  o => |photosScreen| -> swipeRight (over and over ) ->  |matchScreen|
 *             ^                |
 *             |                |
 *          restart             V
 *             ----------|errorScreen|
 * 
 * 
 * Notes:
 * -    This is a good pattern if you are constantly being fed events and the class representing a state
 *      & strict process chooses behavior based on changed state.
 *      -   This is a good pattern bc it encapsulates behavior/implementation by state
 */


interface TinderState {
    bot: TinderBot;

    closeModal();
    swipeRight();
    restart();
}

class TinderBot {
    public MatchScreen: TinderState;
    public ErrorScreen: TinderState;
    public PhotoScreen: TinderState;
    public currentState: TinderState;

    constructor() {
        this.MatchScreen = new MatchScreen(this);
        this.ErrorScreen = new ErrorScreen(this);
        this.PhotoScreen = new PhotoScreen(this);

        this.setState(this.PhotoScreen);

        // while (each second) this(TinderBot).getState.doDefaultAction()
    }

    setState(state: TinderState) {
        this.currentState = state;
        console.log('Just entered: ' + (<any>state).constructor.name, ' state');
    }

    getState() {
        return this.currentState;
    }
}

class MatchScreen implements TinderState {
    bot: TinderBot;

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

class ErrorScreen implements TinderState {
    bot: TinderBot;

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

class PhotoScreen implements TinderState {
    bot: TinderBot;

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
    //  Instance variables live in instance of object located in heap
    health: number;
    name: string;
    speed: number;
    isInvincible: boolean;

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
    private health: number;

    getHealth(): number {
        return this.health;
    }

    setHealth(health: number) {
        if (health < 0) {
            console.log("You cannot set health below 0");
            return;
        }
        this.health = health;
    }
}

const p2 = new Player2()
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
    private weight: number;

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


abstract class Animal1 {
    abstract move();
}

class Dog1 extends Animal1 {
    move() { };
}

interface Mammal extends Animal1 {
    run();
}

class Cat implements Mammal {
    run() { }
    move() { }
}



class Character {
    protected weight: number = 10;

    displayWeight() {
        console.log("My weight is ", this.weight);
    }

    move() {
        console.log("I am moving");
    }
}

interface Hero extends Character {
    save();
}
interface Enemy {
    destroy();
}


class Spy extends Character implements Hero, Enemy {
    save() {
        console.log("I am a spy saving my national gov't", "I can also access my weight", this.weight);
    }

    destroy() {
        console.log("I am a spy destroying my countries political adversaries");
    }
}


class SpyDeciple extends Spy {
    displayWeight() {
        super.displayWeight()
        console.log("I am the deciple spy and I can access my inherited weight if protected or public: ", this.weight);
    }
}

class Knight extends Character { }
class Archer extends Character { }

abstract class Mage extends Character {
    abstract createMagic();

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
usSpy.displayWeight()

const disSpy = new SpyDeciple();
disSpy.displayWeight()



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
    private instance: SingletonPerson = null;
    private name: string;

    private constructor(value) {
        this.name = value;
    }

    getInstance() {
        if (this.instance == null) {
            this.instance = new SingletonPerson("Singleton")
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
    value: number;
    edges: Array<DirectedNode>;
}

class Graph {
    private root: DirectedNode;

    constructor(root) {
        this.root = root;
    }

    areNodesReachable(startNode: DirectedNode, endNode: DirectedNode): boolean {
        if (!startNode || !endNode) {
            return false;
        }


    }
}





/**
 * Dray Alliance prob
 * 
 * Build a struct that stores timestamp & key, value pair
 * -    Only one key,value paair per timestamp
 * -    Assume timestamps will always be chronolocical
 * 
 */

type Store<V> = {
    time: number;
    key: string;
    value: V;
}

class DataStructure<V> {
    public list: Array<Store<V>>

    constructor() {
        this.list = [];
    }

    public Insert(key: string, value: V): void {
        const store = {
            time: Date.now(),
            key,
            value,
        };
        this.list.push(store);
    }

    public Get(key: string): V {
        //  Gets most recent key's value
        for (let i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i].key === key) {
                return this.list[i].value;
            }
        }
        return undefined;
    }

    public GetTime(time: number, key: string): V {
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
        this.list = []
    }

    protected InsertTestElement(time: number, key: string, value: V): void {
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

class TestDataStructure<V> extends DataStructure<V> {
    constructor() {
        super();
    }

    addTestCase(time: number, key: string, value: V) {
        super.InsertTestElement(time, key, value);
    }
}


class TestSuiteDataStructure {
    private testDS: TestDataStructure<string>;

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
    firstName = 'John';
    lastName = 'Doe';
}

class Factory {
    create<T>(type: (new () => T)): T {
        return new type();
    }
}

let factory = new Factory();
let person = factory.create(Person);

console.log(JSON.stringify(person));








/**
 * LRU problem
 * -    Has a fixed capacity
 * -    When struct is full remove last inserted element
 * -    Get should search by key and return value
 * -    Duplicate keys should be replaced by new key value AND its order should be refreshed to newest 
 * -    https://www.geeksforgeeks.org/lru-cache-implementation/
 */



//  Solution is a Deque AND hashmap[key] = ptr to node it corresponds to in deque
//  Removal can be done in place if we get node from hashmap
//  On insert, if not duplicated, we can just add to end of deque and remove first el
//  -   Doubly (or Deque) is needed to intercept middle node, delete it, and connect its left to its right
//  https://medium.com/@krishankantsinghal/my-first-blog-on-medium-583159139237


type DoubleLinkedNode = {
    next: Node;
    prev: Node;
}

type Dictionary<V> = {
    [key: string]: V,
}

class LRU<V> {
    public map: Dictionary<LLNode<V>>;
    public deque: LinkedList<V>;
    public capacity: number;
    public size: number;

    constructor(capacity: number) {
        this.map = {}
        this.deque = new LinkedList<V>(); // LLNode
        this.capacity = capacity;
        this.size = 0;
    }

    //  O(logn)
    Insert(key: string, value: V): void {
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
    Get(key: string): V {
        const node = this.map[key];
        this.UpdateToLatest(node);
        return node.value;
    }

    private UpdateToLatest(node) {
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

function getCombinationsR(result: Array<string>, array: Array<Array<string>>, arrayInd: number, str: string) {
    if (array.length == 0) return;
    if (arrayInd == array.length) {
        result.push(str);
        return;
    }

    const subarray = array[arrayInd];
    subarray.forEach((strToken) => {
        const passString = (arrayInd === 0) ? 
            strToken : 
            str + "." + strToken;
        getCombinationsR(result, array, arrayInd + 1, passString);
    })
}



//  Post solution after some thinking
function getCombinations(array: Array<Array<string>>) {
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

const input = [["www", "abc"], ["frequence", "frequencerocks"], ["com", "in"]]

const result1 = getCombinations(input)
console.log(result1, result1.length);


const result2 = [];
getCombinationsR(result2, input, 0, "");
console.log(result2, result2.length);



/*  Remove duplicates

    [1,2,3,7,6,1,3,9,4] => 
    [1,2,3,7,6,9,4]

    //  Maintain order
*/

function remDups(input: Array<number>): Array<number> {
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

    let result = [...input];    // Or input if we want to modify inplace
    for (let i = dupIndexes.length - 1; i >= 0; i--) {
        result.splice(dupIndexes[i], 1);
    }

    return result;
}   //  Splice remove INPLACE****


const dupsInput = [1, 2, 3, 7, 6, 1, 3, 9, 4];
console.log(remDups(dupsInput));  // == [1,2,3,7,6,9,4]


//  This will NOT give expected output:
(
    function (dupsInput) {
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
    }
)(dupsInput);




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
function buildBSTR(inorderArray: Array<number>, start: number = 0, end: number = inorderArray.length - 1): BSTNode<number> {
    if (end < start) return null;

    let mid = Math.floor((start + end) / 2);
    let node = new BSTNode({ value: inorderArray[mid] });
    node.left = buildBSTR(inorderArray, start, mid - 1);
    node.right = buildBSTR(inorderArray, mid + 1, end);

    return node;
}

//  Traversal (pre-order): parent, left, right
//  Good exercise on how to use recursive return on iterative implementation ***
//  And getting node at end
function buildBST(inorderArray: Array<number>) {
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
            root = stack.pop().node;  //  last to pop should be root
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
let inorderBuiltTree: BSTNode<number> = buildBSTR(inordertree);
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
    })

    //  No go through all possible tokens from beginning to end & chunk them into groups at most len big
    let curChunk = [];
    let prvStr = "";
    for (let i = 0; i < tokens.length; i++) {
        let curToken = tokens[i];
        curChunk.push(curToken)

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



function getData(url: string) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            //  fetch api resolves as soon as response headers are
            //  received and after calling resp.json() it waits for full body to load and now the second promise is resolved
            .then((data) => {
                resolve(data)
            })
    })
}


function loadUsers() {
    let requests = [];
    let userUrls = ['www.user.com/fetch/1', 'www.user.com/fetch/2', 'www.user.com/fetch/3']
    userUrls.forEach(
        (userUrl) => {
            requests.push(getData(userUrl));
        })

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


// MUCH SLOWER BC OF BLOCKING
async function callNumberApiSlow(num: number) {
    for (let i = 0; i < 5; i++) {
        let resp = await nodefetch(`http://numbersapi.com/${i}?json`).then((res) => res.json());
        let wait = await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        })
        console.log(resp)
    }
}

async function callNumberApi(num: number) {
    const prms = [];
    for (let i = 0; i < 5; i++) {
        let resp = nodefetch(`http://numbersapi.com/${i}?json`).then((res) => res.json());
        let wait = new Promise((resolve) => {
            setTimeout(resolve, 5000);
        })

        prms.push(resp, wait);
    }

    Promise.all(prms).then(prms => {
        prms.forEach(p => {
            console.log(p);
        })
    });
}

callNumberApi(0);
console.log("Number api");



function delay(t, val) {
    return new Promise((resolve, reject) => {
        setTimeout(reject.bind(null, val), t);
    });
}

function raceAll(promises, timeoutTime, timeoutVal) {
    return Promise.all(promises.map(p => {
        return Promise.race([p, delay(timeoutTime, timeoutVal)]).then(body => ({ body, }), err => ({ err }));
    }));
}

async function maxTimeoutPromises() {
    const prms = [];
    for (let i = 0; i < 5; i++) {
        let resp = nodefetch(`http://numbersapi.com/${i}?json`).then((res) => res.json());
        let wait = new Promise((resolve) => {
            setTimeout(resolve, 5000);
        })

        prms.push(resp, wait);
    }

    const timeoutTime = 20 * 1000; // 30 secs
    const timeoutError = new Error('Webhook timed out');
    const notificationResults = await raceAll(prms, timeoutTime, timeoutError);

    notificationResults.forEach(res => {
        console.log(res)
    })
}

//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise





function minimumGroups(predators) {
    
    //  Upper boundary: biggest height of sub graphs
    //  lower boundary: number of subgraphs (n, n-1)
    
    //  foreach predator checkif root (all -1 are roots, foreach & get -1 (for roots) root = [indexes])
    const parentIndexes = [];
    predators.forEach((parentInd, childInd) => {
        if (parentInd === -1) {
            parentIndexes.push(childInd);
        }
    })
    
    //  parentToChildren = { parentInd: [ childInd ] }
    const parentToChildren = {};
    predators.forEach((parentInd, childInd) => {
        if (childInd !== -1) {
            
            if (!parentToChildren[parentInd]) {
                parentToChildren[parentInd] = []
            }
            
            parentToChildren[parentInd].push(childInd);
        }
    })
    
    
    //  For each child, push to a level struct
    const levels = []; // [ [level1], ... ]
    
    parentIndexes.forEach((parentInd) => {
        getLevelsOfRoot(predators, parentInd, levels, 0)    
    })
    
    return levels;
}

//  0
function getLevelsOfRoot(parentToChildren, parentIndexes, levels, curLevelInd) {
    const curLevel = levels[curLevelInd];
    
    curLevelInd.forEach((parentInd) => {
        const childrenList = parentToChildren[parentInd] // children of current node
        curLevel = [...curLevel, ...childrenList];
        
        childrenList.forEach(curInd => {
            getLevelsOfRoot(parentToChildren, curInd, levels, curLevelInd+1)    
        })
        
    })
}


/// Predator problem

/**
 * 
 *  answer = n_max_height - n_islands
 * 
 *  In biggest height tree, no matter what, each level down a path must have its own group
 *      or else it'll be with a predator
 *  
 *  
 * 
 * o    o    o
 *      |
 *      o
 *      |
 *      o
 */



/**
 * 
 * Questions: 
 * -    You are given a desired area and a maximum amount of empty space to have
 * -    Pick a lenght and width that is most "square" given you cannot have than mostEmptySpace constrain
 * 
 * get best square:
 * -    desiredArea, mostEmptySpace
 * 
 * constrain:
 * -    Boundaries: 1 * desiredArea
 * -    sqrt
 * -    ceil(sqrt), floor(sqrt)
 * 
 *      top_choice = 1 * desiredArea
 * 
 * -    1 ... sqrt(desiredArea) ... desiredArea
 *      
 *      while (floor >= 1 && ceil <= desiredArea) {
 *          
 * 
 *          if ( isSquareBigEnough(actualArea, desiredArea) ) 
 *          {
 *              if (isSquareTooEmpty(actualArea, desiredArea, mostEmptySpace)) {
 *                  floor--;
 *              }
 *              else {
 *                  return {
 *                      width: floor,
 *                      length: ceil,
 *                  }
 *              }
 *          }
 * 
 *          else {
 *              ceil++;
 *          }
 *      }
 * 
 * 
 * 
 *  What is your most complicated problem and how did you solve it?
 * 
 */
