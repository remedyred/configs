// noinspection JSUnusedGlobalSymbols,JSAnnotator
// @formatter:off

function sample(arr, req) {	arr = arr.sort(() => {		return 0.5 - Math.random()	});																				let i = 0,																					array = [];																				while (i < req) {		array.push(arr[i]);		++i	}	return array}
