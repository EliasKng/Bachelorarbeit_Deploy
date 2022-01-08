import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface MenuButtonProps {
	addSummaryStatement: (string) => void,
}

export default function MenuButton(props: MenuButtonProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const clickListValues = () => {
		props.addSummaryStatement('list');
		handleClose();
	};

	const clickCompareValuesAbsolute = () => {
		props.addSummaryStatement('compare_absolute');
		handleClose();
	};

	const clickCompareValuesRelative = () => {
		props.addSummaryStatement('compare_relative');
		handleClose();
	};

	const clickCompareValuesMax = () => {
		props.addSummaryStatement('compare_max');
		handleClose();
	};

	const clickCompareValuesMin = () => {
		props.addSummaryStatement('compare_min');
		handleClose();
	};

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				color="inherit"
				disabled={false}
			>
				Add Summary statement from selected bars
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={clickListValues}>List values</MenuItem>
				<MenuItem onClick={clickCompareValuesAbsolute}>Compare values: absolute</MenuItem>
				<MenuItem onClick={clickCompareValuesRelative}>Compare values: relative</MenuItem>
				<MenuItem onClick={clickCompareValuesMax}>Compare values: max</MenuItem>
				<MenuItem onClick={clickCompareValuesMin}>Compare values: min</MenuItem>
			</Menu>
		</div>
	);

}