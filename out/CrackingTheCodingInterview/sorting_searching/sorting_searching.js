const str = '11';
console.log("testing", str);
/**
 * 11.1 You are givn two sorted arrays, A & B, where A has a large enough buffer at the end to hold
 *      B. Write a method to merge B into A in sorted order.
 */
class Prob1 {
    constructor() {
        this.A = [1, 2, 3, 4, 9, false, false, false, false]; // len 9
        this.B = [5, 6, 7, 8]; //len 4
    }
    merge(A, B) {
        // Note: They are sorted already & A has buffer to carry B
        //  Strategy: place bigger ones at the end of A array, & have index at final point of padding in A
        for (let aI = A.length - B.length - 1, bI = B.length - 1, pivotA = A.length - 1; aI >= 0 && bI >= 0; pivotA--) {
            A[pivotA] = (A[aI] < B[bI]) ? B[bI--] : A[aI--];
        }
        console.log(A.toString());
        return A;
    }
}
//  Test
const answer = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const p1 = new Prob1();
const result = p1.merge(p1.A, p1.B);
console.log("Test passed: ", result.every((val, ind) => result[ind] === answer[ind]));
/**
 * 11.2 Write a method to sort an array of strings so that all the anagrams are next to each other.
 *
 * Asc order?
 * Check character by character
 * What's most efficient?
 *
 *
 *
 * Sort types:
 *  bubblesort = traverses as pair through array & switches bigger to smaller O(n^2) inPlace so O(1) mem
 *  Example:
    First Pass:
    ( 5 1 4 2 8 ) –> ( 1 5 4 2 8 ), Here, algorithm compares the first two elements, and swaps since 5 > 1.
    ( 1 5 4 2 8 ) –>  ( 1 4 5 2 8 ), Swap since 5 > 4
    ( 1 4 5 2 8 ) –>  ( 1 4 2 5 8 ), Swap since 5 > 2
    ( 1 4 2 5 8 ) –> ( 1 4 2 5 8 ), Now, since these elements are already in order (8 > 5), algorithm does not swap them.

    Second Pass:
    ( 1 4 2 5 8 ) –> ( 1 4 2 5 8 )
    ( 1 4 2 5 8 ) –> ( 1 2 4 5 8 ), Swap since 4 > 2
    ( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
    ( 1 2 4 5 8 ) –>  ( 1 2 4 5 8 )
 *
 *
 *  selectionsort = scan whole array & find smallest & swap & repeat O(n^2)
 *  quicksort = choose a pivot & wait until they overlap
 *  mergesort = Keep breakup up into sub arrays
 *  heapsort =  place items into a heap (Heap only rule: childs have to be smaller than parent & upon remove there
 *                  is a rebalance where next biggest child becomes parent, & pattern propogates to switch nodes childs
 *                  to take switched nodes place)
 *  radixsort = find k biggest (only usedful if items can be grouped in buckets - like integers, so if there are
 *                  duplicates and the number of groupings is relatively small)
 *
 *  const ex = ['bc', 'ab', 'acb', 'abc']
 */
const example = ['kk', 'bc', 'ab', 'acb', 'abc', 'aa', 'dd', 'fed', 'abb', 'zz', 'lg'];
function mergesort(array, start, end) {
    if (end <= start)
        return array.slice(start, end + 1);
    const mid = Math.floor((start + end) / 2);
    const left = mergesort(array, start, mid);
    const right = mergesort(array, mid + 1, end);
    const temp = [];
    let lI = 0, rI = 0;
    while (lI < left.length && rI < right.length) {
        temp.push((left[lI] < right[rI]) ? left[lI++] : right[rI++]);
    }
    while (lI < left.length)
        temp.push(left[lI++]);
    while (rI < right.length)
        temp.push(right[rI++]);
    return temp;
}
console.log("Result of mergesort on strings array: ", mergesort(example, 0, example.length - 1).toString());
// Given a very large array of Person objects, sort the people in increasing order of age O(km)
// We know the array is very large so needs to be efficient, we also know age is a relatively small range
function implementRadixSort() {
    // Say we have buckets reperesenting each age - so a group has same val (radix for integers)
    //  Do k scans: smallest first to biggest
    //  Its that simple but we have have a small k range - thats important
}
/**
 * array
 * choose a pivot
 *
 * [4,5,3,7,2,6,1]
 *          ^ - can be random
 *
 * Choose a random main pivot (end result should be anything bigger than that pivot will be to its right & smaller
 *     to its left)
 * Have left_ind at position 0 & right_ind at len-1, swap if left is bigger than right
 * then increment the moving pointer & switch to other ptr. The new ptr will start running down to find next swap
 *     - this kind of seems like k means (2 pters on each end & main on kth index & wait until it all overlaps)
 *
 * val = 3
 * [1, 3, 2] => [1, 2, 3]
 *
 * val = 3
 * [1, 3, 1, 3, 2] => [1, 2, 1, 3, 3]
 *
 */
