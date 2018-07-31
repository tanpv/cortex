/**
 * promise
 * 
 * new promise function execute immediatly
 * 
 * a new promise objec do action then
 *  - call resolve function with input data
 *  - call reject function with some data
 * 
 * a consumer promise will handle
 *  - resolve with then function
 *  - reject with catch function
 */

// // function is executed right a way
// let promise = new Promise(function(resolve, reject){
//     setTimeout(() => resolve(1), 3000);
// })
// promise.then((number)=>{console.log(number*2)});

// put promise inside function, this function return promise object
function doubleAfter2Seconds(x) {
    return new Promise(function(resolve, reject){
        // could access x*2 at input parameter of then, kind of function that take time
        setTimeout(()=>resolve(x*2),2000);
    })
}

// define a function that return a promise
function addPromise(x){
    return new Promise(resolve => {
        // return promise inside promise function
        doubleAfter2Seconds(2).then((a)=>{
            // resolved 2
            doubleAfter2Seconds(3).then((b)=>{
                // resolved 3
                doubleAfter2Seconds(4).then((c)=>{
                    // resolved all
                    sum = x+a+b+c;
                    // put result out with resolve
                    resolve(sum);
                })
            })
        });
    });
}
addPromise(1).then((result)=>console.log(result))


// async mean it will return a promise
async function addAsync(x){
    // wait until promise resolve
    a = await doubleAfter2Seconds(2);
    // wait until promise resolve
    b = await doubleAfter2Seconds(3);
    // wait until promise resolve
    c = await doubleAfter2Seconds(4);
    // auto return a promise
    return x+a+b+c;
}
addAsync(1).then(result => console.log(`aysnc_await sum ${result}`));

