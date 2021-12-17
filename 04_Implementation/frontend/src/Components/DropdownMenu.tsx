import React, {Component, Fragment} from 'react';
import Select from 'react-select';

interface State {
	readonly isClearable: boolean;
	readonly isDisabled: boolean;
	readonly isLoading: boolean;
	readonly isRtl: boolean;
	readonly isSearchable: boolean;
}

export interface SelectOption {
	readonly value: string;
	readonly label: string;
	readonly isFixed?: boolean;
	readonly isDisabled?: boolean;
}

export interface DropdownMenuProps {
	options: string[]
	onChange: (Event) => void
}

export default class SingleSelect extends Component<DropdownMenuProps> {
	state: State = {
		isClearable: true,
		isDisabled: false,
		isLoading: false,
		isRtl: false,
		isSearchable: true,
	};

	render() {
		const {isClearable, isSearchable, isDisabled, isLoading, isRtl} =
			this.state;
		const selectElements: SelectOption[] = [];
		this.props.options.forEach(option => {
			selectElements.push({
				value: option,
				label: option,
			});
		});
		return (
			<Fragment>
				<Select
					className="dropdown-basic-single"
					classNamePrefix="select"
					defaultValue={selectElements[0]}
					isDisabled={isDisabled}
					isLoading={isLoading}
					isClearable={isClearable}
					isRtl={isRtl}
					isSearchable={isSearchable}
					name="color"
					options={selectElements}
					onChange={this.props.onChange}
				/>
			</Fragment>
		);
	}
}