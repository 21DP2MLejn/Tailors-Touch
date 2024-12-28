<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Fetch all products
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'status' => true,
            'message' => 'Products fetched successfully.',
            'data' => $products,
        ], 200);
    }

    // Create a new product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]); 

        $data = $request->all();

        // Handle file upload
        if ($request->hasFile('image')) {
            // Store the image and generate its URL
            $imagePath = $request->file('image')->store('products', 'public');
            $data['image'] = asset('storage/' . $imagePath);  // Use asset() to get the full URL
        }

        $product = Product::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Product created successfully.',
            'data' => $product,
        ], 201);
    }

    // Fetch a single product
    public function show($id)   
    {
        $product = Product::find($id);
        $imageUrl = Storage::url($product->image_path);

    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        return response()->json([
            'status' => true,
            'data' => $product,
            'imageUrl' => $imageUrl,
        ]);
    }
    

    // Update a product
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully.',
            'data' => $product,
        ], 200);
    }

    // Delete a product
    public function destroy(Product $product)
    {
        // Delete the image if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully.',
        ], 200);
    }
}
