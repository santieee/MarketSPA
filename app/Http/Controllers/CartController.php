<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class CartController extends Controller
{
    public function add(Request $request){
    	$user = User::find($request->user()->id);    	
    	$search = $user->cart()->where('item_id', $request->item_id)->get()->first();

    	if($search){
    		$count = $search->pivot->count;
    		$user->cart()->updateExistingPivot($request->item_id, ['count' => ++$count]);
    	}else{
    		$user->cart()->attach($request->item_id);
    	}
    	return $this->responseData($user);
    }

    public function delete(Request $request){
    	$user = User::find($request->user()->id);
    	$user->cart()->detach($request->item_id);
    	return $this->responseData($user);
    }

    public function decrement(Request $request){
        $user = User::find($request->user()->id);       
        $search = $user->cart()->where('item_id', $request->item_id)->get()->first();
        $count = $search->pivot->count;

        if($count > 1){           
            $user->cart()->updateExistingPivot($request->item_id, ['count' => --$count]);
        }else{
            $user->cart()->detach($request->item_id);
        }
        return $this->responseData($user);
    }

    public function clear(Request $request){
        $user = User::find($request->user()->id);    
        $user->cart()->detach();
        return $this->responseData($user);
    }

    public function responseData($user){
    	return response()->json([
            'cart' => $this->data($user)
        ]);   
    }

    public function data($user){
    	return $user->cart->reverse()->values()->chunk(2);
    }
}
