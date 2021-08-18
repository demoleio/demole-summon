import ReactSelect from 'react-select'
import styled from 'styled-components';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const SelectStyled = styled(ReactSelect)`
    width: 200px;
    & .react-select__control {
		background-color: transparent; /* add custom arrow */
		border: 1px solid #9298AB;
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 16px;
    }
    
	& .react-select__single-value {
        color: #9298AB;
        &:hover {
            cursor: pointer;
        }
	}
		
	& .react-select__indicator {
		padding: 0px;
    }

	& .react-select__indicator-separator {
		display: none;
	}

	& .react-select__value-container {
		padding: 0px;
	}

	.react-select__menu {
		box-shadow: 6px 3px 6px 0 rgba(0, 0, 0, 0.4);
		color: #9298AB;
        background-color: #0F1323;
        border: 1px solid #9298AB;
		.react-select__menu-list {
			padding: 0;
			color: #9298AB;
		}
		.react-select__option:hover {
			background-color:#394163;
			color: #9298AB;
		}
		.react-select__option--is-selected {
			background-color: #292F49;
			color: #9298AB;
		}

		.react-select__option--is-focused {
			background-color:#394163;
			color: #9298AB;
		}
	}
`;


export default function Select(props) {
    return (
        <SelectStyled classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            value={{ value: 'chocolate', label: 'Chocolate' }}
        />
    )
}

