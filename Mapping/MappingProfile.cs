using AutoMapper;
using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Models.DTOs;

namespace FutureStepsAcademy.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Student, StudentDTO>()
     .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.department.DepartmentName))
     .ForMember(dest => dest.Department_Code,
                opt => opt.MapFrom(src => src.department.Department_Code))
     .ForMember(dest => dest.Courses,
                opt => opt.MapFrom(src => src.student_Courses.Select(sc => sc.course)))
     .ReverseMap();

        CreateMap<Student, GetAllStdentDTO>()
     .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.department.DepartmentName));


        CreateMap<Teacher, TeacherDTO>()
     .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.department.DepartmentName))
     .ForMember(dest => dest.Department_Code,
                opt => opt.MapFrom(src => src.department.Department_Code))
     .ForMember(dest => dest.Courses,
                opt => opt.MapFrom(src => src.teacher_Courses.Select(sc => sc.course)))
     .ReverseMap();

        CreateMap<Teacher, GetAllTeacherDTO>()
    .ForMember(dest => dest.DepartmentName,
               opt => opt.MapFrom(src => src.department.DepartmentName)).ReverseMap();




        CreateMap<Student, AddStudentRequestDTO>().ReverseMap();
        CreateMap<Teacher, AddTeacherRequestDTO>().ReverseMap();
        CreateMap<Student, UpdateStudentRequestDTO>().ReverseMap();
        CreateMap<Teacher, UpdateTeacherRequestDTO>().ReverseMap();

        CreateMap<AddDepartmentRequestDTO, Department>()
    .ForMember(dest => dest.Course_Departments,
        opt => opt.MapFrom(src => src.CourseIDs.Select(id => new Course_Department { CourseID = id })));



        CreateMap<Department, DepartmentDTO>()
            .ForMember(dest => dest.Courses, opt => opt.MapFrom(src =>
                src.Course_Departments.Select(cd => cd.course)));



        CreateMap<Department, GetAllDepartmentsDTO>().ReverseMap();

        CreateMap<Department, UpdateDepartmentDTO>()
    .ForMember(dest => dest.CourseIDs,
        opt => opt.MapFrom(src => src.Course_Departments.Select(cd => cd.CourseID).ToList()))
    .ReverseMap()
    .ForMember(dest => dest.Course_Departments, opt => opt.Ignore());


        CreateMap<Course, CourseDTO>()
    .ForMember(dest => dest.students, opt => opt.MapFrom(src =>
        src.student_Courses.Select(sc => sc.student)))
    .ForMember(dest => dest.departmenters, opt => opt.MapFrom(src =>
        src.course_Departments.Select(cd => cd.department)))
    .ForMember(dest => dest.teachers, opt => opt.MapFrom(src =>
        src.teacher_Courses.Select(tc => tc.teacher)))
    .ReverseMap();



        CreateMap<Course, AddCourseRequestDTO>().ReverseMap();


        CreateMap<Course, UpdateCourseRequestDTO>().ReverseMap();


        CreateMap<Teacher, SimpleTeacherDTO>().ReverseMap();
        CreateMap<Student, SimpleStudentDTO>().ReverseMap();
        CreateMap<Department, SimpleDepartmentDTO>().ReverseMap();
        CreateMap<Course, SimpleCourseDTO>().ReverseMap();




        // Grade ? GradeDTO
        CreateMap<Grade, GradeDTO>()
            .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.FirstName + " " + src.Student.LastName))
            .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.courseName))
            .ForMember(dest => dest.GradeType, opt => opt.MapFrom(src => src.GradeType.ToString()));

        // GradeDTO ? Grade
        CreateMap<GradeDTO, Grade>()
            .ForMember(dest => dest.GradeType, opt => opt.MapFrom(src => Enum.Parse<GradeType>(src.GradeType)))
            .ForMember(dest => dest.Student, opt => opt.Ignore())
            .ForMember(dest => dest.Course, opt => opt.Ignore());



        CreateMap<CreateInvoiceDto, Invoice>()
