**variable: capData**

1. **`capRatingListJSON.capratings` is the data**:
   - `capRatingListJSON` is an object containing a property called `capratings`.
   - `capratings` is an array of objects, where each object represents a cap and its associated ratings. 

   Example of `capratings` array:
   ```javascript
   [
       { cap: "BBC", stars: [12, 34, 532, 321, 77] },
       { cap: "FDC", stars: [55, 23, 123, 59, 24] },
       // more objects...
   ]
   ```

2. **Mapping over the `capratings` array**:
   - The `map()` function is used to iterate over each item (object) in the `capratings` array.
   - The `map()` function takes a callback function as an argument. This callback function is executed once for each item in the array.

   Syntax:
   ```javascript
   array.map((item, index) => {
       // code that processes each item
   });
   ```

3. **Each row is named `capData`**:
   - During each iteration, the current item (an object representing a cap and its ratings) is passed into the callback function and assigned to the variable name `capData`.
   - `capData` is a placeholder that allows you to refer to the current object within the callback function.

   Example:
   ```javascript
   capRatingListJSON.capratings.map((capData, index) => {
       // capData now refers to each object in the capratings array in turn
       // For the first iteration, capData is { cap: "BBC", stars: [12, 34, 532, 321, 77] }
       // For the second iteration, capData is { cap: "FDC", stars: [55, 23, 123, 59, 24] }
   });
   ```

### Summary
- `capRatingListJSON.capratings` is the array you are iterating over.
- `.map()` goes through each object in this array.
- During each iteration, the current object is assigned to the `capData` variable, which you can then use within the loop to process that specific object's data (such as calculating totals or generating table rows).

So yes, each row (object) in the `capratings` array is temporarily stored in the `capData` variable as you iterate over the array using `map()`.