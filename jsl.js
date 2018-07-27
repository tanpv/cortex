/**
 * array filter function : filter base on condition
 * need to return logical expression
 * item is choose if return value is true
 * item not choose if return value is false
 * understand the self
 */

// let users = [
//     {id:1, name: "John"},
//     {id:2, name: "Pete"},
//     {id:3, name: "Mary"},
// ];

// let filter_result = users.filter((item) => {
//     return item.id !== 2
// })

// console.log(filter_result)

/**
 * array map function : map from one array to other array
 * map function return value for each input item from array
 */

//  const names = ["Bilbo", "Gandalf", "Nazgul"]
//  const names_length = names.map((item) => {
//      return item.length
//  })

//  console.log(names_length)

/**
 * array sort using compare function : 
 * compare function return positive (1), negative (-1) or 0
 * this way sort function know to change the position or not
 */

// nums_array = [9,122,0,2,44]
// nums_array.sort((a,b) => {
//     return a-b
// })
// console.log(nums_array)

// nums_string = ['hello world', 'abc', 'good morning']
// nums_string.sort((a,b) => {
//     if (a>b) return 1
//     if (a<b) return -1
//     return 0
// })
// console.log(nums_string)

/**
 * array reduce function
 * take input is array and output a value with rule specify in function
 */

//  const nums = [1,2,3,4]
//  const sum = nums.reduce((pre , cur) => {     
//      cur *= 2
//      return pre + cur
//  },0)
//  console.log(sum)

/**
 * array access each item and do some thing which specify inside function
 */

// const nums = [1,2,3,4]
// nums.forEach((item) => {
//     console.log(item)
// })

/**
 * delete array item with splice
 */


/**
 * copy array with slice 
 */

/**
 * find --- return the first item that match
 * findIndex --- return the first item that match
 */

// const nums = [1,2,3,4,]
// console.log(nums.findIndex((item)=>{
//     return item === 3
// }))


/**
 * promise
 * 
 * promise execute only after then keyword
 * 
 * a new promise objec do action then
 *  - call resolve function with input data
 *  - call reject function with some data
 * 
 * a consumer promise will handle
 *  - resolve with then function
 *  - reject with catch function
 */

//  define promise then execute
// let promise = new Promise(function(resolve, reject){
//     // function will be execute after 1000ms complete timeout
//     setTimeout(() => resolve(1), 3000);
// }).then(number => {
//     console.log(number);
// });

// promise chain
// promise.then(number => {
//     console.log(number);
//     return 2*number;
// }).then(number => {
//     console.log(number);
// });