.ForMember(dest => dest.InvoiceItems, opt => opt.MapFrom(src =>
    src.Items.Select(i => new InvoiceItem
    {
        Description = string.IsNullOrEmpty(i.Description) ? "No description" : i.Description,
        Amount = (decimal)i.Amount
    })
))
.ForMember(dest => dest.Payments, opt => opt.MapFrom(src =>
    src.paymant.Select(p => new Payment
    {
        Amount = (decimal)p.Amount,
        PaymentDate = p.PaymentDate ?? DateTime.UtcNow, // لا حاجة HasValue
        Method = string.IsNullOrEmpty(p.Method) ? "Unknown" : p.Method,
        Description = string.IsNullOrEmpty(p.Description) ? "No description" : p.Description,
        PaymentType = string.IsNullOrEmpty(p.PaymentType) ? "Unknown" : p.PaymentType
    })
))
.ForMember(dest => dest.IssueDate, opt => opt.MapFrom(src => src.IssueDate)) // لا حاجة HasValue
.ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.Items.Sum(i => (decimal)i.Amount)))
.ForMember(dest => dest.Balance, opt => opt.MapFrom(src =>
    src.Items.Sum(i => (decimal)i.Amount) - (src.paymant != null && src.paymant.Count > 0
        ? src.paymant.Sum(p => (decimal)p.Amount)
        : 0)
))
.ForMember(dest => dest.Status, opt => opt.MapFrom(src =>
    (src.paymant != null && src.paymant.Sum(p => (decimal)p.Amount) >= src.Items.Sum(i => (decimal)i.Amount))
        ? "Paid"
        : (src.paymant != null && src.paymant.Count > 0) ? "PartiallyPaid" : "Issued"
));


        // Reverse mapping (if needed later)
        CreateMap<Invoice, CreateInvoiceDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src =>
                src.InvoiceItems.Select(i => new InvoiceItemDto
                {
                    Description = i.Description,
                    Amount = i.Amount
                })
            ))
            .ForMember(dest => dest.paymant, opt => opt.MapFrom(src =>
                src.Payments.Select(p => new PaymantDTO
                {
                    Amount = p.Amount,
                    PaymentDate = p.PaymentDate,
                    Method = p.Method
                })
            ));



        // Invoice <-> InvoiceDto
        CreateMap<Invoice, InvoiceDto>()
            .ForMember(dest => dest.StudentName,
                opt => opt.MapFrom(src => src.Student != null ? src.Student.FirstName + " " + src.Student.LastName : string.Empty))
            .ForMember(dest => dest.Items,
                opt => opt.MapFrom(src => src.InvoiceItems))
            .ForMember(dest => dest.Payments,
                opt => opt.MapFrom(src => src.Payments));

        CreateMap<InvoiceDto, Invoice>()
            .ForMember(dest => dest.InvoiceItems,
                opt => opt.MapFrom(src => src.Items))
            .ForMember(dest => dest.Payments,
                opt => opt.MapFrom(src => src.Payments))
            .ForMember(dest => dest.Student,
                opt => opt.Ignore());


        // InvoiceItem to InvoiceItemDto mapping
        CreateMap<InvoiceItem, InvoiceItemDto>();

        // Reverse mapping for InvoiceItem
        CreateMap<InvoiceItemDto, InvoiceItem>()
            .ForMember(dest => dest.Invoice, opt => opt.Ignore());


        // Payment to PaymentDTO mapping
        CreateMap<Payment, PaymantDTO>();

        // CreatePaymentDTO to Payment mapping (for creating new payments)
        CreateMap<CreatePayementDTO, Payment>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Student, opt => opt.Ignore())
            .ForMember(dest => dest.Teacher, opt => opt.Ignore())
            .ForMember(dest => dest.Invoice, opt => opt.Ignore())
            .ForMember(dest => dest.StudentId, opt => opt.Ignore())
            .ForMember(dest => dest.TeacherId, opt => opt.Ignore());

        // Reverse mapping for Payment (for updates)
        CreateMap<PaymantDTO, Payment>()
            .ForMember(dest => dest.Student, opt => opt.Ignore())
            .ForMember(dest => dest.Teacher, opt => opt.Ignore())
            .ForMember(dest => dest.Invoice, opt => opt.Ignore())
            .ForMember(dest => dest.StudentId, opt => opt.Ignore())
            .ForMember(dest => dest.TeacherId, opt => opt.Ignore());

        // InvoiceItemDto ↔ InvoiceItem
        CreateMap<InvoiceItemDto, InvoiceItem>().ReverseMap();

        // PaymantDTO ↔ Payment
        CreateMap<PaymantDTO, Payment>().ReverseMap();

        // expense Category to dto
        CreateMap<ExpenseCategoryDTO, ExpenseCategory>().ReverseMap();

        // expense to the Expense DTO 
        CreateMap<Expense, ExpenseDTO>().ReverseMap();
        CreateMap<Expense, CreateExpenseDTO>().ReverseMap();
        CreateMap<Expense, UpdateExpenseDTO>().ReverseMap();


    }
}