1. It isn't the typescript!) Week typing make code harder to understand.
And all that developers do is making there code work and make it be more easy to understand.

2. The complexity of working with multithreading.

3. It contains millions way to make your code less understandable. For example scope.

```typescript
const i = 1;
/** hundred rows of code **/

const fn = () => {
    console.log(i); // it can be not easy to find where i is come from
}
```
