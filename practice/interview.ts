//given a target number and an array of numbers - return all the pairs of of numbers that sum to the target in the array
//  or if a single number sums to target
//  No duplicate tuples

/*
- List can be big
- Deal with duplicates 


Scanning the array:
-   Hashmap, linearyly store into map

-   Sort, O(nlogn)
    -   2 pointers (one at the beginnin, & one at the end)
    -   mergesort O(nlogn)

    target: 3
    [-2, -1, 0, 1, 1, 2]  = 0
     ^                ^

    [-2, -1, 0, 1, 1, 2] = 1
          ^           ^
    ...
    [-2, -1, 0, 1, 1, 2] = 3
                ^     ^


    target: 3
    [-2, -1, 0, 1, 1, 2, 3]  = 0
      ^                  ^

    target 0
    [-2, -1, 0, 0, 1, 2]


    Caching into the map

    We only every get single digit case 0 or 1 time
    -   while (a[uppperPointer] > target ) uppperPointer--
    -   BST for finding single target, once sorted


-   Scan 1 and compare to all else, O(n^2)



Addressing duplications:
    map = prevent duplicates
        = (x, y)
        => sort(x, y) & store in map



*/



const findTargetSum = (target, numList) => {
    const map = {}
    numList = numList.sort();

    let left: number = 0;
    let right: number = numList.length - 1;

    let result = [];

    while(left < right) {
        const leftVal = numList[left];
        const rightVal = numList[right];
        const pairSum = leftVal + rightVal;

        const key = `${leftVal}${rightVal}`;

        if (pairSum === target && !map[key]) {
            result.push([leftVal, rightVal]);
            left++;
        }
        else if (pairSum < target) {
            left++;
        }
        else {
            right--;
        }
    }

    if (containsTargetBS(numList, target, 0, numList.length -1 )) {
        result.push([target]);
    }

    return result;
}

function containsTargetBS(a, target, start, end) {
    if (start === end && a[start] !== target)
        return false;

    const mid = (start + end) / 2;

    if (a[mid] === target) {
        return true;
    }
    else if (a[mid] < target) {
        return containsTargetBS(a, target, start, mid);
    }
    else {
        return containsTargetBS(a, target, mid+1, end);
    }
}

function getSortPairString(a, b) {
    return [a,b].sort().toString();
}


console.log(findTargetSum(7, [12, 4, 1, -5, 6, 17, 1, 7]))






