// src/app/add-product/add-product.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'] 
})

export class AddProductComponent {
  productForm: FormGroup;
  selectedImage: File | null = null;
  
  constructor(private fb: FormBuilder, private productService: ProductService, private router:Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });
    
  }

 /* onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.addProductPlain(product).subscribe({
        next: (res) => {
          console.log('Product added:', res);
          this.productForm.reset();
        },
        error: (err) => console.error('Error adding product:', err),
      });
    }
  }*/

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0]; // Store the selected image
    }
  }

 onSubmit() {
    if (this.productForm.valid && this.selectedImage) {
      const formData = new FormData();
      
 /*     // Append the form values
      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price);
      formData.append('category', this.productForm.value.category);
  
      // Append the selected image if it exists
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }
*/
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('category', this.productForm.get('category').value);
      formData.append('image', this.selectedImage); // Append the image
  
      // Call your service to add the product
      this.productService.addProduct(formData).subscribe({
        next: (res) => {
          console.log('Product added:', res);
          this.productForm.reset();
          this.selectedImage = null; // Reset the selected image
          this.router.navigate(['/products']);
        },
        error: (err) => console.error('Error adding product:', err),
      });
    }
  }
}

