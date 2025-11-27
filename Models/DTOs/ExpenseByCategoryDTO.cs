namespace FutureStepsAcademy.API.Models.DTOs
{
    public class ExpenseByCategoryDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
