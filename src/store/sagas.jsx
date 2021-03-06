import {takeLatest, put, all, call} from 'redux-saga/effects';
// delay, select
import {user}  from '../services/auth';

function* getUser(){
	try{
		const res = yield call(user);

		yield put({type:'SUCCESS_USER', user:res});
	}catch(e){
		console.log(e);
		yield put({type:'FAILURE_USER'});

	}
}

export default function* root(){
	yield all([
		takeLatest("REQUEST_USER", getUser),
		]);
	// yield all(takeEvery('ASYNC_TOGGLE_LESSION', asyncAddToggle));	
}
