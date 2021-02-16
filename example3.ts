const publishItems = async () => {
	const itemsToPublish = ["foo", "bar", "baz", "boo", "quux"];
	for (const item of itemsToPublish) {
		await asyncPublisher.publish(item); // catch can't catch this error because nobody will await for forEach callbacks)
		// and they will be pushed to microtask queue.
	}
};

publishItems().catch(e => {
	throw new Error("Failed to publish items!");
});
