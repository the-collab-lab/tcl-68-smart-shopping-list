export function UrgencyLabel({ text }) {
	let labelColor = '';

	switch (text) {
		case 'Overdue':
			labelColor = 'bg-red-400';
			break;
		case 'Soon':
			labelColor = 'bg-orange-400';
			break;
		case 'Kinda Soon':
			labelColor = 'bg-amber-300';
			break;
		case 'Not Soon':
			labelColor = 'bg-teal-400';
			break;
		default:
			labelColor = 'border border-dark-green';
			break;
	}

	return (
		<span
			className={
				'ml-auto mr-4 rounded-lg px-2 py-1 text-center uppercase text-xl text-off-black ' +
				labelColor
			}
		>
			{text}
		</span>
	);
}
