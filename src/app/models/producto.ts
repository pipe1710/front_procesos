export class Producto {
  articleId?: string;
  articleCode: string;
  articleName: string;
  articleDescription: string;
  articleStock: string;
  category: CategoryProduct;
  articleSalePrice: number;
  articlePurchasePrice: number;

  constructor(articleCode: string, articleSalePrice: number, articlePurchasePrice: number, articleName: string, articleDescription: string, articleStock: string, category: CategoryProduct) {
    this.articleCode = articleCode;
    this.articleName = articleName;
    this.articleDescription = articleDescription;
    this.articleStock = articleStock;
    this.category = category;
    this.articleSalePrice = articleSalePrice
    this.articlePurchasePrice = articlePurchasePrice
  }
}

interface CategoryProduct {
  categoryId: string
  categoryName?: string;
}

export interface Category {
  categoryId: string,
  categoryName: string,
  categoryDescription: string,
}
