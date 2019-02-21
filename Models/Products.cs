using System.ComponentModel.DataAnnotations;

namespace Project1.ProductModel
{
    public class Products
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
    }
}