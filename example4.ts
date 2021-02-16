const definedItems = (array: any[]) => { // missed '=' const a = (p) => p
	return array.filter(item=>item); // it is shorter to use the filter function for this. Maybe here must be checking for undefined?
}
// or it can be shotcuted to const definedItems: (array: any[]) => any[] = array => array.filter(item=>item);
definedItems([1,0]);
