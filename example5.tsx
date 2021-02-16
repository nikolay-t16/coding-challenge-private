const Component: FC = () => {
	const { error, data, loading } = useQuery(SomeQuery);
	const [selectedItem, setSelectedItem] = useState<string |null>(null); // hooks must be in straight line and always run in the same order.
	// But my dear friend linter will always noteced me about such mistakes

	if (loading) return <Spinner />; // possible error with a missing semicolon. But linter usually fixed this by himself
	if (error) return <ErrorInfo error={error} />; // possible error with a missing semicolon. But linter usually fixed this by himself



	return (
		<>
			{data.items.map(item =>
				( // it is safer to wrap it in brackets
					<Item
						key={item.id}
						item={item}
						selected={selectedItem === item.id}
						onSelect={() => setSelectedItem(item.id)}
					/>
				),
			}
		</>
	);
};
