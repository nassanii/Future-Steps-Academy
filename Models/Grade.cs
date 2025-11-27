using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FutureStepsAcademy.Models;

public class Grade
{
    [Key]
    public int GradeID { get; set; }

    public GradeType GradeType { get; set; }

    [Range(0, 100)]
    public decimal Score { get; set; }

    public DateTime? DateRecorded { get; set; }

    // FK 1
    public int CourseID { get; set; }
    [ForeignKey("CourseID")]
    public Course Course { get; set; }

    // FK 2
    public int StudentID { get; set; }
    [ForeignKey("StudentID")]
    public Student Student { get; set; }
}

// Enum for grade types
public enum GradeType
{
    Quiz = 1,
    Assignment = 2,
    Midterm = 3,
    Final = 4,
    Project = 5,
    Participation = 6
}