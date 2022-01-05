export const bindSpanHover = (): void => {
	const hoverElements = document.querySelectorAll('.summary span');
	hoverElements.forEach(span => {
		span.addEventListener('mouseover', () => {
			const mappedLabels = span.getAttribute('mapped-labels');
			const mappedKeys = span.getAttribute('mapped-keys');
			mappedLabels
				? console.log(mappedLabels)
				: null;
			mappedKeys
				? console.log(mappedKeys)
				: null;
		});
	});
};