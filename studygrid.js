const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./mongodb");
const cors = require("cors");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(express.json());
// Connect to database

// Define User Schema
// Import mongoose

connection()
// Define schemas for each collection
app.use(cors());
const adminSchema = new mongoose.Schema(
  {
    admin_id: { type: Number, required: true, unique: true },
    admin_name: { type: String, required: false },
    emailid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Admin" }, // Admin role
  },
  { timestamps: true, strict: false }
);

const assignmentSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    class: { type: String, required: true }, // The class for the assignment
    subject: { type: String, required: true }, // The subject related to the assignment
    teacherId: { type: String, required: true }, // Teacher ID who assigns the task
    assignment: { type: String, required: true }, // The assignment details
    
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);


const complainSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    teacherId: { type: String, }, // Teacher ID related to the complaint (e.g., "T001")
    class: { type: String, }, // Class related to the complaint (null by default)
    fullname: { type: String, }, // Full name of the student or individual making the complaint
    description: { type: String, required: true }, // Detailed description of the complaint (e.g., "hi guys")
    status: { type: String, default: "Pending" }, // Status of the complaint (Resolved/Pending)
    created_at: { type: Date, default: Date.now }, // Date and time when the complaint was created
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);

const noticeSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    
    audience: { type: String, required: true }, // Audience for the notice (e.g., "teachers")
    title: { type: String, required: true }, // Title of the notice (e.g., "on 1st Feb NAAC team visits")
    description: { type: String, required: true }, // Description of the notice (e.g., "morning all staff should come at 7am")
    created_at: { type: Date, default: Date.now }, // Date and time when the notice was created
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);
const studentSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    gender:{type: String, required: true },
    fullName: { type: String, required: true }, // Full name of the student (e.g., "John Doe")
    class: { type: String, required: true ,alias: 'className' }, // Class of the student (e.g., "LKG")
    password: { type: String, required: true }, // Password for the student (e.g., "password123")
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);

const studentTimetableSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    id: { type: Number, required: true }, // Student timetable ID (e.g., 1)
    class: { type: String, required: true }, // Class the student belongs to (e.g., "LKG")
    day: { type: String, required: true }, // Day of the week (e.g., "Monday-Friday")
    period: { type: Number, required: true }, // Period number (e.g., 1)
    subject_details: { type: String, required: true }, // Details of the subject (e.g., "Language Skills (9:00 AM - 9:50 AM)")
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);

const subjectSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    subject_code: { type: String, required: true }, // Subject code (e.g., "1-ART")
    subject_name: { type: String, required: true }, // Subject name (e.g., "Art and Craft")
    class: { type: String, required: true }, // Class for the subject (e.g., "1st")
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);

const teacherSubjectAllocationSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    teacher_name: { type: String, required: true }, // Teacher's full name
    subject_code: { type: String, required: true }, // Subject code (e.g., "1-ENG")
    subject_name: { type: String, required: true }, // Subject name (e.g., "English")
    class: { type: String, required: true }, // Class (e.g., "1st")
    teacher_id: { type: String, required: true } // Teacher ID (e.g., "T012")
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);

const teacherAssignmentSchema = new mongoose.Schema(
  {
    teacher_id: { type: String, required: true }, // Teacher's unique identifier (e.g., "T001")
    teacher_name: { type: String, required: true }, // Teacher's full name (e.g., "Aarti Sharma")
    subject_code: { type: String, required: true }, // Subject code (e.g., "1-ART")
    subject_name: { type: String, required: true }, // Subject name (e.g., "Art and Craft")
    class: { type: String, required: true }, // Class (e.g., "1st")
    assignment_date: { type: Date, required: true }, // Date the assignment is created (e.g., "2025-01-29")
    assignment_text: { type: String, required: true } // Assignment description (e.g., "Create a drawing based on your favorite festival.")
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);


const teacherSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true, unique: true }, // Unique ID for the teacher (e.g., "T001")
    name: { type: String, required: true }, // Teacher's full name (e.g., "Aarti Sharma")
    email: { type: String, required: true, unique: true }, // Teacher's email address (e.g., "aarti.sharma@example.com")
    
    password: { type: String, required: true } ,// Teacher's password for login (e.g., "pass123")
    gender:{type: String, required: true }
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);


const teacherTimetableSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true }, // Changed from ObjectId to String
    day: { type: String, required: true }, // Day of the week (e.g., "Monday-Friday")
    period: { type: String, required: true }, // Period number (e.g., "2")
    subject: { type: String, required: true }, // Subject being taught (e.g., "Numbers and Shapes")
    class: { type: String, required: true } // Class the subject is taught in (e.g., "LKG")
  },
  { timestamps: true, strict: false } // Automatically handles createdAt and updatedAt
);

// Create models for each collection
const AdminModel = mongoose.model('admins', adminSchema);
const AssignmentModel = mongoose.model('assignments', assignmentSchema);
const ComplainModel = mongoose.model('complains', complainSchema);
const NoticeModel = mongoose.model('notices', noticeSchema);
const StudentModel = mongoose.model('students', studentSchema);
const StudentTimetableModel = mongoose.model('students_timetables', studentTimetableSchema);
const SubjectModel = mongoose.model('subjects', subjectSchema);
const TeacherSubjectAllocationModel = mongoose.model('teacher_Subject_Allocations', teacherSubjectAllocationSchema);
const teacherAssignmentModel= mongoose.model('teacherassignments', teacherAssignmentSchema);
const TeacherModel = mongoose.model('teachers', teacherSchema);
const TeacherTimetableModel = mongoose.model('teachers_timetables', teacherTimetableSchema);
const bodyParser = require('body-parser');
// const AdminModel = require('./'); // Assuming you have an Admin model

