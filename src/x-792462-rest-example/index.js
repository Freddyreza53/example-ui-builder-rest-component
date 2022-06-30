import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import snabbdom, { Fragment } from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const { COMPONENT_BOOTSTRAPPED } = actionTypes;

const view = (state, { dispatch }) => {

	const { name, list, query } = state;

	console.log(state);

	return (
		<Fragment>
			<div>
				<label htmlFor="name-input">Name: </label>
				<input
					type="text"
					name="name-input"
					value={name}
					on-change={(e) => dispatch('SET_NAME', {
						name: e.target.value
					})}
				/>
			</div>
			<div>Hello {name}!</div>

			<br/>

			<div>
				<label htmlFor="query-input">Query: </label>
				<input
					type="text"
					name="query-input"
					value={query}
					on-change={(e) => dispatch('SET_QUERY', {
						query: e.target.value
					})}
				/>
				<button on-click={() => dispatch('FETCH_TABLE', {
					table_name: 'sys_user',
					sysparm_limit: 50, 
					sysparm_query: query,
				})}>Fetch Result</button>
			</div>

			{list.map(item => {
				const { last_name, first_name, sys_id } = item;
				return <div key={sys_id}>{last_name}, {first_name}</div>
			})}
		</Fragment>
	);
};

createCustomElement('x-792462-rest-example', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		name: 'ServiceNow User',
		list: [],
		query: '',
	},
	actionHandlers: {
		'SET_NAME': ({ action, updateState }) => updateState(action.payload),
		'SET_QUERY': ({action, updateState}) => updateState(action.payload),
		[COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
			console.log('component bootstrapped');
			dispatch('FETCH_TABLE', {
				table_name: 'sys_user',
				sysparm_limit: 10,
				sysparm_query: 'first_name=Fred'
			});
		},
		'FETCH_TABLE': createHttpEffect('api/now/table/:table_name', {
			method: 'GET',
			pathParams: ['table_name'],
			queryParams: ['sysparm_limit', 'sysparm_query'],
			startActionType: 'FETCH_TABLE_INITIATED',
			successActionType: 'FETCH_TABLE_SUCCESS',
			errorActionType: 'FETCH_TABLE_ERROR',
		}),
		'FETCH_TABLE_INITIATED': () => console.log('Fetching Table Data...'),
		'FETCH_TABLE_SUCCESS': ({ action, updateState }) => {
			console.log('Success!');
			updateState({ list: action.payload.result });
		},
		'FETCH_TABLE_ERROR': ({ action }) => {
			console.log('Error:');
			console.error(action.payload)
		}
	}
});



/*
actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: ({dispatch}) => dispatch('FETCH_TABLE', {
			table_name: 'sys_user',
			sysparm_limit: '20',
			sysparm_query: 'ORDERBYDESCnumber'
		}),
		['UPDATE_SEARCH']: ({action, updateState}) => updateState(action.payload),
		'FETCH_TABLE': createHttpEffect('api/now/table/:table_name', {
			method: 'GET',
			pathParams: ['table_name'],
			queryParams: ['sysparm_limit', 'sysparm_query'],
			successActionType: 'FETCH_TABLE_SUCCESS',
			errorActionType: 'LOG_RESULT',
		}),
		'FETCH_TABLE_SUCCESS': ({action, updateState}) => {
			updateState({query_result: action.payload.result})
		},
		'LOG_RESULT': ({action}) => console.log(action.payload),
	}


	on-change={(e)=>dispatch('FETCH_TABLE', {
						table_name: 'sys_user',
						sysparm_limit: '20',
						sysparm_query: `ORDERBYDESCnumber`
					})}
*/