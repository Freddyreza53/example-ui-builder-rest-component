import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>Hello World!</div>
	);
};

createCustomElement('x-792462-rest-example', {
	renderer: {type: snabbdom},
	view,
	styles
});