app.use(bodyParser.urlencoded({ extended: true }));
// Admin Login Endpoint
app.post("/api/admin/login", async (req, res) => {
  const { admin_id, emailid, password } = req.body;

  // Validate inputs
  if (!admin_id || !emailid || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  try {
    // Find admin by admin_id and emailid
    const admin = await AdminModel.findOne({
      admin_id: admin_id,
      emailid: emailid
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid admin ID or email." });
    }

    // Check if the password matches the one stored in the database
    if (admin.password !== password) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If everything is correct, send a success message
    res.status(200).json({
      message: "Login successful.",
      admin_id: admin.admin_id
    });

  } catch (err) {
    console.error("Error querying the database:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});




// Student Login Endpoint
app.post("/api/student/login", async (req, res) => {
    const { fullName, class:studentClass, password } = req.body; // studentClass instead of class (avoid reserved keywords)
  
    // Validate input fields
    if (!fullName || !studentClass || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      // Check student credentials in MongoDB
      const student = await StudentModel.findOne({
        fullName: fullName,
        class: studentClass,
        password: password
      });
  
      if (!student) {
        return res.status(401).json({ message: "Invalid credentials. Please try again." });
      }
  
      // Login successful
      res.status(200).json({
        fullName: student.fullName,
        class: student.class,
        message: "Login successful!",
      });
  
    } catch (err) {
      console.error("Database query error:", err.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  });
  // Example API that handles form-data and JSON requests
app.post('/api/teacher/login', async (req, res) => {
    const { teacherId, email, password } = req.body; // form data will be parsed here
  
    // Validate request body
    if (!teacherId || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
  
    // MongoDB Query to find teacher
    try {
      const teacher = await TeacherModel.findOne({ teacherId, email, password });
  
      if (!teacher) {
        return res.status(401).json({ success: false, message: "Invalid credentials. Please try again." });
      }
  
      // Login successful
      res.status(200).json({
        success: true,
        message: "Login successful!",
        teacherId: teacher.teacherId,
        name: teacher.name,
        email: teacher.email,
      });
    } catch (err) {
      console.error("Database query error:", err.message);
      res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
  });
  app.get("/students/profile/:fullName", async (req, res) => {
    const { fullName } = req.params; // Get fullName from route parameters

    try {
        // Query the MongoDB collection for the student by fullName
        const student = await StudentModel.findOne({ fullName: fullName });

        if (student) {
            res.json(student); // Return the student profile
        } else {
            res.status(404).json({ message: "Profile not found" });
        }
    } catch (err) {
        console.error("Error fetching student data:", err);
        res.status(500).json({ message: "Database query error" });
    }
});

  // Admin profile route
app.get("/admin/profile/:admin_id", async (req, res) => {
  let { admin_id } = req.params; // Extract admin_id from query parameters

  // Validate admin_id
  if (!admin_id) {
    return res.status(400).json({ message: "Admin ID is required" });
  }

  // Ensure admin_id is an integer
  admin_id = parseInt(admin_id.trim(), 10);

  // Validate if admin_id is a valid number
  if (isNaN(admin_id)) {
    return res.status(400).json({ message: "Invalid Admin ID. It must be a number." });
  }

  try {
    // Query the MongoDB collection for the admin by admin_id
    const admin = await AdminModel.findOne({ admin_id });

    if (admin) {
      res.status(200).json(admin); // Return the admin profile if found
    } else {
      res.status(404).json({ message: "Admin profile not found" });
    }
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ message: "Database query error" });
  }
});

  // Get all subjects for a particular class
app.get('/api/subjects/:class', async (req, res) => {
    const className = req.params.class;  // Get the class parameter from the URL
  
    try {
      // Query MongoDB to find subjects for the specified class
      const subjects = await SubjectModel.find({ class: className });
  
      if (!subjects || subjects.length === 0) {
        return res.status(404).json({ message: 'No subjects found for this class' });
      }
  
      res.status(200).json(subjects);  // Return the subjects in JSON format
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching subjects', error: err });
    }
  });
  app.get("/api/teacher/profile/:teacherId", async (req, res) => {
    const { teacherId } = req.params;
    
  
    try {
      if (!teacherId) {
        return res.status(400).json({ success: false, message: "Teacher ID is required." });
      }
  
      const teacher = await TeacherModel.findOne({ teacherId }).select("teacherId name email");
  
      if (!teacher) {
        console.log("Teacher not found for ID:", teacherId);
        return res.status(404).json({ success: false, message: "Teacher not found." });
      }
  
      res.status(200).json({ success: true, profile: teacher });
    } catch (err) {
      
      res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
  });
  // API to check if an email already exists
app.get('/check-email', async (req, res) => {
  try {
      const { email } = req.query;

      // Check if a teacher with the given email exists
      const teacher = await TeacherModel.findOne({ email });

      if (!teacher) {
          return res.json({ exists: true });
      }

      res.json({ exists: false });
  } catch (error) {
      
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
 // POST: Add a new subject
app.post('/api/subjects', async (req, res) => {
  const { subject_code, subject_name, class_name } = req.body;
  
  // Ensure required fields are provided
  if (!subject_code || !subject_name || !class_name) {
    return res.status(400).json({ message: 'Subject code, name, and class are required' });
  }

  try {
    // Create a new subject document
    const newSubject = new SubjectModel({
      subject_code,
      subject_name,
      class: class_name,
    });

    // Save the new subject to the database
    await newSubject.save();

    // Send success response
    res.status(200).json({ message: 'Subject added successfully', subject_code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding subject', error: err });
  }
});
 

// Delete a subject
app.delete('/api/subjects/:subject_code', async (req, res) => {
  const { subject_code } = req.params;

  try {
    // Find and delete the subject based on the subject_code
    const deletedSubject = await SubjectModel.findOneAndDelete({ subject_code });

    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting subject', error: err });
  }
});
// Update a subject
app.put('/api/subjects/:subject_code', async (req, res) => {
  const { subject_code } = req.params;
  const updateData = req.body; // The data to update

  try {
    // Find and update the subject based on subject_code
    const updatedSubject = await SubjectModel.findOneAndUpdate(
      { subject_code },
      updateData,
      { new: true } // Returns the updated document
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Subject updated successfully', updatedSubject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating subject', error: err });
  }
});



// Get all teachers
app.get("/teachers", async (req, res) => {
  try {
    // Use Mongoose to get all teachers from the database
    const teachers = await TeacherModel.find();

    // Send the teachers data as a response
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching teachers" });
  }
});
// Get all subjects from the teacher_subject_allocation collection
app.get("/subjects", async (req, res) => {
    try {
      // Fetch all teacher-subject allocation records from MongoDB
      const subjects = await TeacherSubjectAllocationModel.find();
  
      // Send the fetched data as JSON response
      res.status(200).json(subjects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching subjects" });
    }
  });
  // Add a new notice
app.post("/api/notices", async (req, res) => {
    const { audience, title, description } = req.body;
  
    // Validate input fields
    if (!audience || !title || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    try {
      // Create a new notice document in MongoDB
      const newNotice = new NoticeModel({
        audience,
        title,
        description,
      });
  
      // Save the new notice to MongoDB
      await newNotice.save();
  
      res.status(201).json({ message: "Notice added successfully!" });
    } catch (err) {
      console.error("Error inserting notice:", err);
      res.status(500).json({ error: "Failed to add notice." });
    }
  });
  // Get all notices, ordered by created_at in descending order
app.get("/api/notices", async (req, res) => {
    try {
      // Fetch all notices and sort by created_at in descending order
      const notices = await NoticeModel.find().sort({ created_at: -1 });
  
      // Send the fetched notices as JSON response
      res.status(200).json(notices);
    } catch (err) {
      console.error("Error fetching notices:", err);
      res.status(500).json({ error: "Failed to fetch notices." });
    }
  });
 

// Delete a notice by ID
app.delete("/api/notices/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    // Debugging: Log the _id parameter
    console.log('Deleting notice with ID:', _id);

    // Delete the notice from MongoDB by _id
    const deletedNotice = await NoticeModel.findByIdAndDelete(_id);

    // If no notice was found, return a 404
    if (!deletedNotice) {
      return res.status(404).json({ error: "Notice not found." });
    }

    // Send a success response
    res.status(200).json({ message: "Notice deleted successfully!" });
  } catch (err) {
    console.error("Error deleting notice:", err);
    res.status(500).json({ error: "Failed to delete notice." });
  }
});
// Update a notice by ID
app.put("/api/notices/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description } = req.body;

    const updatedNotice = await NoticeModel.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true } // Returns the updated document
    );

    if (!updatedNotice) {
      return res.status(404).json({ error: "Notice not found." });
    }

    res.status(200).json({ message: "Notice updated successfully!", notice: updatedNotice });
  } catch (err) {
    console.error("Error updating notice:", err);
    res.status(500).json({ error: "Failed to update notice." });
  }
});

// Get system stats
app.get("/api/stats", async (req, res) => {
    try {
      // Get total count of teachers
      const totalTeachers = await TeacherModel.countDocuments();
      
      // Get total count of students
      const totalStudents = await StudentModel.countDocuments();
      
      // Get total count of unique classes
      const totalClasses = await StudentModel.distinct("class").then(classes => classes.length);
       // Get male and female count for students
       const maleStudents = await StudentModel.countDocuments({ gender: "Male" });
       const femaleStudents = await StudentModel.countDocuments({ gender: "Female" });

       // Get male and female count for teachers
       const maleTeachers = await TeacherModel.countDocuments({ gender: "Male" });
       const femaleTeachers = await TeacherModel.countDocuments({ gender: "Female" });
  
      res.json({ totalTeachers, totalStudents, totalClasses ,maleStudents,
        femaleStudents, maleTeachers,femaleTeachers});
    } catch (err) {
      console.error("Error fetching stats:", err);
      res.status(500).json({ error: "Failed to fetch stats." });
    }
  });

// Route to fetch notices for 'teachers'

app.get('/api/teachers/notices', async (req, res) => {
    try {
      // Find notices where the audience is 'teachers'
      const notices = await NoticeModel.find({ audience: 'teachers' }, 'title description created_at');
  
      res.status(200).json(notices);  // Send the results as JSON
    } catch (err) {
      console.error("Error fetching notices:", err);
      res.status(500).send('Error fetching notices');
    }
  });

// Route to fetch notices for 'students'
app.get('/api/students/notices', async (req, res) => {
    try {
      // Find notices where the audience is 'students'
      const notices = await NoticeModel.find({ audience: 'students' }, 'title description created_at');
  
      res.status(200).json(notices); // Send the results as JSON
    } catch (err) {
      console.error("Error fetching notices:", err);
      res.status(500).send('Error fetching notices');
    }
  });
  // API to fetch timetable for a specific class
app.get('/timetable/:class', async (req, res) => {
    try {
      const className = req.params.class; // Extract class from request params
  
      // Find the timetable for the given class
      const timetable = await StudentTimetableModel.find({ class: className }, 'day period subject_details');
  
      res.status(200).json(timetable);
    } catch (err) {
      console.error("Error fetching timetable:", err);
      res.status(500).json({ error: 'Failed to fetch timetable.' });
    }
  });
  // Endpoint to fetch assignments by teacher_id
app.get('/api/assignments/:teacher_id', async (req, res) => {
    try {
      const { teacher_id } = req.params; // Extract teacher_id from request parameters
  
      // Find assignments where teacher_id matches
      const assignments = await teacherAssignmentModel.find({ teacher_id });
  
      if (assignments.length === 0) {
        return res.status(404).json({ message: `No assignments found for teacher_id: ${teacher_id}` });
      }
  
      res.status(200).json(assignments);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });


// Endpoint to fetch assignments for a specific class
app.get('/students/assignments/:class', async (req, res) => {
  try {
    const { class: className } = req.params; // Extract class name from request parameters

    // Find assignments where class matches
    const assignments = await AssignmentModel.find({ class: className });

    if (assignments.length === 0) {
      return res.status(404).json({ message: `No assignments found for class: ${className}` });
    }

    res.status(200).json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Endpoint to count assignments for a specific class
app.get('/api/assignment-count/:class', async (req, res) => {
    try {
      const { class: className } = req.params; // Extract class name from request parameters
  
      // Count documents where class matches
      const assignmentCount = await AssignmentModel.countDocuments({ class: className });
  
      res.status(200).json({ assignment_count: assignmentCount });
    } catch (err) {
      console.error('Error counting assignments:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Endpoint to count subjects for a specific class
app.get('/api/subject-count/:class', async (req, res) => {
    try {
      const { class: className } = req.params; // Extract class name from request parameters
  
      // Count documents where class matches
      const subjectCount = await SubjectModel.countDocuments({ class: className });
  
      res.status(200).json({ subject_count: subjectCount });
    } catch (err) {
      console.error('Error counting subjects:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  // Route to fetch timetable by teacherId
app.get('/teachertimetable/:teacherId', async (req, res) => {
    try {
      const { teacherId } = req.params; // Extract teacherId from request parameters
  
      // Fetch timetable data for the given teacherId
      const timetable = await TeacherTimetableModel.find({ teacherId });
  
      if (timetable.length === 0) {
        return res.status(404).json({ message: 'No records found for the given teacherId' });
      }
  
      res.status(200).json(timetable);
    } catch (err) {
      console.error('Error fetching timetable:', err);
      res.status(500).json({ error: 'Failed to fetch data', details: err.message });
    }
  });
 

// 1. POST - Create a new assignment
app.post('/teachers/assignments/:teacherId', async (req, res) => {
  try {
    const { class: className, subject, assignment } = req.body; // `class` is used here as the key
    const teacherId = req.params.teacherId;

    

    // Create a new assignment
    const newAssignment = new AssignmentModel({
      subject,
      class:className,  // Use `className` for the field name in the database
      teacherId,
      assignment,
    });

    
    const savedAssignment = await newAssignment.save();

    
    res.status(201).json({
      message: 'Assignment added successfully',
      assignment: savedAssignment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting data', error: error.message });
  }
});

// 2. GET - Get all assignments for a teacher
app.get('/teachers/assignments/:teacherId', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    

    // Retrieve all assignments for a specific teacher
    const assignments = await AssignmentModel.find({ teacherId });

    // If no assignments found
    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found for this teacher' });
    }

    res.status(200).json({ data: assignments });
  } catch (error) {
    
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
});

// 3. DELETE - Delete an assignment
app.delete('/teachers/assignments/:teacherId/:assignmentId', async (req, res) => {
  try {
    const { teacherId, assignmentId } = req.params;

   

    // Find and delete the assignment
    const deletedAssignment = await AssignmentModel.findOneAndDelete({
      _id: assignmentId,
      teacherId: teacherId,
    });

    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({
      message: 'Assignment deleted successfully',
      assignment: deletedAssignment,
    });
  } catch (error) {
    
    res.status(500).json({ message: 'Error deleting assignment', error: error.message });
  }
});
// GET all complaints by class and fullName
app.get('/complains/:class/:fullName', async (req, res) => {
  const { class: className, fullName } = req.params;
  try {
    const complaints = await ComplainModel.find({ class: className, fullname: fullName });
    console.log("Fetched complaints:", complaints);
    res.json(complaints);
  } catch (err) {
    
    res.status(500).send('Error fetching complaints');
  }
});     


// POST a new complaint
app.post('/complains/:class/:fullName', async (req, res) => {
  const { description, status, teacherId } = req.body;
  const { class: className, fullName } = req.params;

  console.log("Received complaint data:", req.body);

  try {
    const newComplaint = new ComplainModel({
      teacherId,
      class: className,
      fullname: fullName,
      description,
      status: status || 'pending',
    });

    const savedComplaint = await newComplaint.save();
    
    res.status(201).json(savedComplaint);
  } catch (err) {
    
    res.status(500).send('Error saving complaint');
  }
});

// DELETE complaint by _id
app.delete('/complains/:id', async (req, res) => {
  const { id } = req.params;
  

  try {
    const deletedComplaint = await ComplainModel.findByIdAndDelete(id);
    if (!deletedComplaint) {
      return res.status(404).send('Complaint not found');
    }
    console.log("Complaint deleted:", deletedComplaint);
    res.status(200).send('Complaint deleted successfully');
  } catch (err) {
    
    res.status(500).send('Error deleting complaint');
  }
});




// GET route to fetch all complaints
app.get('/complains', async (req, res) => {
  try {
    // Fetch all complaints from MongoDB
    const complaints = await ComplainModel.find();

    res.status(200).json(complaints);
  } catch (error) {
   
    res.status(500).json({ error: 'Failed to fetch complaints', details: error.message });
  }
});

// PUT route to update the status of a complaint (admin functionality)
app.put('/complains/:_id/status', async (req, res) => {
  try {
    const { _id } = req.params; // Extract complaint _id from URL params
    const { status } = req.body; // Extract status from request body

    // Validate required fields
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    // Update complaint status in MongoDB
    const updatedComplaint = await ComplainModel.findByIdAndUpdate(
      _id, // Use _id to search in MongoDB
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.status(200).json({
      message: 'Complaint status updated successfully',
      updatedComplaint,
    });
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to update complaint status', details: error.message });
  }
});

// GET route to fetch all students
app.get('/students', async (req, res) => {
  try {
    // Fetching 'fullName', '_id', and 'class' fields from the StudentModel
    const students = await StudentModel.find({}, 'fullName _id class gender'); // 'class' should be correct in your schema

    // If students are found, return them as JSON
    res.json(students);
  } catch (error) {
    // If an error occurs, send a 500 status with error details
    res.status(500).json({ error: 'Failed to fetch students', details: error.message });
  }
});

// DELETE route to remove a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await StudentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student', details: error.message });
  }
});
// PUT route to update a student by ID
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedStudent = await StudentModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student', details: error.message });
  }
});


// POST route to add a new student
app.post('/students', async (req, res) => {
  try {
   

    const { fullName, class: studentClass, password ,gender} = req.body;

    if (!fullName || !studentClass || !password ||!gender) {
      return res.status(400).json({ error: 'Full Name, Class, and Password are required' });
    }

    // Create and save the new student
    const newStudent = new StudentModel({ fullName, class: studentClass, password, gender});
    await newStudent.save();

    // Return success message with the new student
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
     
    res.status(500).json({ error: 'Failed to add student', details: error.message });
  }
});
// GET route to fetch all teachers
app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await TeacherModel.find({}, '-password'); // Exclude passwords for security
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers data', error: error.message });
  }
});

// DELETE route to remove a teacher by teacherId
app.delete('/api/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await TeacherModel.findOneAndDelete({ teacherId: id });

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully', teacherId: id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error: error.message });
  }
});
// PUT route to update a teacher by teacherId
app.put('/api/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTeacher = await TeacherModel.findOneAndUpdate(
      { teacherId: id },
      updateData,
      { new: true } // Returns the updated document
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error: error.message });
  }
});

app.post('/api/teachers', async (req, res) => {
  try {
    const { teacherId, name, email, password ,gender} = req.body;

    // Validate required fields
    if (!teacherId || !name || !email || !password||!gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create and save teacher in MongoDB
    const newTeacher = new TeacherModel({ teacherId, name, email, password,gender });
    await newTeacher.save();

    res.status(201).json({ message: 'Teacher added successfully', teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Error adding teacher', error: error.message });
  }
});




// GET route to fetch all teacher-subject allocations
app.get('/api/teacher_subject_allocation', async (req, res) => {
  try {
    const allocations = await TeacherSubjectAllocationModel.find();
    res.json(allocations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

// DELETE route to remove a teacher-subject allocation by teacher_id
app.delete('/api/teacher_subject_allocation/:teacher_id', async (req, res) => {
  try {
    const { teacher_id } = req.params;
    const deletedRecord = await TeacherSubjectAllocationModel.findOneAndDelete({ teacher_id });

    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
});
// PUT route to update a teacher-subject allocation by teacher_id
app.put('/api/teacher_subject_allocation/:teacher_id', async (req, res) => {
  try {
    const { teacher_id } = req.params;
    const updateData = req.body;

    const updatedRecord = await TeacherSubjectAllocationModel.findOneAndUpdate(
      { teacher_id },
      updateData,
      { new: true } // Returns the updated document
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record updated successfully', data: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
});


// POST route to add a new teacher-subject allocation
app.post('/api/teacher_subject_allocation', async (req, res) => {
  try {
    const { teacher_name, subject_code, subject_name, class: className,teacher_id } = req.body;

    // Validate required fields
    if (!teacher_name || !subject_code || !subject_name || !className || !teacher_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create and save new allocation in MongoDB
    const newAllocation = new TeacherSubjectAllocationModel({
      teacher_name,
      subject_code,
      subject_name,
      class: className,
      teacher_id
    });

    await newAllocation.save();

    res.status(201).json({ message: 'Record added successfully', allocation: newAllocation });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting data', error: error.message });
  }
});



// GET route to fetch teacher's timetable statistics
app.get('/api/teacher-timetable', async (req, res) => {
  try {
    const { teacherId } = req.query;

    if (!teacherId) {
      return res.status(400).json({ error: 'Teacher ID is required' });
    }

    // Count total classes assigned to the teacher
    const totalClasses = await TeacherTimetableModel.countDocuments({ teacherId });

    // Count total assignments given by the teacher
    const totalAssignments = await AssignmentModel.countDocuments({ teacherId });

    // Get distinct subjects from assignments
    const distinctSubjects = await AssignmentModel.distinct('subject', { teacherId });

    // Send the response
    res.json({
      totalClasses,
      totalAssignments,
      subjects: distinctSubjects
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});



// Get complaints by teacher ID
app.get('/complaints/:teacherId', async (req, res) => {
  try {
    const complaints = await ComplainModel.find({ teacherId: req.params.teacherId });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints', error: err });
  }
});

// Post a new complaint
app.post('/complaints/:teacherId', async (req, res) => {
  try {
    const { description, status, class: className, fullname } = req.body;
    const newComplaint = new ComplainModel({
      teacherId: req.params.teacherId,
      description,
      status,
      class: className,
      fullname,
    });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully', complaint: newComplaint });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting complaint', error: err });
  }
});

// Delete a complaint by ID
app.delete('/complaints/:id', async (req, res) => {
  try {
    await ComplainModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting complaint', error: err });
  }
});

app.listen(port, () => {
    console.log(`Server successfully started at port ${port}`);
});
