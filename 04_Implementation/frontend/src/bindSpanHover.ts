export const bindSpanHover = (setHighlighting: (keys: string[], labels: string[]) => void): void => {
	const hoverElements = document.querySelectorAll('.summary span');
	hoverElements.forEach(span => {
		span.addEventListener('mouseover', () => {
			const mappedLabels = span.getAttribute('mapped-labels')?.split(',');
			const mappedKeys = span.getAttribute('mapped-keys')?.split(',');

			setHighlighting(mappedKeys, mappedLabels);
		});
		span.addEventListener('mouseout', () => {
			setHighlighting([''],['']);
		});
	});
};