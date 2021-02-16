interface Props {
	items: Item[];
}

interface Item {
	id: string;
	title: string;
	description: string;
}

const Component: FC<Props> = ({items}) => {
	return (
		<div>
			{
				items.map((item, index) =>
					<Item
						key={item.id} // it is bad to use indexes from array as key. It can brake rerender optimization.
						item={item}
					/>
				)
			}
		</div>
	);
};
