import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");

// READ
export async function GET() {
  try {
    const data = fs.readFileSync(productsFilePath, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

// CREATE & UPDATE
export async function POST(request: Request) {
  try {
    const productData = await request.json();
    const data = fs.readFileSync(productsFilePath, "utf8");
    let products = JSON.parse(data);
    
    if (productData.id) {
      // UPDATE existing product
      const index = products.findIndex((p: any) => p.id === productData.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
      }
    } else {
      // CREATE new product
      const newProduct = {
        ...productData,
        id: Math.random().toString(36).substring(2, 9)
      };
      products.push(newProduct);
    }
    
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process product" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    const data = fs.readFileSync(productsFilePath, "utf8");
    let products = JSON.parse(data);
    
    products = products.filter((p: any) => p.id !== id);
    
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
