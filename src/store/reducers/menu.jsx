const init = {url: "/dashboard"}

export default function menu(state=init, action){
    switch(action.type){
        case 'SELECT_MENU':
            console.log(action);
			return {...state, url:action.url};
		break;
		default:
			return {...state};
		break;
	}
}