I think main idea is how to find out when you need to call fetching for new items.

I will do it like this.

```typescript
window.addEventListener('scroll', function(e) {
    if ( isEndOffScroll) {
        return;
    }   
    if (scroollContayner.globalY + scroollContayner.height < window.scrollY + window.height) {
        fetcchNewItems();
    }
});
```
