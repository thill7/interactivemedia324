$(document).ready(async function(){
	var swaps = 0;
	var size = 30;
	
	function avgArray(arr) {
		var total = 0;
		for(let i = 0; i < arr.length; i++) {
			total += arr[i];
		}
		total /= arr.length;
		return total;
	}
	
	async function testSort(testAmt) {
		var nums = [];
		var swapsGroup = [];
		var timeGroup = [];
		var time = window.performance.now();
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
			time = window.performance.now();
			await quickSort(nums);
			time = window.performance.now();
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
	/*function getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}*/
	
	async function wait(ms) {
	  return new Promise(resolve => {
		setTimeout(resolve, ms);
	  });
	}
	
	async function swap(nums,firstNum,secondNum) {
		let temp = nums[firstNum];
		nums[firstNum] = nums[secondNum];
		nums[secondNum] = temp;
		$("#sorted > div").each((i, cont) => {
			$(cont).html(nums[i]);
		});
		await wait(2000);
		swaps++;
		//$("#swapsAmt").html(swaps);
	}
	var colors = [];
	async function quickSort(nums,start,end) {
		/*var randColor = getRandomColor();
		while(colors.includes(randColor)) {
			randColor = getRandomColor();
		}
		colors.push(randColor);
		for(let i = start; i < end + 1; i++) {
			$("#sorted").children().eq(i).css({"background-color":randColor,"color":"ghostwhite"});
		}*/
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
					await swap(nums,too_small_index,too_big_index);
				}
			} while(too_small_index > too_big_index);
			await swap(nums,too_small_index,pivot);
			quickSort(nums,(too_small_index + 1),end);
			quickSort(nums,start,too_small_index);
		}
	}
	
	//nums = [40,20,10,80,60,50,7,30,100];
	/*nums = [];
	while(nums.length < size) {
		let num = Math.floor(Math.random() * size) + 1;
		if(!(nums.includes(num))) {
			nums.push(num);
		}
	}
	console.log(nums);
	$.each(nums, (i, num) => {
		$("<div>").html(num).appendTo("#unsorted");
	});
	$.each(nums, (i, num) => {
		$("<div>").html(num).appendTo("#sorted");
	});
	
	var start = window.performance.now();
	quickSort(nums,0,(nums.length - 1));
	start = window.performance.now() - start;
	console.log(nums);
	console.log(`completed in ${start} nanoseconds...`);
	*/
	for(let i = 100; i <= 1000; i+= 100) {
		size = i;
		testSort(10);
	}
});