<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
	protected $with = ['seller', 'photos'];

	protected $fillable = [
        'seller_id',
    ];

    public function seller(){
        return $this->belongsTo('App\User', 'seller_id');
    }

    public function photos(){
    	return $this->hasMany('App\ItemPhoto');
    }

    public function cart(){
        return $this->belongsToMany('App\User', 'carts');
    }
}
