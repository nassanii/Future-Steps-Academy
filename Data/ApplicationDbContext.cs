using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // public DbSet<Class> Classes { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Invoice> invoices { get; set; }
        public DbSet<InvoiceItem> invoiceItems { get; set; }
        public DbSet<ExpenseCategory> Expenses_Category { get; set; }
        public DbSet<Expense> expenses { get; set; }
        public DbSet<ProfitReport> profitReports { get; set; }
        public DbSet<ProfitReportExpense> profitReportExpenses { get; set; }

        // Many-to-many relations

        public DbSet<Course_Department> Course_Departments { get; set; }
        public DbSet<Student_Course> Student_Courses { get; set; }
        //public DbSet<Student_Teacher> Student_Teachers { get; set; }
        public DbSet<Teacher_Course> Teacher_Courses { get; set; }
        // public DbSet<TeacherClass> TeacherClasses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // Seed Roles

            // 1. Define your static IDs first (generate these once!)
            const string ADMIN_ROLE_ID = "a18be9c0-aa65-4af8-bd17-00bd9344e575";
            const string TEACHER_ROLE_ID = "a18be9c0-aa65-4af8-bd17-00bd9344e576"; // Changed one char
            const string STUDENT_ROLE_ID = "a18be9c0-aa65-4af8-bd17-00bd9344e577"; // Changed one char

            // 2. Add the 'Id' property to your HasData call
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = ADMIN_ROLE_ID,
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = TEACHER_ROLE_ID,
                    Name = "Teacher",
                    NormalizedName = "TEACHER"
                },
                new IdentityRole
                {
                    Id = STUDENT_ROLE_ID,
                    Name = "Student",
                    NormalizedName = "STUDENT"
                }
            );




            modelBuilder.Entity<Invoice>()
              .HasMany(i => i.InvoiceItems)
              .WithOne(ii => ii.Invoice)
              .HasForeignKey(ii => ii.InvoiceId)
              .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Invoice>()
                .HasMany(i => i.Payments)
                .WithOne(p => p.Invoice)
                .HasForeignKey(p => p.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);



            // Seeding data to the Teacher 
            var teachers = new List<Teacher>
            {
                new Teacher { TeacherID = 1, FirstName="Ahmed", LastName="Ali", Phone="+905300000001", Email="ahmed.ali@example.com", Address="Istanbul/Turkey", HireDate=new DateOnly(2015, 3, 1), DepartmentID=1, Salary=4000f  },
                new Teacher { TeacherID = 2, FirstName="Lina", LastName="Khaled", Phone="+905300000002", Email="lina.khaled@example.com", Address="Ankara/Turkey", HireDate=new DateOnly(2016, 5, 15), DepartmentID=2, Salary=4200f  },
                new Teacher { TeacherID = 3, FirstName="Omar", LastName="Hassan", Phone="+905300000003", Email="omar.hassan@example.com", Address="Izmir/Turkey", HireDate=new DateOnly(2017, 8, 10), DepartmentID=3, Salary=4100f, },
                new Teacher { TeacherID = 4, FirstName="Sara", LastName="Youssef", Phone="+905300000004", Email="sara.youssef@example.com", Address="Gaziantep/Turkey", HireDate=new DateOnly(2018, 2, 20), DepartmentID=4, Salary=4300f, },
                new Teacher { TeacherID = 5, FirstName="Khaled", LastName="Othman", Phone="+905300000005", Email="khaled.othman@example.com", Address="Antalya/Turkey", HireDate=new DateOnly(2019, 7, 5), DepartmentID=5, Salary=4500f },
                new Teacher { TeacherID = 6, FirstName="Mariam", LastName="Salem", Phone="+905300000006", Email="mariam.salem@example.com", Address="Bursa/Turkey", HireDate=new DateOnly(2015, 11, 12), DepartmentID=6, Salary=4400f },
                new Teacher { TeacherID = 7, FirstName="Tariq", LastName="Ali", Phone="+905300000007", Email="tariq.ali@example.com", Address="Mersin/Turkey", HireDate=new DateOnly(2020, 1, 25), DepartmentID=7, Salary=4600f },
                new Teacher { TeacherID = 8, FirstName="Noor", LastName="Rahman", Phone="+905300000008", Email="noor.rahman@example.com", Address="Adana/Turkey", HireDate=new DateOnly(2014, 9, 17), DepartmentID=8, Salary=4700f },
                new Teacher { TeacherID = 9, FirstName="Hadi", LastName="Fouad", Phone="+905300000009", Email="hadi.fouad@example.com", Address="Konya/Turkey", HireDate=new DateOnly(2016, 12, 3), DepartmentID=9, Salary=4800f },
                new Teacher { TeacherID = 10, FirstName="Aya", LastName="Samir", Phone="+905300000010", Email="aya.samir@example.com", Address="Gaziantep/Turkey", HireDate=new DateOnly(2017, 4, 28), DepartmentID=10, Salary=4900f }
            };
            modelBuilder.Entity<Teacher>().HasData(teachers);


            // Seeding Departments in the database
            var departments = new List<Department>
            {
                new Department { DepartmentID = 1, DepartmentName = "Computer Science", Department_Code = "CS01" },
                new Department { DepartmentID = 2, DepartmentName = "Information Technology", Department_Code = "IT02" },
                new Department { DepartmentID = 3, DepartmentName = "Software Engineering", Department_Code = "SE03" },
                new Department { DepartmentID = 4, DepartmentName = "Electrical Engineering", Department_Code = "EE04" },
                new Department { DepartmentID = 5, DepartmentName = "Mechanical Engineering", Department_Code = "ME05" },
                new Department { DepartmentID = 6, DepartmentName = "Civil Engineering", Department_Code = "CE06" },
                new Department { DepartmentID = 7, DepartmentName = "Business Administration", Department_Code = "BA07" },
                new Department { DepartmentID = 8, DepartmentName = "Economics", Department_Code = "EC08" },
                new Department { DepartmentID = 9, DepartmentName = "Mathematics", Department_Code = "MA09" },
                new Department { DepartmentID = 10, DepartmentName = "Physics", Department_Code = "PH10" }
            };
            modelBuilder.Entity<Department>().HasData(departments);


            // seeding data into invoice
            var Invoice = new List<Invoice>()
            {
                new Invoice() { Id = 1, StudentId = 1, InvoiceNo = "INV-001", IssueDate = new DateTime(2024, 1, 15), DueDate = new DateTime(2024, 2, 15), TotalAmount = 1500.00m, Balance = 1500.00m, Status = "Issued" },
                new Invoice() { Id = 2, StudentId = 2, InvoiceNo = "INV-002", IssueDate = new DateTime(2024, 1, 20), DueDate = new DateTime(2024, 2, 20), TotalAmount = 2000.00m, Balance = 500.00m, Status = "PartiallyPaid" },
                new Invoice() { Id = 3, StudentId = 3, InvoiceNo = "INV-003", IssueDate = new DateTime(2024, 1, 25), DueDate = new DateTime(2024, 2, 25), TotalAmount = 1800.00m, Balance = 0.00m, Status = "Paid" },
                new Invoice() { Id = 4, StudentId = 4, InvoiceNo = "INV-004", IssueDate = new DateTime(2024, 2, 1), DueDate = new DateTime(2024, 3, 1), TotalAmount = 2200.00m, Balance = 2200.00m, Status = "Issued" },
                new Invoice() { Id = 5, StudentId = 5, InvoiceNo = "INV-005", IssueDate = new DateTime(2024, 2, 5), DueDate = new DateTime(2024, 3, 5), TotalAmount = 1600.00m, Balance = 1600.00m, Status = "Issued" },
                new Invoice() { Id = 6, StudentId = 6, InvoiceNo = "INV-006", IssueDate = new DateTime(2024, 2, 10), DueDate = new DateTime(2024, 3, 10), TotalAmount = 1900.00m, Balance = 1900.00m, Status = "Issued" },
                new Invoice() { Id = 7, StudentId = 7, InvoiceNo = "INV-007", IssueDate = new DateTime(2024, 2, 15), DueDate = new DateTime(2024, 3, 15), TotalAmount = 2100.00m, Balance = 0.00m, Status = "Paid" },
                new Invoice() { Id = 8, StudentId = 8, InvoiceNo = "INV-008", IssueDate = new DateTime(2024, 2, 20), DueDate = new DateTime(2024, 3, 20), TotalAmount = 1700.00m, Balance = 1700.00m, Status = "Issued" },
                new Invoice() { Id = 9, StudentId = 9, InvoiceNo = "INV-009", IssueDate = new DateTime(2024, 2, 25), DueDate = new DateTime(2024, 3, 25), TotalAmount = 2300.00m, Balance = 800.00m, Status = "PartiallyPaid" },
                new Invoice() { Id = 10, StudentId = 10, InvoiceNo = "INV-010", IssueDate = new DateTime(2024, 3, 1), DueDate = new DateTime(2024, 4, 1), TotalAmount = 2400.00m, Balance = 2400.00m, Status = "Issued" },

            };

            modelBuilder.Entity<Invoice>().HasData(Invoice);



            // seeding data into InvoiceItems
            var InvoiceItems = new List<InvoiceItem>()
{
    // Invoice 1 Items (Total: 1500.00)
    new InvoiceItem() { Id = 1, InvoiceId = 1, Description = "Tuition Fee - First Semester", Amount = 1200.00m },
    new InvoiceItem() { Id = 2, InvoiceId = 1, Description = "Laboratory Fee", Amount = 200.00m },
    new InvoiceItem() { Id = 3, InvoiceId = 1, Description = "Library Access Fee", Amount = 100.00m },

    // Invoice 2 Items (Total: 2000.00)
    new InvoiceItem() { Id = 4, InvoiceId = 2, Description = "Tuition Fee - First Semester", Amount = 1600.00m },
    new InvoiceItem() { Id = 5, InvoiceId = 2, Description = "Sports Activities Fee", Amount = 250.00m },
    new InvoiceItem() { Id = 6, InvoiceId = 2, Description = "Transportation Fee", Amount = 150.00m },

    // Invoice 3 Items (Total: 1800.00)
    new InvoiceItem() { Id = 7, InvoiceId = 3, Description = "Tuition Fee - First Semester", Amount = 1400.00m },
    new InvoiceItem() { Id = 8, InvoiceId = 3, Description = "Laboratory Fee", Amount = 300.00m },
    new InvoiceItem() { Id = 9, InvoiceId = 3, Description = "Textbooks Fee", Amount = 100.00m },

    // Invoice 4 Items (Total: 2200.00)
    new InvoiceItem() { Id = 10, InvoiceId = 4, Description = "Tuition Fee - Second Semester", Amount = 1800.00m },
    new InvoiceItem() { Id = 11, InvoiceId = 4, Description = "Advanced Laboratory Fee", Amount = 300.00m },
    new InvoiceItem() { Id = 12, InvoiceId = 4, Description = "Extracurricular Activities Fee", Amount = 100.00m },

    // Invoice 5 Items (Total: 1600.00)
    new InvoiceItem() { Id = 13, InvoiceId = 5, Description = "Tuition Fee - Second Semester", Amount = 1300.00m },
    new InvoiceItem() { Id = 14, InvoiceId = 5, Description = "Library Access Fee", Amount = 200.00m },
    new InvoiceItem() { Id = 15, InvoiceId = 5, Description = "Examination Fee", Amount = 100.00m },

    // Invoice 6 Items (Total: 1900.00)
    new InvoiceItem() { Id = 16, InvoiceId = 6, Description = "Tuition Fee - Second Semester", Amount = 1500.00m },
    new InvoiceItem() { Id = 17, InvoiceId = 6, Description = "Cultural Activities Fee", Amount = 250.00m },
    new InvoiceItem() { Id = 18, InvoiceId = 6, Description = "Transportation Fee", Amount = 150.00m },

    // Invoice 7 Items (Total: 2100.00)
    new InvoiceItem() { Id = 19, InvoiceId = 7, Description = "Tuition Fee - Second Semester", Amount = 1700.00m },
    new InvoiceItem() { Id = 20, InvoiceId = 7, Description = "Laboratory Fee", Amount = 250.00m },
    new InvoiceItem() { Id = 21, InvoiceId = 7, Description = "Textbooks Fee", Amount = 150.00m },

    // Invoice 8 Items (Total: 1700.00)
    new InvoiceItem() { Id = 22, InvoiceId = 8, Description = "Tuition Fee - Second Semester", Amount = 1400.00m },
    new InvoiceItem() { Id = 23, InvoiceId = 8, Description = "Library Access Fee", Amount = 200.00m },
    new InvoiceItem() { Id = 24, InvoiceId = 8, Description = "Activity Fee", Amount = 100.00m },

    // Invoice 9 Items (Total: 2300.00)
    new InvoiceItem() { Id = 25, InvoiceId = 9, Description = "Tuition Fee - Second Semester", Amount = 1900.00m },
    new InvoiceItem() { Id = 26, InvoiceId = 9, Description = "Advanced Laboratory Fee", Amount = 300.00m },
    new InvoiceItem() { Id = 27, InvoiceId = 9, Description = "Transportation Fee", Amount = 100.00m },

    // Invoice 10 Items (Total: 2400.00)
    new InvoiceItem() { Id = 28, InvoiceId = 10, Description = "Tuition Fee - Third Semester", Amount = 2000.00m },
    new InvoiceItem() { Id = 29, InvoiceId = 10, Description = "Sports Activities Fee", Amount = 250.00m },
    new InvoiceItem() { Id = 30, InvoiceId = 10, Description = "Laboratory Fee", Amount = 150.00m }
};

            modelBuilder.Entity<InvoiceItem>().HasData(InvoiceItems);


            var ExpenseCategoryes = new List<ExpenseCategory>()
{
    new ExpenseCategory() { Id = 1, Name = "Salary" },
    new ExpenseCategory() { Id = 2, Name = "Rent" },
    new ExpenseCategory() { Id = 3, Name = "Utilities" }, // electricity, water, etc.
    new ExpenseCategory() { Id = 4, Name = "Office Supplies" },
    new ExpenseCategory() { Id = 5, Name = "Maintenance" },
    new ExpenseCategory() { Id = 6, Name = "Transportation" },
    new ExpenseCategory() { Id = 7, Name = "Marketing" },
    new ExpenseCategory() { Id = 8, Name = "Training & Development" },
    new ExpenseCategory() { Id = 9, Name = "Software Subscriptions" },
    new ExpenseCategory() { Id = 10, Name = "Internet & Communication" },
    new ExpenseCategory() { Id = 11, Name = "Cleaning Services" },
    new ExpenseCategory() { Id = 12, Name = "Taxes & Licenses" },
    new ExpenseCategory() { Id = 13, Name = "Equipment Purchase" },
    new ExpenseCategory() { Id = 14, Name = "Insurance" },
    new ExpenseCategory() { Id = 15, Name = "Miscellaneous" }
};

            modelBuilder.Entity<ExpenseCategory>().HasData(ExpenseCategoryes);


            var Expenses = new List<Expense>()
            {
                 new Expense
    {
        Id = 1,
        CategoryId = 1, // Salary
        TeacherId = 1,
        Amount = 1500.00m,
        Description = "Monthly salary for September",
        ExpenseDate = new DateTime(2025, 9, 30)
    },
    new Expense
    {
        Id = 2,
        CategoryId = 2, // Rent
        TeacherId = null,
        Amount = 1000.00m,
        Description = "Office rent for October",
        ExpenseDate = new DateTime(2025, 10, 1)
    },
    new Expense
    {
        Id = 3,
        CategoryId = 3, // Utilities
        TeacherId = null,
        Amount = 300.00m,
        Description = "Electricity and water bills",
        ExpenseDate = new DateTime(2025, 10, 5)
    },
    new Expense
    {
        Id = 4,
        CategoryId = 4, // Office Supplies
        TeacherId = null,
        Amount = 150.00m,
        Description = "Stationery and paper materials",
        ExpenseDate = new DateTime(2025, 10, 7)
    },
    new Expense
    {
        Id = 5,
        CategoryId = 6, // Transportation
        TeacherId = 2,
        Amount = 80.00m,
        Description = "Teacher transportation reimbursement",
        ExpenseDate = new DateTime(2025, 10, 10)
    },
    new Expense
    {
        Id = 6,
        CategoryId = 9, // Software Subscriptions
        TeacherId = null,
        Amount = 200.00m,
        Description = "Monthly software subscription fees",
        ExpenseDate = new DateTime(2025, 10, 15)
    }
            };

            modelBuilder.Entity<Expense>().HasData(Expenses);



            // Seeding data to the students
            var Students = new List<Student>()
            {
                new Student() { FirstName = "Abdurrahman", LastName = "Nassani", Address = "Gaziantep/Turkey", Phone = "+905538866317", Year = "FrishMan", StudentID = 1, DepartmentID = 1 },
                new Student() { FirstName = "Omar", LastName = "Hassan", Address = "Istanbul/Turkey", Phone = "+905311112233", Year = "Sophomore", StudentID = 2, DepartmentID = 2 },
                new Student() { FirstName = "Lina", LastName = "Khaled", Address = "Gaziantep/Turkey", Phone = "+905322223344", Year = "Junior", StudentID = 3, DepartmentID = 3 },
                new Student() { FirstName = "Ahmad", LastName = "Mahmoud", Address = "Ankara/Turkey", Phone = "+905333334455", Year = "Senior", StudentID = 4, DepartmentID = 4 },
                new Student() { FirstName = "Sara", LastName = "Youssef", Address = "Gaziantep/Turkey", Phone = "+905344445566", Year = "Freshman", StudentID = 5, DepartmentID = 5 },
                new Student() { FirstName = "Khaled", LastName = "Othman", Address = "Izmir/Turkey", Phone = "+905355556677", Year = "Sophomore", StudentID = 6, DepartmentID = 6 },
                new Student() { FirstName = "Mariam", LastName = "Salem", Address = "Gaziantep/Turkey", Phone = "+905366667788", Year = "Junior", StudentID = 7, DepartmentID = 7 },
                new Student() { FirstName = "Tariq", LastName = "Ali", Address = "Antalya/Turkey", Phone = "+905377778899", Year = "Senior", StudentID = 8, DepartmentID = 8 },
                new Student() { FirstName = "Noor", LastName = "Rahman", Address = "Gaziantep/Turkey", Phone = "+905388889900", Year = "Freshman", StudentID = 9, DepartmentID = 9 },
                new Student() { FirstName = "Hadi", LastName = "Fouad", Address = "Mersin/Turkey", Phone = "+905399991122", Year = "Sophomore", StudentID = 10, DepartmentID = 10 },
                new Student() { FirstName = "Aya", LastName = "Samir", Address = "Gaziantep/Turkey", Phone = "+905300002233", Year = "Junior", StudentID = 11, DepartmentID = 2 }
            };
            modelBuilder.Entity<Student>().HasData(Students);



            // Seeding Grades
            var grades = new List<Grade>
{
    // Student 1 (Abdurrahman) - Computer Science Department
    new Grade { GradeID = 1, StudentID = 1, CourseID = 1, GradeType = GradeType.Midterm, Score = 85, DateRecorded = new DateTime(2024, 10, 15) },
    new Grade { GradeID = 2, StudentID = 1, CourseID = 1, GradeType = GradeType.Final, Score = 90, DateRecorded = new DateTime(2024, 12, 20) },
    new Grade { GradeID = 3, StudentID = 1, CourseID = 1, GradeType = GradeType.Quiz, Score = 88, DateRecorded = new DateTime(2024, 9, 10) },
    new Grade { GradeID = 4, StudentID = 1, CourseID = 2, GradeType = GradeType.Midterm, Score = 78, DateRecorded = new DateTime(2024, 10, 16) },
    new Grade { GradeID = 5, StudentID = 1, CourseID = 2, GradeType = GradeType.Final, Score = 82, DateRecorded = new DateTime(2024, 12, 21) },

    // Student 2 (Omar) - Information Technology Department
    new Grade { GradeID = 6, StudentID = 2, CourseID = 4, GradeType = GradeType.Midterm, Score = 92, DateRecorded = new DateTime(2024, 10, 15) },
    new Grade { GradeID = 7, StudentID = 2, CourseID = 4, GradeType = GradeType.Final, Score = 95, DateRecorded = new DateTime(2024, 12, 20) },
    new Grade { GradeID = 8, StudentID = 2, CourseID = 5, GradeType = GradeType.Assignment, Score = 89, DateRecorded = new DateTime(2024, 11, 5) },
    new Grade { GradeID = 9, StudentID = 2, CourseID = 5, GradeType = GradeType.Final, Score = 91, DateRecorded = new DateTime(2024, 12, 21) },

    // Student 3 (Lina) - Software Engineering Department
    new Grade { GradeID = 10, StudentID = 3, CourseID = 7, GradeType = GradeType.Midterm, Score = 87, DateRecorded = new DateTime(2024, 10, 17) },
    new Grade { GradeID = 11, StudentID = 3, CourseID = 7, GradeType = GradeType.Final, Score = 93, DateRecorded = new DateTime(2024, 12, 22) },
    new Grade { GradeID = 12, StudentID = 3, CourseID = 8, GradeType = GradeType.Project, Score = 95, DateRecorded = new DateTime(2024, 11, 20) },
    new Grade { GradeID = 13, StudentID = 3, CourseID = 8, GradeType = GradeType.Final, Score = 90, DateRecorded = new DateTime(2024, 12, 22) },

    // Student 4 (Ahmad) - Electrical Engineering Department
    new Grade { GradeID = 14, StudentID = 4, CourseID = 10, GradeType = GradeType.Midterm, Score = 75, DateRecorded = new DateTime(2024, 10, 18) },
    new Grade { GradeID = 15, StudentID = 4, CourseID = 10, GradeType = GradeType.Final, Score = 80, DateRecorded = new DateTime(2024, 12, 23) },
    new Grade { GradeID = 16, StudentID = 4, CourseID = 11, GradeType = GradeType.Quiz, Score = 72, DateRecorded = new DateTime(2024, 9, 15) },
    new Grade { GradeID = 17, StudentID = 4, CourseID = 11, GradeType = GradeType.Final, Score = 78, DateRecorded = new DateTime(2024, 12, 23) },

    // Student 5 (Sara) - Mechanical Engineering Department
    new Grade { GradeID = 18, StudentID = 5, CourseID = 13, GradeType = GradeType.Midterm, Score = 88, DateRecorded = new DateTime(2024, 10, 19) },
    new Grade { GradeID = 19, StudentID = 5, CourseID = 13, GradeType = GradeType.Final, Score = 92, DateRecorded = new DateTime(2024, 12, 24) },
    new Grade { GradeID = 20, StudentID = 5, CourseID = 14, GradeType = GradeType.Assignment, Score = 85, DateRecorded = new DateTime(2024, 11, 10) },

    // Student 6 (Khaled) - Civil Engineering Department
    new Grade { GradeID = 21, StudentID = 6, CourseID = 16, GradeType = GradeType.Midterm, Score = 90, DateRecorded = new DateTime(2024, 10, 20) },
    new Grade { GradeID = 22, StudentID = 6, CourseID = 16, GradeType = GradeType.Final, Score = 94, DateRecorded = new DateTime(2024, 12, 25) },
    new Grade { GradeID = 23, StudentID = 6, CourseID = 17, GradeType = GradeType.Quiz, Score = 86, DateRecorded = new DateTime(2024, 9, 20) },

    // Student 7 (Mariam) - Business Administration Department
    new Grade { GradeID = 24, StudentID = 7, CourseID = 19, GradeType = GradeType.Midterm, Score = 91, DateRecorded = new DateTime(2024, 10, 21) },
    new Grade { GradeID = 25, StudentID = 7, CourseID = 19, GradeType = GradeType.Final, Score = 96, DateRecorded = new DateTime(2024, 12, 26) },
    new Grade { GradeID = 26, StudentID = 7, CourseID = 20, GradeType = GradeType.Participation, Score = 100, DateRecorded = new DateTime(2024, 12, 1) },

    // Student 8 (Tariq) - Economics Department
    new Grade { GradeID = 27, StudentID = 8, CourseID = 22, GradeType = GradeType.Midterm, Score = 83, DateRecorded = new DateTime(2024, 10, 22) },
    new Grade { GradeID = 28, StudentID = 8, CourseID = 22, GradeType = GradeType.Final, Score = 87, DateRecorded = new DateTime(2024, 12, 27) },
    new Grade { GradeID = 29, StudentID = 8, CourseID = 23, GradeType = GradeType.Assignment, Score = 80, DateRecorded = new DateTime(2024, 11, 15) },

    // Student 9 (Noor) - Mathematics Department
    new Grade { GradeID = 30, StudentID = 9, CourseID = 25, GradeType = GradeType.Midterm, Score = 95, DateRecorded = new DateTime(2024, 10, 23) },
    new Grade { GradeID = 31, StudentID = 9, CourseID = 25, GradeType = GradeType.Final, Score = 98, DateRecorded = new DateTime(2024, 12, 28) },
    new Grade { GradeID = 32, StudentID = 9, CourseID = 26, GradeType = GradeType.Quiz, Score = 92, DateRecorded = new DateTime(2024, 9, 25) },

    // Student 10 (Hadi) - Physics Department
    new Grade { GradeID = 33, StudentID = 10, CourseID = 28, GradeType = GradeType.Midterm, Score = 84, DateRecorded = new DateTime(2024, 10, 24) },
    new Grade { GradeID = 34, StudentID = 10, CourseID = 28, GradeType = GradeType.Final, Score = 88, DateRecorded = new DateTime(2024, 12, 29) },
    new Grade { GradeID = 35, StudentID = 10, CourseID = 29, GradeType = GradeType.Project, Score = 90, DateRecorded = new DateTime(2024, 11, 25) },

    // Student 11 (Aya) - Information Technology Department (DepartmentID = 2)
    new Grade { GradeID = 36, StudentID = 11, CourseID = 4, GradeType = GradeType.Midterm, Score = 89, DateRecorded = new DateTime(2024, 10, 25) },
    new Grade { GradeID = 37, StudentID = 11, CourseID = 4, GradeType = GradeType.Final, Score = 93, DateRecorded = new DateTime(2024, 12, 30) },
    new Grade { GradeID = 38, StudentID = 11, CourseID = 5, GradeType = GradeType.Assignment, Score = 87, DateRecorded = new DateTime(2024, 11, 8) },
    new Grade { GradeID = 39, StudentID = 11, CourseID = 6, GradeType = GradeType.Quiz, Score = 91, DateRecorded = new DateTime(2024, 9, 28) },
    new Grade { GradeID = 40, StudentID = 11, CourseID = 6, GradeType = GradeType.Final, Score = 94, DateRecorded = new DateTime(2024, 12, 30) },
};

            modelBuilder.Entity<Grade>().HasData(grades);





            var Courses = new List<Course>()
{
    // Computer Science
    new Course() { CourseID = 1, courseName = "Introduction to Programming", CourseCode = "CS101" },
    new Course() { CourseID = 2, courseName = "Data Structures", CourseCode = "CS102" },
    new Course() { CourseID = 3, courseName = "Algorithms", CourseCode = "CS201" },

    // Information Technology
    new Course() { CourseID = 4, courseName = "Networking Basics", CourseCode = "IT101" },
    new Course() { CourseID = 5, courseName = "Database Systems", CourseCode = "IT102" },
    new Course() { CourseID = 6, courseName = "Web Development", CourseCode = "IT201" },

    // Software Engineering
    new Course() { CourseID = 7, courseName = "Software Requirements", CourseCode = "SE101" },
    new Course() { CourseID = 8, courseName = "Software Design Patterns", CourseCode = "SE102" },
    new Course() { CourseID = 9, courseName = "Agile Methodologies", CourseCode = "SE201" },

    // Electrical Engineering
    new Course() { CourseID = 10, courseName = "Circuit Analysis", CourseCode = "EE101" },
    new Course() { CourseID = 11, courseName = "Electromagnetics", CourseCode = "EE102" },
    new Course() { CourseID = 12, courseName = "Digital Systems", CourseCode = "EE201" },

    // Mechanical Engineering
    new Course() { CourseID = 13, courseName = "Thermodynamics", CourseCode = "ME101" },
    new Course() { CourseID = 14, courseName = "Fluid Mechanics", CourseCode = "ME102" },
    new Course() { CourseID = 15, courseName = "Machine Design", CourseCode = "ME201" },

    // Civil Engineering
    new Course() { CourseID = 16, courseName = "Structural Analysis", CourseCode = "CE101" },
    new Course() { CourseID = 17, courseName = "Construction Materials", CourseCode = "CE102" },
    new Course() { CourseID = 18, courseName = "Transportation Engineering", CourseCode = "CE201" },

    // Business Administration
    new Course() { CourseID = 19, courseName = "Principles of Management", CourseCode = "BA101" },
    new Course() { CourseID = 20, courseName = "Marketing Fundamentals", CourseCode = "BA102" },
    new Course() { CourseID = 21, courseName = "Financial Accounting", CourseCode = "BA201" },

    // Economics
    new Course() { CourseID = 22, courseName = "Microeconomics", CourseCode = "EC101" },
    new Course() { CourseID = 23, courseName = "Macroeconomics", CourseCode = "EC102" },
    new Course() { CourseID = 24, courseName = "Econometrics", CourseCode = "EC201" },

    // Mathematics
    new Course() { CourseID = 25, courseName = "Calculus I", CourseCode = "MA101" },
    new Course() { CourseID = 26, courseName = "Linear Algebra", CourseCode = "MA102" },
    new Course() { CourseID = 27, courseName = "Discrete Mathematics", CourseCode = "MA201" },

    // Physics
    new Course() { CourseID = 28, courseName = "Classical Mechanics", CourseCode = "PH101" },
    new Course() { CourseID = 29, courseName = "Electromagnetism", CourseCode = "PH102" },
    new Course() { CourseID = 30, courseName = "Quantum Physics", CourseCode = "PH201" },
};

            modelBuilder.Entity<Course>().HasData(Courses);
        }
    }
}
