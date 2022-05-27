import { createCustomElement } from '@servicenow/ui-core';
import snabbdom, { Fragment } from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, { updateState }) => {

	const { name } = state;

	return (
		<Fragment>
			<div>
				<label htmlFor="name-input">Name: </label>
				<input 
					type="text" 
					name="name-input"
					value={name}
					on-change={(e)=>updateState({...state, name: e.target.value})}
				/>
			</div>
			<div>Hello {name}!</div>
		</Fragment>
	);
};

createCustomElement('x-792462-rest-example', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		name: 'ServiceNow User'
	}
});