function quicksort(array, left, right) {
    const pivot = left + Math.floor((Math.random() * (right - left)) + 1);
    const val = array[pivot];
    let left_ind = left;
    let right_ind = right;
    for (; left_ind < right_ind;) {
        while (array[left_ind] < val)
            left_ind++;
        while (array[right_ind] >= val)
            right_ind--;
        swap(array, left_ind, right_ind);
    }
    quicksort(array, left, left_ind);
    quicksort(array, left_ind + 1, right);
}
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
console.log("Result of quicksort on strings array: ", mergesort(example, 0, example.length - 1).toString());
/**
 * Break up into 3 partitions
 * - throw least relevant partition out
 *
 *
 * example: Find 3rd smallest or k = 3
 * [2, 4, 6, 7, 5, 3, 1]
 *
 * Figure out how to eliminate options that we know forsure will not be needed:
 * - this will cut down complexity and keep it within O(n) range
 *
 * (small, middle, big)
 *
 *
 */
// For truly O(n) search look into introselect or medians of medians
// radix search or k-biggest 
function kBiggest(array) {
}
// A: array, n: array_len, i: k_value
function introselect() {
    // Select(A,n,i):
    //     Divide input into ⌈n/5⌉ groups of size 5.
    //     /* Partition on median-of-medians (by sorting groups of 5 & choosing middle) */
    //     medians = array of each group’s median.
    //     pivot = Select(medians, ⌈n/5⌉, ⌈n/10⌉) // Gets median of medians [n/5], [n/10] are an ints
    //     Left Array L, Right Array G = partition(A, pivot) // partition into x<M, x=M, x>M
    //  This process up to here will gaurantee at least half are below medium of mediums aka pivot
    //  bc each subgroup of 5 els has half on the bottom and half on top of its medium,
    //  so when you get medium of mediums, it's the same idea!
    //     /* Find ith element in L, pivot, or G */
    //     k = |L| + 1 // bc L is smaller than pivot, so + 1 so it is next highest which would be pivot
    //     If i = k, return pivot
    //     If i < k, return Select(L, k-1, i)
    //     If i > k, return Select(G, n-k, i-k)
}
const bst_example = [1, 1, 1, 1, 2, 3, 3, 4, 4, 4, 4, 5, 6, 7, 8, 9, 10];
// binary search
function bstSearch(array, value, start = 0, end = array.length - 1) {
    //  Assumption is that array is sorted already
    const mid = Math.floor((start + end) / 2);
    //  This case deals with duplicates & returns first occurrence of value in sorted array
    if (start === end)
        return (value === array[mid]) ? mid : -1;
    else if (value === array[mid])
        return bstSearch(array, value, start, mid);
    else if (value < array[mid])
        return bstSearch(array, value, start, mid);
    else
        return bstSearch(array, value, mid + 1, end);
}
console.log("Bst search: ", bstSearch(bst_example, 4)); // 7
console.log("Bst search: ", bstSearch(bst_example, 1)); // 0
console.log("Bst search: ", bstSearch(bst_example, 9)); // 15
console.log("Bst search: ", bstSearch(bst_example, 3)); // 5
// heap sort
// balance-tree
/**
* 11.3 Given a sorted array of n integers that has been rotated an unknown number of times, write code
*      to find aan element in the array. You may assume that the array was originally sorted in increasing
*      order.
*      Example)
*      Input: find 5 in {15, 16, 19, 20, 25, 1, 3, 4, 5, 7}
*      Output: 8 (the index of 5 in the array)
*/
/**
* 11.4 Imagine you have 20 GB file with one string per line. Explain how you would sort the file.
*/ 
//# sourceMappingURL=sorting_searching.js.map