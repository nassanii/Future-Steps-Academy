namespace FutureStepsAcademy.API.Models
{
    public class ExpenseCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Expense> Expenses { get; set; }
    }
}
