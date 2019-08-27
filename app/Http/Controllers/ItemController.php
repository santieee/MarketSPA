<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\User;
use App\Item;
use App\ItemPhoto;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    public function add(Request $request){
      
    	$item = new Item;
    	$item->title = $request->title;
        $item->seller_id = $request->user()->id;
    	$item->description = $request->description;
    	$item->price = $request->price;
    	$item->count = $request->count;
        $item->save();

    	//save photo   	
        $path = 'photo/' . $request->user()->name . '_' . $item->title . '_' . time();
        $upload_folder = 'public/' . $path;
        $photos = $request->photos;
        $filePathes = '';

        foreach ($photos as $key => $photo) {
            $ext = $photo->getClientOriginalExtension();
            $filename = uniqid() . '.' . $ext;
            $url = Storage::disk('s3')->putFileAs($upload_folder, $photo, $filename, 'public');
            $itemPhoto = new ItemPhoto;
            $itemPhoto->path = config('filesystems.disks.s3.url') . '/' . $url;
            $itemPhoto->item_id = $item->id;
            $itemPhoto->save();
        }

        return $this->responseData($request);
    }

    public function get(Request $request){
        return $this->responseData($request);
    }

    public function delete(Request $request){
        $itemOwnerId = $request->seller_id;
        $itemId = $request->id;
        if($itemOwnerId !== $request->user()->id){
            return false;
        }

        $item = Item::find($itemId);
        $path = explode('/', $item->photos[0]->path);
        $folder = $path[3] . '/' . $path[4] . '/' . $path[5];
        Storage::disk('s3')->deleteDirectory($folder);
        $item->delete();
        return $this->responseData($request);
    }

  

    public function responseData(Request $request){
        $user = $request->user('api');
        $cart = new CartController;
       
        if ($user && $user->status > 1) {
            //Seller
            return response()->json([
                'items' => Item::all()->reverse()->values()->chunk(2),
                'userItems' => Item::where('seller_id', $user->id)->get()->reverse()->values()->chunk(2),
                'cart'=> $cart->data($user),
            ]);
        }elseif ($user && $user->status == 1) {
            //Buyer
            return response()->json([
                'items' => Item::all()->reverse()->values()->chunk(2),
                'cart'=> $cart->data($user),
            ]);
        }else{
            //Guest
            return response()->json([
                'items' => Item::all()->reverse()->values()->chunk(2),
            ]);   
        }           
    }
}
