var swaps = 0;

function avgArray(arr) {
	var total = 0;
	for(let i = 0; i < arr.length; i++) {
		total += arr[i];
	}
	total /= arr.length;
	return total;
}

function testSort(testAmt,size) {
	var nums = [];
	var swapsGroup = [];
	var timeGroup = [];
	var time = performance.now();
	for(let i = 0; i < testAmt; i++) {
		nums = [];
		swaps = 0;
		time = 0;
		while(nums.length < size) {
			let num = Math.floor(Math.random() * size) + 1;
			if(!(nums.includes(num))) {
				nums.push(num);
			}
		}
		time = performance.now();
		quickSort(nums);
		time = performance.now() - time;
		timeGroup.push(time);
		swapsGroup.push(swaps);
	}
	var swapsAvg = avgArray(swapsGroup);
	var timeAvg = avgArray(timeGroup);
	var message = {
		"size":size,
		"timeAvg":timeAvg,
		"swapsAvg":swapsAvg
	};
	postMessage(message);
}

async function wait(ms) {
  return new Promise(resolve => {
	setTimeout(resolve, ms);
  });
}

async function swap(nums,firstNum,secondNum) {
	let temp = nums[firstNum];
	nums[firstNum] = nums[secondNum];
	nums[secondNum] = temp;
	swaps++;
}
var colors = [];
function quickSort(nums,start,end) {
	if(end - start > 0) {
		var pivot = start;
		var too_big_index = start + 1;
		var too_small_index = end;
		do {
			while(nums[too_big_index] <= nums[pivot]) {
				too_big_index++;
			}
			while(nums[too_small_index] > nums[pivot]) {
				too_small_index--;
			}
			if(too_big_index < too_small_index) {
				swap(nums,too_small_index,too_big_index);
			}
		} while(too_small_index > too_big_index);
		swap(nums,too_small_index,pivot);
		quickSort(nums,(too_small_index + 1),end);
		quickSort(nums,start,too_small_index);
	}
}

for(let i = 100; i <= 1000; i+= 100) {
	testSort(10,i);
}