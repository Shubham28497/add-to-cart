import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searchKey:string ="";
  filterCategory:any;
  public productList: any
  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.apiService.getProduct().subscribe(data => {
      this.productList = data
      this.filterCategory=data
      console.log(data)
      this.productList.forEach((a:any)=>{
        if(a.category ==="men's clothing" || a.category === "women's clothing")
        a.category="fashion"
        Object.assign(a,{quantity:1,total:a.price});
      })

    })
 this.cartService.search.subscribe((val:any)=>{
  this.searchKey=val;
 })

  }
  addtocart(item:any){
    this.cartService.addtoCart(item)

  }
  filter(category:string){
 this.filterCategory=this.productList
 .filter((a:any)=>{
  if(a.category==category || category==''){
    return a  
  }
 })
  }

}
