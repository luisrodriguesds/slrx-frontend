const init = {user:{}, loading:false}

export default function user(state=init, action){
	// console.log(action);
	switch(action.type){
		case 'REQUEST_USER':
			return {...state, loading:true};
		break;
		case 'SUCCESS_USER':
			return {user:{...action.user}, loading:false};
		break;
		case 'FAILURE_USER':
			return {...state, loading:false};
		break;
		default:
			return {...state};
		break;
	}
}