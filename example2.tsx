const Component: FC = () => {
	const [secondsElapsed, setSecondsElapsed] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSecondsElapsed(secondsElapsed => secondsElapsed + 1); // to avoid possible async errors
		}, 1000);
		return () => {
			clearInterval(interval); // to avoid memory lick
		};
	}, [setSecondsElapsed]); // rid of secondsElapsed dependency, or it will be call every time when secondsElapsed changed and create more and more intervals
	// until error out of memory, tear you apart)

	return (
		<span>
      		Seconds elapsed: {secondsElapsed}
    	</span>
	);
};
